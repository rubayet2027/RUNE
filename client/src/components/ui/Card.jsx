import React from 'react';

export const Card = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div
      className={`bg-rune-surface/60 border border-rune-border rounded-none p-6 sm:p-8 transition-all duration-300 ${
        hoverEffect ? 'hover:border-rune-primary hover:bg-rune-surface' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
