import Link from 'next/link';
import { ShieldAlert, ArrowRight, XCircle, Search, BadgeCheck, Zap } from 'lucide-react';
import { BROKERS_DATA } from '@/lib/data/brokers';

export const metadata = {
  title: 'Broker Insurance Requirements Directory',
  description: 'View insurance requirements for major freight brokers including CH Robinson, TQL, and Uber Freight. Fix "Do Not Load" status instantly.',
  alternates: {
    canonical: '/broker',
  },
};

export const revalidate = 604800;

export default function BrokerIndex() {
  const brokers = BROKERS_DATA;

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* Premium Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tighter text-white">
              TRUCK COVERAGE <span className="text-blue-500">EXPERTS</span>
            </Link>
            <Link href="/amazon-relay-insurance" className="text-[10px] font-bold bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition-all uppercase tracking-widest">
              Amazon Specialist
            </Link>
          </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <header className="mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-xs font-black mb-8 border border-red-500/20 uppercase tracking-widest">
            <ShieldAlert className="w-4 h-4" /> Broker Vetting Firewall 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tight">
            CARRIER <br/>
            <span className="text-blue-500">APPROVAL GUIDES</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
            Stop guessing. See exactly what insurance limits, endorsements, and "hidden" certificate holder language you need to bypass the automated vetting systems of the nation's largest brokers.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brokers.map((b) => (
             <Link 
               key={b.slug} 
               href={`/broker/${b.slug}`} 
               className="group relative bg-slate-900/40 border border-slate-800 p-8 rounded-[40px] transition-all hover:border-blue-500/50 hover:bg-slate-900 hover:-translate-y-2 overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full" />
                
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="space-y-1">
                    <span className="text-xs font-black text-blue-500 uppercase tracking-widest">Master Guide</span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {b.name.split(' ')[0]}
                    </h3>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl">
                    <BadgeCheck className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                
                <div className="space-y-4 mb-10 relative z-10">
                   <div className="flex justify-between items-center py-3 border-b border-slate-800/50">
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Auto Liability</span>
                     <span className="text-sm text-white font-bold">{b.requirements.autoLiability}</span>
                   </div>
                   <div className="flex justify-between items-center py-3 border-b border-slate-800/50">
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cargo Limit</span>
                     <span className="text-sm text-white font-bold">{b.requirements.cargoInsurance}</span>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-4 relative z-10">
                   <span className="text-[10px] text-slate-500 font-black uppercase tracking-tighter group-hover:text-white transition-colors">Forensic Audit Available</span>
                   <div className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                   </div>
                </div>
             </Link>
          ))}
          
          {/* Static Funnel Redirects */}
          <Link 
            href="/amazon-relay-insurance"
            className="group relative bg-blue-600 border border-blue-500 p-8 rounded-[40px] transition-all hover:bg-blue-500 hover:-translate-y-2 overflow-hidden shadow-2xl shadow-blue-600/20"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
            <div className="flex justify-between items-start mb-10 relative z-10">
              <div className="space-y-1">
                <span className="text-xs font-black text-blue-200 uppercase tracking-widest">High Volume Funnel</span>
                <h3 className="text-2xl font-bold text-white uppercase">Amazon Relay</h3>
              </div>
              <Zap className="w-8 h-8 text-white animate-pulse" />
            </div>
            <p className="text-blue-100 text-sm mb-10 relative z-10">
              The #1 source for box truck carrier approvals. Bypassing the Seattle OCR portal in 48 hours.
            </p>
            <div className="flex items-center justify-between pt-4 relative z-10 border-t border-blue-400/30">
              <span className="text-[10px] text-blue-200 font-black uppercase">Instant Rescue Page</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
