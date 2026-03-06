const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// ── Public & User Routes ─────────────────────────────────
const authRoutes = require('./routes/auth');
const propertiesRoutes = require('./routes/properties');
const favoritesRoutes = require('./routes/favorites');
const inquiriesRoutes = require('./routes/inquiries');
const usersRoutes = require('./routes/users');
const propertyRequestsRoutes = require('./routes/propertyRequests');
const blogRoutes = require('./routes/blog');
const testimonialsRoutes = require('./routes/testimonials');
const contactRoutes = require('./routes/contact');
const reviewsRoutes = require('./routes/reviews');
const savedSearchesRoutes = require('./routes/savedSearches');
const notificationsRoutes = require('./routes/notifications');
const analyticsRoutes = require('./routes/analytics');
const tagsRoutes = require('./routes/tags');

// ── Admin Routes ─────────────────────────────────────────
const adminRoutes = require('./routes/admin/index');

// ── Middleware ────────────────────────────────────────────
const { auditMiddleware } = require('./middleware/auditLogger');

const app = express();

// ── Core Middleware ───────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files (for uploads)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Audit middleware
app.use(auditMiddleware);

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ── Public & User API Routes ─────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/property-requests', propertyRequestsRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/saved-searches', savedSearchesRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/tags', tagsRoutes);

// ── Admin API Routes (gated by auth + admin middleware) ──
app.use('/api/admin', adminRoutes);

// ── Health Check ─────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Crewera Reality API is running',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
  });
});

// ── 404 Handler ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global Error Handler ─────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Error:', err.stack || err);
  res.status(500).json({ success: false, message: 'Internal server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined });
});

// ── Start Server ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 ╔════════════════════════════════════════════╗`);
  console.log(`   ║  CREWERA REALITY API v2.0                 ║`);
  console.log(`   ║  Running on http://localhost:${PORT}          ║`);
  console.log(`   ╚════════════════════════════════════════════╝\n`);
});
