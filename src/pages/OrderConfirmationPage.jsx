// pages/OrderConfirmationPage.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaShoppingCart } from 'react-icons/fa';
import './OrderConfirmationPage.css'; // Import CSS for styling

const OrderConfirmationPage = () => {
  const { orderId } = useParams();

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <FaCheckCircle className="success-icon" />
          <h1>Order Confirmed!</h1>
        </div>
        <div className="confirmation-details">
          <p>Thank you for your order!</p>
          {orderId && <p>Your order ID is: <strong>{orderId}</strong></p>}
          <p>We will send you an email with the complete order details and tracking information shortly.</p>
        </div>
        <div className="confirmation-actions">
          <Link to="/orders" className="view-orders-button">
            <FaShoppingCart className="button-icon" /> View Your Orders
          </Link>
          <Link to="/" className="continue-shopping-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;