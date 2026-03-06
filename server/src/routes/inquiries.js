const express = require('express');
const { body } = require('express-validator');
const pool = require('../config/database');
const { authMiddleware, optionalAuth } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const { sendEmail, emailTemplates } = require('../config/email');
const { paginate } = require('../utils/helpers');

const router = express.Router();

// ─── 45. SUBMIT INQUIRY ──────────────────────────────────
router.post('/', [
  body('property_id').isInt().withMessage('Property ID required'),
  body('name').trim().notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('message').trim().notEmpty().withMessage('Message required'),
], handleValidationErrors, async (req, res) => {
  const { property_id, name, email, phone, message, inquiry_type } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO inquiries (property_id, user_id, name, email, phone, message, inquiry_type, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')`,
      [property_id, req.user?.id || null, name, email, phone || null, message, inquiry_type || 'General']
    );
    // Update analytics
    await pool.query('UPDATE property_analytics SET inquiry_count = inquiry_count + 1 WHERE property_id = ?', [property_id]).catch(() => { });
    res.status(201).json({ success: true, message: 'Inquiry submitted', data: { id: result.insertId } });
  } catch (error) {
    console.error('Submit inquiry error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 46. GET OWN INQUIRIES ───────────────────────────────
router.get('/', authMiddleware, async (req, res) => {
  const { page, limit, offset } = paginate(req.query.page, req.query.limit);
  try {
    const [rows] = await pool.query(
      `SELECT i.*, p.project_name, p.slug FROM inquiries i
       LEFT JOIN properties p ON i.property_id = p.id
       WHERE i.user_id = ? ORDER BY i.created_at DESC LIMIT ? OFFSET ?`,
      [req.user.id, limit, offset]
    );
    res.json({ success: true, data: rows, meta: { page, limit } });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 47. GET INQUIRY DETAIL ──────────────────────────────
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT i.*, p.project_name, p.slug FROM inquiries i
       LEFT JOIN properties p ON i.property_id = p.id
       WHERE i.id = ? AND i.user_id = ?`, [req.params.id, req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    res.json({ success: true, data: rows[0] });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 48. REQUEST CALLBACK ────────────────────────────────
router.post('/callback', [
  body('property_id').isInt().withMessage('Property ID required'),
  body('name').trim().notEmpty().withMessage('Name required'),
  body('phone').notEmpty().withMessage('Phone required'),
], handleValidationErrors, async (req, res) => {
  const { property_id, name, phone, preferred_time } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO inquiries (property_id, user_id, name, phone, inquiry_type, message, status)
       VALUES (?, ?, ?, ?, 'Callback', ?, 'Pending')`,
      [property_id, req.user?.id || null, name, phone, preferred_time ? `Preferred time: ${preferred_time}` : 'Callback requested']
    );
    res.status(201).json({ success: true, message: 'Callback request submitted', data: { id: result.insertId } });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 49. SCHEDULE SITE VISIT ─────────────────────────────
router.post('/site-visit', authMiddleware, [
  body('property_id').isInt().withMessage('Property ID required'),
  body('preferred_date').notEmpty().withMessage('Preferred date required'),
], handleValidationErrors, async (req, res) => {
  const { property_id, preferred_date, preferred_time, notes } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO inquiries (property_id, user_id, name, email, inquiry_type, message, status)
       VALUES (?, ?, (SELECT CONCAT(first_name, ' ', last_name) FROM user_profiles WHERE user_id = ?),
               (SELECT email FROM users WHERE id = ?), 'Site Visit',
               ?, 'Pending')`,
      [property_id, req.user.id, req.user.id, req.user.id,
        `Site visit: ${preferred_date} ${preferred_time || ''} ${notes || ''}`]
    );
    res.status(201).json({ success: true, message: 'Site visit scheduled', data: { id: result.insertId } });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 51. TRACK SHARE ─────────────────────────────────────
router.post('/share/:propertyId', async (req, res) => {
  try {
    await pool.query('UPDATE property_analytics SET share_count = share_count + 1 WHERE property_id = ?', [req.params.propertyId]);
    res.json({ success: true, message: 'Share tracked' });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 52. DOWNLOAD BROCHURE (track) ───────────────────────
router.post('/brochure/:propertyId', async (req, res) => {
  try {
    await pool.query('UPDATE property_analytics SET share_count = share_count + 1 WHERE property_id = ?', [req.params.propertyId]);
    const [media] = await pool.query(
      `SELECT pm.media_url FROM property_media pm
       LEFT JOIN media_categories mc ON pm.category_id = mc.id
       WHERE pm.property_id = ? AND (mc.category_name = 'Document' OR pm.file_type = 'pdf')
       LIMIT 1`,
      [req.params.propertyId]
    );
    res.json({ success: true, message: 'Brochure download tracked', data: { brochure_url: media[0]?.media_url || null } });
  } catch (error) {
    console.error('Brochure download error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
