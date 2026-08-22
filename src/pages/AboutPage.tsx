import React from 'react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <section className="bg-green-600 text-white rounded-2xl p-10 md:p-16 text-center shadow-lg mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🍽 Welcome to FreshBite</h1>
        <p className="text-xl md:text-2xl font-light opacity-90 max-w-3xl mx-auto">
          Your ultimate culinary companion for recipes & fresh ingredient delivery.
        </p>
      </section>

      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Why FreshBite?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            FreshBite brings you mouth-watering recipes and lets you order all the fresh ingredients 
            you need in just a few clicks. Whether you're craving authentic Indian classics, 
            crispy evening snacks, or refreshing beverages, we've got you covered with step-by-step guides 
            and doorstep ingredient delivery!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center border-t-4 border-green-500 hover:shadow-lg transition">
            <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-book-open text-3xl text-green-600 dark:text-green-400"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Curated Recipes</h3>
            <p className="text-gray-600 dark:text-gray-400">Step-by-step instructions with exact measurements and cooking tips.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center border-t-4 border-green-500 hover:shadow-lg transition">
            <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-truck-fast text-3xl text-green-600 dark:text-green-400"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Fresh Delivery</h3>
            <p className="text-gray-600 dark:text-gray-400">Farm-fresh ingredients delivered straight to your kitchen hassle-free.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center border-t-4 border-green-500 hover:shadow-lg transition">
            <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-wallet text-3xl text-green-600 dark:text-green-400"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Flexible Payments</h3>
            <p className="text-gray-600 dark:text-gray-400">Supports Cash on Delivery and instant UPI QR payments.</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-10 text-center shadow-sm">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Ready to start cooking?</h3>
        <Link to="/recipes" className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition text-lg">
          <i className="fas fa-utensils mr-2"></i> Explore Our Recipes
        </Link>
      </div>
    </div>
  );
};
