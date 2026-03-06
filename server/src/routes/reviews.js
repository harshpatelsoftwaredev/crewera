const express = require('express');
const { body } = require('express-validator');
const pool = require('../config/database');
const { authMiddleware, optionalAuth } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const { paginate } = require('../utils/helpers');

const router = express.Router();

// ─── 31. GET REVIEWS FOR PROPERTY ────────────────────────
router.get('/property/:propertyId', async (req, res) => {
  const { page, limit, offset } = paginate(req.query.page, req.query.limit);
  try {
    const [rows] = await pool.query(
      `SELECT pr.*, up.first_name, up.last_name, up.profile_picture
       FROM property_reviews pr
       LEFT JOIN user_profiles up ON pr.user_id = up.user_id
       WHERE pr.property_id = ? AND pr.status = 'Approved'
       ORDER BY pr.created_at DESC LIMIT ? OFFSET ?`,
      [req.params.propertyId, limit, offset]
    );
    const [countResult] = await pool.query(
      'SELECT COUNT(*) as total, AVG(rating) as avg_rating FROM property_reviews WHERE property_id = ? AND status = "Approved"',
      [req.params.propertyId]
    );
    res.json({ success: true, data: rows, meta: { ...countResult[0], page, limit } });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 32. SUBMIT REVIEW ───────────────────────────────────
router.post('/property/:propertyId', authMiddleware, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
  body('review_text').notEmpty().withMessage('Review text is required'),
], handleValidationErrors, async (req, res) => {
  const { rating, rating_construction, rating_location, rating_amenities,
    rating_value_for_money, review_title, review_text, pros, cons } = req.body;
  try {
    const [existing] = await pool.query(
      'SELECT id FROM property_reviews WHERE property_id = ? AND user_id = ?',
      [req.params.propertyId, req.user.id]
    );
    if (existing.length > 0) return res.status(400).json({ success: false, message: 'You already reviewed this property' });

    const [result] = await pool.query(
      `INSERT INTO property_reviews (property_id, user_id, rating, rating_construction,
       rating_location, rating_amenities, rating_value_for_money, review_title, review_text, pros, cons, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`,
      [req.params.propertyId, req.user.id, rating,
      rating_construction || null, rating_location || null,
      rating_amenities || null, rating_value_for_money || null,
      review_title || null, review_text, pros || null, cons || null]
    );
    res.status(201).json({ success: true, message: 'Review submitted for approval', data: { id: result.insertId } });
  } catch (error) {
    console.error('Submit review error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 33. UPDATE OWN REVIEW ───────────────────────────────
router.put('/:id', authMiddleware, async (req, res) => {
  const { rating, rating_construction, rating_location, rating_amenities,
    rating_value_for_money, review_title, review_text, pros, cons } = req.body;
  try {
    const [rows] = await pool.query('SELECT id FROM property_reviews WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Review not found' });
    await pool.query(
      `UPDATE property_reviews SET rating = COALESCE(?, rating),
       rating_construction = COALESCE(?, rating_construction),
       rating_location = COALESCE(?, rating_location), rating_amenities = COALESCE(?, rating_amenities),
       rating_value_for_money = COALESCE(?, rating_value_for_money),
       review_title = COALESCE(?, review_title), review_text = COALESCE(?, review_text),
       pros = COALESCE(?, pros), cons = COALESCE(?, cons),
       status = 'Pending' WHERE id = ?`,
      [rating, rating_construction, rating_location, rating_amenities,
        rating_value_for_money, review_title, review_text, pros, cons, req.params.id]
    );
    res.json({ success: true, message: 'Review updated, pending approval' });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 34. DELETE OWN REVIEW ───────────────────────────────
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM property_reviews WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Review not found' });
    res.json({ success: true, message: 'Review deleted' });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 35. MARK REVIEW HELPFUL ─────────────────────────────
router.post('/:id/helpful', authMiddleware, async (req, res) => {
  try {
    await pool.query('UPDATE property_reviews SET helpful_count = helpful_count + 1 WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Marked as helpful' });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 36. REPORT REVIEW ───────────────────────────────────
router.post('/:id/report', authMiddleware, [
  body('reason').notEmpty().withMessage('Reason required'),
], handleValidationErrors, async (req, res) => {
  try {
    await pool.query('UPDATE property_reviews SET report_count = report_count + 1, status = "Flagged" WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Review reported' });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

module.exports = router;
