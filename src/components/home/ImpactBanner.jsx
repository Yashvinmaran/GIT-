import React from 'react';
import { FaUsers, FaLeaf, FaHandshake, FaRupeeSign } from 'react-icons/fa';
// import './ImpactBanner.css';

const ImpactBanner = () => {
  const stats = [
    {
      id: 1,
      icon: <FaUsers />,
      number: '10,000+',
      label: 'Farmers Connected'
    },
    {
      id: 2,
      icon: <FaLeaf />,
      number: '25+',
      label: 'Crop Varieties'
    },
    {
      id: 3,
      icon: <FaHandshake />,
      number: '50,000+',
      label: 'Transactions Completed'
    },
    {
      id: 4,
      icon: <FaRupeeSign />,
      number: '₹2 Cr+',
      label: 'Additional Farmer Income Generated'
    }
  ];

  return (
    <div className="impact-banner">
      <h2>Our Impact</h2>
      <div className="stats-container">
        {stats.map(stat => (
          <div key={stat.id} className="stat-item">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactBanner;
