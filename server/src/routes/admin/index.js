const express = require('express');
const { authMiddleware, adminMiddleware } = require('../../middleware/auth');

const router = express.Router();

// Apply auth + admin middleware to all routes
router.use(authMiddleware);
router.use(adminMiddleware);

// Mount sub-routers
router.use('/users', require('./users'));
router.use('/properties', require('./properties'));
router.use('/pricing', require('./pricing'));
router.use('/media', require('./media'));
router.use('/milestones', require('./milestones'));
router.use('/leads', require('./leads'));
router.use('/property-requests', require('./requests'));
router.use('/blog', require('./blog'));
router.use('/content', require('./content'));
router.use('/notifications', require('./notifications'));
router.use('/masters', require('./masters'));
router.use('/dashboard', require('./dashboard'));
router.use('/analytics', require('./dashboard')); // analytics shares the dashboard router
router.use('/audit', require('./audit'));

// ─── Convenience aliases to match APIs.md paths ──────────────
// These forward to the content sub-router endpoints
const contentRouter = require('./content');
router.use('/', contentRouter); // mounts /reviews/*, /testimonials/*, /faqs/*, /contact-messages/* at /api/admin/

// Audit convenience aliases (so /api/admin/audit-logs works alongside /api/admin/audit/logs)
const auditRouter = require('./audit');
router.get('/audit-logs', (req, res, next) => { req.url = '/logs'; auditRouter(req, res, next); });
router.get('/audit-activity', (req, res, next) => { req.url = '/activity'; auditRouter(req, res, next); });
router.get('/login-history', (req, res, next) => { req.url = '/login-history'; auditRouter(req, res, next); });
router.get('/security/failed-logins', (req, res, next) => { req.url = '/security/failed-logins'; auditRouter(req, res, next); });
router.get('/security/suspicious', (req, res, next) => { req.url = '/security/suspicious'; auditRouter(req, res, next); });

// Notification templates alias (so /api/admin/notification-templates works)
const notifRouter = require('./notifications');
router.get('/notification-templates', (req, res, next) => { req.url = '/templates'; notifRouter(req, res, next); });
router.post('/notification-templates', (req, res, next) => { req.url = '/templates'; notifRouter(req, res, next); });
router.put('/notification-templates/:id', (req, res, next) => { req.url = `/templates/${req.params.id}`; notifRouter(req, res, next); });
router.delete('/notification-templates/:id', (req, res, next) => { req.url = `/templates/${req.params.id}`; notifRouter(req, res, next); });

// Reports alias (so /api/admin/reports/generate works)
const dashRouter = require('./dashboard');
router.post('/reports/generate', (req, res, next) => { req.url = '/reports/generate'; dashRouter(req, res, next); });

// Master data aliases (so /api/admin/amenities and /api/admin/tags work)
const mastersRouter = require('./masters');
router.use('/amenities', (req, res, next) => { req.url = '/amenities' + req.url; mastersRouter(req, res, next); });
router.use('/tags', (req, res, next) => { req.url = '/tags' + req.url; mastersRouter(req, res, next); });

module.exports = router;
