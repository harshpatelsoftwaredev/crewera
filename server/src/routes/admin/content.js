const express = require('express');
const pool = require('../../config/database');
const { paginate } = require('../../utils/helpers');

const router = express.Router();

// ─── 145. LIST ALL REVIEWS ───────────────────────────────
router.get('/reviews', async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const { status } = req.query;
    try {
        let where = 'WHERE 1=1';
        const params = [];
        if (status) { where += ' AND pr.status = ?'; params.push(status); }

        const [rows] = await pool.query(
            `SELECT pr.*, p.project_name, up.first_name, up.last_name FROM property_reviews pr
       LEFT JOIN properties p ON pr.property_id = p.id
       LEFT JOIN user_profiles up ON pr.user_id = up.user_id
       ${where} ORDER BY pr.created_at DESC LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );
        res.json({ success: true, data: rows, meta: { page, limit } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 146. APPROVE/REJECT REVIEW ──────────────────────────
router.patch('/reviews/:id/approve', async (req, res) => {
    const { status } = req.body; // 'Approved' or 'Rejected'
    try {
        await pool.query('UPDATE property_reviews SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ success: true, message: `Review ${status.toLowerCase()}` });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 147. DELETE REVIEW ──────────────────────────────────
router.delete('/reviews/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM property_reviews WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 148. LIST ALL TESTIMONIALS ──────────────────────────
router.get('/testimonials', async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const { status } = req.query;
    try {
        let where = 'WHERE 1=1';
        const params = [];
        if (status) { where += ' AND status = ?'; params.push(status); }

        const [rows] = await pool.query(
            `SELECT * FROM testimonials ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );
        res.json({ success: true, data: rows, meta: { page, limit } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 149. APPROVE/FEATURE TESTIMONIAL ────────────────────
router.patch('/testimonials/:id/approve', async (req, res) => {
    const { status, is_featured } = req.body;
    try {
        const updates = [];
        const values = [];
        if (status) { updates.push('status = ?'); values.push(status); }
        if (is_featured !== undefined) { updates.push('is_featured = ?'); values.push(is_featured); }
        if (updates.length === 0) return res.status(400).json({ success: false, message: 'No fields to update' });

        values.push(req.params.id);
        await pool.query(`UPDATE testimonials SET ${updates.join(', ')} WHERE id = ?`, values);
        res.json({ success: true, message: 'Testimonial updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 150. DELETE TESTIMONIAL ─────────────────────────────
router.delete('/testimonials/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Testimonial deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 151. CREATE FAQ ─────────────────────────────────────
router.post('/faqs', async (req, res) => {
    const { question, answer, category, display_order } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO faqs (question, answer, category, display_order, is_active) VALUES (?, ?, ?, ?, TRUE)',
            [question, answer, category || 'General Questions', display_order || 0]
        );
        res.status(201).json({ success: true, message: 'FAQ created', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 152. UPDATE FAQ ─────────────────────────────────────
router.put('/faqs/:id', async (req, res) => {
    const { question, answer, category, display_order, is_active } = req.body;
    try {
        await pool.query(
            'UPDATE faqs SET question = COALESCE(?, question), answer = COALESCE(?, answer), category = COALESCE(?, category), display_order = COALESCE(?, display_order), is_active = COALESCE(?, is_active) WHERE id = ?',
            [question, answer, category, display_order, is_active, req.params.id]
        );
        res.json({ success: true, message: 'FAQ updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 153. DELETE FAQ ─────────────────────────────────────
router.delete('/faqs/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM faqs WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'FAQ deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 154. LIST CONTACT MESSAGES ──────────────────────────
router.get('/contact-messages', async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const { is_read } = req.query;
    try {
        let where = 'WHERE 1=1';
        const params = [];
        if (is_read !== undefined) { where += ' AND is_read = ?'; params.push(is_read === 'true'); }

        const [rows] = await pool.query(
            `SELECT * FROM contact_messages ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );
        res.json({ success: true, data: rows, meta: { page, limit } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 155. REPLY TO CONTACT ───────────────────────────────
router.patch('/contact-messages/:id/reply', async (req, res) => {
    const { response } = req.body;
    try {
        await pool.query(
            'UPDATE contact_messages SET response = ?, replied = TRUE, responded_by = ?, responded_at = NOW(), is_read = TRUE WHERE id = ?',
            [response, req.user.id, req.params.id]
        );
        res.json({ success: true, message: 'Reply sent' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 156. MARK AS READ ──────────────────────────────────
router.patch('/contact-messages/:id/read', async (req, res) => {
    try {
        await pool.query('UPDATE contact_messages SET is_read = TRUE WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Marked as read' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
