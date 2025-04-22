// components/home/DownloadApp.js
import React from 'react';
import './DownloadApp.css'; // Import CSS for styling
import { FaMobileAlt, FaGooglePlay, FaAppStore } from 'react-icons/fa';

const DownloadApp = () => {
  return (
    <div className="download-app-section">
      <div className="download-content">
        <FaMobileAlt className="mobile-icon" />
        <h2>Get the FasalBazaar App!</h2>
        <p>Experience seamless shopping and connect with farmers on the go. Download our app today!</p>
        <div className="download-buttons">
          <a href="https://play.google.com/store/apps/" target="_blank" rel="noopener noreferrer" className="play-store-button">
            <FaGooglePlay className="button-icon" /> Google Play
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="app-store-button">
            <FaAppStore className="button-icon" /> App Store
          </a>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;