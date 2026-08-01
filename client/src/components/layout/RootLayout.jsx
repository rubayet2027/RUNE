import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar.jsx';
import { Footer } from './Footer.jsx';
import { CartDrawer } from '../../features/cart/CartDrawer.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const RootLayout = () => {
  const { isOpen, closeCart, items, removeFromCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    // Lenis configuration for soft, premium scroll response
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium easeOutExponential
      smooth: true,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const rafHandler = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafHandler);
    gsap.ticker.lagSmoothing(0);

    // Scroll to top on route change
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafHandler);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-rune-bg text-rune-primary font-sans selection:bg-rune-primary selection:text-rune-bg transition-colors duration-500">
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          id="main-content"
          tabIndex="-1"
          className="flex-1 focus:outline-none"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

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

