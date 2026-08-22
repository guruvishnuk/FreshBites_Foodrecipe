import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home, Utensils, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

export const ThankYouPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-[70vh] flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-10 md:p-16 text-center max-w-2xl w-full border border-slate-100 dark:border-slate-800 relative overflow-hidden">
        {/* Confetti-like background blob */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-500/20 blur-3xl rounded-full" />

        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="mb-8 relative z-10 flex justify-center"
        >
          <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-emerald-500" />
          </div>
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 relative z-10 tracking-tight">
          Order Confirmed!
        </h1>
        
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-relaxed relative z-10 font-medium">
          Thank you for choosing <span className="text-emerald-600 dark:text-emerald-400 font-bold">Savora</span>. Your premium ingredients are being meticulously packed and will arrive shortly.
        </p>

        {/* Animated Progress Steps */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-12 relative z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
              1
            </div>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Placed</span>
          </div>
          <div className="hidden sm:block w-12 border-b-2 border-dashed border-emerald-500/50"></div>
          <div className="flex flex-col items-center gap-2">
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center border-2 border-emerald-500"
            >
              2
            </motion.div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Packing</span>
          </div>
          <div className="hidden sm:block w-12 border-b-2 border-dashed border-slate-200 dark:border-slate-700"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
              3
            </div>
            <span className="text-sm font-medium text-slate-500">Delivery</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
          <Link to="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-12">
              <Home className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
          <Link to="/recipes">
            <Button size="lg" className="w-full sm:w-auto h-12 shadow-lg shadow-emerald-500/20 group">
              Explore More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
