import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './admin/Sidebar';
import Dashboard from './admin/Dashboard';
import Users from './admin/Users';
import Properties from './admin/Properties';
import Pricing from './admin/Pricing';
import Media from './admin/Media';
import Milestones from './admin/Milestones';
import Leads from './admin/Leads';
import PropertyRequests from './admin/PropertyRequests';
import Blog from './admin/Blog';
import Content from './admin/Content';
import Notifications from './admin/Notifications';
import Masters from './admin/Masters';
import Audit from './admin/Audit';
import api from '../services/api';

const AdminDashboard = ({ user, onLogout }) => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    loadDashboardStats();
  }, [user, navigate]);

  const loadDashboardStats = async () => {
    try {
      const response = await api.get('/admin/dashboard/overview');
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading admin dashboard...</div>;
  }

  return (
    <div className="main-with-sidebar">
      <Sidebar user={user} onLogout={onLogout} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard stats={stats} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/media" element={<Media />} />
          <Route path="/milestones" element={<Milestones />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/property-requests" element={<PropertyRequests />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/content" element={<Content />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/masters" element={<Masters />} />
          <Route path="/audit" element={<Audit />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;