# Crewera Reality — Backend Build Tasks

## Phase 1: Foundation & Config
- [ ] Update [.env](file:///D:/CREWERA/backend/.env) with SMTP, CLIENT_URL, API_URL
- [ ] Create `src/config/email.js` (Nodemailer + templates)
- [ ] Update [src/config/database.js](file:///D:/CREWERA/backend/src/config/database.js) (connection test)

## Phase 2: Middleware & Utilities
- [ ] Create `src/utils/helpers.js`
- [ ] Update [src/middleware/auth.js](file:///D:/CREWERA/backend/src/middleware/auth.js) (optionalAuth, agentMiddleware)
- [ ] Update [src/middleware/validation.js](file:///D:/CREWERA/backend/src/middleware/validation.js) (if needed)

## Phase 3: Public & User Routes (Modules 1–13, ~90 APIs)
- [ ] [routes/auth.js](file:///D:/CREWERA/backend/src/routes/auth.js) — 10 APIs
- [ ] [routes/users.js](file:///D:/CREWERA/backend/src/routes/users.js) — 8 APIs
- [ ] [routes/properties.js](file:///D:/CREWERA/backend/src/routes/properties.js) — 12 APIs
- [ ] [routes/reviews.js](file:///D:/CREWERA/backend/src/routes/reviews.js) — 6 APIs
- [ ] [routes/favorites.js](file:///D:/CREWERA/backend/src/routes/favorites.js) — 8 APIs
- [ ] [routes/inquiries.js](file:///D:/CREWERA/backend/src/routes/inquiries.js) — 8 APIs
- [ ] [routes/propertyRequests.js](file:///D:/CREWERA/backend/src/routes/propertyRequests.js) — 8 APIs
- [ ] `routes/savedSearches.js` — 5 APIs
- [ ] [routes/blog.js](file:///D:/CREWERA/backend/src/routes/blog.js) — 8 APIs
- [ ] `routes/content.js` — 5 APIs
- [ ] `routes/notifications.js` — 5 APIs
- [ ] `routes/analytics.js` — 4 APIs
- [ ] `routes/tags.js` — 3 APIs

## Phase 4: Admin Routes (Modules 14–27, ~93 APIs)
- [ ] `routes/admin/index.js` — Master router
- [ ] `routes/admin/users.js` — 8 APIs
- [ ] `routes/admin/properties.js` — 14 APIs
- [ ] `routes/admin/pricing.js` — 6 APIs
- [ ] `routes/admin/media.js` — 4 APIs
- [ ] `routes/admin/milestones.js` — 4 APIs
- [ ] `routes/admin/leads.js` — 10 APIs
- [ ] `routes/admin/requests.js` — 8 APIs
- [ ] `routes/admin/blog.js` — 8 APIs
- [ ] `routes/admin/content.js` — 6 APIs
- [ ] `routes/admin/notifications.js` — 4 APIs
- [ ] `routes/admin/masters.js` — 4 APIs
- [ ] `routes/admin/dashboard.js` — 12 APIs
- [ ] `routes/admin/audit.js` — 5 APIs

## Phase 5: Server & Integration
- [ ] Update [src/server.js](file:///D:/CREWERA/backend/src/server.js) — Mount all routes
- [ ] Test server startup

## Phase 6: Documentation
- [ ] Create `POSTMAN_COMPLETE_GUIDE.md`
