import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-rune-surface text-rune-primary border border-rune-border',
    active: 'bg-white text-black font-semibold',
    locked: 'bg-amber-500/10 text-amber-300 border border-amber-500/30',
    archived: 'bg-rune-bg text-rune-secondary border border-rune-border',
    fulfilled: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 text-[10px] font-sans uppercase tracking-[0.2em] font-semibold rounded-none ${variants[variant]} ${className}`}
    >
      <span className="w-1.5 h-1.5 bg-current" />
      {children}
    </span>
  );
};
