const express = require('express');
const pool = require('../config/database');
const { paginate } = require('../utils/helpers');

const router = express.Router();

// ─── 84. GET ALL TAGS ────────────────────────────────────
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM tags ORDER BY tag_group, usage_count DESC'
        );
        // Group by tag_group
        const grouped = {};
        rows.forEach(tag => {
            if (!grouped[tag.tag_group]) grouped[tag.tag_group] = [];
            grouped[tag.tag_group].push(tag);
        });
        res.json({ success: true, data: grouped, all: rows });
    } catch (error) {
        console.error('Get tags error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 85. GET PROPERTIES BY TAG ───────────────────────────
router.get('/:tagName/properties', async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    try {
        const [tags] = await pool.query('SELECT id FROM tags WHERE tag_name = ?', [req.params.tagName]);
        if (tags.length === 0) return res.status(404).json({ success: false, message: 'Tag not found' });

        const tagId = tags[0].id;
        const [rows] = await pool.query(
            `SELECT p.id, p.project_name, p.property_type, p.slug,
              pd.builder_name, pl.city, pl.area,
              MIN(pp.price) as min_price,
              (SELECT media_url FROM property_media pm WHERE pm.property_id = p.id AND pm.is_primary = 1 LIMIT 1) as primary_image
       FROM property_tags pt
       JOIN properties p ON pt.property_id = p.id
       LEFT JOIN property_details pd ON p.id = pd.property_id
       LEFT JOIN property_locations pl ON p.id = pl.property_id
       LEFT JOIN property_pricing pp ON p.id = pp.property_id
       WHERE pt.tag_id = ? AND p.status = 'Active'
       GROUP BY p.id
       ORDER BY p.created_at DESC LIMIT ? OFFSET ?`,
            [tagId, limit, offset]
        );
        res.json({ success: true, data: rows, meta: { page, limit, tag: req.params.tagName } });
    } catch (error) {
        console.error('Get properties by tag error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 86. AUTOCOMPLETE / SEARCH SUGGESTIONS ───────────────
router.get('/autocomplete', async (req, res) => {
    const { q } = req.query;
    if (!q || q.length < 2) return res.json({ success: true, data: [] });
    try {
        const term = `%${q}%`;
        const [properties] = await pool.query(
            `SELECT DISTINCT p.project_name as label, 'property' as type, p.slug
       FROM properties p WHERE p.status = 'Active' AND p.project_name LIKE ? LIMIT 5`,
            [term]
        );
        const [cities] = await pool.query(
            `SELECT DISTINCT pl.city as label, 'city' as type
       FROM property_locations pl
       JOIN properties p ON pl.property_id = p.id
       WHERE p.status = 'Active' AND pl.city LIKE ? LIMIT 5`,
            [term]
        );
        const [builders] = await pool.query(
            `SELECT DISTINCT pd.builder_name as label, 'builder' as type
       FROM property_details pd
       JOIN properties p ON pd.property_id = p.id
       WHERE p.status = 'Active' AND pd.builder_name LIKE ? LIMIT 5`,
            [term]
        );
        res.json({ success: true, data: [...properties, ...cities, ...builders] });
    } catch (error) {
        console.error('Autocomplete error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
