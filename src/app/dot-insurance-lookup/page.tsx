'use client';

import { useState } from 'react';
import { Mail, ShieldCheck, Activity, AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, Search, TrendingDown } from 'lucide-react';
import Link from 'next/link';

export default function DotInsuranceLookup() {
  const [dot, setDot] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dot || !email) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dot, email })
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-200 selection:bg-blue-500/30 flex flex-col font-sans">
      
      {/* Premium Glass Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-[#060913]/60 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-blue-500" />
            <span>TRUCK COVERAGE <span className="text-blue-500">EXPERTS</span></span>
          </Link>
        </div>
      </nav>

      {/* Hero & Lead Capture Section - Ultra Premium */}
      <header className="relative pt-40 pb-32 px-6 overflow-hidden">
        {/* Dynamic Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen" />
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none -z-10 mix-blend-screen" />

        <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-xs font-black mb-8 border border-blue-500/20 uppercase tracking-widest shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <Activity className="w-4 h-4 animate-pulse" /> FMCSA Forensic Integration
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.05]">
            Get Your Free <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500">
              Compliance Report
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400/90 max-w-2xl mx-auto leading-relaxed font-light">
            Enter your DOT number below. Our underwriters will run a forensic audit on your public FMCSA safety data and email your <strong className="text-white font-semibold">Insurance Readiness Score</strong> in minutes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative z-20">
          {!success ? (
            <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">US DOT Number</label>
                    <input
                      type="text"
                      value={dot}
                      onChange={(e) => setDot(e.target.value)}
                      placeholder="e.g. 1234567"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Where to send it?"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 text-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
                      required
                    />
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? 'Analyzing Profile...' : 'Run Forensic Audit'} <ArrowRight className="w-6 h-6" />
                </button>

                {error && (
                  <p className="text-red-400 text-sm font-bold flex items-center justify-center gap-2 bg-red-500/10 py-4 rounded-xl border border-red-500/20">
                    <AlertTriangle className="w-5 h-5 shrink-0" /> {error}
                  </p>
                )}
                
                <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-2 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Bank-level encryption. We never share your data.
                </p>
              </form>
            </div>
          ) : (
            <div className="text-center animate-in zoom-in duration-500 bg-[#0a0f1c]/80 backdrop-blur-xl border border-emerald-500/30 p-16 rounded-[3rem] shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/10 blur-3xl pointer-events-none" />
               <CheckCircle2 className="w-28 h-28 text-emerald-400 mx-auto mb-8 relative z-10" />
               <h2 className="text-5xl font-black text-white mb-6 relative z-10 tracking-tight">Audit Initiated!</h2>
               <p className="text-xl text-slate-300 max-w-lg mx-auto relative z-10 leading-relaxed font-light mb-10">
                 Our system is compiling your FMCSA safety and inspection footprint for DOT <strong className="text-white font-bold">{dot}</strong>. 
               </p>
               <div className="bg-black/40 border border-white/5 p-6 rounded-2xl inline-flex flex-col items-center justify-center relative z-10 mb-8 min-w-[300px]">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" /> Sending report to:
                  </p>
                  <p className="text-xl text-white font-medium">{email}</p>
               </div>
               <p className="text-slate-400 relative z-10 font-medium">
                 Check your inbox (and spam folder) in the next 5-10 minutes.
               </p>
            </div>
          )}
        </div>
      </header>

      {/* High-End Typography SEO Section */}
      <main className="max-w-5xl mx-auto px-6 py-32 space-y-32 relative z-10">
        
        {/* Intro */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight leading-tight">Why Your DOT Number Dictates Your <span className="text-blue-400">Insurance Premiums</span></h2>
          <div className="space-y-6 text-lg md:text-xl text-slate-400 font-light leading-relaxed">
            <p>
              In the commercial trucking industry, your US DOT number is much more than just a federal identifier—it is an open book that insurance underwriters and freight brokers use to judge your risk level. Every time one of your trucks is inspected at a weigh station, receives a violation, or is involved in an accident, that data is permanently logged into the FMCSA’s SAFER system and the SMS.
            </p>
            <p>
              Our <strong className="text-white font-medium">Free DOT Insurance Lookup Tool</strong> is designed to do exactly what insurance underwriters do: it scrapes your public FMCSA safety footprint, analyzes your out-of-service (OOS) rates, reviews your driver fitness scores, and generates a comprehensive report indicating how likely you are to secure preferred insurance rates.
            </p>
          </div>
        </section>

        {/* 3 Core Factors - Premium Cards */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white tracking-tight">The 3 Factors Underwriters Look At First</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mt-8 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0a0f1c] border border-white/5 hover:border-blue-500/30 p-10 rounded-[2.5rem] transition-all hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-8 border border-red-500/20 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">OOS Rates</h3>
              <p className="text-slate-400 leading-relaxed font-light text-lg">
                If your Vehicle or Driver OOS rate climbs above the national average, standard insurance markets will immediately flag your profile as "high risk," causing severe premium spikes.
              </p>
            </div>
            <div className="bg-[#0a0f1c] border border-white/5 hover:border-yellow-500/30 p-10 rounded-[2.5rem] transition-all hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-8 border border-yellow-500/20 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Conditional Ratings</h3>
              <p className="text-slate-400 leading-relaxed font-light text-lg">
                A "Conditional" safety rating from the FMCSA is the fastest way to lose insurance. You typically have 30 days to implement a Corrective Action Plan before coverage drops entirely.
              </p>
            </div>
            <div className="bg-[#0a0f1c] border border-white/5 hover:border-emerald-500/30 p-10 rounded-[2.5rem] transition-all hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <Search className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">New Venture Status</h3>
              <p className="text-slate-400 leading-relaxed font-light text-lg">
                If your DOT number was issued less than 12 months ago, you lack a proven safety record. Our audit helps you prove operational readiness to unlock better rates earlier.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Explanation - Broker Firewalls */}
        <section className="bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/10 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">How Broker Firewalls Leverage DOT Data</h2>
          <p className="text-xl text-slate-300 font-light leading-relaxed mb-10 max-w-3xl">
            It isn't just insurance companies watching your DOT number. Major freight brokerages like Amazon Relay, TQL, and Landstar employ automated vetting systems to scan your FMCSA profile before ever offering you a load.
          </p>
          <div className="space-y-6 max-w-3xl relative z-10">
            <div className="flex items-start gap-4 p-6 bg-black/40 border border-white/5 rounded-2xl">
              <ChevronRight className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
              <p className="text-lg text-slate-300 font-light">
                <strong className="text-white font-bold">Amazon Relay:</strong> Requires an absolute clean safety score. Any SMS alerts in the Unsafe Driving or Crash Indicator basics will trigger an automated block on your Carrier Central account.
              </p>
            </div>
            <div className="flex items-start gap-4 p-6 bg-black/40 border border-white/5 rounded-2xl">
              <ChevronRight className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
              <p className="text-lg text-slate-300 font-light">
                <strong className="text-white font-bold">TQL & C.H. Robinson:</strong> Utilize proprietary risk models that combine your FMCSA data with your insurance limits. If your DOT history shows severe hours-of-service violations, you won't get onboarded.
              </p>
            </div>
            <div className="flex items-start gap-4 p-6 bg-black/40 border border-white/5 rounded-2xl">
              <ChevronRight className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
              <p className="text-lg text-slate-300 font-light">
                <strong className="text-white font-bold">Landstar:</strong> Known for extreme safety compliance. They frequently reject carriers with less than 6 months of active authority or those carrying "Conditional" safety ratings.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-400 mt-4 font-light">Everything you need to know about your FMCSA record.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#0a0f1c] border border-white/5 p-8 rounded-3xl hover:border-white/10 transition-colors">
              <h4 className="text-xl font-bold text-white mb-4 leading-snug">How often does the FMCSA update my safety data?</h4>
              <p className="text-slate-400 text-base leading-relaxed font-light">
                The FMCSA updates the public SAFER database and SMS once a month. However, individual inspections and crash reports can appear in the backend systems used by underwriters within 48 to 72 hours.
              </p>
            </div>
            <div className="bg-[#0a0f1c] border border-white/5 p-8 rounded-3xl hover:border-white/10 transition-colors">
              <h4 className="text-xl font-bold text-white mb-4 leading-snug">Can I get my rates lowered with a bad DOT score?</h4>
              <p className="text-slate-400 text-base leading-relaxed font-light">
                Yes, but it requires strategy. You must implement a formal Corrective Action Plan (CAP), utilize ELD data to prove improved compliance, and work with a specialized agency to negotiate your risk profile.
              </p>
            </div>
            <div className="bg-[#0a0f1c] border border-white/5 p-8 rounded-3xl hover:border-white/10 transition-colors">
              <h4 className="text-xl font-bold text-white mb-4 leading-snug">What does an "Insurance Readiness Score" mean?</h4>
              <p className="text-slate-400 text-base leading-relaxed font-light">
                Our proprietary score is an aggregate metric that mimics how an underwriter scores your DOT. A score above 80 indicates you are primed for preferred rates, while a score below 60 flags high-risk pricing.
              </p>
            </div>
            <div className="bg-[#0a0f1c] border border-white/5 p-8 rounded-3xl hover:border-white/10 transition-colors">
              <h4 className="text-xl font-bold text-white mb-4 leading-snug">Does this tool hurt my DOT standing?</h4>
              <p className="text-slate-400 text-base leading-relaxed font-light">
                No. Our DOT lookup tool performs a "soft pull" of publicly available federal data. It does not trigger an audit, does not notify the FMCSA, and strictly helps you understand your risk profile.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Final SEO Footer Block */}
      <footer className="border-t border-white/5 bg-black py-20 px-6 mt-auto">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Comprehensive Commercial Trucking Data Analysis</h2>
          <p className="text-sm md:text-base text-slate-500 leading-loose font-light max-w-4xl mx-auto">
            Whether you are an owner-operator running a single hot shot rig or a fleet manager overseeing 50 semi-trucks, your FMCSA data is your most valuable asset. Protect your MCS-150, monitor your SMS basics, and ensure your Motor Carrier authority remains in pristine condition to secure the lowest possible commercial truck insurance rates. Our platform is dedicated to helping distressed carriers navigate the complex world of high-risk truck insurance, conditional safety rating upgrades, and broker compliance.
          </p>
        </div>
      </footer>

    </div>
  );
}
