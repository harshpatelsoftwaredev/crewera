import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const PropertyForm = ({ property, onClose }) => {
  const [formData, setFormData] = useState({
    // Basic Info
    project_name: '',
    property_type: 'Residential',
    special_type: 'None',
    builder_name: '',
    description: '',
    
    // Units
    total_units: '',
    available_units: '',
    
    // Location
    address: '',
    city: '',
    state: '',
    zip_code: '',
    latitude: '',
    longitude: '',
    
    // Construction
    construction_stage: 'Under Construction',
    completion_percent: '',
    expected_completion: '',
    possession_date: '',
    
    // Legal
    rera_number: '',
    rera_status: 'Registered',
    
    // Features
    is_featured: false
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (property) {
      // Load existing property data
      loadPropertyDetails();
    }
  }, [property]);

  const loadPropertyDetails = async () => {
    if (!property) return;
    
    setLoading(true);
    try {
      // Load basic property data
      setFormData({
        project_name: property.project_name || '',
        property_type: property.property_type || 'Residential',
        special_type: property.special_type || 'None',
        builder_name: property.builder_name || '',
        description: property.description || '',
        total_units: property.total_units || '',
        available_units: property.available_units || '',
        address: property.address || '',
        city: property.city || '',
        state: property.state || '',
        zip_code: property.zip_code || '',
        latitude: property.latitude || '',
        longitude: property.longitude || '',
        construction_stage: property.construction_stage || 'Under Construction',
        completion_percent: property.completion_percent || '',
        expected_completion: property.expected_completion || '',
        possession_date: property.possession_date || '',
        rera_number: property.rera_number || '',
        rera_status: property.rera_status || 'Registered',
        is_featured: property.is_featured || false
      });
    } catch (error) {
      setError('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (property) {
        // Update existing property
        await api.put(`/admin/properties/${property.id}`, formData);
        setSuccess('Property updated successfully');
      } else {
        // Create new property
        await api.post('/admin/properties', formData);
        setSuccess('Property created successfully');
      }
      
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save property');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'location', label: 'Location' },
    { id: 'construction', label: 'Construction' },
    { id: 'legal', label: 'Legal' },
    { id: 'features', label: 'Features' }
  ];

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{property ? 'Edit Property' : 'Add New Property'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content" style={{ display: activeTab === 'basic' ? 'block' : 'none' }}>
            <div className="form-group">
              <label>Project Name *</label>
              <input
                type="text"
                name="project_name"
                value={formData.project_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Property Type *</label>
              <select name="property_type" value={formData.property_type} onChange={handleChange} required>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Mixed">Mixed</option>
                <option value="Industrial">Industrial</option>
                <option value="Agricultural">Agricultural</option>
              </select>
            </div>

            <div className="form-group">
              <label>Special Type</label>
              <select name="special_type" value={formData.special_type} onChange={handleChange}>
                <option value="None">None</option>
                <option value="Pent House">Pent House</option>
                <option value="Duplex">Duplex</option>
                <option value="Triplex">Triplex</option>
                <option value="Villa">Villa</option>
                <option value="Bungalow">Bungalow</option>
                <option value="Farmhouse">Farmhouse</option>
                <option value="Studio">Studio</option>
              </select>
            </div>

            <div className="form-group">
              <label>Builder/Developer Name</label>
              <input
                type="text"
                name="builder_name"
                value={formData.builder_name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Total Units</label>
                <input
                  type="number"
                  name="total_units"
                  value={formData.total_units}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Available Units</label>
                <input
                  type="number"
                  name="available_units"
                  value={formData.available_units}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="tab-content" style={{ display: activeTab === 'location' ? 'block' : 'none' }}>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  type="text"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Latitude</label>
                <input
                  type="number"
                  step="any"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Longitude</label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="tab-content" style={{ display: activeTab === 'construction' ? 'block' : 'none' }}>
            <div className="form-group">
              <label>Construction Stage</label>
              <select name="construction_stage" value={formData.construction_stage} onChange={handleChange}>
                <option value="Under Construction">Under Construction</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="New Launch">New Launch</option>
                <option value="Pre Launch">Pre Launch</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Completion Percentage</label>
              <input
                type="number"
                min="0"
                max="100"
                name="completion_percent"
                value={formData.completion_percent}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label>Expected Completion Date</label>
                <input
                  type="date"
                  name="expected_completion"
                  value={formData.expected_completion}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Possession Date</label>
                <input
                  type="date"
                  name="possession_date"
                  value={formData.possession_date}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="tab-content" style={{ display: activeTab === 'legal' ? 'block' : 'none' }}>
            <div className="form-group">
              <label>RERA Number</label>
              <input
                type="text"
                name="rera_number"
                value={formData.rera_number}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>RERA Status</label>
              <select name="rera_status" value={formData.rera_status} onChange={handleChange}>
                <option value="Registered">Registered</option>
                <option value="Not Registered">Not Registered</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="tab-content" style={{ display: activeTab === 'features' ? 'block' : 'none' }}>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  style={{ marginRight: '0.5rem' }}
                />
                Featured Property
              </label>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Saving...' : (property ? 'Update Property' : 'Create Property')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;