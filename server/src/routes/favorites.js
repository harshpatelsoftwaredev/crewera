const express = require('express');
const pool = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// ─── 37. GET FAVORITES ───────────────────────────────────
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT f.id, f.created_at as favorited_at, p.id as property_id, p.project_name, p.slug, p.property_type,
              pd.builder_name, pl.city, pl.area, pc.construction_stage,
              MIN(pp.price) as min_price,
              (SELECT media_url FROM property_media pm WHERE pm.property_id = p.id AND pm.is_primary = 1 LIMIT 1) as primary_image
       FROM favorites f
       JOIN properties p ON f.property_id = p.id
       LEFT JOIN property_details pd ON p.id = pd.property_id
       LEFT JOIN property_locations pl ON p.id = pl.property_id
       LEFT JOIN property_construction pc ON p.id = pc.property_id
       LEFT JOIN property_pricing pp ON p.id = pp.property_id
       WHERE f.user_id = ?
       GROUP BY f.id ORDER BY f.created_at DESC`,
      [req.user.id]
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 40. CHECK IF FAVORITED ──────────────────────────────
// MUST be before /:propertyId routes
router.get('/check/:propertyId', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id FROM favorites WHERE user_id = ? AND property_id = ?', [req.user.id, req.params.propertyId]);
    res.json({ success: true, data: { isFavorited: rows.length > 0 } });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 41. GET COMPARISONS ─────────────────────────────────
// MUST be before /:propertyId routes so "comparisons" isn't treated as a propertyId
router.get('/comparisons', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM property_comparisons WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Get comparisons error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 42. CREATE COMPARISON ───────────────────────────────
// MUST be before /:propertyId routes
router.post('/comparisons', authMiddleware, async (req, res) => {
  const { comparison_name, property_ids } = req.body;
  if (!property_ids || !Array.isArray(property_ids)) return res.status(400).json({ success: false, message: 'property_ids array required' });
  try {
    const [result] = await pool.query(
      'INSERT INTO property_comparisons (user_id, comparison_name, property_ids) VALUES (?, ?, ?)',
      [req.user.id, comparison_name || 'My Comparison', JSON.stringify(property_ids)]
    );
    res.status(201).json({ success: true, message: 'Comparison created', data: { id: result.insertId } });
  } catch (error) {
    console.error('Create comparison error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 43. UPDATE COMPARISON ───────────────────────────────
router.put('/comparisons/:id', authMiddleware, async (req, res) => {
  const { comparison_name, property_ids } = req.body;
  try {
    await pool.query(
      'UPDATE property_comparisons SET comparison_name = COALESCE(?, comparison_name), property_ids = COALESCE(?, property_ids) WHERE id = ? AND user_id = ?',
      [comparison_name, property_ids ? JSON.stringify(property_ids) : null, req.params.id, req.user.id]
    );
    res.json({ success: true, message: 'Comparison updated' });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 44. DELETE COMPARISON ───────────────────────────────
router.delete('/comparisons/:id', authMiddleware, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM property_comparisons WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Comparison not found' });
    res.json({ success: true, message: 'Comparison deleted' });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 38. ADD TO FAVORITES ────────────────────────────────
// AFTER all /comparisons and /check routes to avoid conflicts
router.post('/:propertyId', authMiddleware, async (req, res) => {
  try {
    const [existing] = await pool.query(
      'SELECT id FROM favorites WHERE user_id = ? AND property_id = ?', [req.user.id, req.params.propertyId]);
    if (existing.length > 0) return res.json({ success: true, message: 'Already in favorites' });
    await pool.query('INSERT INTO favorites (user_id, property_id) VALUES (?, ?)', [req.user.id, req.params.propertyId]);
    await pool.query('UPDATE property_analytics SET favorite_count = favorite_count + 1 WHERE property_id = ?', [req.params.propertyId]).catch(() => { });
    res.status(201).json({ success: true, message: 'Added to favorites' });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 39. REMOVE FROM FAVORITES ───────────────────────────
router.delete('/:propertyId', authMiddleware, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM favorites WHERE user_id = ? AND property_id = ?', [req.user.id, req.params.propertyId]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Not in favorites' });
    await pool.query('UPDATE property_analytics SET favorite_count = GREATEST(favorite_count - 1, 0) WHERE property_id = ?', [req.params.propertyId]).catch(() => { });
    res.json({ success: true, message: 'Removed from favorites' });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

module.exports = router;
