import Link from 'next/link';
import { CDLCalculator } from '@/components/CDLCalculator';
import { Truck, CheckCircle2, FileText, Shield, ArrowRight } from 'lucide-react';
import { ReinstatementModal } from '@/components/ReinstatementModal';

export const metadata = {
  title: 'Non-CDL Hot Shot Insurance & Startup Guide | Truck Coverage Experts',
  description: 'Starting a Hot Shot business with a pickup and flatbed? Use our Non-CDL Calculator and get insured without a Commercial Drivers License. 26,000 lbs rule explained.',
  alternates: {
    canonical: '/hot-shot',
  },
};

export default function HotShotPage() {
  return (
    <div className="min-h-screen bg-industrial-900 font-mono text-silver">
      {/* HEADER */}
      <nav className="border-b border-industrial-800 bg-industrial-900/90 backdrop-blur sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <Link href="/" className="text-xl font-bold tracking-tighter text-white">TRUCK COVERAGE EXPERTS</Link>
           <Link href="/quote" className="text-xs font-bold bg-safety-orange text-black px-4 py-2 rounded">
             GET INSURED
           </Link>
         </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
           <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-900/30 text-safety-orange text-xs font-bold mb-6 border border-orange-800 uppercase tracking-widest">
                <Truck className="w-4 h-4" /> REVOLUTIONIZING LOGISTICS
             </div>
             <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
               START YOUR <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-safety-orange to-yellow-500">HOT SHOT EMPIRE.</span>
             </h1>
             <p className="text-xl text-industrial-400 mb-8 max-w-lg">
               You don't need a Semi-Truck to make $5k/week. You usually don't even need a CDL. 
               We specialize in "3500 dually + 40ft gooseneck" insurance setups.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote" className="bg-safety-orange text-black font-bold py-4 px-8 rounded flex items-center justify-center gap-2 hover:bg-orange-500 transition-colors">
                  GET STARTUP QUOTE <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#checklist" className="border border-industrial-600 text-white font-bold py-4 px-8 rounded flex items-center justify-center hover:bg-industrial-800 transition-colors">
                  VIEW CHECKLIST
                </Link>
             </div>
           </div>

           <div className="relative">
             <div className="absolute -inset-4 bg-safety-orange/20 blur-xl rounded-full opacity-50"></div>
             <CDLCalculator />
           </div>
        </div>

        {/* CHECKLIST SECTION */}
        <section id="checklist" className="mb-20">
           <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-industrial-800 flex-1"></div>
            <h2 className="text-2xl font-display text-white tracking-widest">THE NON-CDL BLUEPRINT</h2>
            <div className="h-px bg-industrial-800 flex-1"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
             {[
               { icon: FileText, title: '1. LLC Formation', desc: 'Separate your personal assets. We recommend "Trucking" in the name.' },
               { icon: Truck, title: '2. MC & DOT #', desc: 'Apply for Motor Carrier authority. DO NOT pay the $300 "processing fees" from scammers.' },
               { icon: Shield, title: '3. Insurance (BOC-3)', desc: 'You need $750k Liability (FMCSA min) + $100k Cargo. We file your BOC-3 instantly.' },
               { icon: CheckCircle2, title: '4. IRP & IFTA', desc: 'Apportioned plates and fuel tax. This allows you to cross state lines legally.' },
             ].map((step, i) => (
               <div key={i} className="bg-industrial-800 p-6 rounded border border-industrial-700 hover:border-blue-500 transition-colors group">
                  <step.icon className="w-10 h-10 text-industrial-600 mb-4 group-hover:text-blue-500 transition-colors" />
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-industrial-400">{step.desc}</p>
               </div>
             ))}
          </div>
        </section>

        {/* FAQ / REINSTATEMENT CTA */}
        <div className="bg-black/40 rounded-2xl p-8 md:p-12 border border-industrial-800 text-center">
           <h2 className="text-3xl font-bold text-white mb-4">ALREADY DENIED COVERAGE?</h2>
           <p className="text-industrial-400 max-w-2xl mx-auto mb-8">
             New ventures are "high risk" to most agents. 
             If you bought a truck before getting a quote, you might be panicking. 
             We write New Ventures every single day.
           </p>
           <ReinstatementModal>
             <button className="text-safety-orange font-bold uppercase tracking-widest hover:text-white transition-colors border-b border-safety-orange hover:border-white pb-1">
               Download "New Authority" Survival Guide
             </button>
           </ReinstatementModal>
        </div>

      </main>
    </div>
  );
}
