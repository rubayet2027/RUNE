import React from 'react';
import { Lock, Sparkles, ShieldCheck } from 'lucide-react';

export const DropManifesto = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-rune-surface/40 border border-rune-border p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-start gap-4">
          <Lock className="w-5 h-5 text-rune-primary flex-shrink-0 mt-1" />
          <div className="space-y-1">
            <h3 className="font-serif text-sm font-bold text-rune-primary uppercase tracking-wider">
              PREORDER RESERVATION
            </h3>
            <p className="text-xs font-sans text-rune-secondary leading-relaxed">
              Garments are crafted strictly for reserved quantities during this active drop. No restocks ever.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Sparkles className="w-5 h-5 text-rune-primary flex-shrink-0 mt-1" />
          <div className="space-y-1">
            <h3 className="font-serif text-sm font-bold text-rune-primary uppercase tracking-wider">
              CUSTOM MILLED FABRICS
            </h3>
            <p className="text-xs font-sans text-rune-secondary leading-relaxed">
              500 GSM French Terry & 300 GSM Combed Jersey milled in Portugal with custom architectural cuts.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <ShieldCheck className="w-5 h-5 text-rune-primary flex-shrink-0 mt-1" />
          <div className="space-y-1">
            <h3 className="font-serif text-sm font-bold text-rune-primary uppercase tracking-wider">
              BULK PRINTFUL DISPATCH
            </h3>
            <p className="text-xs font-sans text-rune-secondary leading-relaxed">
              Post-drop order review triggers direct Printful bulk production and express shipping to your door.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
