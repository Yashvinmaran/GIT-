import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';
// import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  return (
    <div className="product-card">
      {product.isVerified && <span className="verified-tag">VERIFIED</span>}
      <Link to={`/product/${product.id}`}>
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
      </Link>
      
      <div className="product-info">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <div className="product-details">
          <p className="product-variety">{product.variety}</p>
          <p className="product-price">₹{product.price}/{product.unit}</p>
          <p className="product-location">{product.location}</p>
        </div>
        
        <div className="product-actions">
          <button className="add-to-cart" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <button className="favorite">
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
