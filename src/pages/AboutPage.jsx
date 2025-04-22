// pages/AboutPage.js
import React from 'react';
import { FaInfoCircle, FaUsers, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import './AboutPage.css'; // Import CSS for styling

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1><FaInfoCircle className="about-icon" /> About FasalBazaar</h1>
        <p className="mission-statement">
          Our mission is to connect farmers directly with consumers, creating a transparent and efficient marketplace for agricultural products. We aim to empower farmers by providing them with better prices and wider reach, while offering consumers fresh and high-quality produce.
        </p>

        <section className="our-story">
          <h2><FaUsers className="section-icon" /> Our Story</h2>
          <p>
            FasalBazaar was founded with the vision of bridging the gap between the hardworking farmers of India and the consumers who seek fresh and nutritious food. We recognized the challenges faced by farmers in reaching the right markets and the desire of consumers for direct access to farm-fresh products.
          </p>
          <p>
            Starting as a small initiative in Bhopal, Madhya Pradesh, we have grown into a platform that serves various regions, fostering a community built on trust and mutual benefit. We are committed to sustainable practices and fair trade.
          </p>
        </section>

        <section className="our-values">
          <h2><FaCheck className="section-icon" /> Our Core Values</h2>
          <ul>
            <li><strong>Transparency:</strong> We believe in open and honest transactions between farmers and consumers.</li>
            <li><strong>Empowerment:</strong> We strive to empower farmers with the tools and platform they need to succeed.</li>
            <li><strong>Quality:</strong> We are committed to ensuring the quality and freshness of the products offered on our platform.</li>
            <li><strong>Sustainability:</strong> We promote environmentally friendly and sustainable farming practices.</li>
            <li><strong>Community:</strong> We aim to build a strong and supportive community for both farmers and consumers.</li>
          </ul>
        </section>

        <section className="contact-us">
          <h2><FaMapMarkerAlt className="section-icon" /> Contact Us</h2>
          <p>
            Have questions or feedback? We'd love to hear from you!
          </p>
          <p>
            Email: <a href="mailto:info@fasalbazaar.com">info@fasalbazaar.com</a>
          </p>
          <p>
            Address: [Your Company Address in Bhopal, Madhya Pradesh]
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;