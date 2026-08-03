import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const existingUser = JSON.parse(localStorage.getItem('freshbiteUser'));

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
    <section className="auth-form-section">
      <div className="form-container">
        <h2><i className="fas fa-user-plus"></i> Sign Up</h2>
        <form onSubmit={handleSignup}>
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            placeholder="you@example.com" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Create a password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            placeholder="Confirm password" 
            required 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="auth-submit-btn">Register</button>
          
          <p className="auth-switch-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          {message && (
            <div className={`message ${isSuccess ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
