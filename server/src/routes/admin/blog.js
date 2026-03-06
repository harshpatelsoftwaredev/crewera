const express = require('express');
const pool = require('../../config/database');
const { paginate } = require('../../utils/helpers');
const { logAction } = require('../../middleware/auditLogger');

const router = express.Router();

// ─── 137. LIST ALL POSTS (inc. drafts) ───────────────────
router.get('/posts', async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const { status, category_id } = req.query;
    try {
        let where = 'WHERE 1=1';
        const params = [];
        if (status) { where += ' AND bp.status = ?'; params.push(status); }
        if (category_id) { where += ' AND bp.category_id = ?'; params.push(category_id); }

        const [rows] = await pool.query(
            `SELECT bp.*, up.first_name as author_name FROM blog_posts bp
       LEFT JOIN user_profiles up ON bp.author_id = up.user_id
       ${where} ORDER BY bp.created_at DESC LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );
        res.json({ success: true, data: rows, meta: { page, limit } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 138. CREATE BLOG POST ───────────────────────────────
router.post('/posts', async (req, res) => {
    const { title, slug, content, excerpt, category_id, featured_image, is_featured, status, meta_title, meta_description } = req.body;
    try {
        const [result] = await pool.query(
            `INSERT INTO blog_posts (title, slug, author_id, content, excerpt, category_id,
       featured_image, is_featured, status, meta_title, meta_description,
       published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ${status === 'Published' ? 'NOW()' : 'NULL'})`,
            [title, slug, req.user.id, content, excerpt, category_id, featured_image,
                is_featured || false, status || 'Draft', meta_title, meta_description]
        );
        res.status(201).json({ success: true, message: 'Blog post created', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 139. UPDATE BLOG POST ───────────────────────────────
router.put('/posts/:id', async (req, res) => {
    const f = req.body;
    try {
        await pool.query(
            `UPDATE blog_posts SET title = COALESCE(?, title), slug = COALESCE(?, slug),
       content = COALESCE(?, content), excerpt = COALESCE(?, excerpt),
       category_id = COALESCE(?, category_id), featured_image = COALESCE(?, featured_image),
       is_featured = COALESCE(?, is_featured), status = COALESCE(?, status),
       meta_title = COALESCE(?, meta_title), meta_description = COALESCE(?, meta_description)
       WHERE id = ?`,
            [f.title, f.slug, f.content, f.excerpt, f.category_id, f.featured_image,
            f.is_featured, f.status, f.meta_title, f.meta_description, req.params.id]
        );
        res.json({ success: true, message: 'Post updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 140. DELETE BLOG POST ───────────────────────────────
router.delete('/posts/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM blog_posts WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Post not found' });
        res.json({ success: true, message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 141. PUBLISH / UNPUBLISH ────────────────────────────
router.patch('/posts/:id/publish', async (req, res) => {
    const { status } = req.body; // 'Published' or 'Draft'
    try {
        const publishedAt = status === 'Published' ? 'NOW()' : 'published_at';
        await pool.query(
            `UPDATE blog_posts SET status = ?, published_at = ${status === 'Published' ? 'NOW()' : 'published_at'} WHERE id = ?`,
            [status, req.params.id]
        );
        res.json({ success: true, message: `Post ${status === 'Published' ? 'published' : 'unpublished'}` });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 142. APPROVE COMMENT ────────────────────────────────
router.patch('/comments/:id/approve', async (req, res) => {
    const { is_approved } = req.body;
    try {
        await pool.query('UPDATE blog_comments SET is_approved = ? WHERE id = ?', [is_approved !== false, req.params.id]);
        res.json({ success: true, message: `Comment ${is_approved !== false ? 'approved' : 'unapproved'}` });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 143. DELETE COMMENT ─────────────────────────────────
router.delete('/comments/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM blog_comments WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 144. CRUD BLOG CATEGORIES ───────────────────────────
router.post('/categories', async (req, res) => {
    const { name, slug, description, icon, display_order } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO blog_categories (name, slug, description, icon, display_order) VALUES (?, ?, ?, ?, ?)',
            [name, slug, description, icon, display_order || 0]
        );
        res.status(201).json({ success: true, message: 'Category created', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.put('/categories/:id', async (req, res) => {
    const { name, slug, description, icon, display_order } = req.body;
    try {
        await pool.query(
            'UPDATE blog_categories SET name = COALESCE(?, name), slug = COALESCE(?, slug), description = COALESCE(?, description), icon = COALESCE(?, icon), display_order = COALESCE(?, display_order) WHERE id = ?',
            [name, slug, description, icon, display_order, req.params.id]
        );
        res.json({ success: true, message: 'Category updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.delete('/categories/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM blog_categories WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
