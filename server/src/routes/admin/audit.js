const express = require('express');
const pool = require('../../config/database');
const { paginate } = require('../../utils/helpers');

const router = express.Router();

// ─── 177. AUDIT LOGS ─────────────────────────────────────
router.get('/logs', async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const { entity_type, action_type, start_date, end_date, user_id } = req.query;
    try {
        let where = 'WHERE 1=1';
        const params = [];
        if (entity_type) { where += ' AND al.entity_type = ?'; params.push(entity_type); }
        if (action_type) { where += ' AND al.action_type = ?'; params.push(action_type); }
        if (start_date) { where += ' AND al.created_at >= ?'; params.push(start_date); }
        if (end_date) { where += ' AND al.created_at <= ?'; params.push(end_date); }
        if (user_id) { where += ' AND al.user_id = ?'; params.push(user_id); }

        const [countResult] = await pool.query(`SELECT COUNT(*) as total FROM audit_logs al ${where}`, params);

        const [rows] = await pool.query(
            `SELECT al.*, up.first_name, up.last_name FROM audit_logs al
       LEFT JOIN user_profiles up ON al.user_id = up.user_id
       ${where} ORDER BY al.created_at DESC LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );
        res.json({ success: true, data: rows, meta: { page, limit, total: countResult[0].total } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 178. ACTIVITY LOGS ──────────────────────────────────
router.get('/activity', async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const { activity_type, severity, start_date, end_date } = req.query;
    try {
        let where = 'WHERE 1=1';
        const params = [];
        if (activity_type) { where += ' AND aa.activity_type = ?'; params.push(activity_type); }
        if (severity) { where += ' AND aa.severity = ?'; params.push(severity); }
        if (start_date) { where += ' AND aa.created_at >= ?'; params.push(start_date); }
        if (end_date) { where += ' AND aa.created_at <= ?'; params.push(end_date); }

        const [rows] = await pool.query(
            `SELECT aa.*, up.first_name, up.last_name FROM audit_activity aa
       LEFT JOIN user_profiles up ON aa.user_id = up.user_id
       ${where} ORDER BY aa.created_at DESC LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );
        res.json({ success: true, data: rows, meta: { page, limit } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 179. ALL LOGIN HISTORY ──────────────────────────────
router.get('/login-history', async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const { status, user_id } = req.query;
    try {
        let where = 'WHERE 1=1';
        const params = [];
        if (status) { where += ' AND lh.status = ?'; params.push(status); }
        if (user_id) { where += ' AND lh.user_id = ?'; params.push(user_id); }

        const [rows] = await pool.query(
            `SELECT lh.*, u.email, up.first_name, up.last_name FROM login_history lh
       JOIN users u ON lh.user_id = u.id
       LEFT JOIN user_profiles up ON lh.user_id = up.user_id
       ${where} ORDER BY lh.login_at DESC LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );
        res.json({ success: true, data: rows, meta: { page, limit } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 180. FAILED LOGIN ATTEMPTS ──────────────────────────
router.get('/security/failed-logins', async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    try {
        const [rows] = await pool.query(
            `SELECT lh.*, u.email, up.first_name, up.last_name FROM login_history lh
       JOIN users u ON lh.user_id = u.id
       LEFT JOIN user_profiles up ON lh.user_id = up.user_id
       WHERE lh.status = 'Failed'
       ORDER BY lh.login_at DESC LIMIT ? OFFSET ?`,
            [limit, offset]
        );
        res.json({ success: true, data: rows, meta: { page, limit } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 181. SUSPICIOUS ACTIVITY ────────────────────────────
router.get('/security/suspicious', async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    try {
        const [rows] = await pool.query(
            `SELECT aa.*, up.first_name, up.last_name FROM audit_activity aa
       LEFT JOIN user_profiles up ON aa.user_id = up.user_id
       WHERE aa.severity IN ('Critical', 'Emergency')
       ORDER BY aa.created_at DESC LIMIT ? OFFSET ?`,
            [limit, offset]
        );
        res.json({ success: true, data: rows, meta: { page, limit } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
