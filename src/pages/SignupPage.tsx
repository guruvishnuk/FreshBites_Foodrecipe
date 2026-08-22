import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    setMessage('Registration successful! Redirecting to login...');
    setIsSuccess(true);

    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <section className="flex justify-center items-center py-12 px-4 min-h-[70vh]">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6 flex justify-center items-center gap-2">
          <i className="fas fa-user-plus text-green-500"></i> Sign Up
        </h2>
        
        <form onSubmit={handleSignup} className="space-y-4">
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
              placeholder="Create a password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-gray-700 dark:text-white transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1" htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="Confirm password" 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-gray-700 dark:text-white transition"
            />
          </div>

          <button type="submit" className="w-full mt-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md transition shadow">
            Register
          </button>
          
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Already have an account? <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold transition">Login</Link>
          </p>

          {message && (
            <div className={`mt-4 p-3 rounded-md text-sm font-medium ${isSuccess ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
