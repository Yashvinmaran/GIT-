import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaPhone } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import './RegisterPage.css';
import api from '../utils/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'consumer' // 'consumer' or 'farmer'
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const { register } = useContext(AuthContext); // Assuming your AuthContext handles global state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.phone.match(/^\d{10}$/)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/api/user/register', formData);

      if (response.data.success) {
        // Registration successful, you might want to log the user in or redirect
        console.log('Registration successful:', response.data);
        // If your AuthContext has a login function, you can call it here
        // register(response.data.user);
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        setError(response.data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred during registration. Please try again.');
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Use backend error message if available
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join FasalBazaar to buy and sell agricultural products</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="user-type-selector">
            <div className="user-type-option">
              <input
                type="radio"
                id="consumer"
                name="userType"
                value="consumer"
                checked={formData.userType === 'consumer'}
                onChange={handleChange}
              />
              <label htmlFor="consumer">I want to Buy</label>
            </div>

            <div className="user-type-option">
              <input
                type="radio"
                id="farmer"
                name="userType"
                value="farmer"
                checked={formData.userType === 'farmer'}
                onChange={handleChange}
              />
              <label htmlFor="farmer">I want to Sell</label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-with-icon">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your 10-digit phone number"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <div className="terms-agreement">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <Link to="/terms">Terms & Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;