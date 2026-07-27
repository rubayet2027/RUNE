import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';
import { Footer } from './Footer.jsx';
import { CartDrawer } from '../../features/cart/CartDrawer.jsx';
import { useCart } from '../../context/CartContext.jsx';

export const RootLayout = () => {
  const { isOpen, closeCart, items, removeFromCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#121314] text-[#E3E2E2] font-sans selection:bg-white selection:text-black">
      <Navbar />

      <main id="main-content" tabIndex="-1" className="flex-1 focus:outline-none">
        <Outlet />
      </main>

      <Footer />

      <CartDrawer
        isOpen={isOpen}
        onClose={closeCart}
        items={items}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
};
