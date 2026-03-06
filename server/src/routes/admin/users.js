const express = require('express');
const pool = require('../../config/database');
const { paginate, sanitizeSort, sanitizeOrder } = require('../../utils/helpers');
const { logAction } = require('../../middleware/auditLogger');

const router = express.Router();
const SORT_ALLOWED = ['created_at', 'email', 'role', 'is_active', 'last_login_at'];

// ─── 87. LIST ALL USERS ──────────────────────────────────
router.get('/', async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const { role, status, q, sort, order } = req.query;
    try {
        let where = 'WHERE 1=1';
        const params = [];
        if (role) { where += ' AND u.role = ?'; params.push(role); }
        if (status === 'active') { where += ' AND u.is_active = TRUE'; }
        else if (status === 'inactive') { where += ' AND u.is_active = FALSE'; }
        if (q) { where += ' AND (u.email LIKE ? OR up.first_name LIKE ? OR up.last_name LIKE ?)'; params.push(`%${q}%`, `%${q}%`, `%${q}%`); }

        const [countResult] = await pool.query(
            `SELECT COUNT(*) as total FROM users u LEFT JOIN user_profiles up ON u.id = up.user_id ${where}`, params
        );
        const sortCol = sanitizeSort(sort, SORT_ALLOWED);
        const sortOrder = sanitizeOrder(order);

        const [rows] = await pool.query(
            `SELECT u.id, u.email, u.phone, u.role, u.is_active, u.email_verified,
              u.last_login_at, u.login_count, u.created_at,
              up.first_name, up.last_name, up.profile_picture, up.city
       FROM users u LEFT JOIN user_profiles up ON u.id = up.user_id
       ${where} ORDER BY u.${sortCol} ${sortOrder} LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );
        res.json({ success: true, data: rows, meta: { page, limit, total: countResult[0].total, totalPages: Math.ceil(countResult[0].total / limit) } });
    } catch (error) {
        console.error('Admin get users error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 88. GET USER DETAIL ─────────────────────────────────
router.get('/stats', async (req, res) => {
    try {
        const [total] = await pool.query('SELECT COUNT(*) as count FROM users');
        const [active] = await pool.query('SELECT COUNT(*) as count FROM users WHERE is_active = TRUE');
        const [newThisMonth] = await pool.query('SELECT COUNT(*) as count FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)');
        const [byRole] = await pool.query('SELECT role, COUNT(*) as count FROM users GROUP BY role');
        res.json({ success: true, data: { total: total[0].count, active: active[0].count, newThisMonth: newThisMonth[0].count, byRole } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 88. GET USER DETAIL ─────────────────────────────────
router.get('/:id', async (req, res) => {
    try {
        const [users] = await pool.query(
            `SELECT u.*, up.*, upr.* FROM users u
       LEFT JOIN user_profiles up ON u.id = up.user_id
       LEFT JOIN user_preferences upr ON u.id = upr.user_id
       WHERE u.id = ?`, [req.params.id]
        );
        if (users.length === 0) return res.status(404).json({ success: false, message: 'User not found' });
        const user = users[0];
        delete user.password;
        res.json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 89. UPDATE USER ─────────────────────────────────────
router.put('/:id', async (req, res) => {
    const { role, is_active, email_verified } = req.body;
    try {
        await pool.query(
            'UPDATE users SET role = COALESCE(?, role), is_active = COALESCE(?, is_active), email_verified = COALESCE(?, email_verified) WHERE id = ?',
            [role, is_active, email_verified, req.params.id]
        );
        await logAction(req, 'UPDATE', 'users', req.params.id, `Admin updated user`);
        res.json({ success: true, message: 'User updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 90. ACTIVATE/DEACTIVATE ─────────────────────────────
router.patch('/:id/activate', async (req, res) => {
    const { is_active } = req.body;
    try {
        await pool.query('UPDATE users SET is_active = ? WHERE id = ?', [is_active, req.params.id]);
        await logAction(req, 'UPDATE', 'users', req.params.id, `User ${is_active ? 'activated' : 'deactivated'}`);
        res.json({ success: true, message: `User ${is_active ? 'activated' : 'deactivated'}` });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 91. CHANGE USER ROLE ────────────────────────────────
router.patch('/:id/role', async (req, res) => {
    const { role } = req.body;
    if (!['user', 'admin', 'agent', 'builder'].includes(role)) {
        return res.status(400).json({ success: false, message: 'Invalid role' });
    }
    try {
        await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, req.params.id]);
        await logAction(req, 'UPDATE', 'users', req.params.id, `Role changed to ${role}`);
        res.json({ success: true, message: 'Role updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 92. DELETE USER ─────────────────────────────────────
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'User not found' });
        await logAction(req, 'DELETE', 'users', req.params.id, 'User deleted');
        res.json({ success: true, message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 93. USER ACTIVITY ───────────────────────────────────
router.get('/:id/activity', async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    try {
        const [rows] = await pool.query(
            `SELECT * FROM audit_activity WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
            [req.params.id, limit, offset]
        );
        res.json({ success: true, data: rows, meta: { page, limit } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
