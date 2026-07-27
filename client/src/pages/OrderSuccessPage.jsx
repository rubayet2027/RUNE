import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card } from '../components/ui/Card.jsx';
import { PreorderTimeline } from '../features/order/PreorderTimeline.jsx';
import { CheckCircle2, Lock, ArrowLeft } from 'lucide-react';

export const OrderSuccessPage = () => {
  const { orderNumber } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 text-center">
      {/* Icon & Title */}
      <div className="space-y-4 flex flex-col items-center">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center rounded-none mb-2">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <Badge variant="locked">PREORDER RESERVED & LOCKED</Badge>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
          PREORDER CONFIRMED
        </h1>
        <p className="text-xs font-mono text-[#8E9192] uppercase tracking-[0.2em]">
          PREORDER REFERENCE: <span className="text-white font-bold">{orderNumber || 'RN-882910'}</span>
        </p>
      </div>

      {/* Overview Card */}
      <Card className="text-left space-y-4">
        <div className="flex items-center gap-2 text-amber-300 font-mono text-xs border-b border-[#1A1A1A] pb-3">
          <Lock className="w-4 h-4" /> ORDER STATUS: LOCKED UNTIL DROP EXPIRES
        </div>
        <p className="text-xs font-sans text-[#8E9192] leading-relaxed">
          Your preorder reservation has been secured. Payment has been pre-authorized and your order is locked in our system. Once the active drop countdown finishes, the administrator will review all locked orders and submit them in bulk to Printful for production.
        </p>
      </Card>

      {/* Fulfillment Timeline */}
      <PreorderTimeline />

      {/* Action Navigation */}
      <div className="pt-6 flex justify-center">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2 inline" /> RETURN TO ACTIVE DROP
          </Button>
        </Link>
      </div>
    </div>
  );
};
