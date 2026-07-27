import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTicketSchema } from '../../../shared/validators/index.js';
import { api } from '../services/api.js';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';
import { MessageSquare, CheckCircle2 } from 'lucide-react';

export const ContactSupportPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [ticketRef, setTicketRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createTicketSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError('');
    try {
      const response = await api.post('/tickets', data);
      const ticket = response.data.ticket;
      setTicketRef(ticket.ticketNumber || `TICK-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
      reset();
    } catch (err) {
      setApiError(err.message || 'Failed to submit support ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div className="text-center space-y-2">
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8E9192] font-semibold">
          CONCIERGE DESK
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-white uppercase tracking-wider">
          CUSTOMER SUPPORT & TICKETING
        </h1>
        <p className="text-xs font-sans text-[#8E9192] max-w-md mx-auto">
          Need assistance with preorder reservations, address modifications, or sizing queries? Submit a ticket below.
        </p>
      </div>

      <Card>
        {apiError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-none text-xs font-mono mb-6">
            {apiError}
          </div>
        )}

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-white uppercase tracking-wider">
              TICKET SUBMITTED SUCCESSFULLY
            </h3>
            <p className="text-xs font-mono text-[#8E9192]">
              TICKET REFERENCE: <span className="text-white font-bold">{ticketRef}</span>
            </p>
            <p className="text-xs font-sans text-[#8E9192] max-w-sm mx-auto">
              Our atelier support team will review your query and respond via email within 24 hours.
            </p>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              SUBMIT ANOTHER TICKET
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Your Email Address"
              {...register('userEmail')}
              error={errors.userEmail?.message}
            />
            <Input
              label="Subject / Preorder Reference"
              {...register('subject')}
              error={errors.subject?.message}
            />
            <div className="space-y-2">
              <label className="block text-xs font-sans uppercase tracking-widest text-[#8E9192] font-semibold">
                Message Details
              </label>
              <textarea
                rows={4}
                {...register('message')}
                className="w-full bg-[#121314] border border-[#1A1A1A] text-white px-4 py-3 text-xs focus:outline-none focus:border-white transition-colors"
                placeholder="Describe your inquiry..."
              />
              {errors.message && <p className="text-[11px] font-mono text-red-400">{errors.message.message}</p>}
            </div>

            <Button fullWidth size="lg" isLoading={isSubmitting} type="submit">
              <MessageSquare className="w-4 h-4 mr-2 inline" /> DISPATCH SUPPORT TICKET
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};
