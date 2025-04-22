// components/home/FeaturedProducts.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard'; // Assuming ProductCard is in the ../products directory
import './FeaturedProducts.css'; // Import CSS for styling

const FeaturedProducts = ({ title, products }) => {
  return (
    <div className="featured-products">
      <div className="section-header">
        <h2>{title}</h2>
        <Link to="/products" className="view-all">
          View All
        </Link>
      </div>

      <div className="products-grid">
        {/* Check if products is an array before mapping */}
        {Array.isArray(products) && products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
        {/* Display a message if products is not an array or is empty */}
        {!Array.isArray(products) && <p className="error-message">Featured products data is not valid.</p>}
        {Array.isArray(products) && products.length === 0 && <p className="empty-message">No featured products available.</p>}
      </div>
    </div>
  );
};

export default FeaturedProducts;