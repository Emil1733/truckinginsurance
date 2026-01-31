import Link from 'next/link';
import { TRAILERS_DATA } from '@/lib/data/trailers';
import { Truck, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Commercial Truck Insurance by Trailer Type',
  description: 'Specialized insurance for Hazmat, Auto Haulers, and Bottom Dumps. We cover the high-risk trailers that other agents decline. Get a quote in 24 hours.',
  alternates: {
    canonical: '/insurance',
  },
};

export default function InsuranceIndex() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-green-900/30 text-green-500 text-xs font-bold mb-6 border border-green-800 uppercase tracking-widest">
            <Truck className="w-4 h-4" /> SPECIALIZED PROGRAMS
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            INSURANCE BY TRAILER TYPE
          </h1>
          <p className="text-xl text-industrial-400 max-w-2xl">
            We insure the trailers other agencies reject. From Hazmat Tankers to Bull Haulers,
            get coverage tailored to your specific cargo risks.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRAILERS_DATA.map((t) => (
             <Link 
               key={t.slug} 
               href={`/insurance/${t.slug}`} 
               className="group bg-industrial-800 border border-industrial-700 hover:border-green-500 p-6 rounded transition-all hover:-translate-y-1"
             >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xl font-bold text-white group-hover:text-green-500 transition-colors uppercase line-clamp-2 min-h-[3.5rem] flex items-center">
                    {t.display_name}
                  </span>
                  <div className="p-2 bg-green-900/20 text-green-500 rounded border border-green-900/50 block shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                </div>
                
                <p className="text-sm text-industrial-400 mb-6 line-clamp-3 min-h-[4rem]">
                  {t.description}
                </p>

                <div className="flex items-center justify-between border-t border-industrial-700 pt-4">
                   <span className="text-xs text-industrial-500 font-bold">Multiplier: {t.premium_multiplier}x</span>
                   <ArrowRight className="w-4 h-4 text-industrial-600 group-hover:text-white transition-colors" />
                </div>
             </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
