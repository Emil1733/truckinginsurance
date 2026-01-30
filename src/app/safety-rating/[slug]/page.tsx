import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldAlert, AlertTriangle, FileText, CheckCircle2, TrendingUp, ArrowRight, Activity, XCircle } from 'lucide-react';
import { ReinstatementModal } from '@/components/ReinstatementModal';

export const revalidate = 86400; // Cache for 24 hours

// 1. Static Generation (Build all 6 factor pages)
export async function generateStaticParams() {
  const { data: factors } = await supabase.from('safety_factors').select('slug');
  return factors?.map(({ slug }) => ({ slug })) || [];
}

// 2. SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: factor } = await supabase.from('safety_factors').select('*').eq('slug', slug).single();

  if (!factor) return { title: 'Safety Rating Factor Not Found' };

  return {
    title: `Conditional Safety Rating: ${factor.name} Recovery | Truck Coverage Experts`,
    description: `Downgraded to Conditional due to ${factor.name}? We have insurance markets that accept Factor ${factor.factor_number} violations and help you upgrade to Satisfactory.`,
    alternates: {
      canonical: `/safety-rating/${slug}`,
    },
  };
}

// 3. Page Component
export default async function SafetyFactorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: factor } = await supabase.from('safety_factors').select('*').eq('slug', slug).single();

  if (!factor) return notFound();

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

      <main className="max-w-4xl mx-auto px-6 py-12">
        
        {/* HERO SECTION */}
        <div className="mb-16 text-center border-b border-industrial-800 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-900/30 text-yellow-500 text-xs font-bold mb-6 border border-yellow-800 uppercase tracking-widest">
            <Activity className="w-4 h-4" /> SAFETY RATING ALERT
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase leading-tight">
            RATED <span className="text-yellow-500">CONDITIONAL</span> DUE TO <br/>
            FACTOR {factor.factor_number}: <span className="text-industrial-500 underline decoration-safety-orange/50 decoration-4">{factor.name}</span>?
          </h1>
          <p className="text-xl text-industrial-400 max-w-2xl mx-auto">
            Most insurers cancel you immediately. We don't. We specialize in rating rehabilitation for Factor {factor.factor_number} violations.
          </p>
        </div>

        {/* THE PROBLEM GRID */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* LEFT: THE VIOLATIONS */}
          <div className="bg-industrial-800 p-8 rounded-xl border border-industrial-700">
            <h2 className="text-white font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" /> COMMON FAILURES
            </h2>
            <p className="text-sm text-industrial-400 mb-4">
               Did the DOT auditor cite any of these violations against your MC number?
            </p>
            <ul className="space-y-3">
              {factor.violation_examples?.map((v: string, i: number) => (
                <li key={i} className="flex gap-3 text-industrial-300 text-sm bg-industrial-900/50 p-3 rounded">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: THE CONSEQUENCES */}
          <div className="bg-yellow-900/10 p-8 rounded-xl border border-yellow-900/30">
             <h2 className="text-yellow-500 font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" /> MARKET IMPACT
            </h2>
            <div className="space-y-6">
              <div>
                <div className="text-white font-bold mb-1">Insurance Cancellations</div>
                <p className="text-sm text-industrial-400">Standard markets (Progressive, Northland) often send a 30-day notice of cancellation upon downgrade.</p>
              </div>
              <div>
                <div className="text-white font-bold mb-1">Broker Rejections</div>
                <p className="text-sm text-industrial-400">Amazon Relay, CH Robinson, and TQL systems automatically flag Factor {factor.factor_number} failures.</p>
              </div>
            </div>
          </div>
        </div>

        {/* THE FIX (RECOVERY PLAN) */}
        <div className="bg-industrial-800 border-2 border-safety-orange/50 rounded-xl p-8 md:p-12 mb-16 relative overflow-hidden">
           <div className="absolute -right-10 -top-10 opacity-5 rotate-12">
             <ShieldAlert className="w-64 h-64 text-white" />
           </div>
           
           <h2 className="text-3xl font-bold text-white mb-2 relative z-10">THE RECOVERY PLAN</h2>
           <p className="text-industrial-400 mb-8 relative z-10">
             To upgrade to "Satisfactory", you must submit a CAP (Corrective Action Plan) to the FMCSA via DataQ.
           </p>

           <div className="grid gap-4 mb-8 relative z-10">
             {factor.recovery_steps?.map((step: string, i: number) => (
               <div key={i} className="flex items-center gap-4 bg-industrial-900/80 p-4 rounded border border-industrial-600">
                 <div className="w-8 h-8 rounded-full bg-green-900/30 text-green-500 flex items-center justify-center border border-green-800 shrink-0 font-bold font-display">
                   {i + 1}
                 </div>
                 <span className="text-white font-bold">{step}</span>
               </div>
             ))}
           </div>

           <ReinstatementModal>
              <button className="w-full py-4 bg-safety-orange hover:bg-orange-500 text-black font-bold text-xl rounded shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-3 relative z-10">
                <FileText className="w-6 h-6" />
                GET INSURANCE QUOTE + CAP TEMPLATE
              </button>
           </ReinstatementModal>
           <p className="text-center text-xs text-industrial-500 mt-4 relative z-10">
             We include a free DataQ submission guide with every policy.
           </p>
        </div>

      </main>
    </div>
  );
}
