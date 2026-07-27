import React from 'react';
import { Button } from './Button.jsx';
import { PackageSearch, AlertTriangle, RefreshCw } from 'lucide-react';

export const StateView = ({
  type = 'empty', // 'loading' | 'empty' | 'error'
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  if (type === 'loading') {
    return (
      <div className={`min-h-[50vh] flex flex-col items-center justify-center p-8 text-center space-y-4 ${className}`}>
        <div className="w-10 h-10 border border-white border-t-transparent animate-spin rounded-none" />
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8E9192]">
          {title || 'LOADING DATA SPECIFICATIONS...'}
        </span>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className={`min-h-[50vh] flex flex-col items-center justify-center p-8 text-center space-y-6 bg-[#121314] text-[#E3E2E2] ${className}`}>
        <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center rounded-none">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-2 max-w-md">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-red-400 font-bold block">
            DATA RETRIEVAL EXCEPTION
          </span>
          <h2 className="font-serif text-xl font-bold uppercase text-white tracking-wider">
            {title || 'UNABLE TO LOAD DATA'}
          </h2>
          <p className="text-xs font-sans text-[#8E9192] leading-relaxed">
            {description || 'An error occurred while communicating with the RUNE backend API.'}
          </p>
        </div>
        {onAction && (
          <Button onClick={onAction}>
            <RefreshCw className="w-3.5 h-3.5 mr-2 inline" /> {actionLabel || 'RETRY REQUEST'}
          </Button>
        )}
      </div>
    );
  }

  // Default: Empty state
  return (
    <div className={`min-h-[50vh] flex flex-col items-center justify-center p-8 text-center space-y-6 bg-[#121314] ${className}`}>
      <div className="w-14 h-14 bg-[#1A1A1A] border border-[#27272A] text-[#8E9192] flex items-center justify-center rounded-none">
        <PackageSearch className="w-6 h-6" />
      </div>
      <div className="space-y-2 max-w-md">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E9192] font-semibold block">
          NO RECORDS FOUND
        </span>
        <h2 className="font-serif text-xl font-bold uppercase text-white tracking-wider">
          {title || 'EMPTY COLLECTION'}
        </h2>
        <p className="text-xs font-sans text-[#8E9192] leading-relaxed">
          {description || 'There are no active records matching your criteria.'}
        </p>
      </div>
      {onAction && (
        <Button onClick={onAction}>{actionLabel || 'RETURN TO HOMEPAGE'}</Button>
      )}
    </div>
  );
};
