import { ShieldCheck, Anchor, Truck, AlertTriangle, Cog, BadgeDollarSign, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";


// SEO Metadata Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<import("next").Metadata> {
  const { slug } = await params;
  const { data } = await supabase.from('trailer_risk_profiles').select('*').eq('slug', slug).single();

  if (!data) return { title: 'Coverage Not Found' };

  return {
    title: `${data.display_name} Insurance Quote | Cargo Limits up to $${data.min_cargo_limit.toLocaleString()} | TruckInsure`,
    description: `Get insured for ${data.display_name}. We remove common exclusions like "${(data.common_exclusions as string[])[0]}" so you can haul with confidence. Quotes in 24 hours.`,
    openGraph: {
      title: `${data.display_name} Insurance - No Hidden Exclusions`,
      description: `Cover your Tractor AND your Cargo. Specialized high-limit coverage for ${data.display_name}.`,
    }
  };
}

export async function generateStaticParams() {
  const { data: trailers } = await supabase.from('trailer_risk_profiles').select('slug');
  return (trailers || []).map((t) => ({
    slug: t.slug,
  }));
}

export default async function TrailerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Parallel Data Fetching
  const [{ data: trailer }, { data: relatedFilings }] = await Promise.all([
    supabase.from('trailer_risk_profiles').select('*').eq('slug', slug).single(),
    supabase.from('state_filings').select('slug, form_id, official_name').limit(3)
  ]);

  if (!trailer) return notFound();

  // Cast exclusions safely
  const exclusions = (trailer.common_exclusions || []) as string[];

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    'name': `${trailer.display_name} Insurance`,
    'description': `Commercial insurance for ${trailer.display_name} with cargo limits up to $${trailer.min_cargo_limit.toLocaleString()}.`,
    'provider': {
      '@type': 'Organization',
      'name': 'TruckInsure',
      'url': 'https://truckcoverageexperts.com'
    },
    'feesAndCommissionsSpecification': `Exclusions removed: ${exclusions.join(', ')}`
  };

  return (
    <div className="min-h-screen bg-industrial-900 text-silver font-mono selection:bg-yellow-400 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* HEADER */}
      <header className="border-b border-yellow-500/20 bg-industrial-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-xl tracking-tighter text-white">
            TRUCK<span className="text-yellow-400">INSURE</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-yellow-400">HEAVY HAUL DIVISION</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* LEFT: THE ASSET DATA */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-400/10 text-yellow-400 text-xs font-bold border border-yellow-400/20 mb-6 uppercase tracking-widest">
              <Truck className="w-3 h-3" /> SPECIALIZED EQUIPMENT
            </div>
            
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-6 leading-[0.9]">
              {trailer.display_name}
            </h1>
            
            <p className="text-xl text-industrial-400 mb-8 border-l-4 border-yellow-400 pl-6 italic">
              "Most carriers will insure the tractor. We specialize in insuring the <span className="text-white font-bold">cargo inside the trailer</span>."
            </p>

            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="bg-industrial-800 p-6 rounded border border-industrial-700">
                <div className="text-industrial-500 text-xs font-bold mb-1 uppercase">Min. Cargo Limit</div>
                <div className="text-2xl font-bold text-white flex items-center gap-2">
                  <BadgeDollarSign className="w-5 h-5 text-green-500" /> ${trailer.min_cargo_limit.toLocaleString()}
                </div>
              </div>
              <div className="bg-industrial-800 p-6 rounded border border-industrial-700">
                <div className="text-industrial-500 text-xs font-bold mb-1 uppercase">Risk Multiplier</div>
                <div className="text-2xl font-bold text-yellow-500 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> {trailer.premium_multiplier}x
                </div>
              </div>
            </div>

            <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-red-500">
              <ShieldCheck className="w-5 h-5" />
              WATCH OUT FOR EXCLUSIONS
            </h3>
            <p className="text-sm text-industrial-500 mb-4">
              Standard policies often contain hidden clauses that void coverage for {trailer.display_name} operations. We remove them.
            </p>
            <ul className="space-y-4 mb-12">
              {exclusions.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-silver bg-red-900/10 p-3 rounded border border-red-900/30">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                  <span className="text-red-200">EXCLUSION REMOVED: {item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: THE ACTION CARD */}
          <div className="bg-industrial-800 border-2 border-yellow-500/50 p-8 rounded-lg sticky top-24 shadow-[0_0_50px_rgba(234,179,8,0.1)]">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">INSURE THIS TRAILER</h2>
              <p className="text-industrial-400 text-sm">
                Get a bindable quote for {trailer.display_name} operations in 24 hours.
              </p>
            </div>

            {/* Visual: The "Grid" */}
            <div className="grid grid-cols-3 gap-1 mb-8 opacity-50">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-12 border border-yellow-500/20 bg-industrial-900/50"></div>
              ))}
            </div>

            <Link 
              href="/quote"
              className="block w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 text-center rounded transition-all shadow-lg hover:shadow-yellow-400/25 uppercase"
            >
              Start {trailer.display_name} Quote
            </Link>
            
            <div className="mt-6 flex justify-center gap-6 text-industrial-600">
              <Cog className="w-6 h-6 animate-spin-slow" />
              <Anchor className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* RELATED FILINGS SECTION */}
        <div className="mt-24 border-t border-industrial-800 pt-12">
          <h3 className="text-white font-bold mb-8 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-yellow-500" />
            COMPLIANCE REQUIREMENTS FOR THIS EQUIPMENT
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedFilings?.map((f: any) => (
              <Link 
                key={f.slug} 
                href={`/filing/${f.slug}`}
                className="bg-industrial-800 border border-industrial-700 p-4 hover:border-yellow-500 transition-colors group"
              >
                <div className="font-bold text-yellow-500 mb-1 group-hover:text-white">{f.form_id}</div>
                <div className="text-sm text-silver line-clamp-1">{f.official_name}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
