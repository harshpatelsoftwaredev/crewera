import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const PropertyDetails = ({ property, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPropertyDetails();
  }, [property.id]);

  const loadPropertyDetails = async () => {
    setLoading(true);
    try {
      // Load various property details
      const [pricingRes, amenitiesRes, contactsRes, milestonesRes] = await Promise.all([
        api.get(`/admin/pricing/${property.id}/pricing`).catch(() => ({ data: { data: [] } })),
        api.get(`/admin/properties/${property.id}/amenities`).catch(() => ({ data: { data: [] } })),
        api.get(`/admin/properties/${property.id}/contacts`).catch(() => ({ data: { data: [] } })),
        api.get(`/admin/milestones/property/${property.id}`).catch(() => ({ data: { data: [] } }))
      ]);

      setDetails({
        pricing: pricingRes.data.data || [],
        amenities: amenitiesRes.data.data || [],
        contacts: contactsRes.data.data || [],
        milestones: milestonesRes.data.data || []
      });
    } catch (error) {
      setError('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'pricing', label: 'Pricing & Units' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'media', label: 'Media' }
  ];

  if (loading) {
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="loading">Loading property details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '1000px' }}>
        <div className="modal-header">
          <h2>{property.project_name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

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

        <div style={{ padding: '1rem' }}>
          {activeTab === 'overview' && (
            <div>
              <div className="grid">
                <div className="card">
                  <h3>Basic Information</h3>
                  <table className="table">
                    <tbody>
                      <tr><td><strong>Type:</strong></td><td>{property.property_type}</td></tr>
                      <tr><td><strong>Special Type:</strong></td><td>{property.special_type}</td></tr>
                      <tr><td><strong>Builder:</strong></td><td>{property.builder_name || 'N/A'}</td></tr>
                      <tr><td><strong>Status:</strong></td><td>{property.status}</td></tr>
                      <tr><td><strong>Featured:</strong></td><td>{property.is_featured ? 'Yes' : 'No'}</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="card">
                  <h3>Location</h3>
                  <table className="table">
                    <tbody>
                      <tr><td><strong>Address:</strong></td><td>{property.address || 'N/A'}</td></tr>
                      <tr><td><strong>City:</strong></td><td>{property.city || 'N/A'}</td></tr>
                      <tr><td><strong>State:</strong></td><td>{property.state || 'N/A'}</td></tr>
                      <tr><td><strong>ZIP:</strong></td><td>{property.zip_code || 'N/A'}</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="card">
                  <h3>Construction</h3>
                  <table className="table">
                    <tbody>
                      <tr><td><strong>Stage:</strong></td><td>{property.construction_stage}</td></tr>
                      <tr><td><strong>Completion:</strong></td><td>{property.completion_percent}%</td></tr>
                      <tr><td><strong>Expected:</strong></td><td>{property.expected_completion ? new Date(property.expected_completion).toLocaleDateString() : 'N/A'}</td></tr>
                      <tr><td><strong>Possession:</strong></td><td>{property.possession_date ? new Date(property.possession_date).toLocaleDateString() : 'N/A'}</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="card">
                  <h3>Units & Legal</h3>
                  <table className="table">
                    <tbody>
                      <tr><td><strong>Total Units:</strong></td><td>{property.total_units || 'N/A'}</td></tr>
                      <tr><td><strong>Available:</strong></td><td>{property.available_units || 'N/A'}</td></tr>
                      <tr><td><strong>RERA Number:</strong></td><td>{property.rera_number || 'N/A'}</td></tr>
                      <tr><td><strong>RERA Status:</strong></td><td>{property.rera_status || 'N/A'}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card">
                <h3>Description</h3>
                <p>{property.description || 'No description available.'}</p>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <button className="btn">Add Pricing</button>
              </div>
              
              {details.pricing.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>BHK Type</th>
                      <th>Price</th>
                      <th>Total Units</th>
                      <th>Available</th>
                      <th>Carpet Area</th>
                      <th>Super Built-up</th>
                      <th>ROI</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.pricing.map(item => (
                      <tr key={item.id}>
                        <td>{item.bhk_type}</td>
                        <td>₹{item.price?.toLocaleString()}</td>
                        <td>{item.total_units}</td>
                        <td>{item.available_units}</td>
                        <td>{item.size_carpet} sq ft</td>
                        <td>{item.size_super_buildup} sq ft</td>
                        <td>{item.roi}%</td>
                        <td>
                          <button className="btn btn-secondary">Edit</button>
                          <button className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No pricing information available.</p>
              )}
            </div>
          )}

          {activeTab === 'amenities' && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <button className="btn">Add Amenities</button>
              </div>
              
              {details.amenities.length > 0 ? (
                <div className="grid">
                  {details.amenities.map(item => (
                    <div key={item.id} className="card">
                      <h4>{item.amenity_name}</h4>
                      <p><strong>Category:</strong> {item.amenity_category}</p>
                      <p><strong>Premium:</strong> {item.is_premium ? 'Yes' : 'No'}</p>
                      <button className="btn btn-danger" style={{ marginTop: '0.5rem' }}>Remove</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No amenities assigned.</p>
              )}
            </div>
          )}

          {activeTab === 'contacts' && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <button className="btn">Add Contact</button>
              </div>
              
              {details.contacts.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Name</th>
                      <th>Mobile</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.contacts.map(contact => (
                      <tr key={contact.id}>
                        <td>{contact.contact_type}</td>
                        <td>{contact.name}</td>
                        <td>{contact.mobile}</td>
                        <td>{contact.email}</td>
                        <td>
                          <button className="btn btn-secondary">Edit</button>
                          <button className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No contacts available.</p>
              )}
            </div>
          )}

          {activeTab === 'milestones' && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <button className="btn">Add Milestone</button>
              </div>
              
              {details.milestones.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Target Date</th>
                      <th>Status</th>
                      <th>Completion</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.milestones.map(milestone => (
                      <tr key={milestone.id}>
                        <td>{milestone.milestone_name}</td>
                        <td>{milestone.milestone_type}</td>
                        <td>{new Date(milestone.target_date).toLocaleDateString()}</td>
                        <td>{milestone.status}</td>
                        <td>{milestone.completion_percent}%</td>
                        <td>
                          <button className="btn btn-secondary">Edit</button>
                          <button className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No milestones defined.</p>
              )}
            </div>
          )}

          {activeTab === 'media' && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <button className="btn">Upload Media</button>
              </div>
              <p>Media management will be implemented here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;