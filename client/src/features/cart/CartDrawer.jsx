import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer } from '../../components/ui/Drawer.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Trash2, Lock, ArrowRight } from 'lucide-react';

export const CartDrawer = ({ isOpen, onClose, items = [], onRemoveItem }) => {
  const navigate = useNavigate();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={`PREORDER BAG (${items.length})`}>
      {items.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
          <p className="font-serif text-sm uppercase text-rune-secondary tracking-wider">
            YOUR PREORDER BAG IS EMPTY
          </p>
          <Button variant="outline" size="sm" onClick={onClose}>
            EXPLORE ACTIVE DROP
          </Button>
        </div>
      ) : (
        <div className="flex flex-col h-full justify-between space-y-6">
          {/* Cart Items List */}
          <div className="space-y-6 flex-1 overflow-y-auto pr-1">
            <div className="bg-rune-surface/40 border border-rune-border p-3 text-[11px] font-mono text-amber-300 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 flex-shrink-0" />
              <span>PREORDER GUARANTEE: RESERVED FOR DURATION OF ACTIVE DROP</span>
            </div>

            {items.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize}`}
                className="flex gap-4 pb-6 border-b border-rune-border"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 aspect-[3/4] object-cover bg-rune-surface rounded-none border border-rune-border"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-xs font-bold text-rune-primary uppercase leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-[10px] font-mono text-rune-secondary mt-1">
                      SIZE: {item.selectedSize} // QTY: {item.quantity}
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-mono text-xs text-rune-primary font-bold">
                      ${item.price * item.quantity} USD
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.id, item.selectedSize)}
                      className="text-rune-secondary hover:text-red-400 transition-colors focus:outline-none"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Footer */}
          <div className="border-t border-rune-border pt-6 space-y-4">
            <div className="flex justify-between items-baseline font-mono">
              <span className="text-xs text-rune-secondary uppercase tracking-[0.2em]">ESTIMATED TOTAL</span>
              <span className="text-lg font-bold text-rune-primary">${subtotal} USD</span>
            </div>
            <p className="text-[10px] font-sans text-rune-secondary leading-relaxed">
              Complimentary express global shipping included. Orders locked until active drop countdown expires.
            </p>
            <Button fullWidth size="lg" onClick={handleCheckout}>
              PROCEED TO PREORDER CHECKOUT <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
};
