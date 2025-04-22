// components/home/FarmerSpotlight.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import './FarmerSpotlight.css'; // Import CSS for styling

const FarmerSpotlight = () => {
  const [featuredFarmer, setFeaturedFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeaturedFarmer = async () => {
      setLoading(true);
      setError('');
      try {
        // Assuming your backend API endpoint for a featured farmer is '/featured-farmer'
        const response = await api.get('/featured-farmer');
        setFeaturedFarmer(response.data);
      } catch (err) {
        console.error('Error fetching featured farmer:', err);
        setError('Could not load featured farmer.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedFarmer();
  }, []);

  if (loading) {
    return <div className="farmer-spotlight loading">Loading farmer spotlight...</div>;
  }

  if (error) {
    return <div className="farmer-spotlight error">{error}</div>;
  }

  if (!featuredFarmer) {
    return null; // Or a message like "No farmer spotlight available"
  }

  return (
    <div className="farmer-spotlight">
      <h2>Farmer Spotlight</h2>
      <div className="spotlight-card">
        <div className="farmer-image-container">
          <img src={featuredFarmer.imageUrl || '/placeholder-farmer.png'} alt={featuredFarmer.name} className="farmer-image" />
        </div>
        <div className="farmer-info">
          <h3>{featuredFarmer.name}</h3>
          <p className="farmer-location"><i className="fa fa-map-marker"></i> {featuredFarmer.location || 'Bhopal, MP'}</p>
          <p className="farmer-story">
  {featuredFarmer && featuredFarmer.story ? featuredFarmer.story.substring(0, 200) + '...' : 'No story available.'}
</p>
          <Link to={`/farmer/${featuredFarmer._id}`} className="view-farmer-button">View Farmer's Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default FarmerSpotlight;