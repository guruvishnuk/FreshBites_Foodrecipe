import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUserStr = localStorage.getItem('freshbiteUser');
    const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;

    if (!storedUser) {
      setMessage('No registered user found. Please sign up first.');
      setIsSuccess(false);
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      setMessage('Login successful! Welcome to Savora.');
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setMessage('Invalid email or password.');
      setIsSuccess(false);
    }
  };

  const handleGoogleLogin = () => {
    navigate('/');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-[90vh] flex flex-col md:flex-row bg-background"
    >
      {/* Left Image Section */}
      <div className="hidden md:flex md:w-1/2 relative bg-black overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495195134817-a1a1b32ce52c?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="relative z-10 max-w-lg p-12 text-white">
          <ChefHat size={64} className="text-primary mb-8 drop-shadow-xl" />
          <h2 className="text-5xl lg:text-6xl font-display font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-lg">
            Welcome back to the world of fine dining.
          </h2>
          <p className="text-white/80 text-xl font-medium drop-shadow-md">
            Discover new recipes, order premium ingredients, and elevate your culinary skills with Savora.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="mb-10">
            <h1 className="text-4xl font-display font-extrabold text-foreground tracking-tight">Log in to Savora</h1>
            <p className="text-muted-foreground mt-2 font-medium">Enter your credentials to access your account.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Email Address</label>
              <Input 
                type="email" 
                placeholder="chef@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-muted border-none rounded-2xl px-4"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-foreground">Password</label>
                <a href="#" className="text-sm text-primary hover:text-primary-hover font-bold">Forgot password?</a>
              </div>
              <Input 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 bg-muted border-none rounded-2xl px-4"
              />
            </div>

            <Button type="submit" size="lg" className="w-full h-14 text-lg shadow-xl shadow-primary/20 rounded-2xl">
              Sign In
            </Button>
            
            {message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl text-sm font-bold text-center border ${isSuccess ? 'bg-accent-green/20 text-green-800 dark:text-green-300 border-accent-green/30' : 'bg-accent-red/20 text-red-800 dark:text-red-300 border-accent-red/30'}`}
              >
                {message}
              </motion.div>
            )}
          </form>

          <div className="mt-8 flex items-center before:flex-1 before:border-t before:border-border after:flex-1 after:border-t after:border-border">
            <span className="px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Or continue with</span>
          </div>

          <div className="mt-6">
            <Button variant="outline" size="lg" className="w-full h-14 rounded-2xl border-2 border-border font-bold hover:bg-muted" onClick={handleGoogleLogin}>
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </Button>
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground font-medium">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-primary hover:underline">
              Sign up free <ArrowRight className="inline w-4 h-4 ml-1" />
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
