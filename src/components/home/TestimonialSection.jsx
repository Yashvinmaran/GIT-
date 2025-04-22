// components/home/TestimonialSection.js
import React, { useState, useEffect } from 'react';
import './TestimonialSection.css'; // Import CSS for styling
import { FaQuoteLeft, FaQuoteRight, FaStar } from 'react-icons/fa';

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample testimonials data (replace with your actual data fetching logic)
  const sampleTestimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      rating: 5,
      comment: 'Bahut hi achhe aur taaze sabziyaan! FasalBazaar se kharidna ek behtareen anubhav hai.',
      image: '/images/user-1.jpg' // Optional user image
    },
    {
      id: 2,
      name: 'Priya Sharma',
      rating: 4,
      comment: 'Farmers se seedhe jude hone ka concept bahut pasand aaya. Quality bhi bahut acchi hai.',
      image: '/images/user-2.jpg'
    },
    {
      id: 3,
      name: 'Suresh Patel',
      rating: 5,
      comment: 'Ghar baithe itni taazi aur organic cheezein mil jaati hain, aur kya chahiye!',
      image: '/images/user-3.jpg'
    },
    // Add more testimonials here
  ];

  useEffect(() => {
    // In a real application, you might fetch testimonials from an API
    setTestimonials(sampleTestimonials);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sampleTestimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (!testimonials || testimonials.length === 0) {
    return null; // Or a "No testimonials yet" message
  }

  const currentTestimonial = testimonials[currentIndex];

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={i} className="star-icon" />);
    }
    return stars;
  };

  return (
    <div className="testimonial-section">
      <h2>What Our Customers Say</h2>
      <div className="testimonial-card">
        <FaQuoteLeft className="quote-icon left" />
        <p className="testimonial-comment">{currentTestimonial.comment}</p>
        <FaQuoteRight className="quote-icon right" />
        <div className="testimonial-info">
          {currentTestimonial.image && (
            <img src={currentTestimonial.image} alt={currentTestimonial.name} className="user-image" />
          )}
          <div className="user-details">
            <p className="user-name">{currentTestimonial.name}</p>
            <div className="user-rating">{renderRatingStars(currentTestimonial.rating)}</div>
          </div>
        </div>
      </div>
      {testimonials.length > 1 && (
        <div className="testimonial-navigation">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              className={`nav-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialSection;