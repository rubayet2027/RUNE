import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Shield, Menu, X } from 'lucide-react';
import { BRAND_CONFIG } from '../../../../shared/constants/index.js';

export const Navbar = ({ cartCount = 0, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-sans uppercase tracking-[0.2em] font-semibold">
          <Link to="/" className="text-white hover:text-[#C9C6C5] transition-colors">
            CURRENT DROP
          </Link>
          <Link to="/archive" className="text-[#8E9192] hover:text-white transition-colors">
            ARCHIVE
          </Link>
          <Link to="/about" className="text-[#8E9192] hover:text-white transition-colors">
            MANIFESTO
          </Link>
        </nav>

        {/* Center Brand Logo (Bodoni Moda Serif) */}
        <Link to="/" className="flex flex-col items-center">
          <span className="font-serif text-3xl tracking-[0.3em] font-bold text-white">
            {BRAND_CONFIG.name}
          </span>
          <span className="text-[8px] tracking-[0.4em] text-[#8E9192] font-sans uppercase font-medium">
            PARIS / NEW YORK / TOKYO
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <Link
            to="/admin"
            className="hidden sm:flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E9192] hover:text-white transition-colors"
            title="Admin Control Center"
          >
            <Shield className="w-3.5 h-3.5" />
            ADMIN
          </Link>

          <Link
            to="/login"
            className="text-[#8E9192] hover:text-white transition-colors"
            title="Account"
          >
            <User className="w-5 h-5" />
          </Link>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 text-white hover:text-[#C9C6C5] transition-colors focus:outline-none"
            aria-label="Open Preorder Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-white text-black font-mono text-[9px] font-bold w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121314] border-b border-[#1A1A1A] px-6 py-6 flex flex-col gap-4 text-xs uppercase tracking-[0.2em] font-sans">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white py-2 border-b border-[#1A1A1A]"
          >
            CURRENT DROP
          </Link>
          <Link
            to="/archive"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#8E9192] hover:text-white py-2 border-b border-[#1A1A1A]"
          >
            ARCHIVE
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#8E9192] hover:text-white py-2"
          >
            ADMIN PANEL
          </Link>
        </div>
      )}
    </header>
  );
};
