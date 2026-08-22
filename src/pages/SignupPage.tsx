import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const existingUserStr = localStorage.getItem('freshbiteUser');
    const existingUser = existingUserStr ? JSON.parse(existingUserStr) : null;

    if (existingUser && existingUser.email === email) {
      setMessage('A user is already registered with this email.');
      setIsSuccess(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsSuccess(false);
      return;
    }

    const newUser = { email, password };
    localStorage.setItem('freshbiteUser', JSON.stringify(newUser));
    setMessage('Registration successful! Redirecting...');
    setIsSuccess(true);

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-[90vh] flex flex-col md:flex-row-reverse bg-white dark:bg-slate-950"
    >
      {/* Right Image Section */}
      <div className="hidden md:flex md:w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909211-36987daf7b4d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
        
        <div className="relative z-10 max-w-lg p-12 text-white text-right">
          <Utensils size={48} className="text-amber-400 mb-8 ml-auto" />
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Begin your culinary journey today.
          </h2>
          <p className="text-slate-300 text-lg">
            Join Savora and get access to exclusive recipes, fast ingredient delivery, and a community of food lovers.
          </p>
        </div>
      </div>

      {/* Left Form Section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Create an Account</h1>
            <p className="text-slate-500 mt-2">Sign up in seconds to start ordering.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
              <Input 
                type="email" 
                placeholder="chef@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
              <Input 
                type="password" 
                placeholder="Create a strong password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
              <Input 
                type="password" 
                placeholder="Repeat password" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full shadow-lg shadow-emerald-500/20 mt-2">
              Create Account
            </Button>
            
            {message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-md text-sm font-medium text-center ${isSuccess ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30' : 'bg-red-50 text-red-700 dark:bg-red-900/30'}`}
              >
                {message}
              </motion.div>
            )}
          </form>

          <p className="mt-10 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-500">
              Log in instead <ArrowRight className="inline w-4 h-4 ml-1" />
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
