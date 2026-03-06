const express = require('express');
const { body } = require('express-validator');
const pool = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// ==================== SUBMIT CONTACT MESSAGE ====================
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, email, phone, subject, message, department } = req.body;

      const [result] = await pool.query(
        `INSERT INTO contact_messages (name, email, phone, subject, message, department, is_read)
         VALUES (?, ?, ?, ?, ?, ?, FALSE)`,
        [name, email, phone || null, subject, message, department || 'General']
      );

      res.status(201).json({
        success: true,
        message: 'Message sent successfully. We will get back to you soon.',
        messageId: result.insertId,
      });
    } catch (error) {
      console.error('Submit contact message error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ==================== GET ADMIN CONTACT MESSAGES ====================
router.get(
  '/admin/messages',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { page = 1, limit = 10, is_read } = req.query;
      const offset = (page - 1) * limit;

      let query = 'SELECT * FROM contact_messages WHERE 1=1';
      let countQuery = 'SELECT COUNT(*) as count FROM contact_messages WHERE 1=1';
      const params = [];

      if (is_read !== undefined) {
        query += ' AND is_read = ?';
        countQuery += ' AND is_read = ?';
        params.push(is_read === 'true');
      }

      const [countResult] = await pool.query(countQuery, params);

      query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
      const [messages] = await pool.query(query, [...params, parseInt(limit), offset]);

      res.json({
        success: true,
        data: messages,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: countResult[0].count,
          pages: Math.ceil(countResult[0].count / limit),
        },
      });
    } catch (error) {
      console.error('Get contact messages error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ==================== MARK MESSAGE AS READ ====================
router.put(
  '/admin/messages/:id/read',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;

      const [messages] = await pool.query('SELECT * FROM contact_messages WHERE id = ?', [id]);
      if (messages.length === 0) {
        return res.status(404).json({ success: false, message: 'Message not found' });
      }

      await pool.query('UPDATE contact_messages SET is_read = TRUE WHERE id = ?', [id]);

      res.json({
        success: true,
        message: 'Message marked as read',
      });
    } catch (error) {
      console.error('Mark message as read error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ==================== REPLY TO MESSAGE ====================
router.put(
  '/admin/messages/:id/reply',
  authMiddleware,
  adminMiddleware,
  [body('response').trim().notEmpty().withMessage('Response is required')],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { response } = req.body;

      const [messages] = await pool.query('SELECT * FROM contact_messages WHERE id = ?', [id]);
      if (messages.length === 0) {
        return res.status(404).json({ success: false, message: 'Message not found' });
      }

      await pool.query(
        'UPDATE contact_messages SET response = ?, responded_by = ?, responded_at = NOW(), is_read = TRUE WHERE id = ?',
        [response, req.user.id, id]
      );

      res.json({
        success: true,
        message: 'Reply sent successfully',
      });
    } catch (error) {
      console.error('Reply to message error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ==================== GET FAQs ====================
router.get('/faqs', async (req, res) => {
  try {
    const { category } = req.query;

    let query = "SELECT * FROM faqs WHERE is_active = TRUE";
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY display_order ASC';
    const [faqs] = await pool.query(query, params);

    res.json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    console.error('Get FAQs error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== MARK FAQ HELPFUL ====================
router.post('/faqs/:id/helpful', async (req, res) => {
  try {
    const { id } = req.params;

    const [faqs] = await pool.query('SELECT * FROM faqs WHERE id = ?', [id]);
    if (faqs.length === 0) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }

    await pool.query('UPDATE faqs SET helpful_count = helpful_count + 1 WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'FAQ marked as helpful',
    });
  } catch (error) {
    console.error('Mark FAQ helpful error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== CREATE FAQ (ADMIN) ====================
router.post(
  '/faqs',
  authMiddleware,
  adminMiddleware,
  [
    body('question').trim().notEmpty().withMessage('Question is required'),
    body('answer').trim().notEmpty().withMessage('Answer is required'),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { question, answer, category, display_order } = req.body;

      const [result] = await pool.query(
        `INSERT INTO faqs (question, answer, category, display_order, is_active)
         VALUES (?, ?, ?, ?, TRUE)`,
        [question, answer, category || 'General Questions', display_order || 0]
      );

      res.status(201).json({
        success: true,
        message: 'FAQ created successfully',
        faqId: result.insertId,
      });
    } catch (error) {
      console.error('Create FAQ error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ==================== UPDATE FAQ (ADMIN) ====================
router.put(
  '/faqs/:id',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { question, answer, category, display_order, is_active } = req.body;

      const [faqs] = await pool.query('SELECT * FROM faqs WHERE id = ?', [id]);
      if (faqs.length === 0) {
        return res.status(404).json({ success: false, message: 'FAQ not found' });
      }

      await pool.query(
        'UPDATE faqs SET question = ?, answer = ?, category = ?, display_order = ?, is_active = ? WHERE id = ?',
        [question || faqs[0].question, answer || faqs[0].answer, category, display_order, is_active, id]
      );

      res.json({
        success: true,
        message: 'FAQ updated successfully',
      });
    } catch (error) {
      console.error('Update FAQ error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ==================== DELETE FAQ (ADMIN) ====================
router.delete(
  '/faqs/:id',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;

      const [faqs] = await pool.query('SELECT * FROM faqs WHERE id = ?', [id]);
      if (faqs.length === 0) {
        return res.status(404).json({ success: false, message: 'FAQ not found' });
      }

      await pool.query('DELETE FROM faqs WHERE id = ?', [id]);

      res.json({
        success: true,
        message: 'FAQ deleted successfully',
      });
    } catch (error) {
      console.error('Delete FAQ error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

module.exports = router;
