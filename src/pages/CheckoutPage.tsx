import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CheckoutPage: React.FC = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill out all required fields.');
      return;
    }

    clearCart();
    navigate('/thank-you');
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
        <div className="text-center mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex justify-center items-center gap-3">
            <i className="fas fa-truck-loading text-green-500"></i> Delivery & Checkout
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Enter your details below to finalize your order.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
            <input 
              type="text" 
              name="name" 
              required 
              placeholder="e.g. Rahul Sharma" 
              value={formData.name} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-gray-700 dark:text-white transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Phone Number *</label>
            <input 
              type="tel" 
              name="phone" 
              required 
              placeholder="e.g. +91 9876543210" 
              value={formData.phone} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-gray-700 dark:text-white transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Delivery Address *</label>
            <textarea 
              name="address" 
              required 
              rows={3}
              placeholder="House/Flat No., Street, Landmark" 
              value={formData.address} 
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-gray-700 dark:text-white transition resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">City</label>
              <input 
                type="text" 
                name="city" 
                placeholder="e.g. Bengaluru" 
                value={formData.city} 
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-gray-700 dark:text-white transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Pincode</label>
              <input 
                type="text" 
                name="pincode" 
                placeholder="e.g. 560001" 
                value={formData.pincode} 
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-gray-700 dark:text-white transition"
              />
            </div>
          </div>

          <div className="mt-8 bg-green-50 dark:bg-gray-700/50 rounded-lg p-5 border border-green-100 dark:border-gray-600">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3 border-b border-gray-200 dark:border-gray-600 pb-2">Order Summary</h3>
            <div className="flex justify-between items-center mb-1 text-gray-600 dark:text-gray-300">
              <span>Total Items:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg text-gray-900 dark:text-gray-100 mt-2">
              <span>Total Payable:</span>
              <span className="text-green-600 dark:text-green-400">₹{cartTotal}</span>
            </div>
          </div>

          <button type="submit" className="w-full mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md shadow transition flex justify-center items-center gap-2 text-lg">
            <i className="fas fa-check-circle"></i> Place Order Now
          </button>
        </form>
      </div>
    </div>
  );
};
