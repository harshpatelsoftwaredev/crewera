import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Dashboard = ({ stats }) => {
  const [dashboardData, setDashboardData] = useState(stats);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDashboardData(stats);
  }, [stats]);

  const refreshStats = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/dashboard/overview');
      setDashboardData(response.data.data);
    } catch (error) {
      console.error('Failed to refresh stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Dashboard Overview</h1>
        <button className="btn" onClick={refreshStats} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh Stats'}
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Users</h4>
          <div className="number">{dashboardData.totalUsers || 0}</div>
        </div>
        
        <div className="stat-card">
          <h4>Active Properties</h4>
          <div className="number">{dashboardData.activeProperties || 0}</div>
        </div>
        
        <div className="stat-card">
          <h4>Total Leads</h4>
          <div className="number">{dashboardData.totalLeads || 0}</div>
        </div>
        
        <div className="stat-card">
          <h4>Total Inquiries</h4>
          <div className="number">{dashboardData.totalInquiries || 0}</div>
        </div>
        
        <div className="stat-card">
          <h4>Total Revenue</h4>
          <div className="number">₹{dashboardData.totalRevenue?.toLocaleString() || 0}</div>
        </div>
        
        <div className="stat-card">
          <h4>New Users Today</h4>
          <div className="number">{dashboardData.newUsersToday || 0}</div>
        </div>
        
        <div className="stat-card">
          <h4>Pending Properties</h4>
          <div className="number">{dashboardData.pendingProperties || 0}</div>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h3>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button className="btn" onClick={() => window.location.href = '/admin/properties'}>
              Manage Properties
            </button>
            <button className="btn" onClick={() => window.location.href = '/admin/users'}>
              Manage Users
            </button>
            <button className="btn" onClick={() => window.location.href = '/admin/leads'}>
              View Leads
            </button>
            <button className="btn" onClick={() => window.location.href = '/admin/property-requests'}>
              Review Property Requests
            </button>
          </div>
        </div>

        <div className="card">
          <h3>Recent Activity</h3>
          <p>Recent activities will be displayed here...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;