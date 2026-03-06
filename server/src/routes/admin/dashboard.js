const express = require('express');
const pool = require('../../config/database');

const router = express.Router();

// ─── 165. OVERVIEW KPIs ──────────────────────────────────
router.get('/overview', async (req, res) => {
    try {
        const [users] = await pool.query('SELECT COUNT(*) as count FROM users WHERE is_active = TRUE');
        const [properties] = await pool.query('SELECT COUNT(*) as count FROM properties WHERE status = "Active"');
        const [leads] = await pool.query('SELECT COUNT(*) as count FROM property_leads');
        const [inquiries] = await pool.query('SELECT COUNT(*) as count FROM inquiries');
        const [revenue] = await pool.query('SELECT SUM(pp.revenue) as total FROM property_pricing pp JOIN properties p ON pp.property_id = p.id WHERE p.status = "Active"');
        const [newUsersToday] = await pool.query('SELECT COUNT(*) as count FROM users WHERE DATE(created_at) = CURDATE()');
        const [pendingProperties] = await pool.query('SELECT COUNT(*) as count FROM properties WHERE status = "Pending Approval"');

        res.json({
            success: true, data: {
                totalUsers: users[0].count, activeProperties: properties[0].count,
                totalLeads: leads[0].count, totalInquiries: inquiries[0].count,
                totalRevenue: revenue[0].total || 0, newUsersToday: newUsersToday[0].count,
                pendingProperties: pendingProperties[0].count,
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 166. PROPERTY STATS ─────────────────────────────────
router.get('/property-stats', async (req, res) => {
    try {
        const [byStatus] = await pool.query('SELECT status, COUNT(*) as count FROM properties GROUP BY status');
        const [byType] = await pool.query('SELECT property_type, COUNT(*) as count FROM properties GROUP BY property_type');
        const [byCity] = await pool.query(
            `SELECT pl.city, COUNT(*) as count FROM properties p
       JOIN property_locations pl ON p.id = pl.property_id WHERE pl.city IS NOT NULL
       GROUP BY pl.city ORDER BY count DESC LIMIT 10`
        );
        res.json({ success: true, data: { byStatus, byType, byCity } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 167. LEAD PIPELINE ──────────────────────────────────
router.get('/lead-pipeline', async (req, res) => {
    try {
        const [pipeline] = await pool.query(
            'SELECT lead_status, COUNT(*) as count FROM property_leads GROUP BY lead_status ORDER BY FIELD(lead_status, "New", "Contacted", "Qualified", "Site Visit Done", "Negotiating", "Booked", "Lost", "Junk")'
        );
        res.json({ success: true, data: pipeline });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 168. INQUIRY STATS ──────────────────────────────────
router.get('/inquiry-stats', async (req, res) => {
    const { period = 30 } = req.query;
    try {
        const [byStatus] = await pool.query('SELECT status, COUNT(*) as count FROM inquiries GROUP BY status');
        const [byDay] = await pool.query(
            `SELECT DATE(created_at) as date, COUNT(*) as count FROM inquiries
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY) GROUP BY DATE(created_at) ORDER BY date`,
            [parseInt(period)]
        );
        res.json({ success: true, data: { byStatus, byDay } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 169. REVENUE ANALYTICS ──────────────────────────────
router.get('/revenue-analytics', async (req, res) => {
    try {
        const [byProject] = await pool.query(
            `SELECT p.project_name, SUM(pp.revenue) as total_revenue, SUM(pp.price * pp.total_units) as total_value,
              AVG(pp.roi) as avg_roi
       FROM properties p JOIN property_pricing pp ON p.id = pp.property_id
       GROUP BY p.id ORDER BY total_revenue DESC LIMIT 10`
        );
        const [byCity] = await pool.query(
            `SELECT pl.city, SUM(pp.revenue) as total_revenue, AVG(pp.price_per_sqft) as avg_price_sqft
       FROM properties p JOIN property_pricing pp ON p.id = pp.property_id
       JOIN property_locations pl ON p.id = pl.property_id WHERE pl.city IS NOT NULL
       GROUP BY pl.city ORDER BY total_revenue DESC LIMIT 10`
        );
        res.json({ success: true, data: { byProject, byCity } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 170. USER GROWTH ────────────────────────────────────
router.get('/user-growth', async (req, res) => {
    const { period = 30 } = req.query;
    try {
        const [data] = await pool.query(
            `SELECT DATE(created_at) as date, COUNT(*) as count FROM users
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY) GROUP BY DATE(created_at) ORDER BY date`,
            [parseInt(period)]
        );
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 171. TOP PROPERTIES ─────────────────────────────────
router.get('/top-properties', async (req, res) => {
    const { metric = 'views' } = req.query;
    try {
        const orderCol = metric === 'inquiries' ? 'pa.inquiry_count' : metric === 'favorites' ? 'pa.favorite_count' : 'pa.view_count';
        const [rows] = await pool.query(
            `SELECT p.id, p.project_name, p.slug, pd.builder_name, pl.city,
              pa.view_count, pa.inquiry_count, pa.favorite_count, pa.share_count
       FROM properties p
       LEFT JOIN property_details pd ON p.id = pd.property_id
       LEFT JOIN property_locations pl ON p.id = pl.property_id
       LEFT JOIN property_analytics pa ON p.id = pa.property_id
       WHERE p.status = 'Active'
       ORDER BY ${orderCol} DESC LIMIT 10`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 172. CITY HEATMAP ───────────────────────────────────
router.get('/city-heatmap', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT pl.city, pl.latitude, pl.longitude,
              COUNT(p.id) as property_count,
              SUM(pa.view_count) as total_views,
              SUM(pa.inquiry_count) as total_inquiries
       FROM properties p
       JOIN property_locations pl ON p.id = pl.property_id
       LEFT JOIN property_analytics pa ON p.id = pa.property_id
       WHERE p.status = 'Active' AND pl.city IS NOT NULL
       GROUP BY pl.city, pl.latitude, pl.longitude`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 173. RECENT ACTIVITY ────────────────────────────────
router.get('/recent-activity', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT aa.*, up.first_name, up.last_name FROM audit_activity aa
       LEFT JOIN user_profiles up ON aa.user_id = up.user_id
       ORDER BY aa.created_at DESC LIMIT 20`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 174. DEEP ANALYTICS FOR SINGLE PROPERTY ─────────────
router.get('/property/:id', async (req, res) => {
    try {
        const [analytics] = await pool.query('SELECT * FROM property_analytics WHERE property_id = ?', [req.params.id]);
        const [viewLogs] = await pool.query(
            `SELECT DATE(viewed_at) as date, COUNT(*) as views FROM property_view_logs
       WHERE property_id = ? AND viewed_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
       GROUP BY DATE(viewed_at) ORDER BY date`, [req.params.id]
        );
        const [deviceBreakdown] = await pool.query(
            'SELECT device_type, COUNT(*) as count FROM property_view_logs WHERE property_id = ? GROUP BY device_type',
            [req.params.id]
        );
        const [priceHistory] = await pool.query(
            'SELECT * FROM property_price_history WHERE property_id = ? ORDER BY effective_date DESC LIMIT 20',
            [req.params.id]
        );
        res.json({ success: true, data: { analytics: analytics[0] || {}, viewLogs, deviceBreakdown, priceHistory } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 175. AGENT PERFORMANCE ──────────────────────────────
router.get('/agent-performance', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT u.id, up.first_name, up.last_name,
              COUNT(pl.id) as total_leads,
              SUM(CASE WHEN pl.lead_status = 'Booked' THEN 1 ELSE 0 END) as converted,
              SUM(CASE WHEN pl.lead_status = 'Lost' THEN 1 ELSE 0 END) as lost
       FROM users u
       JOIN user_profiles up ON u.id = up.user_id
       LEFT JOIN property_leads pl ON u.id = pl.assigned_to
       WHERE u.role IN ('agent', 'admin')
       GROUP BY u.id
       ORDER BY converted DESC`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 176. GENERATE REPORT (STUB) ─────────────────────────
router.post('/reports/generate', async (req, res) => {
    const { report_type, from_date, to_date, format } = req.body;
    try {
        // For now, return summary data based on report type
        let data = {};
        if (report_type === 'properties') {
            const [rows] = await pool.query(
                `SELECT p.project_name, p.status, pd.builder_name, pl.city, MIN(pp.price) as min_price,
                pa.view_count, pa.inquiry_count FROM properties p
         LEFT JOIN property_details pd ON p.id = pd.property_id
         LEFT JOIN property_locations pl ON p.id = pl.property_id
         LEFT JOIN property_pricing pp ON p.id = pp.property_id
         LEFT JOIN property_analytics pa ON p.id = pa.property_id
         GROUP BY p.id`
            );
            data = rows;
        } else if (report_type === 'leads') {
            const [rows] = await pool.query('SELECT * FROM property_leads ORDER BY created_at DESC');
            data = rows;
        } else if (report_type === 'users') {
            const [rows] = await pool.query(
                `SELECT u.id, u.email, u.role, u.is_active, u.created_at, up.first_name, up.last_name
         FROM users u LEFT JOIN user_profiles up ON u.id = up.user_id`
            );
            data = rows;
        }
        res.json({ success: true, message: `${report_type} report generated`, data, format: format || 'json' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
