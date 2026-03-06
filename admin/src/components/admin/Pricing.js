import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Pricing = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    if (selectedProperty) {
      loadPricing();
    }
  }, [selectedProperty]);

  const loadProperties = async () => {
    try {
      const response = await api.get('/admin/properties?page=1&limit=100');
      setProperties(response.data.data || []);
    } catch (error) {
      console.error('Failed to load properties:', error);
    }
  };

  const loadPricing = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/pricing/${selectedProperty}/pricing`);
      setPricing(response.data.data || []);
      setError('');
    } catch (error) {
      setError('Failed to load pricing');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePricing = async (pricingId) => {
    if (!window.confirm('Are you sure you want to delete this pricing?')) return;

    try {
      await api.delete(`/admin/pricing/${pricingId}`);
      loadPricing();
    } catch (error) {
      setError('Failed to delete pricing');
    }
  };

  return (
    <div>
      <h1>Pricing & Units Management</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <h3>Select Property</h3>
        <div className="form-group">
          <label>Property:</label>
          <select 
            value={selectedProperty} 
            onChange={(e) => setSelectedProperty(e.target.value)}
          >
            <option value="">Select a property...</option>
            {properties.map(property => (
              <option key={property.id} value={property.id}>
                {property.project_name} ({property.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedProperty && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Pricing for Selected Property</h3>
            <button className="btn">Add New Pricing</button>
          </div>

          {loading ? (
            <div className="loading">Loading pricing...</div>
          ) : pricing.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>BHK Type</th>
                  <th>Price</th>
                  <th>Total Units</th>
                  <th>Available Units</th>
                  <th>Carpet Area</th>
                  <th>Super Built-up</th>
                  <th>ROI</th>
                  <th>Price/sqft</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map(item => (
                  <tr key={item.id}>
                    <td>{item.bhk_type}</td>
                    <td>₹{item.price?.toLocaleString()}</td>
                    <td>{item.total_units}</td>
                    <td>{item.available_units}</td>
                    <td>{item.size_carpet} sq ft</td>
                    <td>{item.size_super_buildup} sq ft</td>
                    <td>{item.roi}%</td>
                    <td>₹{item.price_per_sqft}</td>
                    <td>
                      <button className="btn btn-secondary">Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDeletePricing(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No pricing information available for this property.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Pricing;