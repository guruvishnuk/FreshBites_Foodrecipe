import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-muted text-muted-foreground py-12 mt-auto border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xl font-display font-bold text-foreground mb-4">Savora<span className="text-primary">.</span></p>
        <p className="text-lg font-medium text-foreground mb-2">&copy; {new Date().getFullYear()} Savora. Taste the freshness!</p>
        <p className="text-sm opacity-80">Crafted with ❤️ for food lovers everywhere.</p>
      </div>
    </footer>
  );
};
