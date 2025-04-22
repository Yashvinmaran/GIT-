import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
// import './CartPage.css';

const CartPage = () => {
  const { cartItems, totalAmount, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = '/login?redirect=/checkout';
      return;
    }
    
    // Otherwise proceed to checkout
    window.location.href = '/checkout';
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <FaShoppingCart className="empty-cart-icon" />
          <h2>Your FasalKart is Empty</h2>
          <p>Looks like you haven't added any farm fresh products to your cart yet.</p>
          <Link to="/" className="continue-shopping-btn">
            <FaArrowLeft /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your FasalKart</h1>
        <button className="clear-cart-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
      
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="item-details">
                <Link to={`/product/${item.id}`} className="item-name">
                  {item.name}
                </Link>
                <p className="item-variety">{item.variety}</p>
                <p className="item-seller">Sold by: {item.seller.name}</p>
                <p className="item-location"><FaShoppingCart /> {item.location}</p>
              </div>
              
              <div className="item-quantity">
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={item.quantity} 
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
              
              <div className="item-price">
                <p className="price-per-unit">₹{item.price}/{item.unit}</p>
                <p className="price-total">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
              
              <button 
                className="remove-item" 
                onClick={() => removeFromCart(item.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-items">
            <div className="summary-item">
              <span>Items ({cartItems.length}):</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Delivery:</span>
              <span>₹50.00</span>
            </div>
            <div className="summary-item">
              <span>GST (5%):</span>
              <span>₹{(totalAmount * 0.05).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="summary-total">
            <span>Total:</span>
            <span>₹{(totalAmount + 50 + totalAmount * 0.05).toFixed(2)}</span>
          </div>
          
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          
          <Link to="/" className="continue-shopping">
            <FaArrowLeft /> Continue Shopping
          </Link>
          <Link to="/" className="continue-shopping">
            <FaArrowLeft /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;