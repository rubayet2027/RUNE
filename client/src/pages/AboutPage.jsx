import React from 'react';
import { Card } from '../components/ui/Card.jsx';
import { ShieldCheck, Sparkles, Layers, RefreshCw } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
      {/* Manifesto Header */}
      <div className="text-center space-y-4">
        <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-rune-secondary font-semibold">
          ATELIER MANIFESTO
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-rune-primary uppercase tracking-tight leading-tight">
          ENGINEERED IN PORTUGAL. ZERO RESTOCKS.
        </h1>
        <p className="text-xs sm:text-sm font-sans text-rune-secondary max-w-2xl mx-auto leading-relaxed">
          RUNE is a limited-edition luxury streetwear label. We operate outside traditional fast-fashion cycles through limited, time-gated preorder drops.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="space-y-3">
          <Layers className="w-6 h-6 text-rune-primary mb-2" />
          <h3 className="font-serif text-lg font-bold text-rune-primary uppercase tracking-wider">
            500 GSM Portuguese French Terry
          </h3>
          <p className="text-xs text-rune-secondary leading-relaxed">
            Custom-milled in Porto, Portugal. We utilize double-layered hoods, dropped shoulders, and heavy ribbing to achieve our signature boxy architectural cut.
          </p>
        </Card>

        <Card className="space-y-3">
          <RefreshCw className="w-6 h-6 text-amber-300 mb-2" />
          <h3 className="font-serif text-lg font-bold text-rune-primary uppercase tracking-wider">
            Zero Overproduction Model
          </h3>
          <p className="text-xs text-rune-secondary leading-relaxed">
            Garments are milled strictly for reserved preorder quantities during active drop windows. Once the drop countdown expires, the collection is permanently archived.
          </p>
        </Card>

        <Card className="space-y-3">
          <Sparkles className="w-6 h-6 text-emerald-400 mb-2" />
          <h3 className="font-serif text-lg font-bold text-rune-primary uppercase tracking-wider">
            Architectural Sizing
          </h3>
          <p className="text-xs text-rune-secondary leading-relaxed">
            Every garment is engineered with exaggerated shoulder drops and boxy proportions. Order true to size for our signature oversized streetwear silhouette.
          </p>
        </Card>

        <Card className="space-y-3">
          <ShieldCheck className="w-6 h-6 text-sky-400 mb-2" />
          <h3 className="font-serif text-lg font-bold text-rune-primary uppercase tracking-wider">
            Direct Printful Express Logistics
          </h3>
          <p className="text-xs text-rune-secondary leading-relaxed">
            Post-drop order review triggers direct Printful bulk production and express shipping to your door across target markets (US, UK, CA, AU).
          </p>
        </Card>
      </div>
    </div>
  );
};
