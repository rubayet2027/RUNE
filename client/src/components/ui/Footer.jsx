import React from 'react';
import { BRAND_CONFIG } from '../../../../shared/constants/index.js';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121314] border-t border-[#1A1A1A] pt-20 pb-12 text-[#8E9192]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <span className="font-serif text-2xl tracking-[0.3em] font-bold text-white">
              {BRAND_CONFIG.name}
            </span>
            <p className="text-xs text-[#8E9192] leading-relaxed max-w-xs font-sans">
              Exclusive oversized luxury streetwear released strictly as limited-time preorder drops. Made in Portugal. Engineered for longevity.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-white">
              PREORDER MODEL
            </span>
            <ul className="flex flex-col gap-2.5 text-xs font-sans text-[#8E9192]">
              <li>Limited Preorder Window</li>
              <li>Bulk Printful Crafting</li>
              <li>Direct Express Shipping</li>
              <li>Archived Forever Post-Drop</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-white">
              SUPPORT & LEGAL
            </span>
            <ul className="flex flex-col gap-2.5 text-xs font-sans text-[#8E9192]">
              <li>Shipping & Global Customs</li>
              <li>Oversized Fit Specification</li>
              <li>Order Preorder Lock Lookup</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-white">
              PREORDER NOTIFICATIONS
            </span>
            <p className="text-xs text-[#8E9192]">
              Receive private drop keys & SMS countdown notifications prior to release windows.
            </p>
            <div className="flex gap-0">
              <input
                type="email"
                placeholder="ENTER EMAIL ADDRESS"
                className="bg-[#121314] border-b border-[#1A1A1A] px-3 py-2 text-xs text-white placeholder-[#444748] focus:outline-none focus:border-white flex-1 rounded-none"
              />
              <button className="bg-white text-black px-4 py-2 text-[10px] uppercase font-semibold tracking-[0.2em] hover:bg-opacity-80 transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1A1A1A] flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase font-sans tracking-[0.2em] text-[#8E9192] gap-4">
          <span>© {new Date().getFullYear()} {BRAND_CONFIG.name} INT. ALL RIGHTS RESERVED.</span>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-white hover:text-[#C9C6C5] transition-colors focus:outline-none"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
