import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryGrid.css';

const CategoryGrid = ({ categories }) => {
  return (
    <div className="category-grid">
      {categories.map(category => (
        <Link to={`/category/${category.id}`} key={category.id} className="category-item">
          <div className="category-image">
            <img src={category.imageUrl} alt={category.name} />
          </div>
          <h3 className="category-name">{category.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
