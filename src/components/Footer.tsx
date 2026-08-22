import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-lg font-semibold text-white mb-2">&copy; {new Date().getFullYear()} FreshBite. Taste the freshness!</p>
        <p className="text-sm opacity-80">Crafted with ❤️ for food lovers everywhere.</p>
      </div>
    </footer>
  );
};
