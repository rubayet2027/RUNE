import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '../../../../shared/constants/index.js';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer role="contentinfo" className="bg-[#121314] border-t border-[#1A1A1A] pt-20 pb-12 text-[#8E9192]">
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

          <nav aria-label="Preorder Model Information" className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-white">
              EXPLORE ATELIER
            </span>
            <ul className="flex flex-col gap-2 text-xs font-sans text-[#8E9192]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">ACTIVE PREORDER DROP</Link>
              </li>
              <li>
                <Link to="/archive" className="hover:text-white transition-colors">ARCHIVAL DROP VAULT</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">PORTUGAL MANIFESTO</Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Support and Legal" className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-white">
              CONCIERGE & LEGAL
            </span>
            <ul className="flex flex-col gap-2 text-xs font-sans text-[#8E9192]">
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">FREQUENTLY ASKED QUESTIONS</Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-white transition-colors">CUSTOMER SUPPORT TICKETS</Link>
              </li>
              <li>
                <Link to="/legal" className="hover:text-white transition-colors">TERMS OF SERVICE & PRIVACY</Link>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-white">
              PREORDER NOTIFICATIONS
            </span>
            <p className="text-xs text-[#8E9192]">
              Receive private drop keys & SMS countdown notifications prior to release windows.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-0">
              <label htmlFor="newsletter-email" className="sr-only">
                Email Address for Drop Notifications
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="ENTER EMAIL ADDRESS"
                className="bg-[#121314] border-b border-[#1A1A1A] px-3 py-2 text-xs text-white placeholder-[#444748] focus:outline-none focus:border-white flex-1 rounded-none"
              />
              <button
                type="submit"
                className="bg-white text-black px-4 py-2 text-[10px] uppercase font-semibold tracking-[0.2em] hover:bg-opacity-80 transition-colors"
              >
                JOIN
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1A1A1A] flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase font-sans tracking-[0.2em] text-[#8E9192] gap-4">
          <span>© {new Date().getFullYear()} {BRAND_CONFIG.name} INT. ALL RIGHTS RESERVED.</span>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-white hover:text-[#C9C6C5] transition-colors focus:outline-none"
            aria-label="Scroll back to top of page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};
