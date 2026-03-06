const express = require('express');
const pool = require('../../config/database');

const router = express.Router();

// ─── 119. ADD MILESTONE ──────────────────────────────────
router.post('/:propertyId/add', async (req, res) => {
    const { milestone_name, milestone_type, target_date, actual_date, completion_percent, status, notes, photo_url } = req.body;
    try {
        const [result] = await pool.query(
            `INSERT INTO property_milestones (property_id, milestone_name, milestone_type, target_date,
       actual_date, completion_percent, status, notes, photo_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [req.params.propertyId, milestone_name, milestone_type, target_date,
                actual_date, completion_percent || 0, status || 'Upcoming', notes, photo_url]
        );
        res.status(201).json({ success: true, message: 'Milestone added', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 120. UPDATE MILESTONE ───────────────────────────────
router.put('/:id', async (req, res) => {
    const f = req.body;
    try {
        await pool.query(
            `UPDATE property_milestones SET milestone_name = COALESCE(?, milestone_name),
       milestone_type = COALESCE(?, milestone_type), target_date = COALESCE(?, target_date),
       actual_date = COALESCE(?, actual_date), completion_percent = COALESCE(?, completion_percent),
       status = COALESCE(?, status), notes = COALESCE(?, notes), photo_url = COALESCE(?, photo_url)
       WHERE id = ?`,
            [f.milestone_name, f.milestone_type, f.target_date, f.actual_date,
            f.completion_percent, f.status, f.notes, f.photo_url, req.params.id]
        );
        res.json({ success: true, message: 'Milestone updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 121. DELETE MILESTONE ───────────────────────────────
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM property_milestones WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Milestone not found' });
        res.json({ success: true, message: 'Milestone deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 122. MARK COMPLETE ──────────────────────────────────
router.patch('/:id/complete', async (req, res) => {
    try {
        await pool.query(
            'UPDATE property_milestones SET status = "Completed", completion_percent = 100, actual_date = CURDATE() WHERE id = ?',
            [req.params.id]
        );
        res.json({ success: true, message: 'Milestone marked as completed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
