import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaUser, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaTruck, FaCheck, FaHeart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
// import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const [productRes, relatedRes] = await Promise.all([
          api.get(`/products/${productId}`),
          api.get(`/products/related/${productId}`)
        ]);
        
        setProduct(productRes.data);
        setRelatedProducts(relatedRes.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, [productId]);
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const handleContactSeller = () => {
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = `/login?redirect=/product/${productId}`;
      return;
    }
    
    // Otherwise handle contacting seller
    console.log('Contact seller logic here');
  };
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (!product) {
    return <div className="error">Product not found</div>;
  }
  
  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <div className="product-images">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
            {product.isVerified && <span className="verified-badge">VERIFIED FARMER</span>}
          </div>
          <div className="image-thumbnails">
            {product.additionalImages && product.additionalImages.map((img, index) => (
              <img key={index} src={img} alt={`${product.name} ${index + 1}`} />
            ))}
          </div>
        </div>
        
        <div className="product-info">
          <div className="product-header">
            <h1>{product.name}</h1>
            <button className="wishlist-btn">
              <FaHeart />
            </button>
          </div>
          
          <div className="product-meta">
            <span className="product-category">
              <Link to={`/category/${product.category.id}`}>{product.category.name}</Link>
            </span>
            <span className="product-rating">
              <FaStar /> {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
          
          <div className="product-price">
            <h2>₹{product.price}/{product.unit}</h2>
            {product.oldPrice && (
              <span className="old-price">₹{product.oldPrice}/{product.unit}</span>
            )}
            {product.discount && <span className="discount-tag">{product.discount}% OFF</span>}
          </div>
          
          <div className="product-availability">
            <p><strong>Available Quantity:</strong> {product.availableQuantity} {product.unit}</p>
            <p><strong>Minimum Order:</strong> {product.minOrder} {product.unit}</p>
          </div>
          
          <div className="product-harvest">
            <p><FaCalendarAlt /> Harvested on: {new Date(product.harvestDate).toLocaleDateString()}</p>
          </div>
          
          <div className="product-location">
            <p><FaMapMarkerAlt /> {product.location}</p>
          </div>
          
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity ({product.unit}):</label>
            <div className="quantity-input">
              <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>
          
          <div className="product-actions">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-now-btn">
              Buy Now
            </button>
          </div>
          
          <div className="seller-info">
            <div className="seller-avatar">
              <FaUser />
            </div>
            <div className="seller-details">
              <h3>{product.seller.name}</h3>
              <p>Farmer from {product.seller.location}</p>
              <button className="contact-seller-btn" onClick={handleContactSeller}>
                <FaPhone /> Contact Seller
              </button>
            </div>
          </div>
          
          <div className="delivery-info">
            <p><FaTruck /> Delivery available in selected areas</p>
            <p><FaCheck /> Quality checked before dispatch</p>
          </div>
        </div>
      </div>
      
      <div className="product-tabs">
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviewCount})
          </button>
        </div>
        
        <div className="tabs-content">
          {activeTab === 'description' && (
            <div className="tab-pane">
              <h3>Product Description</h3>
              <p>{product.description}</p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div className="tab-pane">
              <h3>Product Specifications</h3>
              <table className="specs-table">
                <tbody>
                  <tr>
                    <td>Variety</td>
                    <td>{product.variety}</td>
                  </tr>
                  <tr>
                    <td>Cultivation Method</td>
                    <td>{product.cultivationMethod}</td>
                  </tr>
                  <tr>
                    <td>Organic</td>
                    <td>{product.isOrganic ? 'Yes' : 'No'}</td>
                  </tr>
                  <tr>
                    <td>Chemical Free</td>
                    <td>{product.isChemicalFree ? 'Yes' : 'No'}</td>
                  </tr>
                  <tr>
                    <td>Nutritional Value</td>
                    <td>{product.nutritionalValue}</td>
                  </tr>
                  <tr>
                    <td>Storage Instructions</td>
                    <td>{product.storageInstructions}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="tab-pane">
              <h3>Customer Reviews</h3>
              {product.reviews && product.reviews.length > 0 ? (
                <div className="reviews-list">
                  {product.reviews.map(review => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <span className="reviewer-name">{review.user.name}</span>
                          <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < review.rating ? 'filled' : ''} />
                          ))}
                        </div>
                      </div>
                      <p className="review-text">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No reviews yet. Be the first to review this product!</p>
              )}
              
              {isAuthenticated ? (
                <div className="write-review">
                  <h4>Write a Review</h4>
                  <form className="review-form">
                    <div className="rating-select">
                      <span>Rating:</span>
                      <div className="stars-select">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="star-select" />
                        ))}
                      </div>
                    </div>
                    <textarea placeholder="Write your review here..." rows="4"></textarea>
                    <button type="submit" className="submit-review-btn">Submit Review</button>
                  </form>
                </div>
              ) : (
                <p>
                  <Link to={`/login?redirect=/product/${productId}`}>Log in</Link> to write a review.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="related-products">
        <h2>Related Products</h2>
        <div className="products-slider">
          {relatedProducts.map(product => (
            <div key={product.id} className="related-product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="related-product-price">₹{product.price}/{product.unit}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
