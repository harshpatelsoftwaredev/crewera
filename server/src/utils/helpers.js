const crypto = require('crypto');

// Generate URL-friendly slug
const generateSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
        + '-' + Date.now().toString(36);
};

// Pagination helper
const paginate = (page = 1, limit = 20) => {
    const p = Math.max(1, parseInt(page) || 1);
    const l = Math.min(100, Math.max(1, parseInt(limit) || 20));
    const offset = (p - 1) * l;
    return { page: p, limit: l, offset };
};

// Standardized API response
const formatResponse = (success, message, data = null, meta = null) => {
    const response = { success, message };
    if (data !== null) response.data = data;
    if (meta) response.meta = meta;
    return response;
};

// Generate secure random token
const generateToken = (length = 32) => {
    return crypto.randomBytes(length).toString('hex');
};

// Build WHERE clause from filters
const buildWhereClause = (filters, prefix = '') => {
    const conditions = [];
    const values = [];

    Object.entries(filters).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
            const col = prefix ? `${prefix}.${key}` : key;
            if (typeof val === 'object' && val.min !== undefined) {
                if (val.min) { conditions.push(`${col} >= ?`); values.push(val.min); }
                if (val.max) { conditions.push(`${col} <= ?`); values.push(val.max); }
            } else if (typeof val === 'string' && val.includes('%')) {
                conditions.push(`${col} LIKE ?`); values.push(val);
            } else {
                conditions.push(`${col} = ?`); values.push(val);
            }
        }
    });

    return {
        clause: conditions.length ? 'WHERE ' + conditions.join(' AND ') : '',
        values,
    };
};

// Sanitize sort column name to prevent SQL injection
const sanitizeSort = (sort, allowed) => {
    if (!sort) return allowed[0] || 'created_at';
    return allowed.includes(sort) ? sort : allowed[0] || 'created_at';
};

const sanitizeOrder = (order) => {
    return order && order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
};

module.exports = {
    generateSlug,
    paginate,
    formatResponse,
    generateToken,
    buildWhereClause,
    sanitizeSort,
    sanitizeOrder,
};
