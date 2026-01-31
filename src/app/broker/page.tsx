import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ShieldAlert, ArrowRight, XCircle } from 'lucide-react';

export const metadata = {
  title: 'Broker Insurance Requirements Directory',
  description: 'View insurance requirements for major freight brokers including CH Robinson, TQL, and Uber Freight. Fix "Do Not Load" status instantly.',
  alternates: {
    canonical: '/broker',
  },
};

export const revalidate = 3600;

export default async function BrokerIndex() {
  const { data: brokers } = await supabase
    .from('brokers')
    .select('*')
    .order('name', { ascending: true });

  return (
    <div className="min-h-screen bg-industrial-900 font-mono text-silver">
      <nav className="border-b border-industrial-800 bg-industrial-900/90 backdrop-blur sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <Link href="/" className="text-xl font-bold tracking-tighter text-white">TRUCK COVERAGE EXPERTS</Link>
           <Link href="/quote" className="text-xs font-bold bg-safety-orange text-black px-4 py-2 rounded">
             GET INSURED
           </Link>
         </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-900/30 text-red-500 text-xs font-bold mb-6 border border-red-800 uppercase tracking-widest">
            <XCircle className="w-4 h-4" /> BROKER COMPLIANCE
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            BROKER INSURANCE REQUIREMENTS
          </h1>
          <p className="text-xl text-industrial-400 max-w-2xl">
            See exactly what limits and endorsements you need to haul for the nation's largest brokers. 
            We specialize in lifting "Do Not Load" bans.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brokers?.map((b) => (
             <Link 
               key={b.slug} 
               href={`/broker/${b.slug}`} 
               className="group bg-industrial-800 border border-industrial-700 hover:border-red-500 p-6 rounded transition-all hover:-translate-y-1"
             >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors uppercase">
                    {b.name}
                  </span>
                  <div className="p-2 bg-red-900/20 text-red-500 rounded border border-red-900/50">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                   <div className="flex justify-between text-xs text-industrial-400">
                     <span>Liability:</span>
                     <span className="text-white font-bold">${b.min_auto_liability.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-xs text-industrial-400">
                     <span>Cargo:</span>
                     <span className="text-white font-bold">${b.min_cargo_limit.toLocaleString()}</span>
                   </div>
                </div>

                <div className="flex items-center justify-between border-t border-industrial-700 pt-4">
                   <span className="text-xs text-industrial-500 font-bold">Fix Rejection</span>
                   <ArrowRight className="w-4 h-4 text-industrial-600 group-hover:text-white transition-colors" />
                </div>
             </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
