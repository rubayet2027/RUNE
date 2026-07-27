import React from 'react';
import { Lock, Truck, ShieldCheck } from 'lucide-react';

export const PreorderRuleBanner = () => {
  return (
    <div className="bg-[#1A1A1A]/50 border border-[#1A1A1A] p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
      <div className="flex items-center gap-3">
        <Lock className="w-4 h-4 text-amber-300 flex-shrink-0" />
        <div>
          <p className="font-serif text-white font-bold uppercase text-[11px]">PREORDER LOCK</p>
          <p className="text-[10px] text-[#8E9192]">Orders locked until drop window closes</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Truck className="w-4 h-4 text-white flex-shrink-0" />
        <div>
          <p className="font-serif text-white font-bold uppercase text-[11px]">EXPRESS SHIPPING</p>
          <p className="text-[10px] text-[#8E9192]">Complimentary global delivery (US, UK, CA, AU)</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <div>
          <p className="font-serif text-white font-bold uppercase text-[11px]">BULK PRINTFUL CRAFTING</p>
          <p className="text-[10px] text-[#8E9192]">Submitted in bulk post-drop review</p>
        </div>
      </div>
    </div>
  );
};
