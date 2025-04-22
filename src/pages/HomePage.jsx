// pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import CategorySection from '../components/home/CategorySection';
import TestimonialSection from '../components/home/TestimonialSection';
import FarmerSpotlight from '../components/home/FarmerSpotlight';
import BlogSection from '../components/home/BlogSection';
import DownloadApp from '../components/home/DownloadApp';
import FeaturedProducts from '../components/home/FeaturedProducts';
import api from '../utils/api';
import './HomePage.css'; // Import CSS for styling

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/products/featured'); // Assuming this endpoint returns featured products
        setFeaturedProducts(response.data);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError('Failed to load featured products.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        {/* Hero content here */}
        <h1>Welcome to FasalBazaar</h1>
        <p>Connecting farmers and consumers directly.</p>
      </section>

      <CategorySection />

      <section className="featured-products-section">
        {loading ? (
          <p>Loading featured products...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <FeaturedProducts title="Our Featured Products" products={featuredProducts} />
        )}
      </section>

      <TestimonialSection />
      {/* <FarmerSpotlight /> */}
      {/* <BlogSection /> */}
      {/* <DownloadApp /> */}

      {/* Other sections of the homepage */}
    </div>
  );
};

export default HomePage;