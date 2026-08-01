import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '../../../../shared/constants/index.js';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer role="contentinfo" className="bg-rune-bg border-t border-rune-border pt-20 pb-12 text-rune-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <span className="font-serif text-rune-primaryxl tracking-[0.3em] font-bold text-rune-primary">
              {BRAND_CONFIG.name}
            </span>
            <p className="text-xs text-rune-secondary leading-relaxed max-w-xs font-sans">
              Exclusive oversized luxury streetwear released strictly as limited-time preorder drops. Made in Portugal. Engineered for longevity.
            </p>
          </div>

          <nav aria-label="Preorder Model Information" className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-rune-primary">
              EXPLORE ATELIER
            </span>
            <ul className="flex flex-col gap-2 text-xs font-sans text-rune-secondary">
              <li>
                <Link to="/" className="hover:text-rune-primary transition-colors">ACTIVE PREORDER DROP</Link>
              </li>
              <li>
                <Link to="/archive" className="hover:text-rune-primary transition-colors">ARCHIVAL DROP VAULT</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-rune-primary transition-colors">PORTUGAL MANIFESTO</Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Support and Legal" className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-rune-primary">
              CONCIERGE & LEGAL
            </span>
            <ul className="flex flex-col gap-2 text-xs font-sans text-rune-secondary">
              <li>
                <Link to="/faq" className="hover:text-rune-primary transition-colors">FREQUENTLY ASKED QUESTIONS</Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-rune-primary transition-colors">CUSTOMER SUPPORT TICKETS</Link>
              </li>
              <li>
                <Link to="/legal" className="hover:text-rune-primary transition-colors">TERMS OF SERVICE & PRIVACY</Link>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-rune-primary">
              PREORDER NOTIFICATIONS
            </span>
            <p className="text-xs text-rune-secondary">
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
                className="bg-rune-bg border-b border-rune-border px-3 py-2 text-xs text-rune-primary placeholder-rune-secondary/50 focus:outline-none focus:border-rune-primary flex-1 rounded-none"
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

        <div className="pt-8 border-t border-rune-border flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase font-sans tracking-[0.2em] text-rune-secondary gap-4">
          <span>© {new Date().getFullYear()} {BRAND_CONFIG.name} INT. ALL RIGHTS RESERVED.</span>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-rune-primary hover:text-rune-primary transition-colors focus:outline-none"
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
