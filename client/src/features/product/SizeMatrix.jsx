import React from 'react';
import { Ruler, Check } from 'lucide-react';

export const SizeMatrix = ({ selectedSize, onSelectSize }) => {
  return (
    <div className="space-y-4 pt-2">
      <div className="flex justify-between items-center text-xs font-sans">
        <span className="uppercase tracking-[0.2em] text-[#8E9192] font-semibold">
          SELECT OVERSIZED SIZE
        </span>
        <button className="text-[#8E9192] hover:text-white flex items-center gap-1 underline text-[11px] focus:outline-none">
          <Ruler className="w-3.5 h-3.5" aria-hidden="true" /> FIT SPECIFICATION
        </button>
      </div>

      <div className="grid grid-cols-5 gap-3" role="radiogroup" aria-label="Garment Size Selection">
        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
          <button
            key={size}
            type="button"
            role="radio"
            aria-checked={selectedSize === size}
            onClick={() => onSelectSize(size)}
            className={`py-3.5 text-xs font-mono uppercase font-bold transition-all border rounded-none focus:outline-none focus:ring-1 focus:ring-white ${
              selectedSize === size
                ? 'bg-white text-black border-white'
                : 'bg-[#121314] text-[#8E9192] border-[#1A1A1A] hover:border-white hover:text-white'
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {selectedSize && (
        <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
          <Check className="w-3.5 h-3.5" aria-hidden="true" />
          <span>SIZE {selectedSize} AVAILABLE // RESERVATION LOCKS AT CHECKOUT</span>
        </div>
      )}

      <p className="text-[11px] text-[#8E9192] font-sans italic leading-relaxed">
        *Designed with custom dropped shoulders and a boxy silhouette. Order true to size for signature RUNE oversized fit.
      </p>
    </div>
  );
};
