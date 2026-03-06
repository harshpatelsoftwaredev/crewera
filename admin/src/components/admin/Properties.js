import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import PropertyForm from './PropertyForm';
import PropertyDetails from './PropertyDetails';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    status: '',
    property_type: '',
    city: '',
    q: ''
  });
  const [pagination, setPagination] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [viewingProperty, setViewingProperty] = useState(null);

  useEffect(() => {
    loadProperties();
  }, [filters]);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await api.get(`/admin/properties?${params}`);
      setProperties(response.data.data || []);
      setPagination(response.data.meta || {});
      setError('');
    } catch (error) {
      setError('Failed to load properties');
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1 // Reset to first page when filtering
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleCreate = () => {
    setEditingProperty(null);
    setShowForm(true);
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleView = (property) => {
    setViewingProperty(property);
  };

  const handleDelete = async (propertyId) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    try {
      await api.delete(`/admin/properties/${propertyId}`);
      loadProperties();
    } catch (error) {
      setError('Failed to delete property');
    }
  };

  const handleStatusChange = async (propertyId, status) => {
    try {
      await api.patch(`/admin/properties/${propertyId}/status`, { status });
      loadProperties();
    } catch (error) {
      setError('Failed to update property status');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProperty(null);
    loadProperties();
  };

  const handleDetailsClose = () => {
    setViewingProperty(null);
  };

  if (showForm) {
    return <PropertyForm property={editingProperty} onClose={handleFormClose} />;
  }

  if (viewingProperty) {
    return <PropertyDetails property={viewingProperty} onClose={handleDetailsClose} />;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Property Management</h1>
        <button className="btn" onClick={handleCreate}>Add New Property</button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="filters">
        <div className="search-bar">
          <input
            type="text"
            name="q"
            placeholder="Search properties..."
            value={filters.q}
            onChange={handleFilterChange}
          />
        </div>
        
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending Approval">Pending Approval</option>
          <option value="Sold Out">Sold Out</option>
          <option value="Archived">Archived</option>
        </select>
        
        <select name="property_type" value={filters.property_type} onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Mixed">Mixed</option>
          <option value="Industrial">Industrial</option>
          <option value="Agricultural">Agricultural</option>
        </select>
        
        <input
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleFilterChange}
        />
      </div>

      {loading ? (
        <div className="loading">Loading properties...</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Project Name</th>
                  <th>Type</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(property => (
                  <tr key={property.id}>
                    <td>{property.id}</td>
                    <td>{property.project_name}</td>
                    <td>{property.property_type}</td>
                    <td>{property.city || 'N/A'}</td>
                    <td>
                      <select
                        value={property.status}
                        onChange={(e) => handleStatusChange(property.id, e.target.value)}
                        style={{ fontSize: '0.9rem', padding: '0.25rem' }}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending Approval">Pending Approval</option>
                        <option value="Sold Out">Sold Out</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>
                    <td>{new Date(property.created_at).toLocaleDateString()}</td>
                    <td>
                      <button className="btn" onClick={() => handleView(property)}>View</button>
                      <button className="btn btn-secondary" onClick={() => handleEdit(property)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(property.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

export default Properties;