import React from 'react';
import { Button } from './Button.jsx';
import { PageLoader } from './Loader.jsx';
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
    return <PageLoader />;
  }

  if (type === 'error') {
    return (
      <div className={`min-h-[50vh] flex flex-col items-center justify-center p-8 text-center space-y-6 bg-rune-bg text-rune-primary ${className}`}>
        <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center rounded-none">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-2 max-w-md">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-red-400 font-bold block">
            DATA RETRIEVAL EXCEPTION
          </span>
          <h2 className="font-serif text-xl font-bold uppercase text-rune-primary tracking-wider">
            {title || 'UNABLE TO LOAD DATA'}
          </h2>
          <p className="text-xs font-sans text-rune-secondary leading-relaxed">
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
    <div className={`min-h-[50vh] flex flex-col items-center justify-center p-8 text-center space-y-6 bg-rune-bg ${className}`}>
      <div className="w-14 h-14 bg-rune-surface border border-rune-border text-rune-secondary flex items-center justify-center rounded-none">
        <PackageSearch className="w-6 h-6" />
      </div>
      <div className="space-y-2 max-w-md">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-rune-secondary font-semibold block">
          NO RECORDS FOUND
        </span>
        <h2 className="font-serif text-xl font-bold uppercase text-rune-primary tracking-wider">
          {title || 'EMPTY COLLECTION'}
        </h2>
        <p className="text-xs font-sans text-rune-secondary leading-relaxed">
          {description || 'There are no active records matching your criteria.'}
        </p>
      </div>
      {onAction && (
        <Button onClick={onAction}>{actionLabel || 'RETURN TO HOMEPAGE'}</Button>
      )}
    </div>
  );
};
