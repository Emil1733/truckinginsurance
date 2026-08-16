import { Metadata } from "next";
import { Users, Truck, DollarSign, TrendingUp, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partner with Us | Freight Dispatcher Affiliate Program",
  description: "Independent Freight Dispatchers: Monetize your fleet. Refer your owner-operators for insurance quotes and earn commission on every bound policy.",
};

export default function DispatcherAffiliatePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        <div className="text-center max-w-4xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 mb-6">
            <Users className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wider uppercase">For Independent Dispatchers</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8">
            Monetize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Fleet.</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed mb-10">
            You already manage their loads. Now, help them get better insurance rates. Generate a custom referral link, send it to your owner-operators, and get paid for every policy they bind.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2 group">
              Generate My Referral Link
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-blue-500/30 transition-colors">
            <div className="bg-blue-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <Truck className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">1. Send Your Link</h3>
            <p className="text-slate-400">
              When you onboard a new owner-operator or their renewal is coming up, text them your custom ?ref=your-name link.
            </p>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-emerald-500/30 transition-colors">
            <div className="bg-emerald-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">2. We Quote Them</h3>
            <p className="text-slate-400">
              Our system tracks that they came from you. Our specialized agents immediately shop their profile across 40+ carriers to find the best rate.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-amber-500/30 transition-colors">
            <div className="bg-amber-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <DollarSign className="w-7 h-7 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">3. You Get Paid</h3>
            <p className="text-slate-400">
              When the policy binds, your affiliate dashboard updates. You receive a revenue share for making the introduction.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}