// pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import './NotFoundPage.css'; // Import CSS for styling

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <FaExclamationTriangle className="not-found-icon" />
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <p>You might have mistyped the URL or the page has been moved or deleted.</p>
        <Link to="/" className="go-home-button">Go back to Homepage</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;