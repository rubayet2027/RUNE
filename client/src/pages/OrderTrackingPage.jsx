import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api.js';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Search, Package, ShieldCheck, Truck, Lock, CheckCircle2 } from 'lucide-react';

export const OrderTrackingPage = () => {
  const { orderNumber: paramOrderNumber } = useParams();
  const [orderQuery, setOrderQuery] = useState(paramOrderNumber || '');
  const [activeSearch, setActiveSearch] = useState(paramOrderNumber || '');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['trackOrder', activeSearch],
    queryFn: () => api.get(`/orders/${activeSearch}`),
    enabled: !!activeSearch,
    retry: false,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setActiveSearch(orderQuery.trim());
    }
  };

  const order = data?.data?.order;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E9192] font-semibold">
          LIVE PREORDER TRACKING
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-wider">
          ORDER LOOKUP & SHIPMENT STATUS
        </h1>
        <p className="text-xs font-sans text-[#8E9192] max-w-md mx-auto">
          Enter your RUNE order reference number (e.g. RN-882910) to inspect preorder lock guarantees and carrier tracking.
        </p>
      </div>

      {/* Search Input Box */}
      <Card>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <Input
              label="Order Reference Number"
              placeholder="e.g. RN-882910"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
            />
          </div>
          <Button type="submit" size="md">
            <Search className="w-4 h-4 mr-2 inline" /> LOOKUP ORDER
          </Button>
        </form>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="min-h-[30vh] flex flex-col items-center justify-center gap-4 text-[#8E9192] font-mono text-xs uppercase tracking-[0.2em]">
          <div className="w-8 h-8 border border-white border-t-transparent animate-spin" />
          RETRIEVING ORDER STATUS...
        </div>
      )}

      {/* Error / Not Found State */}
      {isError && activeSearch && (
        <Card className="border-red-500/30 bg-red-500/5 text-center py-8 space-y-3">
          <p className="text-xs font-mono text-red-400 font-bold uppercase">
            ORDER '{activeSearch}' NOT FOUND
          </p>
          <p className="text-xs font-sans text-[#8E9192] max-w-sm mx-auto">
            Please verify your order number in your confirmation email. For assistance, contact our Concierge Desk.
          </p>
        </Card>
      )}

      {/* Order Details Display */}
      {order && (
        <div className="space-y-8">
          <Card className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#1A1A1A] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#8E9192]">ORDER REFERENCE</span>
                <h2 className="font-serif text-2xl font-bold text-white tracking-wider">{order.orderNumber}</h2>
              </div>
              <Badge variant={order.status === 'LOCKED' ? 'locked' : 'active'}>{order.status}</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-sans">
              <div>
                <span className="text-[#8E9192] uppercase tracking-wider font-semibold block mb-1">TOTAL AUTHORIZED</span>
                <span className="font-mono text-base font-bold text-white">${order.totalAmount} USD</span>
              </div>
              <div>
                <span className="text-[#8E9192] uppercase tracking-wider font-semibold block mb-1">PREORDER COLLECTION</span>
                <span className="font-mono text-base font-bold text-white">DROP 001 // OBLIVION</span>
              </div>
              <div>
                <span className="text-[#8E9192] uppercase tracking-wider font-semibold block mb-1">RESERVED DATE</span>
                <span className="font-mono text-base font-bold text-white">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>

          {/* Fulfillment Timeline Progress */}
          <Card className="space-y-6">
            <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Truck className="w-4 h-4 text-white" /> FULFILLMENT TIMELINE PROGRESS
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-white text-black flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-white uppercase">PREORDER RESERVED & FUNDS AUTHORIZED</h4>
                  <p className="text-[11px] text-[#8E9192] mt-0.5">Order locked in RUNE database. Funds pre-authorized safely.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 opacity-75">
                <div className="w-6 h-6 bg-[#1A1A1A] text-white border border-[#262626] flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-white uppercase">ACTIVE DROP CLOSES</h4>
                  <p className="text-[11px] text-[#8E9192] mt-0.5">Drop countdown expires and total garment quantities lock.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 opacity-75">
                <div className="w-6 h-6 bg-[#1A1A1A] text-white border border-[#262626] flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-white uppercase">SECTION 16 PRINTFUL BULK CRAFTING</h4>
                  <p className="text-[11px] text-[#8E9192] mt-0.5">500 GSM Portuguese French Terry garments submitted to Printful for production.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 opacity-75">
                <div className="w-6 h-6 bg-[#1A1A1A] text-white border border-[#262626] flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-white uppercase">EXPRESS GLOBAL DISPATCH</h4>
                  <p className="text-[11px] text-[#8E9192] mt-0.5">Air freight courier tracking dispatched directly to your door.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
