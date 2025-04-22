// pages/OrdersPage.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { FaBoxOpen, FaHistory } from 'react-icons/fa';
import './OrdersPage.css'; // Import CSS for styling

const OrdersPage = () => {
  const { isAuthenticated, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      navigate('/login?redirect=/orders');
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/orders'); // Assuming your backend API endpoint for orders is '/orders'
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch your orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, navigate, authLoading]);

  if (authLoading) {
    return <div className="loading">Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return null; // Redirected to login
  }

  if (loading) {
    return <div className="loading">Fetching your orders...</div>;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <div className="empty-orders">
          <FaBoxOpen className="empty-icon" />
          <p>You haven't placed any orders yet.</p>
          <Link to="/" className="continue-shopping-button">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1><FaHistory className="orders-icon" /> Your Orders</h1>
        <ul className="orders-list">
          {orders.map(order => (
            <li key={order._id} className="order-item">
              <div className="order-info">
                <strong>Order ID:</strong> {order._id}
              </div>
              <div className="order-info">
                <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div className="order-info">
                <strong>Total:</strong> ₹{order.totalAmount}
              </div>
              <div className="order-info">
                <strong>Status:</strong> {order.status} {/* e.g., Pending, Shipped, Delivered */}
              </div>
              <Link to={`/order/${order._id}`} className="view-details-button">View Details</Link> {/* Optional: Link to order details page */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrdersPage;