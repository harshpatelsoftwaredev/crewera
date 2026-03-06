const express = require('express');
const { body, query } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const { sendEmail, emailTemplates } = require('../config/email');
const { handleValidationErrors } = require('../middleware/validation');
const { authMiddleware } = require('../middleware/auth');
const { generateToken } = require('../utils/helpers');

const router = express.Router();

// ─── 1. REGISTER ─────────────────────────────────────────
router.post('/register', [
  body('first_name').trim().notEmpty().withMessage('First name is required'),
  body('last_name').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number required'),
], handleValidationErrors, async (req, res) => {
  const { first_name, last_name, email, password, phone } = req.body;
  const conn = await pool.getConnection();
  try {
    const [existing] = await conn.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ success: false, message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = generateToken();

    await conn.beginTransaction();

    const [userResult] = await conn.query(
      'INSERT INTO users (email, phone, password, role, email_verification_token) VALUES (?, ?, ?, ?, ?)',
      [email, phone || null, hashedPassword, 'user', verificationToken]
    );
    const userId = userResult.insertId;

    await conn.query(
      'INSERT INTO user_profiles (user_id, first_name, last_name) VALUES (?, ?, ?)',
      [userId, first_name, last_name]
    );

    await conn.query(
      'INSERT INTO user_preferences (user_id) VALUES (?)',
      [userId]
    );

    await conn.commit();

    // Send verification email
    const template = emailTemplates.verification(first_name, verificationToken);
    sendEmail(email, template.subject, template.html).catch(console.error);

    const token = jwt.sign({ id: userId, email, role: 'user' }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please verify your email.',
      token,
      user: { id: userId, first_name, last_name, email, role: 'user' },
    });
  } catch (error) {
    await conn.rollback();
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  } finally {
    conn.release();
  }
});

// ─── 2. LOGIN ──────────────────────────────────────────────
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
], handleValidationErrors, async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await pool.query(
      `SELECT u.*, up.first_name, up.last_name FROM users u
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE u.email = ?`, [email]
    );
    if (users.length === 0) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const user = users[0];
    if (!user.is_active) return res.status(403).json({ success: false, message: 'Account is deactivated' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    // Update login info
    const ip = req.ip || req.connection.remoteAddress;
    await pool.query(
      'UPDATE users SET last_login_at = NOW(), last_login_ip = ?, login_count = login_count + 1 WHERE id = ?',
      [ip, user.id]
    );

    // Log login history
    await pool.query(
      'INSERT INTO login_history (user_id, ip_address, user_agent, status) VALUES (?, ?, ?, ?)',
      [user.id, ip, req.headers['user-agent'] || '', 'Success']
    ).catch(() => { });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      refreshToken,
      user: {
        id: user.id, first_name: user.first_name, last_name: user.last_name,
        email: user.email, role: user.role, email_verified: user.email_verified,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 3. LOGOUT ─────────────────────────────────────────────
router.post('/logout', authMiddleware, async (req, res) => {
  try {
    await pool.query(
      `UPDATE login_history SET logout_at = NOW() 
       WHERE user_id = ? AND logout_at IS NULL ORDER BY login_at DESC LIMIT 1`,
      [req.user.id]
    ).catch(() => { });
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 4. REFRESH TOKEN ──────────────────────────────────────
router.post('/refresh-token', [
  body('refreshToken').notEmpty().withMessage('Refresh token is required'),
], handleValidationErrors, async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refreshToken, process.env.JWT_SECRET);
    const [users] = await pool.query('SELECT id, email, role, is_active FROM users WHERE id = ?', [decoded.id]);
    if (users.length === 0 || !users[0].is_active) {
      return res.status(401).json({ success: false, message: 'User not found or inactive' });
    }
    const user = users[0];
    const newToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    res.json({ success: true, token: newToken });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid refresh token' });
  }
});

// ─── 5. FORGOT PASSWORD ───────────────────────────────────
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Valid email is required'),
], handleValidationErrors, async (req, res) => {
  const { email } = req.body;
  try {
    const [users] = await pool.query(
      'SELECT u.id, up.first_name FROM users u LEFT JOIN user_profiles up ON u.id = up.user_id WHERE u.email = ?',
      [email]
    );
    if (users.length === 0) return res.status(404).json({ success: false, message: 'No account with that email' });

    const resetToken = jwt.sign({ email, id: users[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await pool.query(
      'UPDATE users SET password_reset_token = ?, password_reset_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email = ?',
      [resetToken, email]
    );

    const template = emailTemplates.resetPassword(users[0].first_name || 'User', resetToken);
    const emailResult = await sendEmail(email, template.subject, template.html);

    res.json({
      success: true,
      message: emailResult.success ? 'Password reset link sent to your email' : 'Reset token generated (email failed)',
      ...(process.env.NODE_ENV !== 'production' && { resetToken }),
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 6. RESET PASSWORD ────────────────────────────────────
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Reset token required'),
  body('password').isLength({ min: 6 }).withMessage('Min 6 characters'),
], handleValidationErrors, async (req, res) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [users] = await pool.query(
      'SELECT id FROM users WHERE email = ? AND password_reset_token = ? AND password_reset_expires > NOW()',
      [decoded.email, token]
    );
    if (users.length === 0) return res.status(400).json({ success: false, message: 'Invalid or expired token' });

    const hashed = await bcrypt.hash(password, 12);
    await pool.query(
      'UPDATE users SET password = ?, password_reset_token = NULL, password_reset_expires = NULL WHERE id = ?',
      [hashed, users[0].id]
    );

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid or expired token' });
  }
});

// ─── 7. VERIFY EMAIL ───────────────────────────────────────
router.get('/verify-email', async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ success: false, message: 'Token required' });
  try {
    const [users] = await pool.query(
      'SELECT id FROM users WHERE email_verification_token = ?', [token]
    );
    if (users.length === 0) return res.status(400).json({ success: false, message: 'Invalid token' });

    await pool.query(
      'UPDATE users SET email_verified = TRUE, email_verification_token = NULL WHERE id = ?',
      [users[0].id]
    );
    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 8. RESEND VERIFICATION ───────────────────────────────
router.post('/resend-verification', authMiddleware, async (req, res) => {
  try {
    const [users] = await pool.query(
      `SELECT u.email, u.email_verified, up.first_name FROM users u
       LEFT JOIN user_profiles up ON u.id = up.user_id WHERE u.id = ?`,
      [req.user.id]
    );
    if (users.length === 0) return res.status(404).json({ success: false, message: 'User not found' });
    if (users[0].email_verified) return res.json({ success: true, message: 'Email already verified' });

    const token = generateToken();
    await pool.query('UPDATE users SET email_verification_token = ? WHERE id = ?', [token, req.user.id]);

    const template = emailTemplates.verification(users[0].first_name || 'User', token);
    sendEmail(users[0].email, template.subject, template.html).catch(console.error);

    res.json({ success: true, message: 'Verification email sent' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 9. CHANGE PASSWORD ───────────────────────────────────
router.post('/change-password', authMiddleware, [
  body('currentPassword').notEmpty().withMessage('Current password required'),
  body('newPassword').isLength({ min: 6 }).withMessage('Min 6 characters'),
], handleValidationErrors, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const [users] = await pool.query('SELECT password FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) return res.status(404).json({ success: false, message: 'User not found' });

    const match = await bcrypt.compare(currentPassword, users[0].password);
    if (!match) return res.status(400).json({ success: false, message: 'Current password is incorrect' });

    const hashed = await bcrypt.hash(newPassword, 12);
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashed, req.user.id]);

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 10. GET ME ────────────────────────────────────────────
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const [users] = await pool.query(
      `SELECT u.id, u.email, u.phone, u.role, u.email_verified, u.is_active, u.last_login_at, u.created_at,
              up.first_name, up.last_name, up.profile_picture, up.city, up.bio
       FROM users u
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE u.id = ?`, [req.user.id]
    );
    if (users.length === 0) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, data: users[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
