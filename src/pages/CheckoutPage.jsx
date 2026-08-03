import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill out all required fields.');
      return;
    }

    clearCart();
    navigate('/thank-you');
  };

  return (
    <div className="container" style={{ maxWidth: '700px', margin: '3rem auto' }}>
      <div className="checkout-card">
        <h2><i className="fas fa-truck-loading"></i> Delivery & Checkout</h2>
        <p>Enter your details below to finalize your order.</p>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input 
              type="text" 
              name="name" 
              required 
              placeholder="e.g. Rahul Sharma" 
              value={formData.name} 
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input 
              type="tel" 
              name="phone" 
              required 
              placeholder="e.g. +91 9876543210" 
              value={formData.phone} 
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Delivery Address *</label>
            <textarea 
              name="address" 
              required 
              rows="3"
              placeholder="House/Flat No., Street, Landmark" 
              value={formData.address} 
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input 
                type="text" 
                name="city" 
                placeholder="e.g. Bengaluru" 
                value={formData.city} 
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input 
                type="text" 
                name="pincode" 
                placeholder="e.g. 560001" 
                value={formData.pincode} 
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="order-summary-box">
            <h3>Order Summary</h3>
            <p>Total Items: {cartItems.length}</p>
            <p className="summary-total">Total Payable: ₹{cartTotal}</p>
          </div>

          <button type="submit" className="btn submit-order-btn">
            <i className="fas fa-check-circle"></i> Place Order Now
          </button>
        </form>
      </div>
    </div>
  );
};
