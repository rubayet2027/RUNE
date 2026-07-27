import React, { useState } from 'react';
import { Card } from '../components/ui/Card.jsx';
import { Shield, FileText, Lock } from 'lucide-react';

export const LegalPage = () => {
  const [activeTab, setActiveTab] = useState('terms');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div className="text-center space-y-2">
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E9192] font-semibold">
          GOVERNANCE & COMPLIANCE
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-wider">
          TERMS & PRIVACY POLICY
        </h1>
        <p className="text-xs font-sans text-[#8E9192]">
          Legal frameworks governing preorder reservations, payment pre-authorizations, and data privacy.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 border-b border-[#1A1A1A] pb-4">
        <button
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
            activeTab === 'terms' ? 'text-white border-b-2 border-white font-bold' : 'text-[#8E9192] hover:text-white'
          }`}
        >
          TERMS OF SERVICE
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
            activeTab === 'privacy' ? 'text-white border-b-2 border-white font-bold' : 'text-[#8E9192] hover:text-white'
          }`}
        >
          PRIVACY POLICY
        </button>
      </div>

      {/* Content */}
      <Card className="space-y-6 text-xs font-sans text-[#8E9192] leading-relaxed">
        {activeTab === 'terms' ? (
          <>
            <h2 className="font-serif text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-white" /> 1. PREORDER DROP AGREEMENT
            </h2>
            <p>
              By placing a preorder reservation on RUNE, you agree that your payment authorization secures your garment reservation during an active drop window. Orders are locked in our system until the drop countdown closes, after which they are submitted in bulk to Printful for production.
            </p>
            <h2 className="font-serif text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-white" /> 2. CANCELLATION & REFUND POLICY
            </h2>
            <p>
              Preorder reservations can be cancelled for a 100% full refund at any time before the active drop window expires. Once the drop closes and bulk Printful production begins, orders cannot be cancelled as garments are milled specifically to order.
            </p>
          </>
        ) : (
          <>
            <h2 className="font-serif text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-white" /> 1. DATA COLLECTION & ENCRYPTION
            </h2>
            <p>
              RUNE collects customer names, shipping addresses, and email addresses strictly for order fulfillment and account authentication. Payment card details are handled securely via Stripe pre-authorization tokens and are never stored on our servers.
            </p>
            <h2 className="font-serif text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-white" /> 2. THIRD-PARTY DISCLOSURES
            </h2>
            <p>
              Your shipping information is transmitted securely to Printful solely for production, packaging, and express international courier dispatch across target markets (US, UK, CA, AU).
            </p>
          </>
        )}
      </Card>
    </div>
  );
};
