import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Floating Action Bar */}
      <div className="action-buttons">
        <button 
          className="dark-toggle" 
          onClick={toggleDarkMode} 
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          id="topBtn" 
          title="Go to top"
        >
          <i className="fas fa-chevron-up"></i>
        </button>
      </div>

      <header className="brand-header">
        <Link to="/" className="brand-title" onClick={closeMobileMenu}>
          <h1><i className="fas fa-utensils"></i> FreshBite</h1>
        </Link>
        <p>Your go-to place for delicious recipes and fresh ingredients</p>
      </header>

      <div className="navbar">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <i className="fas fa-leaf"></i> FreshBite
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
        >
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className={isActive('/') ? 'active' : ''} onClick={closeMobileMenu}>
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/recipes" className={isActive('/recipes') ? 'active' : ''} onClick={closeMobileMenu}>
            <i className="fas fa-book-open"></i> Recipes
          </Link>
          <Link to="/cart" className={`cart-link ${isActive('/cart') ? 'active' : ''}`} onClick={closeMobileMenu}>
            <i className="fas fa-shopping-cart"></i> Cart
            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
          </Link>
          <Link to="/about" className={isActive('/about') ? 'active' : ''} onClick={closeMobileMenu}>
            <i className="fas fa-info-circle"></i> About
          </Link>
          <button 
            className="search-btn-nav" 
            onClick={() => { setShowSearch(prev => !prev); closeMobileMenu(); }}
          >
            <i className="fas fa-search"></i> Search
          </button>
          <Link to="/login" className={isActive('/login') ? 'active' : ''} onClick={closeMobileMenu}>
            <i className="fas fa-sign-in-alt"></i> Login
          </Link>
          <Link to="/signup" className={isActive('/signup') ? 'active' : ''} onClick={closeMobileMenu}>
            <i className="fas fa-user-plus"></i> Sign Up
          </Link>
        </div>
      </div>

      {showSearch && (
        <div className="search-bar open">
          <form onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Search recipes, ingredients..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit"><i className="fas fa-arrow-right"></i></button>
          </form>
        </div>
      )}
    </>
  );
};

