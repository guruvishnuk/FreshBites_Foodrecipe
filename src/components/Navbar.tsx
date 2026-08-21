import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Floating Action Bar */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        <button 
          className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition" 
          onClick={toggleDarkMode} 
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
        <button 
          className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          title="Go to top"
        >
          <i className="fas fa-chevron-up"></i>
        </button>
      </div>

      {/* Brand Header */}
      <header className="bg-green-600 text-white py-4 text-center">
        <Link to="/" className="text-3xl font-bold flex items-center justify-center gap-2" onClick={closeMobileMenu}>
          <i className="fas fa-utensils"></i> FreshBite
        </Link>
        <p className="text-sm mt-1 opacity-90">Your go-to place for delicious recipes and fresh ingredients</p>
      </header>

      {/* Main Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40 px-4 md:px-8 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-green-600 flex items-center gap-2" onClick={closeMobileMenu}>
          <i className="fas fa-leaf"></i> FreshBite
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden text-gray-600 dark:text-gray-300 text-2xl" 
          onClick={() => setMobileMenuOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
        >
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        {/* Nav Links */}
        <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-white dark:bg-gray-800 shadow-md md:shadow-none p-4 md:p-0 gap-4 md:gap-6 items-center transition-all duration-300`}>
          <Link to="/" className={`flex items-center gap-1 hover:text-green-600 transition ${isActive('/') ? 'text-green-600 font-semibold' : 'text-gray-600 dark:text-gray-300'}`} onClick={closeMobileMenu}>
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/recipes" className={`flex items-center gap-1 hover:text-green-600 transition ${isActive('/recipes') ? 'text-green-600 font-semibold' : 'text-gray-600 dark:text-gray-300'}`} onClick={closeMobileMenu}>
            <i className="fas fa-book-open"></i> Recipes
          </Link>
          <Link to="/cart" className={`flex items-center gap-1 relative hover:text-green-600 transition ${isActive('/cart') ? 'text-green-600 font-semibold' : 'text-gray-600 dark:text-gray-300'}`} onClick={closeMobileMenu}>
            <i className="fas fa-shopping-cart"></i> Cart
            {cartItems.length > 0 && <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{cartItems.length}</span>}
          </Link>
          <Link to="/about" className={`flex items-center gap-1 hover:text-green-600 transition ${isActive('/about') ? 'text-green-600 font-semibold' : 'text-gray-600 dark:text-gray-300'}`} onClick={closeMobileMenu}>
            <i className="fas fa-info-circle"></i> About
          </Link>
          <button 
            className="flex items-center gap-1 hover:text-green-600 transition text-gray-600 dark:text-gray-300" 
            onClick={() => { setShowSearch(prev => !prev); closeMobileMenu(); }}
          >
            <i className="fas fa-search"></i> Search
          </button>
          <Link to="/login" className={`flex items-center gap-1 hover:text-green-600 transition ${isActive('/login') ? 'text-green-600 font-semibold' : 'text-gray-600 dark:text-gray-300'}`} onClick={closeMobileMenu}>
            <i className="fas fa-sign-in-alt"></i> Login
          </Link>
          <Link to="/signup" className={`flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition ${isActive('/signup') ? 'bg-green-700' : ''}`} onClick={closeMobileMenu}>
            <i className="fas fa-user-plus"></i> Sign Up
          </Link>
        </div>
      </nav>

      {/* Search Bar Overlay */}
      {showSearch && (
        <div className="bg-gray-100 dark:bg-gray-700 py-3 px-4 shadow-inner">
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto flex gap-2">
            <input 
              type="text" 
              placeholder="Search recipes, ingredients..." 
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>
        </div>
      )}
    </>
  );
};
