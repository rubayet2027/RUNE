import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingAddressSchema } from '../../../shared/validators/index.js';
import { api } from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Lock, CreditCard } from 'lucide-react';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items: cartItems, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(shippingAddressSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError('');
    try {
      const payload = {
        dropId: 'drop_01',
        shippingAddress: data,
        items: cartItems.map((item) => ({
          productVariantId: 'var_01_m',
          quantity: item.quantity,
        })),
      };

      const response = await api.post('/orders', payload);
      clearCart();
      navigate(`/order-success/${response.data.order.orderNumber}`);
    } catch (err) {
      setApiError(err.message || 'Failed to place preorder reservation');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-serif text-rune-primaryxl font-bold uppercase tracking-wider text-rune-primary">YOUR PREORDER BAG IS EMPTY</h2>
        <Button onClick={() => navigate('/')}>RETURN TO ACTIVE DROP</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="border-b border-rune-border pb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-rune-secondary font-semibold">
            DROP 001 CHECKOUT
          </span>
          <h1 className="font-serif text-rune-primaryxl font-bold text-rune-primary uppercase tracking-wider mt-1">
            PREORDER RESERVATION
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-amber-300 bg-amber-500/10 px-3 py-1.5 border border-amber-500/20">
          <Lock className="w-4 h-4" /> ORDER WILL BE LOCKED UPON PAYMENT
        </div>
      </div>

      {apiError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-none text-xs font-mono">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Shipping & Payment */}
        <div className="lg:col-span-7 space-y-8">
          <Card>
            <h3 className="font-serif text-sm font-bold text-rune-primary mb-6 uppercase tracking-wider flex items-center gap-2">
              SHIPPING ADDRESS (US / UK / CA / AU)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <Input label="Full Name" {...register('fullName')} error={errors.fullName?.message} />
              </div>
              <div className="sm:col-span-2">
                <Input label="Address Line 1" {...register('addressLine1')} error={errors.addressLine1?.message} />
              </div>
              <div>
                <Input label="City" {...register('city')} error={errors.city?.message} />
              </div>
              <div>
                <Input label="State / Region" {...register('state')} error={errors.state?.message} />
              </div>
              <div>
                <Input label="Postal Code" {...register('postalCode')} error={errors.postalCode?.message} />
              </div>
              <div>
                <Input label="Country Code (e.g. US, GB, CA, AU)" {...register('country')} error={errors.country?.message} />
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-serif text-sm font-bold text-rune-primary mb-4 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-rune-secondary" /> PAYMENT PRE-AUTHORIZATION (ABSTRACTED DRIVER)
            </h3>
            <p className="text-xs font-sans text-rune-secondary mb-4 leading-relaxed">
              Payment is authorized instantly. Funds remain reserved while your order stays locked in our system until the preorder drop closes.
            </p>
            <div className="bg-rune-bg border border-rune-border p-4 text-xs font-mono text-rune-secondary">
              CARD ENDING IN •••• 4242 (TEST PAYMENT AUTHORIZATION)
            </div>
          </Card>
        </div>

        {/* Summary */}
        <div className="lg:col-span-5 space-y-6">
          <Card>
            <h3 className="font-serif text-sm font-bold text-rune-primary mb-6 uppercase tracking-wider">
              BAG SUMMARY ({cartItems.length} ITEMS)
            </h3>

            <div className="space-y-4 border-b border-rune-border pb-6 mb-6">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-start text-xs">
                  <div>
                    <p className="font-serif text-rune-primary uppercase font-semibold">{item.name}</p>
                    <p className="text-rune-secondary font-mono text-[10px] mt-0.5">SIZE: {item.selectedSize} // QTY: {item.quantity}</p>
                  </div>
                  <span className="font-mono text-rune-primary">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 font-mono text-xs mb-6">
              <div className="flex justify-between text-rune-secondary">
                <span>SUBTOTAL</span>
                <span>${subtotal} USD</span>
              </div>
              <div className="flex justify-between text-rune-secondary">
                <span>EXPRESS GLOBAL SHIPPING</span>
                <span className="text-emerald-400 font-semibold">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between text-rune-primary font-bold text-sm pt-3 border-t border-rune-border">
                <span>TOTAL PREORDER AUTHORIZATION</span>
                <span>${subtotal} USD</span>
              </div>
            </div>

            <Button fullWidth size="lg" isLoading={isSubmitting} type="submit">
              AUTHORIZE PREORDER & LOCK ORDER
            </Button>
          </Card>
        </div>
      </form>
    </div>
  );
};
