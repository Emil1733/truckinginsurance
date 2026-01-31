import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Activity, ArrowRight, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'FMCSA Safety Rating Factors | Upgrade to Satisfactory',
  description: 'Understanding the 6 factors that determine your FMCSA Safety Rating. Learn how to upgrade from Conditional to Satisfactory.',
  alternates: {
    canonical: '/safety-rating',
  },
};

export const revalidate = 3600;

export default async function SafetyRatingIndex() {
  const { data: factors } = await supabase
    .from('safety_factors')
    .select('*')
    .order('factor_number', { ascending: true });

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-900/30 text-yellow-500 text-xs font-bold mb-6 border border-yellow-800 uppercase tracking-widest">
            <Activity className="w-4 h-4" /> FMCSA RATING FACTORS
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            SAFETY RATING EXPLAINED
          </h1>
          <p className="text-xl text-industrial-400 max-w-2xl">
            The FMCSA uses these 6 factors to determine if your carrier is "Satisfactory", "Conditional", or "Unsatisfactory".
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {factors?.map((f) => (
             <Link 
               key={f.slug} 
               href={`/safety-rating/${f.slug}`} 
               className="group bg-industrial-800 border border-industrial-700 hover:border-yellow-500 p-6 rounded transition-all hover:-translate-y-1"
             >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl font-display font-bold text-industrial-700 group-hover:text-yellow-500/50 transition-colors">
                    0{f.factor_number}
                  </span>
                </div>
                
                <h3 className="text-xl text-white font-bold mb-4 min-h-[3.5rem]">
                  {f.name}
                </h3>

                <div className="flex items-center text-industrial-600 text-sm font-bold gap-2 group-hover:text-white transition-colors">
                  View Recovery Steps <ArrowRight className="w-4 h-4" />
                </div>
             </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
