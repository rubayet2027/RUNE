import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'rune_preorder_bag';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [
        {
          id: 'prod_01',
          name: 'OBLIVION OVERSIZED HOODIE - ONYX BLACK',
          price: 180,
          selectedSize: 'M',
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
        },
      ];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist preorder bag to localStorage', e);
    }
  }, [items]);

  const addToCart = useCallback((newItem) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === newItem.id && item.selectedSize === newItem.selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity || 1;
        return updated;
      }
      return [...prev, newItem];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((id, size) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.selectedSize === size)));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalCount = useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((acc, item) => acc + item.price * item.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      isOpen,
      totalCount,
      subtotal,
      addToCart,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
    }),
    [items, isOpen, totalCount, subtotal, addToCart, removeFromCart, clearCart, openCart, closeCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
