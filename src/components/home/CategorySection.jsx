// components/home/CategorySection.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import './CategorySection.css'; // Import CSS for styling

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/categories');
        console.log("API Response for Categories:", response.data); // DEBBUGGING: Check the response structure

        // Check if the response data is an array
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else if (response.data && Array.isArray(response.data.categories)) {
          // If categories are nested in an object
          setCategories(response.data.categories);
        } else if (response.data && Array.isArray(response.data.items)) {
          // Another common nesting structure
          setCategories(response.data.items);
        } else {
          setError('Invalid categories data received from the server.');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="category-section loading">Loading categories...</div>;
  }

  if (error) {
    return <div className="category-section error">{error}</div>;
  }

  return (
    <div className="category-section">
      <h2>Shop by Category</h2>
      <div className="category-grid">
        {categories.map(category => (
          <Link key={category._id} to={`/category/${category._id}`} className="category-card">
            <img src={category.imageUrl || '/placeholder-category.png'} alt={category.name} className="category-image" />
            <div className="category-name">{category.name}</div>
          </Link>
        ))}
      </div>
      {categories.length > 6 && (
        <div className="view-all-categories">
          <Link to="/categories">View All Categories</Link>
        </div>
      )}
    </div>
  );
};

export default CategorySection;