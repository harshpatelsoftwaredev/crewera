const express = require('express');
const { body } = require('express-validator');
const pool = require('../../config/database');
const { handleValidationErrors } = require('../../middleware/validation');
const { paginate, generateSlug, sanitizeSort, sanitizeOrder } = require('../../utils/helpers');
const { logAction } = require('../../middleware/auditLogger');

const router = express.Router();
const SORT_ALLOWED = ['created_at', 'project_name', 'status', 'property_type'];

// ─── 95. LIST ALL PROPERTIES ─────────────────────────────
router.get('/', async (req, res) => {
    const { page, limit, offset } = paginate(req.query.page, req.query.limit);
    const { status, type, city, q, sort, order } = req.query;
    try {
        let where = 'WHERE 1=1';
        const params = [];
        if (status) { where += ' AND p.status = ?'; params.push(status); }
        if (type) { where += ' AND p.property_type = ?'; params.push(type); }
        if (city) { where += ' AND pl.city = ?'; params.push(city); }
        if (q) { where += ' AND (p.project_name LIKE ? OR pd.builder_name LIKE ?)'; params.push(`%${q}%`, `%${q}%`); }

        const [countResult] = await pool.query(
            `SELECT COUNT(*) as total FROM properties p
       LEFT JOIN property_details pd ON p.id = pd.property_id
       LEFT JOIN property_locations pl ON p.id = pl.property_id ${where}`, params
        );

        const [rows] = await pool.query(
            `SELECT p.*, pd.builder_name, pd.is_featured, pd.is_premium,
              pl.city, pl.area, pc.construction_stage, pc.completion_percent
       FROM properties p
       LEFT JOIN property_details pd ON p.id = pd.property_id
       LEFT JOIN property_locations pl ON p.id = pl.property_id
       LEFT JOIN property_construction pc ON p.id = pc.property_id
       ${where} ORDER BY p.${sanitizeSort(sort, SORT_ALLOWED)} ${sanitizeOrder(order)} LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );

        res.json({ success: true, data: rows, meta: { page, limit, total: countResult[0].total, totalPages: Math.ceil(countResult[0].total / limit) } });
    } catch (error) {
        console.error('Admin list properties error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 96. CREATE PROPERTY ─────────────────────────────────
router.post('/', [
    body('project_name').trim().notEmpty().withMessage('Project name required'),
    body('property_type').isIn(['Residential', 'Commercial', 'Mixed', 'Industrial', 'Agricultural']).withMessage('Valid type required'),
], handleValidationErrors, async (req, res) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        const { project_name, property_type, special_type } = req.body;
        const slug = generateSlug(project_name);

        const [result] = await conn.query(
            'INSERT INTO properties (project_name, property_type, special_type, slug, created_by, status) VALUES (?, ?, ?, ?, ?, ?)',
            [project_name, property_type, special_type || 'None', slug, req.user.id, 'Pending Approval']
        );
        const propertyId = result.insertId;

        // Create related detail tables
        const { builder_name, team_name, description, short_description, total_units, available_units,
            total_towers, total_floors, project_area_acres, is_featured, is_premium } = req.body;
        await conn.query(
            `INSERT INTO property_details (property_id, builder_name, team_name, description, short_description,
       total_units, available_units, total_towers, total_floors, project_area_acres, is_featured, is_premium)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [propertyId, builder_name || '', team_name, description, short_description,
                total_units, available_units, total_towers, total_floors, project_area_acres,
                is_featured || false, is_premium || false]
        );

        const { construction_stage, project_start_date, expected_completion, possession_date } = req.body;
        if (construction_stage) {
            await conn.query(
                `INSERT INTO property_construction (property_id, construction_stage, project_start_date, expected_completion, possession_date)
         VALUES (?, ?, ?, ?, ?)`,
                [propertyId, construction_stage, project_start_date, expected_completion, possession_date]
            );
        }

        const { address, locality, city, district, state, country, zip_code, latitude, longitude, area } = req.body;
        if (address) {
            await conn.query(
                `INSERT INTO property_locations (property_id, address, locality, city, district, state, country, zip_code, latitude, longitude, area)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [propertyId, address, locality, city, district, state, country || 'India', zip_code, latitude, longitude, area]
            );
        }

        // Initialize analytics
        await conn.query('INSERT INTO property_analytics (property_id) VALUES (?)', [propertyId]);

        await conn.commit();
        await logAction(req, 'CREATE', 'properties', propertyId, `Property ${project_name} created`);
        res.status(201).json({ success: true, message: 'Property created', data: { id: propertyId, slug } });
    } catch (error) {
        await conn.rollback();
        console.error('Create property error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    } finally {
        conn.release();
    }
});

// ─── 97. UPDATE PROPERTY CORE ────────────────────────────
router.put('/:id', async (req, res) => {
    const { project_name, property_type, special_type } = req.body;
    try {
        await pool.query(
            'UPDATE properties SET project_name = COALESCE(?, project_name), property_type = COALESCE(?, property_type), special_type = COALESCE(?, special_type) WHERE id = ?',
            [project_name, property_type, special_type, req.params.id]
        );
        await logAction(req, 'UPDATE', 'properties', req.params.id, 'Property core updated');
        res.json({ success: true, message: 'Property updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 98. DELETE PROPERTY ─────────────────────────────────
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM properties WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Property not found' });
        await logAction(req, 'DELETE', 'properties', req.params.id, 'Property deleted');
        res.json({ success: true, message: 'Property deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 99. UPDATE PROPERTY STATUS ──────────────────────────
router.patch('/:id/status', async (req, res) => {
    const { status } = req.body;
    const valid = ['Active', 'Inactive', 'Pending Approval', 'Sold Out', 'Archived'];
    if (!valid.includes(status)) return res.status(400).json({ success: false, message: 'Invalid status' });
    try {
        await pool.query('UPDATE properties SET status = ? WHERE id = ?', [status, req.params.id]);
        await logAction(req, 'UPDATE', 'properties', req.params.id, `Status changed to ${status}`);
        res.json({ success: true, message: 'Status updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 100. UPDATE PROPERTY DETAILS ────────────────────────
router.put('/:id/details', async (req, res) => {
    const f = req.body;
    try {
        await pool.query(
            `INSERT INTO property_details (property_id, builder_name, team_name, description, short_description,
       highlights, total_units, available_units, total_towers, total_floors, project_area_acres,
       green_area_percent, is_featured, is_premium)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE builder_name=VALUES(builder_name), team_name=VALUES(team_name),
       description=VALUES(description), short_description=VALUES(short_description),
       highlights=VALUES(highlights), total_units=VALUES(total_units), available_units=VALUES(available_units),
       total_towers=VALUES(total_towers), total_floors=VALUES(total_floors),
       project_area_acres=VALUES(project_area_acres), green_area_percent=VALUES(green_area_percent),
       is_featured=VALUES(is_featured), is_premium=VALUES(is_premium)`,
            [req.params.id, f.builder_name, f.team_name, f.description, f.short_description,
            f.highlights ? JSON.stringify(f.highlights) : null, f.total_units, f.available_units,
            f.total_towers, f.total_floors, f.project_area_acres, f.green_area_percent,
            f.is_featured || false, f.is_premium || false]
        );
        res.json({ success: true, message: 'Details updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 101. UPDATE CONSTRUCTION ────────────────────────────
router.put('/:id/construction', async (req, res) => {
    const f = req.body;
    try {
        await pool.query(
            `INSERT INTO property_construction (property_id, construction_stage, completion_percent,
       project_start_date, expected_completion, actual_completion, possession_date,
       last_inspection_date, last_inspection_notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE construction_stage=VALUES(construction_stage),
       completion_percent=VALUES(completion_percent), project_start_date=VALUES(project_start_date),
       expected_completion=VALUES(expected_completion), actual_completion=VALUES(actual_completion),
       possession_date=VALUES(possession_date), last_inspection_date=VALUES(last_inspection_date),
       last_inspection_notes=VALUES(last_inspection_notes)`,
            [req.params.id, f.construction_stage, f.completion_percent, f.project_start_date,
            f.expected_completion, f.actual_completion, f.possession_date,
            f.last_inspection_date, f.last_inspection_notes]
        );
        res.json({ success: true, message: 'Construction info updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 102. UPDATE LOCATION ────────────────────────────────
router.put('/:id/location', async (req, res) => {
    const f = req.body;
    try {
        await pool.query(
            `INSERT INTO property_locations (property_id, address, locality, city, district, state, country,
       zip_code, latitude, longitude, area, landmarks, nearest_metro, nearest_railway,
       nearest_airport, nearest_highway, walkability_score, transit_score)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE address=VALUES(address), locality=VALUES(locality),
       city=VALUES(city), district=VALUES(district), state=VALUES(state),
       country=VALUES(country), zip_code=VALUES(zip_code), latitude=VALUES(latitude),
       longitude=VALUES(longitude), area=VALUES(area), landmarks=VALUES(landmarks),
       nearest_metro=VALUES(nearest_metro), nearest_railway=VALUES(nearest_railway),
       nearest_airport=VALUES(nearest_airport), nearest_highway=VALUES(nearest_highway),
       walkability_score=VALUES(walkability_score), transit_score=VALUES(transit_score)`,
            [req.params.id, f.address, f.locality, f.city, f.district, f.state, f.country || 'India',
            f.zip_code, f.latitude, f.longitude, f.area, f.landmarks, f.nearest_metro,
            f.nearest_railway, f.nearest_airport, f.nearest_highway, f.walkability_score, f.transit_score]
        );
        res.json({ success: true, message: 'Location updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 103. UPDATE LEGAL ───────────────────────────────────
router.put('/:id/legal', async (req, res) => {
    const f = req.body;
    try {
        await pool.query(
            `INSERT INTO property_legal (property_id, rera_number, rera_status, rera_expiry_date,
       legal_status, paper_ratio, encumbrance_clear, title_clear, occupancy_certificate,
       completion_certificate, environment_clearance, noc_fire, noc_aviation, approved_by, approval_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE rera_number=VALUES(rera_number), rera_status=VALUES(rera_status),
       rera_expiry_date=VALUES(rera_expiry_date), legal_status=VALUES(legal_status),
       paper_ratio=VALUES(paper_ratio), encumbrance_clear=VALUES(encumbrance_clear),
       title_clear=VALUES(title_clear), occupancy_certificate=VALUES(occupancy_certificate),
       completion_certificate=VALUES(completion_certificate), environment_clearance=VALUES(environment_clearance),
       noc_fire=VALUES(noc_fire), noc_aviation=VALUES(noc_aviation),
       approved_by=VALUES(approved_by), approval_date=VALUES(approval_date)`,
            [req.params.id, f.rera_number, f.rera_status, f.rera_expiry_date, f.legal_status,
            f.paper_ratio, f.encumbrance_clear, f.title_clear, f.occupancy_certificate,
            f.completion_certificate, f.environment_clearance, f.noc_fire, f.noc_aviation,
            f.approved_by, f.approval_date]
        );
        res.json({ success: true, message: 'Legal info updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 104. UPDATE BUILDING SPECS ──────────────────────────
router.put('/:id/building-specs', async (req, res) => {
    const f = req.body;
    try {
        await pool.query(
            `INSERT INTO property_building_specs (property_id, social_class, storeys, basements, lifts,
       staircases, balconies, units_per_floor, allocated_parking, visitor_parking, open_parking,
       covered_parking, sample_house_available, earthquake_zone, structure_type, flooring_type,
       wall_type, window_type, door_type)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE social_class=VALUES(social_class), storeys=VALUES(storeys),
       basements=VALUES(basements), lifts=VALUES(lifts), staircases=VALUES(staircases),
       balconies=VALUES(balconies), units_per_floor=VALUES(units_per_floor),
       allocated_parking=VALUES(allocated_parking), visitor_parking=VALUES(visitor_parking),
       open_parking=VALUES(open_parking), covered_parking=VALUES(covered_parking),
       sample_house_available=VALUES(sample_house_available), earthquake_zone=VALUES(earthquake_zone),
       structure_type=VALUES(structure_type), flooring_type=VALUES(flooring_type),
       wall_type=VALUES(wall_type), window_type=VALUES(window_type), door_type=VALUES(door_type)`,
            [req.params.id, f.social_class, f.storeys, f.basements, f.lifts, f.staircases,
            f.balconies, f.units_per_floor, f.allocated_parking, f.visitor_parking, f.open_parking,
            f.covered_parking, f.sample_house_available, f.earthquake_zone, f.structure_type,
            f.flooring_type, f.wall_type, f.window_type, f.door_type]
        );
        res.json({ success: true, message: 'Building specs updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 105. UPDATE UTILITIES ───────────────────────────────
router.put('/:id/utilities', async (req, res) => {
    const f = req.body;
    try {
        await pool.query(
            `INSERT INTO property_utilities (property_id, electricity_provider, electricity_billing,
       electricity_backup, backup_power_type, gas_provider, gas_pipeline, water_supply_provider,
       water_source, rainwater_harvesting, sewage_treatment, waste_management, internet_provider,
       fiber_optic, maintenance_cost, maintenance_per_sqft, maintenance_billing, price_negotiable)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE electricity_provider=VALUES(electricity_provider),
       electricity_billing=VALUES(electricity_billing), electricity_backup=VALUES(electricity_backup),
       backup_power_type=VALUES(backup_power_type), gas_provider=VALUES(gas_provider),
       gas_pipeline=VALUES(gas_pipeline), water_supply_provider=VALUES(water_supply_provider),
       water_source=VALUES(water_source), rainwater_harvesting=VALUES(rainwater_harvesting),
       sewage_treatment=VALUES(sewage_treatment), waste_management=VALUES(waste_management),
       internet_provider=VALUES(internet_provider), fiber_optic=VALUES(fiber_optic),
       maintenance_cost=VALUES(maintenance_cost), maintenance_per_sqft=VALUES(maintenance_per_sqft),
       maintenance_billing=VALUES(maintenance_billing), price_negotiable=VALUES(price_negotiable)`,
            [req.params.id, f.electricity_provider, f.electricity_billing, f.electricity_backup,
            f.backup_power_type, f.gas_provider, f.gas_pipeline, f.water_supply_provider,
            f.water_source, f.rainwater_harvesting, f.sewage_treatment, f.waste_management,
            f.internet_provider, f.fiber_optic, f.maintenance_cost, f.maintenance_per_sqft,
            f.maintenance_billing, f.price_negotiable]
        );
        res.json({ success: true, message: 'Utilities updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 106. ADD/REMOVE AMENITIES ───────────────────────────
router.post('/:id/amenities', async (req, res) => {
    const { amenity_ids } = req.body;
    if (!amenity_ids || !Array.isArray(amenity_ids)) return res.status(400).json({ success: false, message: 'amenity_ids array required' });
    try {
        for (const amenityId of amenity_ids) {
            await pool.query(
                'INSERT IGNORE INTO property_amenities (property_id, amenity_id) VALUES (?, ?)',
                [req.params.id, amenityId]
            );
        }
        res.json({ success: true, message: 'Amenities added' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.delete('/:id/amenities', async (req, res) => {
    const { amenity_ids } = req.body;
    if (!amenity_ids || !Array.isArray(amenity_ids)) return res.status(400).json({ success: false, message: 'amenity_ids array required' });
    try {
        await pool.query(
            `DELETE FROM property_amenities WHERE property_id = ? AND amenity_id IN (?)`,
            [req.params.id, amenity_ids]
        );
        res.json({ success: true, message: 'Amenities removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 107. ADD/REMOVE TAGS ────────────────────────────────
router.post('/:id/tags', async (req, res) => {
    const { tag_ids } = req.body;
    if (!tag_ids || !Array.isArray(tag_ids)) return res.status(400).json({ success: false, message: 'tag_ids array required' });
    try {
        for (const tagId of tag_ids) {
            await pool.query('INSERT IGNORE INTO property_tags (property_id, tag_id) VALUES (?, ?)', [req.params.id, tagId]);
        }
        res.json({ success: true, message: 'Tags added' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.delete('/:id/tags', async (req, res) => {
    const { tag_ids } = req.body;
    try {
        await pool.query('DELETE FROM property_tags WHERE property_id = ? AND tag_id IN (?)', [req.params.id, tag_ids]);
        res.json({ success: true, message: 'Tags removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// ─── 108. ADD/REMOVE CONTACTS ────────────────────────────
router.post('/:id/contacts', async (req, res) => {
    const { contact_type, name, mobile, alternate_mobile, email, designation, is_primary, available_hours } = req.body;
    try {
        const [result] = await pool.query(
            `INSERT INTO property_contacts (property_id, contact_type, name, mobile, alternate_mobile, email, designation, is_primary, available_hours)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [req.params.id, contact_type, name, mobile, alternate_mobile, email, designation, is_primary || false, available_hours]
        );
        res.status(201).json({ success: true, message: 'Contact added', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.delete('/:id/contacts', async (req, res) => {
    const { contact_id } = req.body;
    try {
        await pool.query('DELETE FROM property_contacts WHERE id = ? AND property_id = ?', [contact_id, req.params.id]);
        res.json({ success: true, message: 'Contact removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
