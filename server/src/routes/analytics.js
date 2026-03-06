const express = require('express');
const pool = require('../config/database');

const router = express.Router();

// ─── 80. PRICE HISTORY FOR PROPERTY ──────────────────────
router.get('/properties/:id/price-history', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT pph.*, u_profile.first_name as changed_by_name
       FROM property_price_history pph
       LEFT JOIN user_profiles u_profile ON pph.changed_by = u_profile.user_id
       WHERE pph.property_id = ?
       ORDER BY pph.effective_date DESC`,
            [req.params.id]
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Get price history error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 81. PROPERTY ANALYTICS (PUBLIC) ─────────────────────
router.get('/properties/:id/analytics', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM property_analytics WHERE property_id = ?',
            [req.params.id]
        );
        if (rows.length === 0) return res.json({ success: true, data: { view_count: 0, inquiry_count: 0, favorite_count: 0, share_count: 0 } });
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        console.error('Get property analytics error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 82. MARKET TRENDS ───────────────────────────────────
router.get('/market-trends', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT pl.city,
              COUNT(p.id) as total_properties,
              AVG(pp.price) as avg_price,
              AVG(pp.price_per_sqft) as avg_price_per_sqft,
              SUM(CASE WHEN p.status = 'Active' THEN 1 ELSE 0 END) as active_count,
              AVG(pp.roi) as avg_roi
       FROM properties p
       JOIN property_locations pl ON p.id = pl.property_id
       LEFT JOIN property_pricing pp ON p.id = pp.property_id
       WHERE pl.city IS NOT NULL
       GROUP BY pl.city
       ORDER BY total_properties DESC
       LIMIT 20`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Get market trends error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 83. TOP CITIES ──────────────────────────────────────
router.get('/top-cities', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT pl.city,
              COUNT(p.id) as property_count,
              SUM(pa.view_count) as total_views,
              SUM(pa.inquiry_count) as total_inquiries,
              SUM(pa.favorite_count) as total_favorites,
              AVG(pp.price) as avg_price
       FROM properties p
       JOIN property_locations pl ON p.id = pl.property_id
       LEFT JOIN property_analytics pa ON p.id = pa.property_id
       LEFT JOIN property_pricing pp ON p.id = pp.property_id
       WHERE p.status = 'Active' AND pl.city IS NOT NULL
       GROUP BY pl.city
       ORDER BY total_views DESC
       LIMIT 10`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Get top cities error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
