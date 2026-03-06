const express = require('express');
const pool = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { logAction, logActivity } = require('../middleware/auditLogger');

const router = express.Router();

// ==================== GET ADMIN DASHBOARD STATS ====================
router.get('/dashboard/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // Total Properties
    const [propertiesCount] = await pool.query(
      "SELECT COUNT(*) as count FROM properties WHERE status = 'Active'"
    );

    // Total Users
    const [usersCount] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'user'");

    // Total Inquiries (This Month)
    const [inquiriesCount] = await pool.query(
      "SELECT COUNT(*) as count FROM inquiries WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE())"
    );

    // Total Property Requests (Pending)
    const [pendingRequestsCount] = await pool.query(
      "SELECT COUNT(*) as count FROM property_requests WHERE status = 'Pending'"
    );

    res.json({
      success: true,
      data: {
        totalProperties: propertiesCount[0].count,
        totalUsers: usersCount[0].count,
        totalInquiries: inquiriesCount[0].count,
        pendingRequests: pendingRequestsCount[0].count,
      },
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== GET PROPERTIES ADDED (LAST 30 DAYS) ====================
router.get('/analytics/properties-added', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const [data] = await pool.query(
      `SELECT DATE(created_at) as date, COUNT(*) as count 
       FROM properties 
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
       GROUP BY DATE(created_at)
       ORDER BY date ASC`
    );

    res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error('Get properties added error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== GET USER GROWTH (LAST 30 DAYS) ====================
router.get('/analytics/user-growth', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const [data] = await pool.query(
      `SELECT DATE(created_at) as date, COUNT(*) as count 
       FROM users 
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) AND role = 'user'
       GROUP BY DATE(created_at)
       ORDER BY date ASC`
    );

    res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error('Get user growth error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== GET INQUIRIES (LAST 30 DAYS) ====================
router.get('/analytics/inquiries', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const [data] = await pool.query(
      `SELECT DATE(created_at) as date, COUNT(*) as count 
       FROM inquiries 
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
       GROUP BY DATE(created_at)
       ORDER BY date ASC`
    );

    res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== GET TOP LOCATIONS ====================
router.get('/analytics/top-locations', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const [data] = await pool.query(
      `SELECT 
        SUBSTRING_INDEX(address, ',', 1) as location, 
        COUNT(*) as count 
       FROM properties 
       WHERE status = 'Active'
       GROUP BY location
       ORDER BY count DESC
       LIMIT 10`
    );

    res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error('Get top locations error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== GET RECENT ACTIVITIES ====================
router.get('/activities/recent', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const activities = [];

    // Recent properties added
    const [recentProperties] = await pool.query(
      `SELECT 'Property Added' as activity, project_name as details, created_at 
       FROM properties ORDER BY created_at DESC LIMIT 5`
    );
    activities.push(...recentProperties);

    // Recent user registrations
    const [recentUsers] = await pool.query(
      `SELECT 'New User' as activity, CONCAT(first_name, ' ', last_name) as details, created_at 
       FROM users WHERE role = 'user' ORDER BY created_at DESC LIMIT 5`
    );
    activities.push(...recentUsers);

    // Recent inquiries
    const [recentInquiries] = await pool.query(
      `SELECT 'New Inquiry' as activity, name as details, created_at 
       FROM inquiries ORDER BY created_at DESC LIMIT 5`
    );
    activities.push(...recentInquiries);

    // Sort by created_at and limit to 10
    activities.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    activities.length = Math.min(10, activities.length);

    res.json({
      success: true,
      data: activities,
    });
  } catch (error) {
    console.error('Get recent activities error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== UPDATE PROPERTY STATUS ====================
router.put(
  '/properties/:id/status',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ['Active', 'Inactive', 'Pending Approval'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status' });
      }

      const [properties] = await pool.query('SELECT * FROM properties WHERE id = ?', [id]);
      if (properties.length === 0) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }

      await pool.query('UPDATE properties SET status = ? WHERE id = ?', [status, id]);

      res.json({
        success: true,
        message: 'Property status updated successfully',
      });
    } catch (error) {
      console.error('Update property status error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ==================== TOGGLE USER ACTIVE STATUS ====================
router.put(
  '/users/:id/active',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { is_active } = req.body;

      const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      if (users.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      await pool.query('UPDATE users SET is_active = ? WHERE id = ?', [is_active, id]);

      res.json({
        success: true,
        message: 'User status updated successfully',
      });
    } catch (error) {
      console.error('Toggle user active error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ==================== GET AUDIT LOGS ====================
router.get('/audit/logs', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 50, entityType, actionType, startDate, endDate } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM audit_logs WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as count FROM audit_logs WHERE 1=1';
    const params = [];

    if (entityType) {
      query += ' AND entity_type = ?';
      countQuery += ' AND entity_type = ?';
      params.push(entityType);
    }
    if (actionType) {
      query += ' AND action_type = ?';
      countQuery += ' AND action_type = ?';
      params.push(actionType);
    }
    if (startDate) {
      query += ' AND created_at >= ?';
      countQuery += ' AND created_at >= ?';
      params.push(startDate);
    }
    if (endDate) {
      query += ' AND created_at <= ?';
      countQuery += ' AND created_at <= ?';
      params.push(endDate);
    }

    const [countResult] = await pool.query(countQuery, params);
    const totalCount = countResult[0].count;

    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    const [logs] = await pool.query(query, [...params, parseInt(limit), offset]);

    // Get user details for each log
    const logsWithUsers = await Promise.all(
      logs.map(async (log) => {
        if (log.user_id) {
          const [users] = await pool.query('SELECT id, first_name, last_name, email FROM users WHERE id = ?', [
            log.user_id,
          ]);
          log.user = users[0] || null;
        }
        return log;
      })
    );

    res.json({
      success: true,
      data: logsWithUsers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Get audit logs error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== GET AUDIT ACTIVITY ====================
router.get('/audit/activity', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 50, activityType, severity, startDate, endDate } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM audit_activity WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as count FROM audit_activity WHERE 1=1';
    const params = [];

    if (activityType) {
      query += ' AND activity_type = ?';
      countQuery += ' AND activity_type = ?';
      params.push(activityType);
    }
    if (severity) {
      query += ' AND severity = ?';
      countQuery += ' AND severity = ?';
      params.push(severity);
    }
    if (startDate) {
      query += ' AND created_at >= ?';
      countQuery += ' AND created_at >= ?';
      params.push(startDate);
    }
    if (endDate) {
      query += ' AND created_at <= ?';
      countQuery += ' AND created_at <= ?';
      params.push(endDate);
    }

    const [countResult] = await pool.query(countQuery, params);
    const totalCount = countResult[0].count;

    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    const [activities] = await pool.query(query, [...params, parseInt(limit), offset]);

    // Get user details for each activity
    const activitiesWithUsers = await Promise.all(
      activities.map(async (activity) => {
        if (activity.user_id) {
          const [users] = await pool.query('SELECT id, first_name, last_name, email FROM users WHERE id = ?', [
            activity.user_id,
          ]);
          activity.user = users[0] || null;
        }
        return activity;
      })
    );

    res.json({
      success: true,
      data: activitiesWithUsers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Get audit activity error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== GET PROPERTY HISTORY ====================
router.get('/audit/property/:propertyId/history', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Verify property exists
    const [properties] = await pool.query('SELECT id, project_name FROM properties WHERE id = ?', [propertyId]);
    if (properties.length === 0) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const [logs] = await pool.query(
      `SELECT * FROM audit_logs 
       WHERE entity_type = 'Property' AND entity_id = ?
       ORDER BY created_at DESC`,
      [propertyId]
    );

    // Get user details for each log
    const logsWithUsers = await Promise.all(
      logs.map(async (log) => {
        if (log.user_id) {
          const [users] = await pool.query('SELECT id, first_name, last_name, email FROM users WHERE id = ?', [
            log.user_id,
          ]);
          log.user = users[0] || null;
        }
        return log;
      })
    );

    res.json({
      success: true,
      property: properties[0],
      history: logsWithUsers,
    });
  } catch (error) {
    console.error('Get property history error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== GET USER ACTIVITY REPORT ====================
router.get('/audit/user/:userId/activity', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify user exists
    const [users] = await pool.query('SELECT id, first_name, last_name, email FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const [logs] = await pool.query(
      `SELECT * FROM audit_logs WHERE user_id = ? ORDER BY created_at DESC LIMIT 100`,
      [userId]
    );

    const [activities] = await pool.query(
      `SELECT * FROM audit_activity WHERE user_id = ? ORDER BY created_at DESC LIMIT 100`,
      [userId]
    );

    res.json({
      success: true,
      user: users[0],
      logs,
      activities,
    });
  } catch (error) {
    console.error('Get user activity report error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
