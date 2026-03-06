const express = require('express');
const pool = require('../../config/database');
const { paginate, sanitizeSort, sanitizeOrder } = require('../../utils/helpers');
const { logAction } = require('../../middleware/auditLogger');

const router = express.Router();

// ─── 123. LIST ALL LEADS ─────────────────────────────────
router.get('/', async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const { status, type, assigned_to, q } = req.query;
    try {
        let where = 'WHERE 1=1';
        const params = [];
        if (status) { where += ' AND pl.lead_status = ?'; params.push(status); }
        if (type) { where += ' AND pl.lead_type = ?'; params.push(type); }
        if (assigned_to) { where += ' AND pl.assigned_to = ?'; params.push(assigned_to); }
        if (q) { where += ' AND (pl.lead_name LIKE ? OR pl.lead_email LIKE ?)'; params.push(`%${q}%`, `%${q}%`); }

        const [countResult] = await pool.query(`SELECT COUNT(*) as total FROM property_leads pl ${where}`, params);

        const [rows] = await pool.query(
            `SELECT pl.*, p.project_name, p.slug,
              (SELECT CONCAT(up.first_name, ' ', up.last_name) FROM user_profiles up WHERE up.user_id = pl.assigned_to) as assigned_name
       FROM property_leads pl
       LEFT JOIN properties p ON pl.property_id = p.id
       ${where} ORDER BY pl.created_at DESC LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );
        res.json({ success: true, data: rows, meta: { page, limit, total: countResult[0].total } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 124. GET LEAD DETAIL ────────────────────────────────
router.get('/stats', async (req, res) => {
    try {
        const [byStatus] = await pool.query('SELECT lead_status, COUNT(*) as count FROM property_leads GROUP BY lead_status');
        const [total] = await pool.query('SELECT COUNT(*) as count FROM property_leads');
        const [thisMonth] = await pool.query('SELECT COUNT(*) as count FROM property_leads WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)');
        const [converted] = await pool.query('SELECT COUNT(*) as count FROM property_leads WHERE lead_status = "Booked"');
        res.json({ success: true, data: { total: total[0].count, thisMonth: thisMonth[0].count, converted: converted[0].count, byStatus } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT pl.*, p.project_name, p.slug FROM property_leads pl
       LEFT JOIN properties p ON pl.property_id = p.id WHERE pl.id = ?`, [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ success: false, message: 'Lead not found' });
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 125. UPDATE LEAD STATUS ─────────────────────────────
router.patch('/:id/status', async (req, res) => {
    const { lead_status, lost_reason } = req.body;
    try {
        await pool.query(
            'UPDATE property_leads SET lead_status = ?, lost_reason = COALESCE(?, lost_reason) WHERE id = ?',
            [lead_status, lost_reason, req.params.id]
        );
        res.json({ success: true, message: 'Lead status updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 126. ASSIGN LEAD ────────────────────────────────────
router.patch('/:id/assign', async (req, res) => {
    const { assigned_to } = req.body;
    try {
        await pool.query('UPDATE property_leads SET assigned_to = ? WHERE id = ?', [assigned_to, req.params.id]);
        res.json({ success: true, message: 'Lead assigned' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 127. SET FOLLOW-UP ──────────────────────────────────
router.patch('/:id/follow-up', async (req, res) => {
    const { next_follow_up } = req.body;
    try {
        await pool.query('UPDATE property_leads SET next_follow_up = ? WHERE id = ?', [next_follow_up, req.params.id]);
        res.json({ success: true, message: 'Follow-up date set' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 129. LIST ALL INQUIRIES ─────────────────────────────
router.get('/inquiries/all', async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const { status, type } = req.query;
    try {
        let where = 'WHERE 1=1';
        const params = [];
        if (status) { where += ' AND i.status = ?'; params.push(status); }
        if (type) { where += ' AND i.inquiry_type = ?'; params.push(type); }

        const [rows] = await pool.query(
            `SELECT i.*, p.project_name FROM inquiries i
       LEFT JOIN properties p ON i.property_id = p.id
       ${where} ORDER BY i.created_at DESC LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );
        res.json({ success: true, data: rows, meta: { page, limit } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 130. REPLY TO INQUIRY ───────────────────────────────
router.patch('/inquiries/:id/reply', async (req, res) => {
    const { admin_response } = req.body;
    try {
        await pool.query(
            'UPDATE inquiries SET admin_response = ?, status = "Replied", responded_by = ?, responded_at = NOW() WHERE id = ?',
            [admin_response, req.user.id, req.params.id]
        );
        res.json({ success: true, message: 'Reply sent' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 131. UPDATE INQUIRY STATUS ──────────────────────────
router.patch('/inquiries/:id/status', async (req, res) => {
    const { status } = req.body;
    try {
        await pool.query('UPDATE inquiries SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ success: true, message: 'Inquiry status updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 132. INQUIRY STATS ──────────────────────────────────
router.get('/inquiries/stats', async (req, res) => {
    try {
        const [byStatus] = await pool.query('SELECT status, COUNT(*) as count FROM inquiries GROUP BY status');
        const [total] = await pool.query('SELECT COUNT(*) as count FROM inquiries');
        res.json({ success: true, data: { total: total[0].count, byStatus } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
