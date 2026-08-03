import React from 'react';
import { Link } from 'react-router-dom';

export const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>🍽 Welcome to FreshBite</h1>
          <p>Your ultimate culinary companion for recipes & fresh ingredient delivery.</p>
        </div>
      </section>

      <div className="section about-section">
        <h2>Why FreshBite?</h2>
        <p className="about-text">
          FreshBite brings you mouth-watering recipes and lets you order all the fresh ingredients 
          you need in just a few clicks. Whether you're craving authentic Indian classics, 
          crispy evening snacks, or refreshing beverages, we've got you covered with step-by-step guides 
          and doorstep ingredient delivery!
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-book-open fa-2x"></i>
            <h3>Curated Recipes</h3>
            <p>Step-by-step instructions with exact measurements and cooking tips.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-truck-fast fa-2x"></i>
            <h3>Fresh Delivery</h3>
            <p>Farm-fresh ingredients delivered straight to your kitchen hassle-free.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-wallet fa-2x"></i>
            <h3>Flexible Payments</h3>
            <p>Supports Cash on Delivery and instant UPI QR payments.</p>
          </div>
        </div>

        <div className="cta-box">
          <h3>Ready to start cooking?</h3>
          <Link to="/recipes" className="btn">
            <i className="fas fa-utensils"></i> Explore Our Recipes
          </Link>
        </div>
      </div>
    </div>
  );
};
