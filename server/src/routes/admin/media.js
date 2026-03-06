const express = require('express');
const pool = require('../../config/database');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Media upload config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/media'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

// ─── 115. UPLOAD MEDIA ───────────────────────────────────
router.post('/:propertyId/upload', upload.single('media'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
        const { category_id, title, description, alt_text, display_order, is_primary } = req.body;

        const [result] = await pool.query(
            `INSERT INTO property_media (property_id, category_id, media_url, file_type, file_size_kb,
       title, description, alt_text, display_order, is_primary)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [req.params.propertyId, category_id || 1, `/uploads/media/${req.file.filename}`,
            req.file.mimetype, Math.round(req.file.size / 1024),
            title || req.file.originalname, description, alt_text, display_order || 0, is_primary || false]
        );

        if (is_primary) {
            await pool.query('UPDATE property_media SET is_primary = FALSE WHERE property_id = ? AND id != ?',
                [req.params.propertyId, result.insertId]);
        }

        res.status(201).json({ success: true, message: 'Media uploaded', data: { id: result.insertId, url: `/uploads/media/${req.file.filename}` } });
    } catch (error) {
        console.error('Upload media error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 116. UPDATE MEDIA ───────────────────────────────────
router.put('/:id', async (req, res) => {
    const { title, description, alt_text, display_order } = req.body;
    try {
        await pool.query(
            'UPDATE property_media SET title = COALESCE(?, title), description = COALESCE(?, description), alt_text = COALESCE(?, alt_text), display_order = COALESCE(?, display_order) WHERE id = ?',
            [title, description, alt_text, display_order, req.params.id]
        );
        res.json({ success: true, message: 'Media updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 117. DELETE MEDIA ───────────────────────────────────
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM property_media WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Media not found' });
        res.json({ success: true, message: 'Media deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 118. SET AS PRIMARY ─────────────────────────────────
router.patch('/:id/primary', async (req, res) => {
    try {
        const [media] = await pool.query('SELECT property_id FROM property_media WHERE id = ?', [req.params.id]);
        if (media.length === 0) return res.status(404).json({ success: false, message: 'Media not found' });

        await pool.query('UPDATE property_media SET is_primary = FALSE WHERE property_id = ?', [media[0].property_id]);
        await pool.query('UPDATE property_media SET is_primary = TRUE WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Set as primary image' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
