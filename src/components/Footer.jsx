import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} FreshBite. Taste the freshness!</p>
        <p className="footer-sub">Crafted with ❤️ for food lovers everywhere.</p>
      </div>
    </footer>
  );
};
