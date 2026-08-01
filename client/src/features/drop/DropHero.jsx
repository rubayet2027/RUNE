import React from 'react';
import { Badge } from '../../components/ui/Badge.jsx';
import { CountdownTimer } from '../../components/ui/CountdownTimer.jsx';

export const DropHero = ({ drop }) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-rune-bg border-b border-rune-border">
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

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-rune-primary max-w-4xl mx-auto leading-[1.1]">
          {drop.title}
        </h1>

        <p className="text-xs sm:text-sm font-sans text-rune-secondary max-w-xl mx-auto leading-relaxed tracking-wide">
          {drop.description}
        </p>

        <div className="pt-6">
          <CountdownTimer targetDate={drop.endAt} />
        </div>
      </div>
    </section>
  );
};
