import React from 'react';
import { Lock } from 'lucide-react';

export const PreorderTimeline = () => {
  return (
    <div className="bg-[#1A1A1A]/40 border border-[#1A1A1A] p-8 text-left space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 border-b border-[#1A1A1A] pb-4">
        <Lock className="w-4 h-4 text-amber-300" />
        <h3 className="font-serif text-sm text-white font-bold uppercase tracking-wider">
          DROP FULFILLMENT TIMELINE
        </h3>
      </div>

      <ol className="space-y-6 relative border-l border-[#1A1A1A] pl-6 ml-2 font-mono text-xs">
        <li className="space-y-1 relative">
          <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 bg-white" />
          <span className="text-white font-bold block">1. Preorder Reserved & Order Locked (CURRENT)</span>
          <span className="text-[11px] text-[#8E9192] font-sans block">Items reserved in active drop batch.</span>
        </li>
        <li className="space-y-1 relative">
          <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 bg-[#444748]" />
          <span className="text-[#8E9192] font-semibold block">2. Drop Preorder Window Closes</span>
          <span className="text-[11px] text-[#8E9192] font-sans block">All orders locked and tallied for review.</span>
        </li>
        <li className="space-y-1 relative">
          <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 bg-[#444748]" />
          <span className="text-[#8E9192] font-semibold block">3. Administrator Bulk Printful Dispatch</span>
          <span className="text-[11px] text-[#8E9192] font-sans block">Admin clicks "Send Entire Drop" to initiate production.</span>
        </li>
        <li className="space-y-1 relative">
          <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 bg-[#444748]" />
          <span className="text-[#8E9192] font-semibold block">4. Direct Express Shipping</span>
          <span className="text-[11px] text-[#8E9192] font-sans block">Printful prints and ships directly to your address.</span>
        </li>
        <li className="space-y-1 relative">
          <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 bg-[#444748]" />
          <span className="text-[#8E9192] font-semibold block">5. Permanent Archival</span>
          <span className="text-[11px] text-[#8E9192] font-sans block">Drop collection moves to read-only historical vault.</span>
        </li>
      </ol>
    </div>
  );
};
