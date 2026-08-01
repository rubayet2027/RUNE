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
    'inline-flex items-center justify-center font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-rune-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-none';

  const variants = {
    primary: 'bg-rune-primary text-rune-bg hover:bg-rune-primary/90 border border-rune-primary',
    secondary: 'bg-transparent text-rune-primary border border-rune-primary hover:bg-rune-primary hover:text-rune-bg',
    outline: 'bg-transparent text-rune-primary border border-rune-border hover:border-rune-primary hover:text-rune-primary',
    ghost: 'bg-transparent text-rune-secondary hover:text-rune-primary hover:bg-rune-surface',
    danger: 'bg-red-600 text-rune-primary hover:bg-red-700 border border-red-600',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-8 py-4 text-xs tracking-[0.25em]',
  };

  return (
    <motion.button
      whileHover={{ y: disabled || isLoading ? 0 : -2 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.99 }}
      transition={{ duration: 0.15, ease: [0.25, 1, 0.5, 1] }}
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
