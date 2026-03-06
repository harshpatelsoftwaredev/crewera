const pool = require('../config/database');

/**
 * Log action to audit_logs table
 * @param {number} userId - User ID performing the action
 * @param {string} actionType - Type of action (CREATE, UPDATE, DELETE, VIEW, LOGIN, EXPORT)
 * @param {string} entityType - Type of entity (Property, User, Inquiry, etc)
 * @param {number} entityId - ID of the entity being acted upon
 * @param {string} description - Description of the action
 * @param {object} oldValues - Previous values (for UPDATE actions)
 * @param {object} newValues - New values (for CREATE/UPDATE actions)
 * @param {string} ipAddress - IP address of the request
 * @param {string} userAgent - User agent of the request
 * @param {string} status - Success or Failed
 */
const logAction = async (
  userId,
  actionType,
  entityType,
  entityId,
  description,
  oldValues = null,
  newValues = null,
  ipAddress = null,
  userAgent = null,
  status = 'Success'
) => {
  try {
    await pool.query(
      `INSERT INTO audit_logs 
       (user_id, action_type, entity_type, entity_id, description, old_values, new_values, ip_address, user_agent, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        actionType,
        entityType,
        entityId,
        description,
        oldValues ? JSON.stringify(oldValues) : null,
        newValues ? JSON.stringify(newValues) : null,
        ipAddress,
        userAgent,
        status,
      ]
    );
  } catch (error) {
    console.error('Error logging audit action:', error);
    // Don't throw - audit logging shouldn't break the main operation
  }
};

/**
 * Log activity to audit_activity table
 * @param {number} userId - User ID performing the activity
 * @param {string} activityType - Type of activity (Login, Export, PropertyView, etc)
 * @param {string} activityDetails - Details of the activity
 * @param {string} relatedEntity - Related entity type (optional)
 * @param {number} relatedEntityId - Related entity ID (optional)
 * @param {string} severity - Severity level (Info, Warning, Critical)
 * @param {string} ipAddress - IP address of the request
 */
const logActivity = async (
  userId,
  activityType,
  activityDetails,
  relatedEntity = null,
  relatedEntityId = null,
  severity = 'Info',
  ipAddress = null
) => {
  try {
    await pool.query(
      `INSERT INTO audit_activity 
       (user_id, activity_type, activity_details, related_entity, related_entity_id, severity, ip_address)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, activityType, activityDetails, relatedEntity, relatedEntityId, severity, ipAddress]
    );
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

/**
 * Middleware to extract IP and user agent
 */
const auditMiddleware = (req, res, next) => {
  req.ipAddress =
    req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress || 'Unknown';
  req.userAgent = req.headers['user-agent'] || 'Unknown';
  next();
};

module.exports = {
  logAction: async (reqOrUserId, actionType, entityType, entityId, description, oldValues, newValues, ipAddress, userAgent, status) => {
    // Support both req-based calls and direct parameter calls
    if (typeof reqOrUserId === 'object' && reqOrUserId !== null && reqOrUserId.user) {
      // Called with (req, actionType, entityType, entityId, description)
      const req = reqOrUserId;
      return logAction(
        req.user?.id || null,
        actionType,
        entityType,
        entityId,
        description,
        null,
        null,
        req.headers?.['x-forwarded-for']?.split(',')[0] || req.connection?.remoteAddress || 'Unknown',
        req.headers?.['user-agent']?.substring(0, 500) || 'Unknown',
        'Success'
      );
    }
    // Called with direct parameters
    return logAction(reqOrUserId, actionType, entityType, entityId, description, oldValues, newValues, ipAddress, userAgent, status);
  },
  logActivity,
  auditMiddleware,
};
