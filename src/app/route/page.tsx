import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Map, ArrowRight, Milestone } from 'lucide-react';

export const metadata = {
  title: 'Trucking Route Permit Database | Interstate Compliance',
  description: 'Search requirements for popular trucking lanes. Calculate mileage, drive time, and see mandatory filings for interstate hauls.',
  alternates: {
    canonical: '/route',
  },
};

export const revalidate = 3600;

export default async function RoutesIndex() {
  const { data: routes } = await supabase
    .from('routes')
    .select('*')
    .limit(100); // Pagination later if needed

  return (
    <div className="min-h-screen bg-industrial-900 font-mono text-silver">
      <nav className="border-b border-industrial-800 bg-industrial-900/90 backdrop-blur sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <Link href="/" className="text-xl font-bold tracking-tighter text-white">TRUCK COVERAGE EXPERTS</Link>
           <Link href="/quote" className="text-xs font-bold bg-safety-orange text-black px-4 py-2 rounded">
             GET PERMITS
           </Link>
         </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-900/30 text-blue-500 text-xs font-bold mb-6 border border-blue-800 uppercase tracking-widest">
            <Map className="w-4 h-4" /> INTERSTATE LANES
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            POPULAR HAULING ROUTES
          </h1>
          <p className="text-xl text-industrial-400 max-w-2xl">
            Check permit reciprocity and mandatory filings for your next trip.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes?.map((r) => (
             <Link 
               key={r.slug} 
               href={`/route/${r.slug}`} 
               className="group bg-industrial-800 border border-industrial-700 hover:border-blue-500 p-6 rounded transition-all hover:-translate-y-1"
             >
                <div className="flex items-center gap-3 text-2xl font-display font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  <span>{r.origin_code}</span>
                  <ArrowRight className="w-6 h-6 text-industrial-600" />
                  <span>{r.destination_code}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-industrial-500 mb-6">
                   <div className="flex items-center gap-1">
                      <Milestone className="w-4 h-4" /> Est. Miles TBD
                   </div>
                </div>

                <div className="flex items-center text-industrial-600 text-sm font-bold gap-2 group-hover:text-white transition-colors">
                  Check Permits <ArrowRight className="w-4 h-4" />
                </div>
             </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
