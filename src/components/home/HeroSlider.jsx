import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import './HeroSlider.css';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      image: '/images/slider/farmers-field.jpg',
      title: 'Direct from Farm to Market',
      description: 'Buy fresh produce directly from farmers with zero middlemen',
      buttonText: 'Shop Now',
      buttonLink: '/category/vegetables'
    },
    {
      id: 2,
      image: '/images/slider/organic-produce.jpg',
      title: 'Organic & Sustainable Farming',
      description: 'Support sustainable agriculture and organic farming practices',
      buttonText: 'Explore Organic',
      buttonLink: '/category/organic'
    },
    {
      id: 3,
      image: '/images/slider/rural-economy.jpg',
      title: 'Empower Rural Economy',
      description: 'Help farmers get better prices and grow their businesses',
      buttonText: 'Learn More',
      buttonLink: '/about'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="hero-slider">
      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.title} />
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <Link to={slide.buttonLink} className="cta-button">
                {slide.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
