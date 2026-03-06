const express = require('express');
const { body } = require('express-validator');
const pool = require('../config/database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// ==================== CREATE PROPERTY REQUEST ====================
router.post(
  '/',
  authMiddleware,
  [
    body('your_name').trim().notEmpty().withMessage('Name is required'),
    body('your_email').isEmail().withMessage('Valid email is required'),
    body('your_phone').isMobilePhone().withMessage('Valid phone number is required'),
    body('your_address').trim().notEmpty().withMessage('Address is required'),
    body('project_name').trim().notEmpty().withMessage('Project name is required'),
    body('property_type')
      .isIn(['Residential', 'Commercial', 'Mixed', 'Industrial'])
      .withMessage('Valid property type is required'),
    body('property_location').trim().notEmpty().withMessage('Property location is required'),
    body('price_per_unit').isDecimal().withMessage('Price per unit is required'),
    body('expected_revenue').isDecimal().withMessage('Expected revenue is required'),
    body('roi').isDecimal().withMessage('ROI is required'),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const {
        your_name, your_email, your_phone, your_address,
        project_name, property_type, special_type,
        builder_developer_name, description,
        property_location, property_city, property_state, property_pincode, property_landmarks,
        bhk_type, total_units, available_units,
        size_super_buildup, size_carpet, facing,
        construction_stage, project_start_date, expected_completion, possession_date,
        price_per_unit, price_per_sqft, total_project_cost,
        expected_revenue, roi, rental_yield, expected_appreciation,
        booking_amount, price_negotiable, request_reason,
        contact_person_name, contact_person_phone, contact_person_email, contact_person_designation,
        proposed_amenities,
      } = req.body;

      const [result] = await pool.query(
        `INSERT INTO property_requests 
        (user_id, your_name, your_email, your_phone, your_address,
         project_name, property_type, special_type, builder_developer_name, description,
         property_location, property_city, property_state, property_pincode, property_landmarks,
         bhk_type, total_units, available_units, size_super_buildup, size_carpet, facing,
         construction_stage, project_start_date, expected_completion, possession_date,
         price_per_unit, price_per_sqft, total_project_cost,
         expected_revenue, roi, rental_yield, expected_appreciation,
         booking_amount, price_negotiable, request_reason,
         contact_person_name, contact_person_phone, contact_person_email, contact_person_designation,
         proposed_amenities, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`,
        [
          req.user.id, your_name, your_email, your_phone, your_address,
          project_name, property_type, special_type || 'None', builder_developer_name || null, description || null,
          property_location, property_city || null, property_state || null, property_pincode || null, property_landmarks || null,
          bhk_type || null, total_units || null, available_units || null, size_super_buildup || null, size_carpet || null, facing || null,
          construction_stage || null, project_start_date || null, expected_completion || null, possession_date || null,
          price_per_unit, price_per_sqft || null, total_project_cost || null,
          expected_revenue, roi, rental_yield || null, expected_appreciation || null,
          booking_amount || null, price_negotiable || false, request_reason || null,
          contact_person_name || null, contact_person_phone || null, contact_person_email || null, contact_person_designation || null,
          proposed_amenities ? JSON.stringify(proposed_amenities) : null,
        ]
      );

      res.status(201).json({
        success: true,
        message: 'Property request submitted successfully',
        requestId: result.insertId,
      });
    } catch (error) {
      console.error('Create property request error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ==================== GET USER PROPERTY REQUESTS ====================
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM property_requests WHERE user_id = ?';
    let countQuery = 'SELECT COUNT(*) as count FROM property_requests WHERE user_id = ?';
    const params = [req.user.id];

    if (status) {
      query += ' AND status = ?';
      countQuery += ' AND status = ?';
      params.push(status);
    }

    const [countResult] = await pool.query(countQuery, params);

    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    const [requests] = await pool.query(query, [...params, parseInt(limit), offset]);

    res.json({
      success: true,
      data: requests,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].count,
        pages: Math.ceil(countResult[0].count / limit),
      },
    });
  } catch (error) {
    console.error('Get property requests error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== GET ADMIN ALL PROPERTY REQUESTS ====================
router.get('/admin/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM property_requests WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as count FROM property_requests WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      countQuery += ' AND status = ?';
      params.push(status);
    }

    const [countResult] = await pool.query(countQuery, params);

    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    const [requests] = await pool.query(query, [...params, parseInt(limit), offset]);

    res.json({
      success: true,
      data: requests,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].count,
        pages: Math.ceil(countResult[0].count / limit),
      },
    });
  } catch (error) {
    console.error('Get admin property requests error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== GET SINGLE PROPERTY REQUEST ====================
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const [requests] = await pool.query(
      'SELECT * FROM property_requests WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (requests.length === 0) {
      return res.status(404).json({ success: false, message: 'Property request not found' });
    }

    res.json({
      success: true,
      data: requests[0],
    });
  } catch (error) {
    console.error('Get property request error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== UPDATE PROPERTY REQUEST STATUS (ADMIN) ====================
router.put(
  '/:id/status',
  authMiddleware,
  adminMiddleware,
  [
    body('status')
      .isIn(['Pending', 'Approved', 'Rejected', 'Listed'])
      .withMessage('Invalid status'),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const [requests] = await pool.query(
        'SELECT * FROM property_requests WHERE id = ?',
        [id]
      );
      if (requests.length === 0) {
        return res.status(404).json({ success: false, message: 'Property request not found' });
      }

      await pool.query(
        'UPDATE property_requests SET status = ?, reviewed_by = ?, reviewed_at = NOW() WHERE id = ?',
        [status, req.user.id, id]
      );

      res.json({
        success: true,
        message: 'Property request status updated',
      });
    } catch (error) {
      console.error('Update property request status error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// ==================== UPDATE PENDING REQUEST ====================
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const [requests] = await pool.query(
      'SELECT * FROM property_requests WHERE id = ? AND user_id = ? AND status = "Pending"',
      [id, req.user.id]
    );
    if (requests.length === 0) return res.status(404).json({ success: false, message: 'Request not found or not editable' });

    const fields = req.body;
    const allowed = ['your_name', 'your_email', 'your_phone', 'your_address',
      'project_name', 'property_type', 'special_type', 'builder_developer_name', 'description',
      'property_location', 'property_city', 'property_state', 'property_pincode', 'property_landmarks',
      'bhk_type', 'total_units', 'available_units', 'size_super_buildup', 'size_carpet', 'facing',
      'construction_stage', 'project_start_date', 'expected_completion', 'possession_date',
      'price_per_unit', 'price_per_sqft', 'total_project_cost',
      'expected_revenue', 'roi', 'rental_yield', 'expected_appreciation',
      'booking_amount', 'price_negotiable', 'request_reason',
      'contact_person_name', 'contact_person_phone', 'contact_person_email', 'contact_person_designation'];

    const updates = []; const values = [];
    for (const [key, val] of Object.entries(fields)) {
      if (allowed.includes(key)) { updates.push(`${key} = ?`); values.push(val); }
    }
    if (updates.length === 0) return res.status(400).json({ success: false, message: 'No valid fields to update' });

    values.push(id);
    await pool.query(`UPDATE property_requests SET ${updates.join(', ')} WHERE id = ?`, values);
    res.json({ success: true, message: 'Request updated' });
  } catch (error) {
    console.error('Update request error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== GET COMPLETION FORM ====================
router.get('/:id/completion', authMiddleware, async (req, res) => {
  try {
    const [requests] = await pool.query(
      `SELECT * FROM property_requests WHERE id = ? AND user_id = ? AND status IN ('Approved', 'Completion Pending')`,
      [req.params.id, req.user.id]
    );
    if (requests.length === 0) return res.status(404).json({ success: false, message: 'Approved request not found' });
    res.json({ success: true, data: requests[0] });
  } catch (error) {
    console.error('Get completion error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== SUBMIT COMPLETION DETAILS ====================
router.post('/:id/completion', authMiddleware, async (req, res) => {
  try {
    const [requests] = await pool.query(
      `SELECT * FROM property_requests WHERE id = ? AND user_id = ? AND status = 'Approved'`,
      [req.params.id, req.user.id]
    );
    if (requests.length === 0) return res.status(404).json({ success: false, message: 'Approved request not found' });

    const { project_name, description, property_city, property_state, property_pincode,
      total_units, available_units, size_super_buildup, size_carpet, price_per_unit,
      price_per_sqft, total_project_cost, expected_revenue, roi, rental_yield,
      expected_appreciation, booking_amount, contact_person_name, contact_person_phone,
      contact_person_email, contact_person_designation, proposed_amenities } = req.body;

    await pool.query(
      `UPDATE property_requests SET
       project_name = COALESCE(?, project_name), description = ?, property_city = ?,
       property_state = ?, property_pincode = ?, total_units = ?, available_units = ?,
       size_super_buildup = ?, size_carpet = ?, price_per_unit = COALESCE(?, price_per_unit),
       price_per_sqft = ?, total_project_cost = ?, expected_revenue = COALESCE(?, expected_revenue),
       roi = COALESCE(?, roi), rental_yield = ?, expected_appreciation = ?, booking_amount = ?,
       contact_person_name = ?, contact_person_phone = ?, contact_person_email = ?,
       contact_person_designation = ?, proposed_amenities = ?,
       status = 'Completion Pending', completion_status = 'In Progress'
       WHERE id = ?`,
      [project_name, description, property_city, property_state, property_pincode,
        total_units, available_units, size_super_buildup, size_carpet, price_per_unit,
        price_per_sqft, total_project_cost, expected_revenue, roi, rental_yield,
        expected_appreciation, booking_amount, contact_person_name, contact_person_phone,
        contact_person_email, contact_person_designation,
        proposed_amenities ? JSON.stringify(proposed_amenities) : null, req.params.id]
    );

    res.json({ success: true, message: 'Completion details saved' });
  } catch (error) {
    console.error('Submit completion error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== UPDATE COMPLETION (SAVE DRAFT) ====================
router.put('/:id/completion', authMiddleware, async (req, res) => {
  try {
    const [requests] = await pool.query(
      `SELECT * FROM property_requests WHERE id = ? AND user_id = ? AND status IN ('Approved', 'Completion Pending')`,
      [req.params.id, req.user.id]
    );
    if (requests.length === 0) return res.status(404).json({ success: false, message: 'Request not found' });

    const fields = req.body;
    const allowed = ['project_name', 'description', 'property_city', 'property_state',
      'property_pincode', 'total_units', 'available_units', 'size_super_buildup', 'size_carpet',
      'price_per_unit', 'price_per_sqft', 'total_project_cost', 'expected_revenue', 'roi',
      'rental_yield', 'expected_appreciation', 'booking_amount', 'contact_person_name',
      'contact_person_phone', 'contact_person_email', 'contact_person_designation',
      'photos_path', 'video_url', 'brochure_path', 'financial_docs_path'];

    const updates = []; const values = [];
    for (const [key, val] of Object.entries(fields)) {
      if (allowed.includes(key)) { updates.push(`${key} = ?`); values.push(val); }
    }
    if (fields.proposed_amenities) {
      updates.push('proposed_amenities = ?');
      values.push(JSON.stringify(fields.proposed_amenities));
    }
    if (updates.length === 0) return res.status(400).json({ success: false, message: 'No valid fields' });

    values.push(req.params.id);
    await pool.query(`UPDATE property_requests SET ${updates.join(', ')} WHERE id = ?`, values);
    res.json({ success: true, message: 'Completion draft saved' });
  } catch (error) {
    console.error('Update completion error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ==================== FINAL SUBMIT COMPLETION ====================
router.post('/:id/completion/submit', authMiddleware, async (req, res) => {
  try {
    const [requests] = await pool.query(
      `SELECT * FROM property_requests WHERE id = ? AND user_id = ? AND status IN ('Approved', 'Completion Pending')`,
      [req.params.id, req.user.id]
    );
    if (requests.length === 0) return res.status(404).json({ success: false, message: 'Request not found' });

    await pool.query(
      `UPDATE property_requests SET completion_status = 'Submitted', status = 'Completion Pending' WHERE id = ?`,
      [req.params.id]
    );
    res.json({ success: true, message: 'Completion submitted for admin review' });
  } catch (error) {
    console.error('Final submit error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
