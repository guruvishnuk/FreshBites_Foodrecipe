import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('freshbiteUser'));

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
    <section className="auth-form-section">
      <div className="form-container">
        <h2><i className="fas fa-sign-in-alt"></i> Login</h2>
        <form onSubmit={handleLogin}>
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
            placeholder="Enter your password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="auth-submit-btn">Login</button>
          
          <p className="auth-switch-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>

          {message && (
            <div className={`message ${isSuccess ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button type="button" className="google-login" onClick={handleGoogleLogin}>
          <i className="fab fa-google"></i> Login with Google
        </button>
      </div>
    </section>
  );
};
