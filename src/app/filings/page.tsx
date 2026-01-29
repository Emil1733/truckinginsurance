import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Map, ArrowRight, FileText } from 'lucide-react';

export const metadata = {
  title: 'Trucking Permit & Filing Directory | Truck Coverage Experts',
  description: 'Search our directory of state trucking permits, Forms E & H, and SR-22 filings. Instant electronic filing available for all 50 states.',
};

export const revalidate = 3600;

export default async function FilingsIndex() {
  const { data: filings } = await supabase
    .from('state_filings')
    .select('*')
    .order('state_code', { ascending: true });

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-900/30 text-blue-500 text-xs font-bold mb-6 border border-blue-800 uppercase tracking-widest">
            <Map className="w-4 h-4" /> PERMIT DIRECTORY
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            STATE FILINGS & PERMITS
          </h1>
          <p className="text-xl text-industrial-400 max-w-2xl">
            Browse mandatory insurance filings by state. We provide instant electronic filing 
            (BMC-91X, Form E, Form H) directly to the FMCSA and state DOIs.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filings?.map((f) => (
             <Link 
               key={f.slug} 
               href={`/filing/${f.slug}`} 
               className="group bg-industrial-800 border border-industrial-700 hover:border-blue-500 p-6 rounded transition-all hover:-translate-y-1"
             >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl font-mono font-bold text-industrial-700 group-hover:text-blue-900 transition-colors">
                    {f.state_code}
                  </span>
                  <div className="p-2 bg-blue-900/20 text-blue-500 rounded border border-blue-900/50">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>
                
                <h3 className="text-white text-xl font-bold mb-2">
                  {f.form_id}
                </h3>
                <p className="text-sm text-industrial-400 mb-6 line-clamp-2">
                  {f.official_name}
                </p>

                <div className="flex items-center justify-between border-t border-industrial-700 pt-4">
                   <span className="text-xs text-industrial-500 font-bold">penalty: ${f.penalty_per_day}/day</span>
                   <ArrowRight className="w-4 h-4 text-industrial-600 group-hover:text-white transition-colors" />
                </div>
             </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
