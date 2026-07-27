import React, { useId } from 'react';

export const Input = React.forwardRef(({
  label,
  error,
  type = 'text',
  placeholder,
  className = '',
  id: customId,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#8E9192] font-semibold">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`w-full bg-[#121314] border-b border-[#1A1A1A] py-3 text-xs text-white placeholder-[#444748] focus:outline-none focus:border-white transition-colors duration-300 rounded-none ${
          error ? 'border-red-500 focus:border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <span id={errorId} className="text-[10px] font-mono text-red-400 mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
