import React from 'react';
import { Link } from 'react-router-dom';

export const RecipeCard = ({ recipe }) => {
  return (
    <div className="card">
      <div className="card-img-wrapper">
        <img src={recipe.image} alt={recipe.title} loading="lazy" />
        <span className="category-badge">{recipe.category}</span>
      </div>
      <div className="card-content">
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <Link to={`/recipe/${recipe.id}`} className="btn">
          View Recipe <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};
