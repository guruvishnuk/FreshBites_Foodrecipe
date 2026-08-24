import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, UtensilsCrossed, User, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const { cartItems } = useCart();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const cartItemCount = cartItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'About', path: '/about' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm py-3" 
          : "bg-background border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground p-2 rounded-2xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-primary/30">
            <UtensilsCrossed size={24} />
          </div>
          <div>
            <span className="text-2xl font-display font-bold tracking-tight text-foreground">Savora<span className="text-primary">.</span></span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={cn(
                "relative text-sm font-semibold transition-colors hover:text-primary",
                isActive(link.path) ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div 
                  layoutId="navbar-indicator"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full text-foreground hover:text-primary">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={darkMode ? 'dark' : 'light'}
                initial={{ y: -20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 20, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? <Moon size={20} /> : <Sun size={20} />}
              </motion.div>
            </AnimatePresence>
          </Button>

          <Link to="/cart" className="relative group">
            <Button variant="ghost" size="icon" className="relative rounded-full text-foreground hover:text-primary">
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-accent-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="outline" className="font-semibold rounded-full px-6 border-border hover:text-primary hover:border-primary text-foreground">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button className="font-semibold rounded-full px-6 bg-primary hover:bg-primary-hover text-primary-foreground shadow-primary/20 shadow-lg transition-transform hover:scale-105 active:scale-95">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-foreground">
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
          <button 
            className="p-2 text-foreground" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={cn(
                    "text-lg font-semibold py-2 transition-colors",
                    isActive(link.path) ? "text-primary" : "text-foreground"
                  )}
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <Link to="/cart" className="flex items-center justify-between text-lg font-semibold py-2 text-foreground" onClick={closeMobileMenu}>
                <span className="flex items-center gap-2"><ShoppingCart size={20} /> Cart</span>
                {cartItemCount > 0 && <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold">{cartItemCount} items</span>}
              </Link>
              <Link to="/login" onClick={closeMobileMenu}>
                <Button variant="outline" className="w-full justify-start mt-2 border-border hover:text-primary hover:border-primary"><User size={18} className="mr-2" /> Log In</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
