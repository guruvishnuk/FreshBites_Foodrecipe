import React from 'react';
import { Link } from 'react-router-dom';

export const ThankYouPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 min-h-[60vh]">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-2xl w-full border-t-4 border-green-500">
        <div className="mb-6 animate-bounce">
          <i className="fas fa-check-circle text-6xl md:text-7xl text-green-500"></i>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">🎉 Order Confirmed!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
          We appreciate your trust in <strong className="text-green-600 dark:text-green-400">FreshBite</strong>. Your fresh ingredients are being packed with care and will arrive soon! 🚚
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-12 text-sm md:text-base">
          <div className="flex flex-col items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shadow-inner">
              <i className="fas fa-clipboard-check text-xl"></i>
            </div>
            <span>Order Placed</span>
          </div>
          <div className="hidden sm:block w-8 border-b-2 border-dashed border-gray-300 dark:border-gray-600"></div>
          <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500 font-medium">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <i className="fas fa-box-open text-xl"></i>
            </div>
            <span>Packing Fresh</span>
          </div>
          <div className="hidden sm:block w-8 border-b-2 border-dashed border-gray-300 dark:border-gray-600"></div>
          <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500 font-medium">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <i className="fas fa-motorcycle text-xl"></i>
            </div>
            <span>Out for Delivery</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-md transition flex items-center justify-center gap-2">
            <i className="fas fa-home"></i> Back to Home
          </Link>
          <Link to="/recipes" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition flex items-center justify-center gap-2 shadow-md">
            <i className="fas fa-utensils"></i> Explore More Recipes
          </Link>
        </div>
      </div>
    </div>
  );
};
