const express = require('express');
const pool = require('../../config/database');
const { logAction } = require('../../middleware/auditLogger');

const router = express.Router();

// ─── 109. GET PRICING FOR PROPERTY ───────────────────────
router.get('/:id/pricing', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM property_pricing WHERE property_id = ?', [req.params.id]);
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Note: This is mounted under /api/admin/pricing but properties/:id routes
// are handled via the properties router. Standalone pricing endpoints below:

// ─── 110. ADD PRICING VARIANT ────────────────────────────
router.post('/:propertyId/add', async (req, res) => {
    const { bhk_type, tower, floor_range, total_units, available_units,
        size_super_buildup, size_carpet, size_balcony, price, price_per_sqft,
        booking_amount, revenue, roi, rental_yield, expected_appreciation } = req.body;
    try {
        const [result] = await pool.query(
            `INSERT INTO property_pricing (property_id, bhk_type, tower, floor_range, total_units, available_units,
       size_super_buildup, size_carpet, size_balcony, price, price_per_sqft, booking_amount,
       revenue, roi, rental_yield, expected_appreciation, price_last_updated)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())`,
            [req.params.propertyId, bhk_type, tower, floor_range, total_units, available_units,
                size_super_buildup, size_carpet, size_balcony, price, price_per_sqft, booking_amount,
                revenue, roi, rental_yield, expected_appreciation]
        );
        res.status(201).json({ success: true, message: 'Pricing added', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 111. UPDATE PRICING (auto-log to price_history) ─────
router.put('/:id', async (req, res) => {
    const f = req.body;
    try {
        // Get old price for history
        const [old] = await pool.query('SELECT * FROM property_pricing WHERE id = ?', [req.params.id]);
        if (old.length === 0) return res.status(404).json({ success: false, message: 'Pricing not found' });

        await pool.query(
            `UPDATE property_pricing SET bhk_type = COALESCE(?, bhk_type), tower = COALESCE(?, tower),
       floor_range = COALESCE(?, floor_range), total_units = COALESCE(?, total_units),
       available_units = COALESCE(?, available_units), size_super_buildup = COALESCE(?, size_super_buildup),
       size_carpet = COALESCE(?, size_carpet), price = COALESCE(?, price),
       price_per_sqft = COALESCE(?, price_per_sqft), booking_amount = COALESCE(?, booking_amount),
       revenue = COALESCE(?, revenue), roi = COALESCE(?, roi),
       rental_yield = COALESCE(?, rental_yield), expected_appreciation = COALESCE(?, expected_appreciation),
       price_last_updated = CURDATE() WHERE id = ?`,
            [f.bhk_type, f.tower, f.floor_range, f.total_units, f.available_units,
            f.size_super_buildup, f.size_carpet, f.price, f.price_per_sqft, f.booking_amount,
            f.revenue, f.roi, f.rental_yield, f.expected_appreciation, req.params.id]
        );

        // Log price change if price changed
        if (f.price && f.price !== old[0].price) {
            const changePercent = old[0].price ? ((f.price - old[0].price) / old[0].price * 100).toFixed(2) : null;
            await pool.query(
                `INSERT INTO property_price_history (property_id, bhk_type, old_price, new_price,
         old_price_per_sqft, new_price_per_sqft, change_percent, change_reason, changed_by, effective_date)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())`,
                [old[0].property_id, old[0].bhk_type, old[0].price, f.price,
                old[0].price_per_sqft, f.price_per_sqft, changePercent, f.change_reason || 'Price update',
                req.user.id]
            );
        }

        res.json({ success: true, message: 'Pricing updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 112. DELETE PRICING ─────────────────────────────────
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM property_pricing WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Pricing not found' });
        res.json({ success: true, message: 'Pricing deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 113. ADD UNIT SPECIFICATION ─────────────────────────
router.post('/:propertyId/specifications', async (req, res) => {
    const f = req.body;
    try {
        const [result] = await pool.query(
            `INSERT INTO unit_specifications (property_id, bhk_type, tower, floor_number, unit_number,
       front_dimension, back_dimension, right_dimension, left_dimension, ceiling_height,
       facing, ventilation_score, natural_light_score, special_feature, is_corner_unit,
       has_servant_room, has_study_room, has_pooja_room)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [req.params.propertyId, f.bhk_type, f.tower, f.floor_number, f.unit_number,
            f.front_dimension, f.back_dimension, f.right_dimension, f.left_dimension,
            f.ceiling_height, f.facing, f.ventilation_score, f.natural_light_score,
            f.special_feature, f.is_corner_unit, f.has_servant_room, f.has_study_room, f.has_pooja_room]
        );
        res.status(201).json({ success: true, message: 'Specification added', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 114. UPDATE UNIT SPECIFICATION ──────────────────────
router.put('/specifications/:id', async (req, res) => {
    const f = req.body;
    try {
        const [existing] = await pool.query('SELECT id FROM unit_specifications WHERE id = ?', [req.params.id]);
        if (existing.length === 0) return res.status(404).json({ success: false, message: 'Specification not found' });

        await pool.query(
            `UPDATE unit_specifications SET bhk_type = COALESCE(?, bhk_type), tower = COALESCE(?, tower),
       floor_number = COALESCE(?, floor_number), unit_number = COALESCE(?, unit_number),
       front_dimension = COALESCE(?, front_dimension), back_dimension = COALESCE(?, back_dimension),
       right_dimension = COALESCE(?, right_dimension), left_dimension = COALESCE(?, left_dimension),
       ceiling_height = COALESCE(?, ceiling_height), facing = COALESCE(?, facing),
       ventilation_score = COALESCE(?, ventilation_score), natural_light_score = COALESCE(?, natural_light_score),
       special_feature = COALESCE(?, special_feature), is_corner_unit = COALESCE(?, is_corner_unit),
       has_servant_room = COALESCE(?, has_servant_room), has_study_room = COALESCE(?, has_study_room),
       has_pooja_room = COALESCE(?, has_pooja_room) WHERE id = ?`,
            [f.bhk_type, f.tower, f.floor_number, f.unit_number, f.front_dimension, f.back_dimension,
            f.right_dimension, f.left_dimension, f.ceiling_height, f.facing, f.ventilation_score,
            f.natural_light_score, f.special_feature, f.is_corner_unit, f.has_servant_room,
            f.has_study_room, f.has_pooja_room, req.params.id]
        );
        res.json({ success: true, message: 'Specification updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
