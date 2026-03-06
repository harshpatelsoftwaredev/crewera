const express = require('express');
const { body } = require('express-validator');
const pool = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const { paginate } = require('../utils/helpers');

const router = express.Router();

// ─── 61. GET ALL SAVED SEARCHES ──────────────────────────
router.get('/', authMiddleware, async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM saved_searches WHERE user_id = ? ORDER BY created_at DESC',
            [req.user.id]
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Get saved searches error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 62. SAVE A SEARCH ───────────────────────────────────
router.post('/', authMiddleware, [
    body('search_name').trim().notEmpty().withMessage('Search name required'),
    body('search_criteria').isObject().withMessage('Search criteria required'),
], handleValidationErrors, async (req, res) => {
    const { search_name, search_criteria, alert_enabled, alert_frequency } = req.body;
    try {
        const [result] = await pool.query(
            `INSERT INTO saved_searches (user_id, search_name, search_criteria, alert_enabled, alert_frequency)
       VALUES (?, ?, ?, ?, ?)`,
            [req.user.id, search_name, JSON.stringify(search_criteria),
            alert_enabled || false, alert_frequency || 'Daily']
        );
        res.status(201).json({ success: true, message: 'Search saved', data: { id: result.insertId } });
    } catch (error) {
        console.error('Save search error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 63. UPDATE SAVED SEARCH ─────────────────────────────
router.put('/:id', authMiddleware, async (req, res) => {
    const { search_name, search_criteria, alert_enabled, alert_frequency } = req.body;
    try {
        const [rows] = await pool.query(
            'SELECT id FROM saved_searches WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]
        );
        if (rows.length === 0) return res.status(404).json({ success: false, message: 'Saved search not found' });

        await pool.query(
            `UPDATE saved_searches SET
       search_name = COALESCE(?, search_name),
       search_criteria = COALESCE(?, search_criteria),
       alert_enabled = COALESCE(?, alert_enabled),
       alert_frequency = COALESCE(?, alert_frequency)
       WHERE id = ? AND user_id = ?`,
            [search_name, search_criteria ? JSON.stringify(search_criteria) : null,
                alert_enabled, alert_frequency, req.params.id, req.user.id]
        );
        res.json({ success: true, message: 'Saved search updated' });
    } catch (error) {
        console.error('Update saved search error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 64. DELETE SAVED SEARCH ─────────────────────────────
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM saved_searches WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Saved search not found' });
        res.json({ success: true, message: 'Saved search deleted' });
    } catch (error) {
        console.error('Delete saved search error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 65. RUN SAVED SEARCH & GET MATCHES ──────────────────
router.get('/:id/results', authMiddleware, async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    try {
        const [searches] = await pool.query(
            'SELECT * FROM saved_searches WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]
        );
        if (searches.length === 0) return res.status(404).json({ success: false, message: 'Saved search not found' });

        const criteria = typeof searches[0].search_criteria === 'string'
            ? JSON.parse(searches[0].search_criteria) : searches[0].search_criteria;

        let where = 'WHERE p.status = "Active"';
        const params = [];
        if (criteria.city) { where += ' AND pl.city = ?'; params.push(criteria.city); }
        if (criteria.type) { where += ' AND p.property_type = ?'; params.push(criteria.type); }
        if (criteria.bhk) { where += ' AND pp.bhk_type = ?'; params.push(criteria.bhk); }
        if (criteria.price_min) { where += ' AND pp.price >= ?'; params.push(criteria.price_min); }
        if (criteria.price_max) { where += ' AND pp.price <= ?'; params.push(criteria.price_max); }
        if (criteria.stage) { where += ' AND pc.construction_stage = ?'; params.push(criteria.stage); }

        const [rows] = await pool.query(
            `SELECT DISTINCT p.id, p.project_name, p.property_type, p.slug,
              pd.builder_name, pl.city, pl.area,
              MIN(pp.price) as min_price
       FROM properties p
       LEFT JOIN property_details pd ON p.id = pd.property_id
       LEFT JOIN property_locations pl ON p.id = pl.property_id
       LEFT JOIN property_pricing pp ON p.id = pp.property_id
       LEFT JOIN property_construction pc ON p.id = pc.property_id
       ${where} GROUP BY p.id LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );

        // Update result count
        await pool.query('UPDATE saved_searches SET result_count = ? WHERE id = ?', [rows.length, req.params.id]);

        res.json({ success: true, data: rows, meta: { page, limit } });
    } catch (error) {
        console.error('Run saved search error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
