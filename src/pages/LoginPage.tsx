import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
      setMessage('Login successful! Welcome to FreshBite.');
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
    alert('Google Login simulated. You are now logged in as Guest User!');
    navigate('/');
  };

  return (
    <section className="flex justify-center items-center py-12 px-4 min-h-[70vh]">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6 flex justify-center items-center gap-2">
          <i className="fas fa-sign-in-alt text-green-500"></i> Login
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="you@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-gray-700 dark:text-white transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-gray-700 dark:text-white transition"
            />
          </div>

          <button type="submit" className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md transition shadow">
            Login
          </button>
          
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Don't have an account? <Link to="/signup" className="text-green-600 hover:text-green-700 font-semibold transition">Sign Up</Link>
          </p>

          {message && (
            <div className={`mt-4 p-3 rounded-md text-sm font-medium ${isSuccess ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
              {message}
            </div>
          )}
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-3 text-sm text-gray-500 dark:text-gray-400 font-medium">OR</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        <button 
          type="button" 
          className="w-full py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-bold rounded-md transition shadow-sm flex justify-center items-center gap-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
          onClick={handleGoogleLogin}
        >
          <i className="fab fa-google text-red-500"></i> Login with Google
        </button>
      </div>
    </section>
  );
};
