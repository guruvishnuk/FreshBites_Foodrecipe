import React from 'react';
import { Link } from 'react-router-dom';
import { recipes } from '../data/recipes';
import { RecipeCard } from '../components/RecipeCard';
import { Slideshow } from '../components/Slideshow';

export const HomePage = () => {
  const popularRecipes = recipes.filter(r => r.popular).slice(0, 6);

  return (
    <div className="home-page">
      <section className="hero">
        <video autoPlay muted loop playsInline>
          <source src="/video/2583492-hd_1920_1080_24fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
          <h1>Cook it. Love it. Share it.</h1>
          <p>Explore easy-to-follow recipes and order fresh ingredients online with one click.</p>
          <div className="hero-buttons">
            <Link to="/recipes" className="hero-btn primary">
              <i className="fas fa-search"></i> Explore Recipes
            </Link>
            <Link to="/cart" className="hero-btn secondary">
              <i className="fas fa-shopping-cart"></i> View Cart
            </Link>
          </div>
        </div>
      </section>

      <Slideshow />

      <section className="highlight-section">
        <h2><i className="fas fa-star" style={{ color: '#ffb703' }}></i> Popular Recipes</h2>
        <div className="cards">
          {popularRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section className="testimonial-section">
        <h2><i className="fas fa-quote-left"></i> What Our Foodies Say</h2>
        <div className="testimonial">
          <p>"FreshBite has made my cooking so much easier! I love how I can find a recipe and instantly shop the exact fresh ingredients delivered to my doorstep."</p>
          <div className="author">– Ananya Sharma, Home Chef</div>
        </div>
      </section>
    </div>
  );
};
