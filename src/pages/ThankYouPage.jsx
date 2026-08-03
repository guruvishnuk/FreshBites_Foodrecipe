import React from 'react';
import { Link } from 'react-router-dom';

export const ThankYouPage = () => {
  return (
    <div className="thankyou-wrapper">
      <div className="thankyou-container">
        <div className="success-icon">
          <i className="fas fa-check-circle fa-4x"></i>
        </div>
        <h1>🎉 Order Confirmed!</h1>
        <p className="thankyou-sub">
          We appreciate your trust in <strong>FreshBite</strong>. Your fresh ingredients are being packed with care and will arrive soon! 🚚
        </p>

        <div className="delivery-timeline">
          <div className="step active">
            <i className="fas fa-clipboard-check"></i> Order Placed
          </div>
          <div className="step">
            <i className="fas fa-box-open"></i> Packing Fresh
          </div>
          <div className="step">
            <i className="fas fa-motorcycle"></i> Out for Delivery
          </div>
        </div>

        <div className="buttons">
          <Link to="/" className="btn secondary-btn">
            <i className="fas fa-home"></i> Back to Home
          </Link>
          <Link to="/recipes" className="btn">
            <i className="fas fa-utensils"></i> Explore More Recipes
          </Link>
        </div>
      </div>
    </div>
  );
};
