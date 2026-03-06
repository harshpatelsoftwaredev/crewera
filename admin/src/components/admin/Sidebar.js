import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ user, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/properties', label: 'Properties', icon: '🏢' },
    { path: '/admin/pricing', label: 'Pricing & Units', icon: '💰' },
    { path: '/admin/media', label: 'Media', icon: '📸' },
    { path: '/admin/milestones', label: 'Milestones', icon: '🎯' },
    { path: '/admin/leads', label: 'Leads & Inquiries', icon: '📞' },
    { path: '/admin/property-requests', label: 'Property Requests', icon: '📝' },
    { path: '/admin/blog', label: 'Blog', icon: '📝' },
    { path: '/admin/content', label: 'Content Moderation', icon: '✅' },
    { path: '/admin/notifications', label: 'Notifications', icon: '🔔' },
    { path: '/admin/masters', label: 'Masters', icon: '⚙️' },
    { path: '/admin/audit', label: 'Audit & Security', icon: '🔒' },
  ];

  return (
    <div className="sidebar">
      <div style={{ marginBottom: '2rem' }}>
        <h2>CREWERA Admin</h2>
        <p>Welcome, {user.first_name}</p>
      </div>
      
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={location.pathname === item.path ? 'active' : ''}
              >
                <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
        <button className="btn btn-secondary" onClick={onLogout} style={{ width: '100%' }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;