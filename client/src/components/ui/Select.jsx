import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = React.forwardRef(({
  label,
  options = [],
  error,
  value,
  onChange,
  id: customId,
  className = '',
  ...props
}, ref) => {
  const generatedId = useId();
  const selectId = customId || generatedId;

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label htmlFor={selectId} className="text-[11px] font-sans uppercase tracking-[0.2em] text-rune-secondary font-semibold">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          className={`w-full bg-rune-bg border-b border-rune-border py-3 pr-8 text-xs text-rune-primary font-mono uppercase focus:outline-none focus:border-rune-primary transition-colors duration-300 rounded-none appearance-none cursor-pointer ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-rune-bg text-rune-primary py-2">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-rune-secondary absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      {error && <span className="text-[10px] font-mono text-red-400 mt-0.5">{error}</span>}
    </div>
  );
});

Select.displayName = 'Select';
