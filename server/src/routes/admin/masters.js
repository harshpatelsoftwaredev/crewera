const express = require('express');
const pool = require('../../config/database');

const router = express.Router();

// ─── 161. ADD AMENITY TO CATALOG ─────────────────────────
router.post('/amenities', async (req, res) => {
    const { amenity_name, amenity_category, icon_name, is_premium } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO amenity_master (amenity_name, amenity_category, icon_name, is_premium) VALUES (?, ?, ?, ?)',
            [amenity_name, amenity_category, icon_name, is_premium || false]
        );
        res.status(201).json({ success: true, message: 'Amenity added', data: { id: result.insertId } });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ success: false, message: 'Amenity already exists' });
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 162. UPDATE AMENITY ─────────────────────────────────
router.put('/amenities/:id', async (req, res) => {
    const { amenity_name, amenity_category, icon_name, is_premium } = req.body;
    try {
        await pool.query(
            `UPDATE amenity_master SET amenity_name = COALESCE(?, amenity_name),
       amenity_category = COALESCE(?, amenity_category), icon_name = COALESCE(?, icon_name),
       is_premium = COALESCE(?, is_premium) WHERE id = ?`,
            [amenity_name, amenity_category, icon_name, is_premium, req.params.id]
        );
        res.json({ success: true, message: 'Amenity updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 163. CREATE TAG ─────────────────────────────────────
router.post('/tags', async (req, res) => {
    const { tag_name, tag_group } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO tags (tag_name, tag_group) VALUES (?, ?)',
            [tag_name, tag_group || 'Custom']
        );
        res.status(201).json({ success: true, message: 'Tag created', data: { id: result.insertId } });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ success: false, message: 'Tag already exists' });
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 164. UPDATE/DELETE TAG ──────────────────────────────
router.put('/tags/:id', async (req, res) => {
    const { tag_name, tag_group } = req.body;
    try {
        await pool.query(
            'UPDATE tags SET tag_name = COALESCE(?, tag_name), tag_group = COALESCE(?, tag_group) WHERE id = ?',
            [tag_name, tag_group, req.params.id]
        );
        res.json({ success: true, message: 'Tag updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.delete('/tags/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM tags WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Tag deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ── GET ALL AMENITIES (for admin dropdowns) ──────────────
router.get('/amenities', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM amenity_master ORDER BY amenity_category, amenity_name');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ── GET ALL TAGS (for admin dropdowns) ───────────────────
router.get('/tags', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tags ORDER BY tag_group, tag_name');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
