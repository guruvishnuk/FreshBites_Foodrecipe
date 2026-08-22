import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, UtensilsCrossed, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const { cartItems } = useCart();
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
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm py-3" 
          : "bg-white dark:bg-slate-950 border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-emerald-600 text-white p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-emerald-500/30">
            <UtensilsCrossed size={24} />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Savora<span className="text-emerald-500">.</span></span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={cn(
                "relative text-sm font-semibold transition-colors hover:text-emerald-600 dark:hover:text-emerald-400",
                isActive(link.path) ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600 dark:text-slate-300"
              )}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div 
                  layoutId="navbar-indicator"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/cart" className="relative group">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart size={20} className="text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 transition-colors" />
              {cartItemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="outline" className="font-semibold rounded-full px-6">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button className="font-semibold rounded-full px-6 shadow-emerald-500/20 shadow-lg">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-700 dark:text-slate-200" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={cn(
                    "text-lg font-semibold py-2 transition-colors",
                    isActive(link.path) ? "text-emerald-600" : "text-slate-700 dark:text-slate-200"
                  )}
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />
              <Link to="/cart" className="flex items-center justify-between text-lg font-semibold py-2 text-slate-700 dark:text-slate-200" onClick={closeMobileMenu}>
                <span className="flex items-center gap-2"><ShoppingCart size={20} /> Cart</span>
                {cartItemCount > 0 && <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">{cartItemCount} items</span>}
              </Link>
              <Link to="/login" onClick={closeMobileMenu}>
                <Button variant="outline" className="w-full justify-start mt-2"><User size={18} className="mr-2" /> Log In</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
