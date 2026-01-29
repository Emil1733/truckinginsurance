import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'FMCSA Violation Code Database | Truck Coverage Experts',
  description: 'Search the complete list of FMCSA violation codes. See which codes trigger automatic insurance denials and how to fix them.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function ViolationsIndex() {
  const { data: violations } = await supabase
    .from('violations')
    .select('*')
    .order('severity_tier', { ascending: false });

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
            <AlertTriangle className="w-4 h-4" /> COMPLIANCE DATABASE
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            FMCSA VIOLATION CODES
          </h1>
          <p className="text-xl text-industrial-400 max-w-2xl">
            A complete index of safety violations that impact your insurance premiums. 
            We insure carriers with active violations in all tiers.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {violations?.map((v) => (
             <Link 
               key={v.code} 
               href={`/violation/${v.slug}`} 
               className="group bg-industrial-800 border border-industrial-700 hover:border-red-500 p-6 rounded transition-all hover:-translate-y-1"
             >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">
                    {v.code}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded font-bold border ${
                    v.severity_tier >= 9 ? 'bg-red-900/30 text-red-500 border-red-900' : 
                    v.severity_tier >= 7 ? 'bg-orange-900/30 text-orange-500 border-orange-900' :
                    'bg-yellow-900/30 text-yellow-500 border-yellow-900'
                  }`}>
                    TIER {v.severity_tier}
                  </span>
                </div>
                
                <h3 className="text-silver font-bold mb-2 line-clamp-2 min-h-[3rem]">
                  {v.official_name}
                </h3>
                <p className="text-xs text-industrial-500 mb-6 uppercase tracking-wider line-clamp-1">
                  {v.layman_name}
                </p>

                <div className="flex items-center text-industrial-600 text-sm font-bold gap-2 group-hover:text-white transition-colors">
                  View Recovery Plan <ArrowRight className="w-4 h-4" />
                </div>
             </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
