// pages/ProfilePage.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave } from 'react-icons/fa';
// import './ProfilePage.css';  

const ProfilePage = () => {
  const { isAuthenticated, user, updateProfile, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      navigate('/login?redirect=/profile');
      return;
    }

    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [isAuthenticated, navigate, user, authLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdateError('');
    setUpdateSuccess('');
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setUpdateError('');
    setUpdateSuccess('');
  };

  const handleSaveClick = async () => {
    setLoading(true);
    setUpdateError('');
    setUpdateSuccess('');

    const result = await updateProfile(profileData);

    if (result.success) {
      setUpdateSuccess('Profile updated successfully!');
      setIsEditing(false);
    } else {
      setUpdateError(result.message || 'Failed to update profile.');
    }

    setLoading(false);
  };

  if (authLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!isAuthenticated && !authLoading) {
    return null; // Redirected to login
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1><FaUser className="profile-icon" /> Your Profile</h1>

        {updateError && <div className="alert alert-error">{updateError}</div>}
        {updateSuccess && <div className="alert alert-success">{updateSuccess}</div>}

        <div className="profile-details">
          <div className="detail-item">
            <FaUser className="detail-icon" />
            <strong>Name:</strong>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
              />
            ) : (
              <span>{profileData.name}</span>
            )}
          </div>

          <div className="detail-item">
            <FaEnvelope className="detail-icon" />
            <strong>Email:</strong>
            <span>{profileData.email}</span> {/* Email is usually not editable for security */}
          </div>

          <div className="detail-item">
            <FaPhone className="detail-icon" />
            <strong>Phone:</strong>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
              />
            ) : (
              <span>{profileData.phone}</span>
            )}
          </div>

          <div className="detail-item">
            <FaMapMarkerAlt className="detail-icon" />
            <strong>Address:</strong>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleChange}
              />
            ) : (
              <span>{profileData.address}</span>
            )}
          </div>

          <div className="profile-actions">
            {!isEditing ? (
              <button onClick={handleEditClick} className="edit-button">Edit Profile</button>
            ) : (
              <>
                <button onClick={handleSaveClick} className="save-button" disabled={loading}>
                  <FaSave /> {loading ? 'Saving...' : 'Save'}
                </button>
                <button onClick={handleCancelClick} className="cancel-button">Cancel</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;