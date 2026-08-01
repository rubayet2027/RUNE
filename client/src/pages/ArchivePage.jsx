import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api.js';
import { Badge } from '../components/ui/Badge.jsx';
import { StateView } from '../components/ui/StateView.jsx';

export const ArchivePage = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['archivedDrops'],
    queryFn: () => api.get('/drops?status=ARCHIVED'),
  });

  if (isLoading) {
    return <StateView type="loading" title="ACCESSING HISTORICAL VAULT..." />;
  }

  if (isError) {
    return (
      <StateView
        type="error"
        title="VAULT ARCHIVES UNAVAILABLE"
        description="Unable to establish connection with the historical drop vault."
        onAction={refetch}
        actionLabel="RETRY ACCESS"
      />
    );
  }

  const archivedDrops = data?.data?.items || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="border-b border-rune-border pb-6 space-y-2">
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-rune-secondary font-semibold">
          HISTORICAL VAULT
        </span>
        <h1 className="font-serif text-rune-primaryxl sm:text-4xl font-extrabold text-rune-primary uppercase tracking-wider">
          ARCHIVED DROPS
        </h1>
        <p className="text-xs font-sans text-rune-secondary max-w-xl leading-relaxed">
          RUNE operates strictly on limited preorder windows. Once a drop closes and fulfills, it enters the permanent archive and will never be reproduced.
        </p>
      </div>

      {archivedDrops.length === 0 ? (
        <StateView
          type="empty"
          title="NO ARCHIVED DROPS YET"
          description="Historical drops will appear here permanently after fulfillment concludes."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {archivedDrops.map((drop) => (
            <div key={drop.id} className="bg-rune-surface/40 border border-rune-border rounded-none overflow-hidden flex flex-col">
              <div className="aspect-video relative overflow-hidden bg-rune-bg">
                <img
                  src={drop.bannerImage || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80'}
                  alt={drop.title}
                  className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 ease-out"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="archived">PERMANENTLY ARCHIVED</Badge>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] font-mono text-rune-secondary block mb-2">
                    RELEASED {new Date(drop.createdAt || drop.startAt).getFullYear()}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-rune-primary uppercase tracking-wider">{drop.title}</h3>
                  <p className="text-xs font-sans text-rune-secondary mt-3 leading-relaxed">{drop.description}</p>
                </div>
                <div className="pt-4 border-t border-rune-border flex justify-between items-center text-xs font-mono text-rune-secondary">
                  <span>LIMITED PREORDER RUN</span>
                  <span className="text-amber-300/80 font-bold uppercase">RETIRED // SOLD OUT</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
