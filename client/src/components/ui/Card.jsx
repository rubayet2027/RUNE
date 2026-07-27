import React from 'react';

export const Card = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div
      className={`bg-[#1A1A1A]/60 border border-[#1A1A1A] rounded-none p-6 sm:p-8 transition-all duration-300 ${
        hoverEffect ? 'hover:border-white hover:bg-[#1A1A1A]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
