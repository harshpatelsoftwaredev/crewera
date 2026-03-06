import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    role: '',
    status: 'active',
    q: ''
  });
  const [pagination, setPagination] = useState({});
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadUsers();
    loadStats();
  }, [filters]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await api.get(`/admin/users?${params}`);
      setUsers(response.data.data || []);
      setPagination(response.data.meta || {});
      setError('');
    } catch (error) {
      setError('Failed to load users');
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await api.get('/admin/users/stats');
      setStats(response.data.data || {});
    } catch (error) {
      console.error('Failed to load user stats:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleStatusChange = async (userId, isActive) => {
    try {
      await api.patch(`/admin/users/${userId}/activate`, { is_active: isActive });
      loadUsers();
    } catch (error) {
      setError('Failed to update user status');
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      await api.patch(`/admin/users/${userId}/role`, { role });
      loadUsers();
    } catch (error) {
      setError('Failed to update user role');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      loadUsers();
      loadStats();
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>User Management</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <h4>Total Users</h4>
          <div className="number">{stats.total_users || 0}</div>
        </div>
        
        <div className="stat-card">
          <h4>Active Users</h4>
          <div className="number">{stats.active_users || 0}</div>
        </div>
        
        <div className="stat-card">
          <h4>Agents</h4>
          <div className="number">{stats.agent_users || 0}</div>
        </div>
        
        <div className="stat-card">
          <h4>Admins</h4>
          <div className="number">{stats.admin_users || 0}</div>
        </div>
      </div>

      <div className="filters">
        <div className="search-bar">
          <input
            type="text"
            name="q"
            placeholder="Search users..."
            value={filters.q}
            onChange={handleFilterChange}
          />
        </div>
        
        <select name="role" value={filters.role} onChange={handleFilterChange}>
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>
        
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Email Verified</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      style={{ fontSize: '0.9rem', padding: '0.25rem' }}
                    >
                      <option value="user">User</option>
                      <option value="agent">Agent</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={user.is_active ? 'active' : 'inactive'}
                      onChange={(e) => handleStatusChange(user.id, e.target.value === 'active')}
                      style={{ fontSize: '0.9rem', padding: '0.25rem' }}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </td>
                  <td>{user.email_verified ? 'Yes' : 'No'}</td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-secondary">View Details</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pagination.total > pagination.limit && (
            <div className="pagination">
              <button 
                className="btn" 
                disabled={pagination.page <= 1}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Previous
              </button>
              
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`btn ${page === pagination.page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              
              <button 
                className="btn" 
                disabled={pagination.page >= pagination.pages}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Users;