const express = require('express');
const { body } = require('express-validator');
const pool = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// ==================== GET ALL BLOG POSTS (PUBLIC) ====================
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 9, category, search } = req.query;
    const offset = (page - 1) * limit;

    let query = "SELECT * FROM blog_posts WHERE status = 'Published'";
    let countQuery = "SELECT COUNT(*) as count FROM blog_posts WHERE status = 'Published'";
    const params = [];

    if (category) {
      query += ' AND category_id = ?';
      countQuery += ' AND category_id = ?';
      params.push(category);
    }
    if (search) {
      query += ' AND (title LIKE ? OR excerpt LIKE ?)';
      countQuery += ' AND (title LIKE ? OR excerpt LIKE ?)';
      params.push(`%${search}%`);
      params.push(`%${search}%`);
    }

    const [countResult] = await pool.query(countQuery, params);

    query += ` ORDER BY published_at DESC LIMIT ? OFFSET ?`;
    const [posts] = await pool.query(query, [...params, parseInt(limit), offset]);

    // Increment view count for each post
    for (const post of posts) {
      await pool.query('UPDATE blog_posts SET view_count = view_count + 1 WHERE id = ?', [
        post.id,
      ]);
    }

    res.json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].count,
        pages: Math.ceil(countResult[0].count / limit),
      },
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== GET FEATURED POSTS ====================
// IMPORTANT: This MUST come BEFORE /:slug to avoid "posts" being treated as a slug
router.get('/posts/featured', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM blog_posts WHERE status = 'Published' AND is_featured = TRUE
       ORDER BY published_at DESC LIMIT 6`
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Get featured posts error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== GET ALL BLOG CATEGORIES ====================
// IMPORTANT: This MUST come BEFORE /:slug to avoid "categories" being treated as a slug
router.get('/categories/all', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM blog_categories ORDER BY display_order ASC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Get blog categories error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== GET POSTS BY CATEGORY ====================
// IMPORTANT: This MUST come BEFORE /:slug
router.get('/categories/:slug/posts', async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const [cats] = await pool.query('SELECT id, name FROM blog_categories WHERE slug = ?', [req.params.slug]);
    if (cats.length === 0) return res.status(404).json({ success: false, message: 'Category not found' });

    const [rows] = await pool.query(
      `SELECT * FROM blog_posts WHERE category_id = ? AND status = 'Published'
       ORDER BY published_at DESC LIMIT ? OFFSET ?`,
      [cats[0].id, parseInt(limit), offset]
    );
    res.json({ success: true, data: rows, category: cats[0] });
  } catch (error) {
    console.error('Get posts by category error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== GET COMMENTS FOR POST ====================
// Uses :postId so doesn't conflict, but placing here for safety
router.get('/:postId/comments', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM blog_comments WHERE blog_post_id = ? AND is_approved = TRUE ORDER BY created_at DESC',
      [req.params.postId]
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== POST BLOG COMMENT ====================
router.post(
  '/:postId/comments',
  [
    body('commenter_name').trim().notEmpty().withMessage('Name is required'),
    body('commenter_email').isEmail().withMessage('Valid email is required'),
    body('comment_text').trim().notEmpty().withMessage('Comment is required'),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { postId } = req.params;
      const { commenter_name, commenter_email, comment_text, user_id } = req.body;

      const [posts] = await pool.query('SELECT id FROM blog_posts WHERE id = ?', [postId]);
      if (posts.length === 0) {
        return res.status(404).json({ success: false, message: 'Blog post not found' });
      }

      const [result] = await pool.query(
        `INSERT INTO blog_comments (blog_post_id, user_id, commenter_name, commenter_email, comment_text, is_approved)
         VALUES (?, ?, ?, ?, ?, FALSE)`,
        [postId, user_id || null, commenter_name, commenter_email, comment_text]
      );

      res.status(201).json({
        success: true,
        message: 'Comment submitted and awaiting approval',
        commentId: result.insertId,
      });
    } catch (error) {
      console.error('Post comment error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ==================== LIKE A BLOG POST ====================
router.post('/:postId/like', authMiddleware, async (req, res) => {
  try {
    await pool.query('UPDATE blog_posts SET like_count = like_count + 1 WHERE id = ?', [req.params.postId]);
    res.json({ success: true, message: 'Post liked' });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== GET SINGLE BLOG POST ====================
// IMPORTANT: This MUST be the LAST GET route because /:slug matches everything
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const [posts] = await pool.query(
      "SELECT * FROM blog_posts WHERE slug = ? AND status = 'Published'",
      [slug]
    );

    if (posts.length === 0) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    const post = posts[0];

    // Get comments
    const [comments] = await pool.query(
      'SELECT * FROM blog_comments WHERE blog_post_id = ? AND is_approved = TRUE ORDER BY created_at DESC',
      [post.id]
    );

    // Get related posts
    const [relatedPosts] = await pool.query(
      `SELECT * FROM blog_posts 
       WHERE category_id = ? AND id != ? AND status = 'Published' 
       LIMIT 3`,
      [post.category_id, post.id]
    );

    res.json({
      success: true,
      data: {
        ...post,
        comments,
        relatedPosts,
      },
    });
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== CREATE BLOG POST (ADMIN) ====================
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('slug').trim().notEmpty().withMessage('Slug is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { title, slug, content, excerpt, category_id, featured_image, is_featured } = req.body;

      const [result] = await pool.query(
        `INSERT INTO blog_posts (title, slug, author_id, content, excerpt, category_id, featured_image, is_featured, status, published_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          title,
          slug,
          req.user.id,
          content,
          excerpt || null,
          category_id || null,
          featured_image || null,
          is_featured || false,
          'Published',
        ]
      );

      res.status(201).json({
        success: true,
        message: 'Blog post created successfully',
        postId: result.insertId,
      });
    } catch (error) {
      console.error('Create blog post error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ==================== UPDATE BLOG POST (ADMIN) ====================
router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, slug, content, excerpt, category_id, featured_image, is_featured, status } =
        req.body;

      const [posts] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [id]);
      if (posts.length === 0) {
        return res.status(404).json({ success: false, message: 'Blog post not found' });
      }

      await pool.query(
        `UPDATE blog_posts SET title = ?, slug = ?, content = ?, excerpt = ?, category_id = ?, featured_image = ?, is_featured = ?, status = ? WHERE id = ?`,
        [title || posts[0].title, slug || posts[0].slug, content || posts[0].content, excerpt, category_id, featured_image, is_featured, status || 'Published', id]
      );

      res.json({
        success: true,
        message: 'Blog post updated successfully',
      });
    } catch (error) {
      console.error('Update blog post error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ==================== DELETE BLOG POST (ADMIN) ====================
router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;

      const [posts] = await pool.query('SELECT * FROM blog_posts WHERE id = ?', [id]);
      if (posts.length === 0) {
        return res.status(404).json({ success: false, message: 'Blog post not found' });
      }

      await pool.query('DELETE FROM blog_posts WHERE id = ?', [id]);

      res.json({
        success: true,
        message: 'Blog post deleted successfully',
      });
    } catch (error) {
      console.error('Delete blog post error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

module.exports = router;
