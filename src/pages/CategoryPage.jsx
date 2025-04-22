import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import api from '../utils/api';
// import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    location: '',
    sortBy: 'price-low'
  });
  
  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const [categoryRes, productsRes] = await Promise.all([
          api.get(`/categories/${categoryId}`),
          api.get(`/products/category/${categoryId}`)
        ]);
        
        setCategory(categoryRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoryData();
  }, [categoryId]);
  
  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const applyFilters = () => {
    // This would normally be done server-side, but for demonstration we'll filter client-side
    let filteredProducts = [...products];
    
    // Filter by price range
    filteredProducts = filteredProducts.filter(
      product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    
    // Filter by location if specified
    if (filters.location) {
      filteredProducts = filteredProducts.filter(
        product => product.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    return filteredProducts;
  };
  
  const filteredProducts = applyFilters();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </div>
      
      <div className="category-content">
        <aside className="filters-sidebar">
          <h3>Filters</h3>
          
          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="10000"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
              />
              <div className="range-values">
                <span>₹{filters.priceRange[0]}</span>
                <span>₹{filters.priceRange[1]}</span>
              </div>
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Location</h4>
            <input
              type="text"
              placeholder="Enter location"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <h4>Sort By</h4>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </aside>
        
        <div className="products-container">
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
