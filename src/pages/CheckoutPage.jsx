// pages/CheckoutPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { FaShoppingCart, FaMapMarkerAlt, FaCreditCard, FaArrowRight } from 'react-icons/fa';
import './CheckoutPage.css'; // Import CSS for styling

const CheckoutPage = () => {
  const { cartItems, totalAmount, clearCart } = useContext(CartContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: user?.address || '',
    city: '',
    state: '',
    postalCode: ''
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [processingOrder, setProcessingOrder] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState('');

  if (!isAuthenticated) {
    return <div className="checkout-page">Please <Link to="/login?redirect=/checkout">login</Link> to proceed to checkout.</div>;
  }

  if (cartItems.length === 0) {
    return <div className="checkout-page">Your cart is empty. <Link to="/cart">View Cart</Link></div>;
  }

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePlaceOrder = async () => {
    setProcessingOrder(true);
    setOrderError('');
    setOrderSuccess('');

    // Simulate order placement API call
    try {
      // In a real application, you would send cartItems, shippingAddress, and paymentDetails to your backend
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay

      // For this example, just show a success message and clear the cart
      setOrderSuccess('Order placed successfully! You will receive a confirmation email shortly.');
      clearCart();
      navigate('/order-confirmation/TEMP_ORDER_ID'); // Replace with actual order ID from backend
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderError('There was an error processing your order. Please try again.');
    } finally {
      setProcessingOrder(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1><FaShoppingCart className="checkout-icon" /> Checkout</h1>

        {orderError && <div className="alert alert-error">{orderError}</div>}
        {orderSuccess && <div className="alert alert-success">{orderSuccess}</div>}

        <div className="checkout-section">
          <h2><FaMapMarkerAlt className="section-icon" /> Shipping Address</h2>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingAddress.address}
              onChange={handleShippingChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingAddress.city}
              onChange={handleShippingChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={shippingAddress.state}
              onChange={handleShippingChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={shippingAddress.postalCode}
              onChange={handleShippingChange}
              required
            />
          </div>
        </div>

        <div className="checkout-section">
          <h2><FaCreditCard className="section-icon" /> Payment Details</h2>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handlePaymentChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentDetails.expiryDate}
              onChange={handlePaymentChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handlePaymentChange}
              required
            />
          </div>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.name} x {item.quantity} - ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
          <div className="total-amount">
            <strong>Total: ₹{totalAmount}</strong>
          </div>
        </div>

        <button
          className="place-order-button"
          onClick={handlePlaceOrder}
          disabled={processingOrder}
        >
          {processingOrder ? 'Placing Order...' : <span>Place Order <FaArrowRight /></span>}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;