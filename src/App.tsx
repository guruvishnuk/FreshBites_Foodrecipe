import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { RecipesPage } from './pages/RecipesPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { RestaurantsPage } from './pages/RestaurantsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { AboutPage } from './pages/AboutPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { LocationProvider } from './context/LocationContext';

export function App() {
  const location = useLocation();

  return (
    <LocationProvider>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <main className="flex-grow w-full pt-20"> {/* pt-20 to account for fixed navbar */}
          <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipes/:recipeId" element={<RecipeDetailPage />} />
            <Route path="/restaurants" element={<RestaurantsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
          </Routes>
        </AnimatePresence>
        </main>
        <Footer />
      </div>
    </LocationProvider>
  );
}

export default App;
