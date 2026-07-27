import React from 'react';
import { Badge } from '../components/ui/Badge.jsx';

const archivedDropsMock = [
  {
    id: 'drop_000',
    title: 'DROP 000 // ARCHIVAL PROTOTYPES',
    slug: 'drop-000-archival-prototypes',
    releasedAt: 'MAY 2026',
    status: 'ARCHIVED',
    totalPieces: 500,
    bannerImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    description: 'Initial architectural prototype drop featuring 500GSM heavyweight fleece and raw hem details. Permanently retired.',
  },
];

export const ArchivePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="border-b border-[#1A1A1A] pb-6 space-y-2">
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E9192] font-semibold">
          HISTORICAL VAULT
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wider">
          ARCHIVED DROPS
        </h1>
        <p className="text-xs font-sans text-[#8E9192] max-w-xl leading-relaxed">
          RUNE operates strictly on limited preorder windows. Once a drop closes and fulfills, it enters the permanent archive and will never be reproduced.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {archivedDropsMock.map((drop) => (
          <div key={drop.id} className="bg-[#1A1A1A]/40 border border-[#1A1A1A] rounded-none overflow-hidden flex flex-col">
            <div className="aspect-video relative overflow-hidden bg-[#121314]">
              <img
                src={drop.bannerImage}
                alt={drop.title}
                className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 ease-out"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="archived">PERMANENTLY ARCHIVED</Badge>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-mono text-[#8E9192] block mb-2">RELEASED {drop.releasedAt}</span>
                <h3 className="font-serif text-xl font-bold text-white uppercase tracking-wider">{drop.title}</h3>
                <p className="text-xs font-sans text-[#8E9192] mt-3 leading-relaxed">{drop.description}</p>
              </div>
              <div className="pt-4 border-t border-[#1A1A1A] flex justify-between items-center text-xs font-mono text-[#8E9192]">
                <span>LIMITED RUN: {drop.totalPieces} PIECES</span>
                <span className="text-amber-300/80 font-bold uppercase">SOLD OUT</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
