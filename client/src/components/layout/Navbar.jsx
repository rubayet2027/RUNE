import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Shield, Menu, X, PackageSearch } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { BRAND_CONFIG } from '../../../../shared/constants/index.js';

export const Navbar = () => {
  const { totalCount, openCart } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header role="banner" className="sticky top-0 z-40 w-full glass-panel border-b border-rune-border">
      {/* Skip to Main Content Link for Screen Readers & Keyboard Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-3 focus:bg-white focus:text-black focus:font-mono focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest"
      >
        SKIP TO MAIN CONTENT
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Primary Navigation */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-6 text-xs font-sans uppercase tracking-[0.2em] font-semibold">
          <Link to="/" className="text-rune-primary hover:text-rune-primary transition-colors">
            DROP
          </Link>
          <Link to="/archive" className="text-rune-secondary hover:text-rune-primary transition-colors">
            ARCHIVE
          </Link>
          <Link to="/track" className="text-rune-secondary hover:text-rune-primary transition-colors">
            TRACK ORDER
          </Link>
          <Link to="/about" className="text-rune-secondary hover:text-rune-primary transition-colors">
            ABOUT
          </Link>
          <Link to="/support" className="text-rune-secondary hover:text-rune-primary transition-colors">
            SUPPORT
          </Link>
        </nav>

        {/* Center Brand Logo (Bodoni Moda Serif) */}
        <Link to="/" aria-label={`${BRAND_CONFIG.name} Homepage`} className="flex flex-col items-center">
          <span className="font-serif text-rune-primaryxl tracking-[0.3em] font-bold text-rune-primary">
            {BRAND_CONFIG.name}
          </span>
          <span className="text-[8px] tracking-[0.4em] text-rune-secondary font-sans uppercase font-medium">
            PARIS / NEW YORK / TOKYO
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {isAdmin && (
            <Link
              to="/admin"
              className="hidden sm:flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.2em] text-rune-secondary hover:text-rune-primary transition-colors"
              title="Admin Control Center"
            >
              <Shield className="w-3.5 h-3.5" aria-hidden="true" />
              ADMIN
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="text-rune-secondary hover:text-rune-primary transition-colors text-[10px] font-sans uppercase tracking-[0.25em] focus:outline-none"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? 'LIGHT' : 'DARK'}
          </button>

          <Link
            to={isAuthenticated ? '/account' : '/login'}
            className="text-rune-secondary hover:text-rune-primary transition-colors"
            aria-label={isAuthenticated ? 'Customer Account' : 'Account Authentication'}
          >
            <User className="w-5 h-5" aria-hidden="true" />
          </Link>

          <button
            onClick={openCart}
            className="relative flex items-center gap-2 text-rune-primary hover:text-rune-primary transition-colors focus:outline-none"
            aria-label={`Open Preorder Bag (${totalCount} items)`}
          >
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-white text-black font-mono text-[9px] font-bold w-4 h-4 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-rune-primary focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <nav aria-label="Mobile Navigation" className="md:hidden bg-rune-bg border-b border-rune-border px-6 py-6 flex flex-col gap-4 text-xs uppercase tracking-[0.2em] font-sans">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-rune-primary py-2 border-b border-rune-border">
            ACTIVE DROP
          </Link>
          <Link to="/archive" onClick={() => setMobileMenuOpen(false)} className="text-rune-secondary py-2 border-b border-rune-border">
            ARCHIVE
          </Link>
          <Link to="/track" onClick={() => setMobileMenuOpen(false)} className="text-rune-secondary py-2 border-b border-rune-border">
            TRACK ORDER
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-rune-secondary py-2 border-b border-rune-border">
            ABOUT
          </Link>
          <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="text-rune-secondary py-2 border-b border-rune-border">
            FAQ
          </Link>
          <Link to="/support" onClick={() => setMobileMenuOpen(false)} className="text-rune-secondary py-2 border-b border-rune-border">
            SUPPORT
          </Link>
          <Link to="/legal" onClick={() => setMobileMenuOpen(false)} className="text-rune-secondary py-2 border-b border-rune-border">
            TERMS & PRIVACY
          </Link>
          {isAuthenticated ? (
            <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="text-rune-primary py-2 font-bold">
              MY ACCOUNT & ORDERS
            </Link>
          ) : (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-rune-primary py-2 font-bold">
              SIGN IN / REGISTER
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};
