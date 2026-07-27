import React, { useState } from 'react';
import { Card } from '../components/ui/Card.jsx';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqItems = [
  {
    q: 'HOW DOES THE PREORDER DROP MODEL WORK?',
    a: 'RUNE releases limited-edition capsule collections during active drop windows. During a drop, customers reserve their preferred sizes. Once the drop countdown expires, the administrator reviews all locked orders and submits them in bulk to Printful for production and express global delivery.',
  },
  {
    q: 'WHEN WILL MY PREORDER BE SHIPPED?',
    a: 'Orders remain locked during the active drop window. Once the drop closes, bulk Printful crafting begins. Direct express fulfillment takes approximately 7-12 business days depending on your target shipping country (US, UK, CA, AU).',
  },
  {
    q: 'CAN I MODIFY MY SHIPPING ADDRESS AFTER ORDERING?',
    a: 'Yes. As long as the active drop countdown is running and your order remains in LOCKED status, you can update your shipping address by opening a support ticket at our Concierge Desk.',
  },
  {
    q: 'WHAT FABRICS AND WEIGHTS ARE USED?',
    a: 'Our signature oversized hoodies utilize custom 500 GSM French Terry cotton double-milled in Portugal. Our heavyweight t-shirts feature 300 GSM combed jersey cotton with vintage garment washes.',
  },
  {
    q: 'DO YOU RE-RELEASE ARCHIVED DROPS?',
    a: 'No. Every RUNE drop is strictly limited edition. Once a drop closes and fulfills, it enters the permanent historical archive and will never be reproduced.',
  },
];

export const FAQPage = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div className="text-center space-y-2">
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E9192] font-semibold">
          KNOWLEDGE BASE
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-wider">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <p className="text-xs font-sans text-[#8E9192] max-w-md mx-auto">
          Everything you need to know about preorder locks, Portuguese fabric milling, and global fulfillment.
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, idx) => (
          <Card key={idx} className="cursor-pointer" onClick={() => setOpenIdx(openIdx === idx ? null : idx)}>
            <div className="flex justify-between items-center text-xs font-serif font-bold text-white uppercase tracking-wider">
              <span className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-[#8E9192]" /> {item.q}
              </span>
              <ChevronDown className={`w-4 h-4 text-[#8E9192] transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
            </div>
            {openIdx === idx && (
              <p className="text-xs font-sans text-[#8E9192] mt-4 leading-relaxed pt-3 border-t border-[#1A1A1A]">
                {item.a}
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
