import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api.js';
import { CountdownTimer } from '../components/ui/CountdownTimer.jsx';
import { ProductCard } from '../components/ui/ProductCard.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Lock, Sparkles, ShieldCheck } from 'lucide-react';

export const DropPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['activeDrop'],
    queryFn: () => api.get('/drops/active'),
  });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-[#8E9192] font-mono text-xs uppercase tracking-[0.2em]">
        <div className="w-8 h-8 border border-white border-t-transparent animate-spin" />
        LOADING ACTIVE DROP...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-[#8E9192] p-6 text-center">
        <span className="text-xs uppercase font-mono tracking-[0.2em] text-red-400">
          DROP UNAVAILABLE // {error?.message}
        </span>
        <p className="text-sm font-sans text-[#8E9192] max-w-md">
          Next limited preorder drop announcement coming soon. Join below for private VIP drop notifications.
        </p>
      </div>
    );
  }

  const drop = data?.data?.drop;

  return (
    <div className="space-y-20 pb-24">
      {/* Hero Banner with Bodoni Moda Serif Typography */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#121314] border-b border-[#1A1A1A]">
        <img
          src={drop.bannerImage}
          alt={drop.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121314] via-[#121314]/50 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8 py-24">
          <div className="inline-flex items-center gap-2">
            <Badge variant="active">LIVE PREORDER DROP</Badge>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            {drop.title}
          </h1>

          <p className="text-xs sm:text-sm font-sans text-[#8E9192] max-w-xl mx-auto leading-relaxed tracking-wide">
            {drop.description}
          </p>

          <div className="pt-6">
            <CountdownTimer targetDate={drop.endAt} />
          </div>
        </div>
      </section>

      {/* Preorder Crafting Manifesto Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1A1A1A]/40 border border-[#1A1A1A] p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <Lock className="w-5 h-5 text-white flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                PREORDER RESERVATION
              </h3>
              <p className="text-xs text-[#8E9192] leading-relaxed">
                Garments are crafted strictly for reserved quantities during this active drop. No restocks ever.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Sparkles className="w-5 h-5 text-white flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                CUSTOM MILLED FABRICS
              </h3>
              <p className="text-xs text-[#8E9192] leading-relaxed">
                500 GSM French Terry & 300 GSM Combed Jersey milled in Portugal with custom architectural cuts.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-5 h-5 text-white flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                BULK PRINTFUL DISPATCH
              </h3>
              <p className="text-xs text-[#8E9192] leading-relaxed">
                Post-drop order review triggers direct Printful bulk production and express shipping to your door.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Garment Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex justify-between items-end border-b border-[#1A1A1A] pb-6">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E9192] font-semibold">
              COLLECTION PIECES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wider mt-1">
              RESERVE YOUR SILHOUETTE
            </h2>
          </div>
          <span className="font-mono text-xs text-[#8E9192]">
            {drop.products.length} GARMENTS AVAILABLE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-14">
          {drop.products.map((product) => (
            <ProductCard key={product.id} product={product} dropStatus={drop.status} />
          ))}
        </div>
      </section>
    </div>
  );
};
