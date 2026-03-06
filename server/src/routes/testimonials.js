const express = require('express');
const { body } = require('express-validator');
const pool = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// ==================== GET ALL TESTIMONIALS (PUBLIC) ====================
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, rating } = req.query;
    const offset = (page - 1) * limit;

    let query = "SELECT * FROM testimonials WHERE status = 'Approved'";
    let countQuery = "SELECT COUNT(*) as count FROM testimonials WHERE status = 'Approved'";
    const params = [];

    if (rating) {
      query += ' AND rating = ?';
      countQuery += ' AND rating = ?';
      params.push(rating);
    }

    const [countResult] = await pool.query(countQuery, params);

    query += ` ORDER BY is_featured DESC, created_at DESC LIMIT ? OFFSET ?`;
    const [testimonials] = await pool.query(query, [...params, parseInt(limit), offset]);

    res.json({
      success: true,
      data: testimonials,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].count,
        pages: Math.ceil(countResult[0].count / limit),
      },
    });
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== CREATE TESTIMONIAL ====================
router.post(
  '/',
  [
    body('user_name').trim().notEmpty().withMessage('Name is required'),
    body('testimonial_text').trim().notEmpty().withMessage('Testimonial is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { user_id, user_name, user_image, testimonial_text, rating } = req.body;

      const [result] = await pool.query(
        `INSERT INTO testimonials (user_id, user_name, user_image, testimonial_text, rating, status)
         VALUES (?, ?, ?, ?, ?, 'Pending')`,
        [user_id || null, user_name, user_image || null, testimonial_text, rating]
      );

      res.status(201).json({
        success: true,
        message: 'Testimonial submitted and awaiting approval',
        testimonialId: result.insertId,
      });
    } catch (error) {
      console.error('Create testimonial error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ==================== GET ADMIN ALL TESTIMONIALS ====================
router.get('/admin/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM testimonials WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as count FROM testimonials WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      countQuery += ' AND status = ?';
      params.push(status);
    }

    const [countResult] = await pool.query(countQuery, params);

    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    const [testimonials] = await pool.query(query, [...params, parseInt(limit), offset]);

    res.json({
      success: true,
      data: testimonials,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].count,
        pages: Math.ceil(countResult[0].count / limit),
      },
    });
  } catch (error) {
    console.error('Get admin testimonials error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== UPDATE TESTIMONIAL STATUS (ADMIN) ====================
router.put(
  '/:id/status',
  authMiddleware,
  adminMiddleware,
  [body('status').isIn(['Pending', 'Approved', 'Rejected']).withMessage('Invalid status')],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const [testimonials] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [id]);
      if (testimonials.length === 0) {
        return res.status(404).json({ success: false, message: 'Testimonial not found' });
      }

      await pool.query('UPDATE testimonials SET status = ? WHERE id = ?', [status, id]);

      res.json({
        success: true,
        message: 'Testimonial status updated',
      });
    } catch (error) {
      console.error('Update testimonial status error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ==================== TOGGLE FEATURED (ADMIN) ====================
router.put(
  '/:id/featured',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { is_featured } = req.body;

      const [testimonials] = await pool.query('SELECT * FROM testimonials WHERE id = ?', [id]);
      if (testimonials.length === 0) {
        return res.status(404).json({ success: false, message: 'Testimonial not found' });
      }

      await pool.query('UPDATE testimonials SET is_featured = ? WHERE id = ?', [is_featured, id]);

      res.json({
        success: true,
        message: 'Testimonial featured status updated',
      });
    } catch (error) {
      console.error('Update testimonial featured error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

module.exports = router;
