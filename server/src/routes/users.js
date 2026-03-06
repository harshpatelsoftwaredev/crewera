const express = require('express');
const { body } = require('express-validator');
const pool = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Avatar upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/avatars/'),
  filename: (req, file, cb) => cb(null, `avatar-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({
  storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    cb(null, allowed.test(path.extname(file.originalname).toLowerCase()));
  }
});

// ─── 11. GET OWN PROFILE ──────────────────────────────────
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.id, u.email, u.phone, u.role, u.email_verified, u.is_active, u.last_login_at, u.created_at,
              up.first_name, up.last_name, up.profile_picture, up.date_of_birth, up.gender, up.bio,
              up.occupation, up.company_name, up.city, up.state, up.address, up.pincode,
              up.alternate_phone, up.languages_spoken, up.social_linkedin, up.social_twitter
       FROM users u LEFT JOIN user_profiles up ON u.id = up.user_id WHERE u.id = ?`, [req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 12. UPDATE OWN PROFILE ──────────────────────────────
router.put('/profile', authMiddleware, [
  body('first_name').optional().trim().notEmpty(),
  body('last_name').optional().trim().notEmpty(),
], handleValidationErrors, async (req, res) => {
  const { first_name, last_name, phone, date_of_birth, gender, bio, occupation,
    company_name, city, state, address, pincode, alternate_phone, languages_spoken,
    social_linkedin, social_twitter } = req.body;
  try {
    // Update users table phone
    if (phone !== undefined) await pool.query('UPDATE users SET phone = ? WHERE id = ?', [phone, req.user.id]);

    // Update profile
    await pool.query(
      `UPDATE user_profiles SET
        first_name = COALESCE(?, first_name), last_name = COALESCE(?, last_name),
        date_of_birth = COALESCE(?, date_of_birth), gender = COALESCE(?, gender),
        bio = COALESCE(?, bio), occupation = COALESCE(?, occupation),
        company_name = COALESCE(?, company_name), city = COALESCE(?, city),
        state = COALESCE(?, state), address = COALESCE(?, address),
        pincode = COALESCE(?, pincode), alternate_phone = COALESCE(?, alternate_phone),
        languages_spoken = COALESCE(?, languages_spoken),
        social_linkedin = COALESCE(?, social_linkedin), social_twitter = COALESCE(?, social_twitter)
       WHERE user_id = ?`,
      [first_name, last_name, date_of_birth, gender, bio, occupation, company_name,
        city, state, address, pincode, alternate_phone, languages_spoken,
        social_linkedin, social_twitter, req.user.id]
    );

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 13. UPLOAD AVATAR ────────────────────────────────────
router.post('/profile/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
  try {
    const avatarPath = `/uploads/avatars/${req.file.filename}`;
    await pool.query('UPDATE user_profiles SET profile_picture = ? WHERE user_id = ?', [avatarPath, req.user.id]);
    res.json({ success: true, message: 'Avatar uploaded', data: { profile_picture: avatarPath } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 14. GET PREFERENCES ──────────────────────────────────
router.get('/preferences', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM user_preferences WHERE user_id = ?', [req.user.id]);
    if (rows.length === 0) {
      await pool.query('INSERT INTO user_preferences (user_id) VALUES (?)', [req.user.id]);
      const [newRows] = await pool.query('SELECT * FROM user_preferences WHERE user_id = ?', [req.user.id]);
      return res.json({ success: true, data: newRows[0] });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 15. UPDATE PREFERENCES ──────────────────────────────
router.put('/preferences', authMiddleware, async (req, res) => {
  const fields = ['property_updates', 'inquiry_responses', 'marketing_emails', 'newsletter',
    'sms_notifications', 'push_notifications', 'show_profile_publicly', 'show_favorites',
    'allow_developer_contact', 'show_activity_status', 'preferred_currency', 'preferred_language', 'dark_mode'];
  try {
    const updates = []; const values = [];
    fields.forEach(f => {
      if (req.body[f] !== undefined) { updates.push(`${f} = ?`); values.push(req.body[f]); }
    });
    if (updates.length === 0) return res.status(400).json({ success: false, message: 'No fields to update' });
    values.push(req.user.id);
    await pool.query(`UPDATE user_preferences SET ${updates.join(', ')} WHERE user_id = ?`, values);
    res.json({ success: true, message: 'Preferences updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 16. VIEW PUBLIC PROFILE ──────────────────────────────
router.get('/:id/public', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.id, u.role, u.created_at,
              up.first_name, up.last_name, up.profile_picture, up.city, up.bio, up.occupation, up.company_name
       FROM users u
       LEFT JOIN user_profiles up ON u.id = up.user_id
       LEFT JOIN user_preferences upr ON u.id = upr.user_id
       WHERE u.id = ? AND u.is_active = TRUE AND (upr.show_profile_publicly = TRUE OR upr.show_profile_publicly IS NULL)`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Profile not found or private' });
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 18. DEACTIVATE ACCOUNT ──────────────────────────────
router.delete('/account', authMiddleware, async (req, res) => {
  try {
    await pool.query('UPDATE users SET is_active = FALSE WHERE id = ?', [req.user.id]);
    res.json({ success: true, message: 'Account deactivated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// ─── 17. GET LOGIN HISTORY ────────────────────────────────
router.get('/login-history', authMiddleware, async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const [rows] = await pool.query(
      `SELECT id, login_at, logout_at, ip_address, device_type, browser, os, geo_city, geo_country, status
       FROM login_history WHERE user_id = ? ORDER BY login_at DESC LIMIT ? OFFSET ?`,
      [req.user.id, parseInt(limit), offset]
    );
    res.json({ success: true, data: rows, meta: { page: parseInt(page), limit: parseInt(limit) } });
  } catch (error) {
    console.error('Get login history error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
