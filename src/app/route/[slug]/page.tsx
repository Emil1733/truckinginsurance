import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Map, ShieldAlert, ArrowRight, Truck, FileText, Clock, Milestone, TriangleAlert } from 'lucide-react';
import { ReinstatementModal } from '@/components/ReinstatementModal';
import { calculateHaversineDistance, calculateLogistics } from '@/lib/utils/route_math';
import { getRouteHazards } from '@/lib/data/state_risks';

// Force static generation for specific high-volume routes to save build time? 
// No, let's use generateStaticParams for ALL of them if we want pSEO perfection.
export async function generateStaticParams() {
  const { data: routes } = await supabase.from('routes').select('slug');
  return routes?.map(({ slug }) => ({ slug })) || [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: route } = await supabase.from('routes').select('*').eq('slug', slug).single();

  if (!route) return { title: 'Route Not Found' };
  
  const distance = calculateHaversineDistance(route.origin_code, route.destination_code);

  return {
    title: `Permits for ${route.origin_name} to ${route.destination_name} (${distance} Miles) | Truck Coverage Experts`,
    description: `Hauling from ${route.origin_code} to ${route.destination_code}? This ${distance}-mile trip requires ${route.requirements.join(' and ')}. File instantly.`,
  };
}

export default async function RoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const { data: route } = await supabase
    .from('routes')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!route) return notFound();

  // Dynamic Content Injection (The "Variance" Layer)
  const miles = calculateHaversineDistance(route.origin_code, route.destination_code);
  const logistics = calculateLogistics(miles);
  const hazards = getRouteHazards(route.origin_code, route.destination_code);

  return (
    <div className="min-h-screen bg-industrial-900 font-mono text-silver">
      <nav className="border-b border-industrial-800 bg-industrial-900/50 backdrop-blur sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <Link href="/" className="text-xl font-bold tracking-tighter text-white">TRUCK COVERAGE EXPERTS</Link>
           <Link href="/contact" className="text-xs font-bold bg-safety-orange text-black px-4 py-2 rounded">
             GET PERMITS
           </Link>
         </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* HERO */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-900/30 text-blue-400 text-xs font-bold mb-6 border border-blue-800">
            <Map className="w-4 h-4" /> INTERSTATE COMPLIANCE CHECK
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            <span className="text-industrial-500">{route.origin_code}</span>
            <span className="mx-4 text-safety-orange">➜</span>
            <span className="text-white">{route.destination_code}</span>
          </h1>
          <p className="text-xl text-industrial-400 max-w-2xl mx-auto">
            This <span className="text-white font-bold">{miles.toLocaleString()} mile</span> haul crosses state lines, triggering Federal FMCSA jurisdiction. 
          </p>
        </div>

        {/* LOGISTICS CARD (UNIQUE CONTENT) */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="bg-industrial-800 p-6 rounded border border-industrial-700">
            <div className="text-industrial-500 text-xs font-bold mb-2 flex items-center gap-2">
              <Milestone className="w-4 h-4" /> TOTAL MILEAGE
            </div>
            <div className="text-2xl text-white font-bold">{miles.toLocaleString()} miles</div>
          </div>
          <div className="bg-industrial-800 p-6 rounded border border-industrial-700">
             <div className="text-industrial-500 text-xs font-bold mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" /> EST. DRIVE TIME
            </div>
            <div className="text-2xl text-white font-bold">{logistics.driveHours} Hours</div>
            <div className="text-xs text-industrial-500">(@60mph avg)</div>
          </div>
          <div className="bg-industrial-800 p-6 rounded border border-industrial-700">
             <div className="text-industrial-500 text-xs font-bold mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" /> REQ. RESET BREAKS
            </div>
            <div className="text-2xl text-white font-bold">{logistics.breaksRequired}</div>
             <div className="text-xs text-industrial-500">(10-hour resets per FMCSA 395.3)</div>
          </div>
        </div>

        {/* REGIONAL RISK ALERTS (UNIQUE HAZARDS) */}
         {hazards.length > 0 && (
          <div className="mb-12 bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded-r">
            <h3 className="text-yellow-500 font-bold mb-4 flex items-center gap-2">
              <TriangleAlert className="w-5 h-5" /> ROUTE ADVISORIES
            </h3>
            <ul className="space-y-2">
              {hazards.map((h, i) => (
                <li key={i} className="text-industrial-300 text-sm flex gap-3">
                  <span className="block min-w-1.5 h-1.5 mt-1.5 rounded-full bg-yellow-500/50" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* COMPLIANCE CARD */}
        <div className="bg-industrial-800 border-2 border-safety-orange rounded-xl p-8 mb-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
             <Truck className="w-64 h-64 text-safety-orange" />
           </div>
           
           <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
             <ShieldAlert className="text-safety-orange" /> MANDATORY FILINGS
           </h2>

           <div className="space-y-4 mb-8">
             {route.requirements.map((req: string, i: number) => (
               <div key={i} className="flex items-center gap-4 bg-industrial-900 p-4 rounded border border-industrial-700">
                 <div className="min-w-8 h-8 rounded-full bg-red-900/50 text-red-500 flex items-center justify-center font-bold border border-red-900">
                   !
                 </div>
                 <span className="text-white font-bold">{req}</span>
                 <ArrowRight className="ml-auto text-industrial-600" />
               </div>
             ))}
           </div>

           <div className="bg-industrial-900/50 p-6 rounded border border-industrial-700 text-sm text-industrial-400 mb-8">
             <strong>Enforcement Warning:</strong> Operating without these filings in {route.destination_name} can result in 
             immediate Out-of-Service (OOS) orders and fines starting at $1,100 (Violation 392.2).
           </div>

           <ReinstatementModal>
             <button className="w-full py-4 bg-safety-orange hover:bg-orange-500 text-black font-bold text-lg rounded transition-colors flex items-center justify-center gap-2">
               FILE PERMITS NOW <ArrowRight className="w-5 h-5" />
             </button>
           </ReinstatementModal>
        </div>

        {/* RELATED VECTOR: TRAILERS */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 border border-industrial-800 rounded hover:border-industrial-700 transition-colors">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
               <FileText className="w-5 h-5 text-blue-500" /> NEW AUTHORITY?
            </h3>
            <p className="text-sm text-industrial-500 mb-4">
              If this is your first time crossing state lines, you need a new MC Number (Operating Authority).
            </p>
            <Link href="/filing/bmc91x-federal-filing-fmsca" className="text-blue-500 text-sm font-bold hover:underline">
              Get BMC-91X Filing &rarr;
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
