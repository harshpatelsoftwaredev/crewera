const express = require('express');
const pool = require('../../config/database');
const { paginate } = require('../../utils/helpers');
const { logAction } = require('../../middleware/auditLogger');

const router = express.Router();

// ─── 133. LIST ALL REQUESTS ──────────────────────────────
router.get('/', async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const { status, roi_min, roi_max } = req.query;
    try {
        let where = 'WHERE 1=1';
        const params = [];
        if (status) { where += ' AND pr.status = ?'; params.push(status); }
        if (roi_min) { where += ' AND pr.roi >= ?'; params.push(roi_min); }
        if (roi_max) { where += ' AND pr.roi <= ?'; params.push(roi_max); }

        const [countResult] = await pool.query(`SELECT COUNT(*) as total FROM property_requests pr ${where}`, params);
        const [rows] = await pool.query(
            `SELECT pr.*, up.first_name, up.last_name FROM property_requests pr
       LEFT JOIN user_profiles up ON pr.user_id = up.user_id
       ${where} ORDER BY pr.created_at DESC LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );
        res.json({ success: true, data: rows, meta: { page, limit, total: countResult[0].total } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 134. GET FULL REQUEST ───────────────────────────────
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT pr.*, up.first_name, up.last_name FROM property_requests pr
       LEFT JOIN user_profiles up ON pr.user_id = up.user_id WHERE pr.id = ?`, [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ success: false, message: 'Request not found' });
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 135. MARK UNDER REVIEW ──────────────────────────────
router.patch('/:id/review', async (req, res) => {
    const { admin_notes } = req.body;
    try {
        await pool.query(
            `UPDATE property_requests SET status = 'Under Review', admin_notes = COALESCE(?, admin_notes),
       reviewed_by = ?, reviewed_at = NOW() WHERE id = ?`,
            [admin_notes, req.user.id, req.params.id]
        );
        res.json({ success: true, message: 'Marked as under review' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 136. APPROVE REQUEST ────────────────────────────────
router.patch('/:id/approve', async (req, res) => {
    const { admin_notes } = req.body;
    try {
        await pool.query(
            `UPDATE property_requests SET status = 'Approved', admin_notes = COALESCE(?, admin_notes),
       reviewed_by = ?, reviewed_at = NOW() WHERE id = ?`,
            [admin_notes, req.user.id, req.params.id]
        );
        await logAction(req, 'APPROVE', 'property_requests', req.params.id, 'Request approved');
        res.json({ success: true, message: 'Request approved — user can now complete property details' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 137. REJECT REQUEST ─────────────────────────────────
router.patch('/:id/reject', async (req, res) => {
    const { rejection_reason } = req.body;
    try {
        await pool.query(
            `UPDATE property_requests SET status = 'Rejected', rejection_reason = ?,
       reviewed_by = ?, reviewed_at = NOW() WHERE id = ?`,
            [rejection_reason, req.user.id, req.params.id]
        );
        await logAction(req, 'REJECT', 'property_requests', req.params.id, 'Request rejected');
        res.json({ success: true, message: 'Request rejected' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 138. VIEW COMPLETION SUBMISSION ─────────────────────
router.get('/:id/completion', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM property_requests WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ success: false, message: 'Request not found' });
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 139. VERIFY COMPLETION & CREATE LISTING ─────────────
router.patch('/:id/verify-completion', async (req, res) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const [requests] = await conn.query('SELECT * FROM property_requests WHERE id = ?', [req.params.id]);
        if (requests.length === 0) { await conn.rollback(); return res.status(404).json({ success: false, message: 'Not found' }); }

        const r = requests[0];

        // Create property from request
        const slug = r.project_name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now().toString(36);
        const [propResult] = await conn.query(
            'INSERT INTO properties (project_name, property_type, special_type, slug, created_by, status) VALUES (?, ?, ?, ?, ?, ?)',
            [r.project_name, r.property_type, r.special_type || 'None', slug, r.user_id, 'Active']
        );
        const propId = propResult.insertId;

        // Create details
        await conn.query(
            `INSERT INTO property_details (property_id, builder_name, description, total_units, available_units)
       VALUES (?, ?, ?, ?, ?)`,
            [propId, r.builder_developer_name || r.your_name, r.description, r.total_units, r.available_units]
        );

        // Create location
        if (r.property_location) {
            await conn.query(
                'INSERT INTO property_locations (property_id, address, city, state, zip_code) VALUES (?, ?, ?, ?, ?)',
                [propId, r.property_location, r.property_city, r.property_state, r.property_pincode]
            );
        }

        // Create construction
        if (r.construction_stage) {
            await conn.query(
                'INSERT INTO property_construction (property_id, construction_stage, project_start_date, expected_completion, possession_date) VALUES (?, ?, ?, ?, ?)',
                [propId, r.construction_stage, r.project_start_date, r.expected_completion, r.possession_date]
            );
        }

        // Create pricing
        if (r.price_per_unit) {
            await conn.query(
                `INSERT INTO property_pricing (property_id, bhk_type, total_units, available_units, price,
         price_per_sqft, booking_amount, revenue, roi, rental_yield, expected_appreciation, size_super_buildup, size_carpet)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [propId, r.bhk_type || '2BHK', r.total_units || 1, r.available_units || 1,
                    r.price_per_unit, r.price_per_sqft, r.booking_amount, r.expected_revenue,
                    r.roi, r.rental_yield, r.expected_appreciation, r.size_super_buildup, r.size_carpet]
            );
        }

        // Initialize analytics
        await conn.query('INSERT INTO property_analytics (property_id) VALUES (?)', [propId]);

        // Update request
        await conn.query(
            `UPDATE property_requests SET status = 'Listed', completion_status = 'Complete',
       listed_property_id = ?, reviewed_by = ?, reviewed_at = NOW() WHERE id = ?`,
            [propId, req.user.id, req.params.id]
        );

        await conn.commit();
        await logAction(req, 'CREATE', 'properties', propId, `Property created from request #${req.params.id}`);
        res.json({ success: true, message: 'Property listed successfully', data: { propertyId: propId, slug } });
    } catch (error) {
        await conn.rollback();
        console.error('Verify completion error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    } finally {
        conn.release();
    }
});

// ─── 140. REQUEST STATS ──────────────────────────────────
router.get('/stats/overview', async (req, res) => {
    try {
        const [byStatus] = await pool.query('SELECT status, COUNT(*) as count FROM property_requests GROUP BY status');
        const [avgRoi] = await pool.query('SELECT AVG(roi) as avg_roi FROM property_requests WHERE roi IS NOT NULL');
        const [total] = await pool.query('SELECT COUNT(*) as count FROM property_requests');
        const [converted] = await pool.query('SELECT COUNT(*) as count FROM property_requests WHERE status = "Listed"');
        const conversionRate = total[0].count > 0 ? ((converted[0].count / total[0].count) * 100).toFixed(2) : 0;
        res.json({ success: true, data: { total: total[0].count, avgRoi: avgRoi[0].avg_roi, conversionRate, byStatus } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
