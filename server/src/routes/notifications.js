const express = require('express');
const pool = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const { paginate } = require('../utils/helpers');

const router = express.Router();

// ─── 75. GET OWN NOTIFICATIONS ───────────────────────────
router.get('/', authMiddleware, async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const { type } = req.query;
    try {
        let where = 'WHERE user_id = ?';
        const params = [req.user.id];
        if (type) { where += ' AND notification_type = ?'; params.push(type); }

        const [countResult] = await pool.query(
            `SELECT COUNT(*) as total FROM notifications ${where}`, params
        );

        const [rows] = await pool.query(
            `SELECT * FROM notifications ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );

        res.json({
            success: true,
            data: rows,
            meta: { page, limit, total: countResult[0].total, totalPages: Math.ceil(countResult[0].total / limit) },
        });
    } catch (error) {
        console.error('Get notifications error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 76. GET UNREAD COUNT ────────────────────────────────
router.get('/unread-count', authMiddleware, async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = FALSE',
            [req.user.id]
        );
        res.json({ success: true, data: { unreadCount: rows[0].count } });
    } catch (error) {
        console.error('Get unread count error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 77. MARK SINGLE AS READ ─────────────────────────────
router.patch('/:id/read', authMiddleware, async (req, res) => {
    try {
        const [result] = await pool.query(
            'UPDATE notifications SET is_read = TRUE, read_at = NOW() WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Notification not found' });
        res.json({ success: true, message: 'Notification marked as read' });
    } catch (error) {
        console.error('Mark read error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 78. MARK ALL AS READ ────────────────────────────────
router.patch('/read-all', authMiddleware, async (req, res) => {
    try {
        await pool.query(
            'UPDATE notifications SET is_read = TRUE, read_at = NOW() WHERE user_id = ? AND is_read = FALSE',
            [req.user.id]
        );
        res.json({ success: true, message: 'All notifications marked as read' });
    } catch (error) {
        console.error('Mark all read error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 79. DELETE NOTIFICATION ─────────────────────────────
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM notifications WHERE id = ? AND user_id = ?',
            [req.params.id, req.user.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Notification not found' });
        res.json({ success: true, message: 'Notification deleted' });
    } catch (error) {
        console.error('Delete notification error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
