import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>FasalBazaar</h3>
          <p>Connecting farmers directly to consumers, eliminating middlemen and ensuring fair prices for all.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/sell">Sell Your Produce</Link></li>
            <li><Link to="/yield-calculator">Yield Calculator</Link></li>
            <li><Link to="/blog">Farming Tips</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li><Link to="/category/grains">Grains</Link></li>
            <li><Link to="/category/vegetables">Vegetables</Link></li>
            <li><Link to="/category/fruits">Fruits</Link></li>
            <li><Link to="/category/pulses">Pulses</Link></li>
            <li><Link to="/category/organic">Organic Produce</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p><FaPhone /> +91 98765 43210</p>
            <p><FaEnvelope /> support@fasalbazaar.com</p>
            <p><FaMapMarkerAlt /> Agricultural Innovation Center, Sector 62, Noida, UP, India</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FasalBazaar. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/refund">Refund Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
