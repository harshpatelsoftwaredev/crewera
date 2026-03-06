const express = require('express');
const pool = require('../config/database');
const { optionalAuth } = require('../middleware/auth');
const { paginate, sanitizeSort, sanitizeOrder } = require('../utils/helpers');

const router = express.Router();

const SORT_ALLOWED = ['created_at', 'project_name'];

// ─── 19. LIST ALL ACTIVE PROPERTIES ──────────────────────
router.get('/', optionalAuth, async (req, res) => {
  const { page, limit, offset } = paginate(req.query.page, req.query.limit);
  const { city, type, bhk, status, price_min, price_max, stage, q, sort, order } = req.query;
  try {
    let where = 'WHERE p.status = "Active"';
    const params = [];
    if (city) { where += ' AND pl.city = ?'; params.push(city); }
    if (type) { where += ' AND p.property_type = ?'; params.push(type); }
    if (bhk) { where += ' AND pp.bhk_type = ?'; params.push(bhk); }
    if (status) { where += ' AND pc.construction_stage = ?'; params.push(status); }
    if (price_min) { where += ' AND pp.price >= ?'; params.push(price_min); }
    if (price_max) { where += ' AND pp.price <= ?'; params.push(price_max); }
    if (stage) { where += ' AND pc.construction_stage = ?'; params.push(stage); }
    if (q) { where += ' AND (p.project_name LIKE ? OR pl.city LIKE ? OR pl.area LIKE ?)'; params.push(`%${q}%`, `%${q}%`, `%${q}%`); }

    const sortCol = sanitizeSort(sort, SORT_ALLOWED);
    const sortOrder = sanitizeOrder(order);

    const [countResult] = await pool.query(
      `SELECT COUNT(DISTINCT p.id) as total FROM properties p
       LEFT JOIN property_locations pl ON p.id = pl.property_id
       LEFT JOIN property_pricing pp ON p.id = pp.property_id
       LEFT JOIN property_construction pc ON p.id = pc.property_id
       LEFT JOIN property_details pd ON p.id = pd.property_id
       ${where}`, params
    );

    const [rows] = await pool.query(
      `SELECT DISTINCT p.id, p.project_name, p.property_type, p.special_type, p.slug, p.status, p.created_at,
              pd.builder_name, pd.short_description, pd.total_towers, pd.total_units,
              pd.is_featured, pd.is_premium,
              pc.construction_stage, pc.completion_percent, pc.possession_date,
              pl.city, pl.area, pl.address AS location_address, pl.latitude, pl.longitude,
              MIN(pp.price) as min_price, MAX(pp.price) as max_price,
              (SELECT media_url FROM property_media pm WHERE pm.property_id = p.id AND pm.is_primary = 1 LIMIT 1) as primary_image,
              pa.view_count, pa.inquiry_count, pa.favorite_count, pa.trending_score
       FROM properties p
       LEFT JOIN property_details pd ON p.id = pd.property_id
       LEFT JOIN property_construction pc ON p.id = pc.property_id
       LEFT JOIN property_locations pl ON p.id = pl.property_id
       LEFT JOIN property_pricing pp ON p.id = pp.property_id
       LEFT JOIN property_analytics pa ON p.id = pa.property_id
       ${where}
       GROUP BY p.id
       ORDER BY p.${sortCol} ${sortOrder}
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      success: true,
      data: rows,
      meta: { page, limit, total: countResult[0].total, totalPages: Math.ceil(countResult[0].total / limit) },
    });
  } catch (error) {
    console.error('List properties error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 20. GET SINGLE PROPERTY BY SLUG ─────────────────────
router.get('/detail/:slug', optionalAuth, async (req, res) => {
  try {
    const [props] = await pool.query(`SELECT p.*, pd.*, pc.*, pl.*, plg.*, pbs.*, pu.*
      FROM properties p
      LEFT JOIN property_details pd ON p.id = pd.property_id
      LEFT JOIN property_construction pc ON p.id = pc.property_id
      LEFT JOIN property_locations pl ON p.id = pl.property_id
      LEFT JOIN property_legal plg ON p.id = plg.property_id
      LEFT JOIN property_building_specs pbs ON p.id = pbs.property_id
      LEFT JOIN property_utilities pu ON p.id = pu.property_id
      WHERE p.slug = ? AND p.status = 'Active'`, [req.params.slug]);

    if (props.length === 0) return res.status(404).json({ success: false, message: 'Property not found' });
    const property = props[0];
    const pid = property.id;

    const [pricing] = await pool.query('SELECT * FROM property_pricing WHERE property_id = ?', [pid]);
    const [amenities] = await pool.query(
      `SELECT am.* FROM property_amenities pa JOIN amenity_master am ON pa.amenity_id = am.id WHERE pa.property_id = ?`, [pid]);
    const [media] = await pool.query('SELECT * FROM property_media WHERE property_id = ? ORDER BY display_order', [pid]);
    const [contacts] = await pool.query('SELECT * FROM property_contacts WHERE property_id = ?', [pid]);
    const [milestones] = await pool.query('SELECT * FROM property_milestones WHERE property_id = ? ORDER BY target_date', [pid]);
    const [specs] = await pool.query('SELECT * FROM unit_specifications WHERE property_id = ?', [pid]);
    const [tags] = await pool.query(
      `SELECT t.* FROM property_tags pt JOIN tags t ON pt.tag_id = t.id WHERE pt.property_id = ?`, [pid]);

    // Track view
    await pool.query(
      'INSERT INTO property_view_logs (property_id, user_id, ip_address, user_agent) VALUES (?, ?, ?, ?)',
      [pid, req.user?.id || null, req.ip, req.headers['user-agent'] || '']
    ).catch(() => { });
    await pool.query(
      'UPDATE property_analytics SET view_count = view_count + 1 WHERE property_id = ?', [pid]
    ).catch(() => { });

    res.json({
      success: true,
      data: { ...property, pricing, amenities, media, contacts, milestones, specifications: specs, tags },
    });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 21. FEATURED PROPERTIES ─────────────────────────────
router.get('/featured', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.id, p.project_name, p.property_type, p.special_type, p.slug,
              pd.builder_name, pc.construction_stage, pl.city, pl.area,
              MIN(pp.price) as min_price, MAX(pp.price) as max_price,
              (SELECT media_url FROM property_media pm WHERE pm.property_id = p.id AND pm.is_primary = 1 LIMIT 1) as primary_image
       FROM properties p
       LEFT JOIN property_details pd ON p.id = pd.property_id
       LEFT JOIN property_construction pc ON p.id = pc.property_id
       LEFT JOIN property_locations pl ON p.id = pl.property_id
       LEFT JOIN property_pricing pp ON p.id = pp.property_id
       WHERE p.status = 'Active' AND pd.is_featured = 1
       GROUP BY p.id ORDER BY p.created_at DESC LIMIT 10`
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 22. TRENDING PROPERTIES ─────────────────────────────
router.get('/trending', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.id, p.project_name, p.property_type, p.slug,
              pd.builder_name, pl.city, pl.area, pa.trending_score,
              MIN(pp.price) as min_price,
              (SELECT media_url FROM property_media pm WHERE pm.property_id = p.id AND pm.is_primary = 1 LIMIT 1) as primary_image
       FROM properties p
       LEFT JOIN property_details pd ON p.id = pd.property_id
       LEFT JOIN property_locations pl ON p.id = pl.property_id
       LEFT JOIN property_pricing pp ON p.id = pp.property_id
       LEFT JOIN property_analytics pa ON p.id = pa.property_id
       WHERE p.status = 'Active'
       GROUP BY p.id ORDER BY pa.trending_score DESC LIMIT 10`
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 23. NEARBY PROPERTIES ───────────────────────────────
router.get('/nearby', async (req, res) => {
  const { lat, lng, radius = 5 } = req.query;
  if (!lat || !lng) return res.status(400).json({ success: false, message: 'lat and lng are required' });
  try {
    const [rows] = await pool.query(
      `SELECT p.id, p.project_name, p.slug, pl.latitude, pl.longitude, pl.city, pl.area,
              MIN(pp.price) as min_price,
              (6371 * acos(cos(radians(?)) * cos(radians(pl.latitude)) * cos(radians(pl.longitude) - radians(?)) + sin(radians(?)) * sin(radians(pl.latitude)))) AS distance,
              (SELECT media_url FROM property_media pm WHERE pm.property_id = p.id AND pm.is_primary = 1 LIMIT 1) as primary_image
       FROM properties p
       JOIN property_locations pl ON p.id = pl.property_id
       LEFT JOIN property_pricing pp ON p.id = pp.property_id
       WHERE p.status = 'Active' AND pl.latitude IS NOT NULL
       GROUP BY p.id
       HAVING distance <= ?
       ORDER BY distance LIMIT 20`,
      [lat, lng, lat, radius]
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 24. ADVANCED SEARCH ─────────────────────────────────
router.get('/search', async (req, res) => {
  const { page, limit, offset } = paginate(req.query.page, req.query.limit);
  const { city, type, bhk, price_min, price_max, stage, status, area, builder, furnished,
    sample_house, virtual_tour, sqft_min, sqft_max, sort, order } = req.query;
  try {
    let where = 'WHERE p.status = "Active"'; const params = [];
    if (city) { where += ' AND pl.city = ?'; params.push(city); }
    if (type) { where += ' AND p.property_type = ?'; params.push(type); }
    if (bhk) { where += ' AND pp.bhk_type = ?'; params.push(bhk); }
    if (price_min) { where += ' AND pp.price >= ?'; params.push(price_min); }
    if (price_max) { where += ' AND pp.price <= ?'; params.push(price_max); }
    if (stage) { where += ' AND pc.construction_stage = ?'; params.push(stage); }
    if (area) { where += ' AND pl.area = ?'; params.push(area); }
    if (builder) { where += ' AND pd.builder_name LIKE ?'; params.push(`%${builder}%`); }
    if (sqft_min) { where += ' AND pp.size_super_buildup >= ?'; params.push(sqft_min); }
    if (sqft_max) { where += ' AND pp.size_super_buildup <= ?'; params.push(sqft_max); }

    const [rows] = await pool.query(
      `SELECT DISTINCT p.id, p.project_name, p.property_type, p.slug,
              pd.builder_name, pc.construction_stage, pl.city, pl.area, pl.latitude, pl.longitude,
              MIN(pp.price) as min_price, MAX(pp.price) as max_price,
              (SELECT media_url FROM property_media pm WHERE pm.property_id = p.id AND pm.is_primary = 1 LIMIT 1) as primary_image
       FROM properties p
       LEFT JOIN property_details pd ON p.id = pd.property_id
       LEFT JOIN property_construction pc ON p.id = pc.property_id
       LEFT JOIN property_locations pl ON p.id = pl.property_id
       LEFT JOIN property_pricing pp ON p.id = pp.property_id
       ${where} GROUP BY p.id LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    res.json({ success: true, data: rows, meta: { page, limit } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── 25. GET PROPERTY PRICING ────────────────────────────
router.get('/:id/pricing', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM property_pricing WHERE property_id = ?', [req.params.id]);
    res.json({ success: true, data: rows });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 26. GET PROPERTY AMENITIES ──────────────────────────
router.get('/:id/amenities', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT am.* FROM property_amenities pa JOIN amenity_master am ON pa.amenity_id = am.id WHERE pa.property_id = ?`,
      [req.params.id]
    );
    res.json({ success: true, data: rows });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 27. GET PROPERTY MEDIA ──────────────────────────────
router.get('/:id/media', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM property_media WHERE property_id = ? ORDER BY display_order', [req.params.id]);
    res.json({ success: true, data: rows });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 28. GET PROPERTY SPECIFICATIONS ─────────────────────
router.get('/:id/specifications', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM unit_specifications WHERE property_id = ?', [req.params.id]);
    res.json({ success: true, data: rows });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 29. GET PROPERTY CONTACTS ───────────────────────────
router.get('/:id/contacts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM property_contacts WHERE property_id = ?', [req.params.id]);
    res.json({ success: true, data: rows });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

// ─── 30. GET PROPERTY MILESTONES ─────────────────────────
router.get('/:id/milestones', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM property_milestones WHERE property_id = ? ORDER BY target_date', [req.params.id]);
    res.json({ success: true, data: rows });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error' }); }
});

module.exports = router;
