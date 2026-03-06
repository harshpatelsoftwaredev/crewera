# CREWERA Admin Panel

A comprehensive admin dashboard for CREWERA Reality built with React, featuring minimal black and white design with full functionality for managing all aspects of the real estate platform.

## Features

### ✅ Implemented
- **Authentication System**: Login/Signup with role-based access
- **Dashboard Overview**: Statistics and quick actions
- **User Management**: Complete CRUD operations for users
- **Property Management**: Advanced property CRUD with comprehensive forms
  - Multi-tab property creation/editing (Basic, Location, Construction, Legal, Features)
  - Property details view with all related data (pricing, amenities, contacts, milestones)
  - Status management and filtering
- **Pricing & Units**: Property pricing management
- **Responsive Design**: Minimal black and white theme, no animations

### 🚧 In Development
- Media Management
- Milestones Tracking
- Leads & Inquiries
- Property Requests
- Blog Management
- Content Moderation
- Notifications
- Masters (Amenities & Tags)
- Audit & Security

## Tech Stack

- **Frontend**: React 18 with React Router
- **Styling**: Pure CSS (minimal, no frameworks)
- **HTTP Client**: Axios
- **Build Tool**: Create React App

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Backend server running (see server/README.md)

### Installation

1. **Navigate to admin directory**:
   ```bash
   cd admin
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

4. **Access the admin panel**:
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - Default login: Use the backend's admin credentials

### Backend Setup
Make sure your backend server is running on `http://localhost:5555` with:
- Database properly configured
- Admin user created
- All API endpoints functional

## Project Structure

```
admin/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Home.js              # Landing page
│   │   ├── Login.js             # Authentication
│   │   ├── Signup.js            # User registration
│   │   ├── AdminDashboard.js    # Main admin container
│   │   └── admin/               # Admin components
│   │       ├── Sidebar.js       # Navigation sidebar
│   │       ├── Dashboard.js     # Overview dashboard
│   │       ├── Users.js         # User management
│   │       ├── Properties.js    # Property management
│   │       ├── PropertyForm.js  # Property CRUD form
│   │       ├── PropertyDetails.js # Property details view
│   │       ├── Pricing.js       # Pricing management
│   │       └── ...              # Other modules
│   ├── services/
│   │   └── api.js               # API service layer
│   ├── App.js                   # Main app component
│   ├── App.css                  # Additional styles
│   └── index.css                # Global styles
└── package.json
```

## Key Features Explained

### Property Management (Most Advanced)
- **Comprehensive Forms**: Multi-tab forms covering all property aspects
- **Advanced Filtering**: Search, filter by type, status, city
- **Detailed Views**: Complete property information with related data
- **CRUD Operations**: Create, read, update, delete with validation
- **Status Management**: Change property status directly from listings

### User Management
- **Role-Based Access**: Admin, Agent, User roles
- **Status Control**: Activate/deactivate users
- **Search & Filter**: Find users by name, email, role, status
- **Statistics**: User counts and activity metrics

### Design Philosophy
- **Minimal**: Black and white only, no colors
- **Functional**: Focus on usability over aesthetics
- **Responsive**: Works on all screen sizes
- **No Animations**: Clean, static interface

## API Integration

The admin panel integrates with all backend APIs:

- **Authentication**: `/api/auth/*`
- **Admin Users**: `/api/admin/users/*`
- **Admin Properties**: `/api/admin/properties/*`
- **Admin Pricing**: `/api/admin/pricing/*`
- And all other admin endpoints as documented in `POSTMAN_COMPLETE_GUIDE.md`

## Development Notes

- All components are functional and ready for expansion
- Error handling implemented throughout
- Loading states for better UX
- Form validation on frontend
- Token-based authentication with automatic logout on expiry

## Future Enhancements

1. **Complete all remaining modules** (Media, Leads, Blog, etc.)
2. **Add data visualization** (charts for analytics)
3. **Bulk operations** (import/export, bulk updates)
4. **Advanced search and filtering**
5. **Real-time notifications**
6. **Audit trail improvements**

## Contributing

1. Follow the existing code structure
2. Maintain minimal design principles
3. Add proper error handling
4. Test all CRUD operations
5. Update this README for new features