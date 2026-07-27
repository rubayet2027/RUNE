import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed rounded-none';

  const variants = {
    primary: 'bg-white text-[#0A0A0A] hover:bg-opacity-80 active:scale-[0.99]',
    secondary: 'bg-transparent text-white border border-white hover:bg-white hover:text-[#0A0A0A] active:scale-[0.99]',
    outline: 'bg-transparent text-[#C9C6C5] border border-[#1A1A1A] hover:border-white hover:text-white active:scale-[0.99]',
    ghost: 'bg-transparent text-[#8E9192] hover:text-white hover:bg-[#1A1A1A]/40',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.99]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-8 py-4 text-xs tracking-[0.25em]',
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.99 }}
      type={type}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          PROCESSING...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};
