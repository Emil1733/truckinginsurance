'use client'

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { saveBrokerLead } from '@/app/actions/leads';
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';

interface BrokerLeadFormProps {
  brokerName: string;
  ctaText: string;
}

export const BrokerLeadForm = ({ brokerName, ctaText }: BrokerLeadFormProps) => {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    // HoneyPot Check
    if (formData.get('website')) {
      // Silently ignore bot submissions
      setIsSuccess(true);
      setIsSubmitting(false);
      return;
    }

    formData.append('sourceUrl', pathname);
    formData.append('brokerInterest', brokerName);

    const result = await saveBrokerLead(formData);

    if (result.success) {
      setIsSuccess(true);
    } else {
      alert('Something went wrong. Please try again.');
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-[32px] text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
        <p className="text-green-200/70 text-sm">
          An Approval Expert is auditing your MC# now. We will call you within 15 minutes to finalize your {brokerName.split(' ')[0]} filing.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* HoneyPot Field - Hidden from humans */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-1">
        <label htmlFor="dotNumber" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
          USDOT Number
        </label>
        <input
          required
          type="text"
          name="dotNumber"
          id="dotNumber"
          placeholder="0000000"
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="name" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
          Full Name / Company
        </label>
        <input
          required
          type="text"
          name="name"
          id="name"
          placeholder="John Doe Logistics"
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="email" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="john@example.com"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="phone" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Phone
          </label>
          <input
            required
            type="tel"
            name="phone"
            id="phone"
            placeholder="(555) 000-0000"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-bold py-5 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-blue-600/20 group text-lg mt-4"
      >
        {isSubmitting ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <>
            {ctaText}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
        <ShieldCheck className="w-3 h-3 text-green-500" />
        SECURE 256-BIT ENCRYPTED FILING
      </div>
    </form>
  );
};
