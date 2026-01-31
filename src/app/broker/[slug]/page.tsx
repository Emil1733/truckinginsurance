import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldAlert, CheckCircle2, AlertTriangle, FileText, Truck, Lock, ArrowRight, XCircle } from 'lucide-react';
import { ReinstatementModal } from '@/components/ReinstatementModal';
import { Breadcrumbs } from '@/components/Breadcrumbs';

// 1. Static Generation (Build all 5 broker pages at build time)
export async function generateStaticParams() {
  const { data: brokers } = await supabase.from('brokers').select('slug');
  return brokers?.map(({ slug }) => ({ slug })) || [];
}

// 2. SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: broker } = await supabase.from('brokers').select('*').eq('slug', slug).single();

  if (!broker) return { title: 'Broker Requirement Not Found' };

  return {
    title: `Denied by ${broker.name}? Insurance Recovery Guide`,
    description: `Application rejected by ${broker.name}? We specialize in fixing insurance rejections. Get the required ${broker.min_auto_liability.toLocaleString()} Liability and Endorsements instantly.`,
    alternates: {
      canonical: `/broker/${slug}`,
    },
  };
}

// 3. Page Component
export default async function BrokerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: broker } = await supabase.from('brokers').select('*').eq('slug', slug).single();

  if (!broker) return notFound();

  // Currency Formatter
  const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://truckcoverageexperts.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Brokers',
        'item': 'https://truckcoverageexperts.com/broker'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': broker.name,
        'item': `https://truckcoverageexperts.com/broker/${slug}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-industrial-900 font-mono text-silver">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* HEADER */}
      <nav className="border-b border-industrial-800 bg-industrial-900/90 backdrop-blur sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <Link href="/" className="text-xl font-bold tracking-tighter text-white">TRUCK COVERAGE EXPERTS</Link>
           <Link href="/contact" className="text-xs font-bold bg-safety-orange text-black px-4 py-2 rounded">
             GET APPROVED
           </Link>
         </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumbs items={[
          { label: 'Brokers', href: '/broker' },
          { label: broker.name, href: `/broker/${slug}` }
        ]} />
        
        {/* HERO SECTION */}
        <div className="mb-16 text-center border-b border-industrial-800 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-900/30 text-red-500 text-xs font-bold mb-6 border border-red-800 uppercase tracking-widest">
            <XCircle className="w-4 h-4" /> APPLICATION REJECTED?
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            DID <span className="text-safety-orange uppercase">{broker.name}</span> DENY YOUR INSURANCE?
          </h1>
          <p className="text-xl text-industrial-400 max-w-2xl mx-auto">
            Don't let a "Non-Compliant" status freeze your truck. We know exactly why they rejected you, and we know exactly how to fix it.
          </p>
        </div>

        {/* THE REQUIREMENTS GRID */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* LEFT: THE REQUIREMENTS */}
          <div className="bg-industrial-800 p-8 rounded-xl border border-industrial-700">
            <h2 className="text-white font-bold mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-500" /> MANDATORY LIMITS
            </h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b border-industrial-700 pb-2">
                <span className="text-industrial-400">Auto Liability</span>
                <span className="text-white font-bold">{fmt(broker.min_auto_liability)}</span>
              </li>
              <li className="flex justify-between items-center border-b border-industrial-700 pb-2">
                <span className="text-industrial-400">Cargo Coverage</span>
                <span className="text-white font-bold">{fmt(broker.min_cargo_limit)}</span>
              </li>
              {broker.min_trailer_interchange > 0 && (
                <li className="flex justify-between items-center border-b border-industrial-700 pb-2">
                  <span className="text-industrial-400">Trailer Interchange</span>
                  <span className="text-white font-bold">{fmt(broker.min_trailer_interchange)}</span>
                </li>
              )}
            </ul>
             <div className="mt-6 p-4 bg-industrial-900/50 rounded text-xs text-industrial-500">
                ⚠️ {broker.name} verifies these limits automatically via RMIS. If you are $1 short, you are denied.
             </div>
          </div>

          {/* RIGHT: WHY YOU FAILED */}
          <div className="bg-red-900/10 p-8 rounded-xl border border-red-900/30">
             <h2 className="text-red-500 font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> COMMON DENIAL REASONS
            </h2>
            <ul className="space-y-3">
              {broker.denial_reasons?.map((reason: string, i: number) => (
                <li key={i} className="flex gap-3 text-industrial-300 text-sm">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* THE FIX (CHECKLIST) */}
        <div className="bg-industrial-800 border-2 border-safety-orange/50 rounded-xl p-8 md:p-12 mb-16 relative overflow-hidden">
           <div className="absolute -right-10 -top-10 opacity-5 rotate-12">
             <FileText className="w-64 h-64 text-white" />
           </div>
           
           <h2 className="text-3xl font-bold text-white mb-2 relative z-10">THE RECOVERY PLAN</h2>
           <p className="text-industrial-400 mb-8 relative z-10">
             We are an authorized agent who can issue the exact certificate {broker.name} demands.
           </p>

           <div className="grid gap-4 mb-8 relative z-10">
             {broker.compliance_checklist?.map((fix: string, i: number) => (
               <div key={i} className="flex items-center gap-4 bg-industrial-900/80 p-4 rounded border border-industrial-600">
                 <div className="w-8 h-8 rounded-full bg-green-900/30 text-green-500 flex items-center justify-center border border-green-800 shrink-0">
                   <CheckCircle2 className="w-5 h-5" />
                 </div>
                 <span className="text-white font-bold">{fix}</span>
               </div>
             ))}
           </div>

           <ReinstatementModal>
              <button className="w-full py-4 bg-safety-orange hover:bg-orange-500 text-black font-bold text-xl rounded shadow-lg hover:shadow-orange-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 relative z-10">
                <Truck className="w-6 h-6" />
                GET COMPLIANT NOW
              </button>
           </ReinstatementModal>
           <p className="text-center text-xs text-industrial-500 mt-4 relative z-10">
             Instant COI generation active for {broker.name} requirements.
           </p>
        </div>

      </main>
    </div>
  );
}
