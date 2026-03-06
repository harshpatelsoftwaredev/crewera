const express = require('express');
const pool = require('../../config/database');

const router = express.Router();

// ─── 157. SEND NOTIFICATION TO USER(S) ───────────────────
router.post('/send', async (req, res) => {
    const { user_ids, notification_type, title, message, action_url, icon } = req.body;
    if (!user_ids || !Array.isArray(user_ids) || !title || !message) {
        return res.status(400).json({ success: false, message: 'user_ids array, title, and message are required' });
    }
    try {
        for (const userId of user_ids) {
            await pool.query(
                `INSERT INTO notifications (user_id, notification_type, title, message, action_url, icon)
         VALUES (?, ?, ?, ?, ?, ?)`,
                [userId, notification_type || 'System Alert', title, message, action_url, icon]
            );
        }
        res.json({ success: true, message: `Notification sent to ${user_ids.length} user(s)` });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 158. BROADCAST NOTIFICATION ─────────────────────────
router.post('/broadcast', async (req, res) => {
    const { notification_type, title, message, action_url, icon, target_role } = req.body;
    if (!title || !message) return res.status(400).json({ success: false, message: 'Title and message required' });
    try {
        let where = 'WHERE is_active = TRUE';
        const params = [];
        if (target_role) { where += ' AND role = ?'; params.push(target_role); }

        const [users] = await pool.query(`SELECT id FROM users ${where}`, params);

        for (const user of users) {
            await pool.query(
                `INSERT INTO notifications (user_id, notification_type, title, message, action_url, icon)
         VALUES (?, ?, ?, ?, ?, ?)`,
                [user.id, notification_type || 'System Alert', title, message, action_url, icon]
            );
        }
        res.json({ success: true, message: `Broadcast sent to ${users.length} users` });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 159. LIST NOTIFICATION TEMPLATES ────────────────────
router.get('/templates', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM notification_templates ORDER BY template_name');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 160. CRUD NOTIFICATION TEMPLATES ────────────────────
router.post('/templates', async (req, res) => {
    const { template_name, template_type, subject_template, body_template, variables } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO notification_templates (template_name, template_type, subject_template, body_template, variables) VALUES (?, ?, ?, ?, ?)',
            [template_name, template_type, subject_template, body_template, variables ? JSON.stringify(variables) : null]
        );
        res.status(201).json({ success: true, message: 'Template created', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.put('/templates/:id', async (req, res) => {
    const { template_name, template_type, subject_template, body_template, variables, is_active } = req.body;
    try {
        await pool.query(
            `UPDATE notification_templates SET template_name = COALESCE(?, template_name),
       template_type = COALESCE(?, template_type), subject_template = COALESCE(?, subject_template),
       body_template = COALESCE(?, body_template), variables = COALESCE(?, variables),
       is_active = COALESCE(?, is_active) WHERE id = ?`,
            [template_name, template_type, subject_template, body_template,
                variables ? JSON.stringify(variables) : null, is_active, req.params.id]
        );
        res.json({ success: true, message: 'Template updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.delete('/templates/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM notification_templates WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Template deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
