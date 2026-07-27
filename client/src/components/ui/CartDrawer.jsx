import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Trash2, ArrowRight } from 'lucide-react';
import { Button } from './Button.jsx';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = ({ isOpen, onClose, items = [], onRemoveItem }) => {
  const navigate = useNavigate();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Close on Escape key press for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Preorder Bag">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-y-0 right-0 max-w-full flex pl-10"
          >
            <div className="w-screen max-w-md bg-[#121314] border-l border-[#1A1A1A] flex flex-col rounded-none shadow-2xl">
              {/* Header */}
              <div className="p-6 border-b border-[#1A1A1A] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span className="font-serif text-sm tracking-[0.2em] font-bold text-white uppercase">
                    PREORDER BAG
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="text-[#8E9192] hover:text-white transition-colors focus:outline-none"
                  aria-label="Close Preorder Bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preorder Rule Banner */}
              <div className="bg-amber-500/10 border-b border-amber-500/20 p-4 flex gap-3 items-start">
                <Lock className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] font-sans text-amber-200/90 leading-snug">
                  <strong className="text-amber-300 font-mono uppercase">Preorder Lock:</strong> Garments are reserved upon authorization and remain locked until drop window closes.
                </p>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-[#8E9192] gap-4">
                    <p className="text-xs font-sans uppercase tracking-[0.2em] font-semibold text-white">YOUR BAG IS EMPTY</p>
                    <p className="text-[11px] font-sans text-[#8E9192] max-w-xs">Select garments from the current drop collection to reserve your size.</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 border-b border-[#1A1A1A] pb-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 aspect-[3/4] object-cover rounded-none bg-[#1A1A1A] border border-[#1A1A1A]"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="font-serif text-xs uppercase font-semibold text-white tracking-wider">
                              {item.name}
                            </span>
                            <span className="font-mono text-xs text-white">${item.price}</span>
                          </div>
                          <span className="text-[10px] font-mono uppercase text-[#8E9192] block mt-1">
                            SIZE: {item.selectedSize} // QTY: {item.quantity}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id, item.selectedSize)}
                          className="flex items-center gap-1 text-[10px] text-red-400 hover:text-red-300 tracking-wider font-mono self-start mt-2 focus:outline-none"
                        >
                          <Trash2 className="w-3 h-3" /> REMOVE
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-[#1A1A1A] space-y-4 bg-[#1A1A1A]/30">
                  <div className="flex justify-between text-xs font-mono uppercase tracking-[0.2em] text-white">
                    <span>ESTIMATED PREORDER TOTAL</span>
                    <span className="text-sm font-bold">${subtotal} USD</span>
                  </div>
                  <Button fullWidth onClick={handleCheckout} size="lg">
                    PROCEED TO PREORDER CHECKOUT <ArrowRight className="ml-2 w-4 h-4 inline" />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
