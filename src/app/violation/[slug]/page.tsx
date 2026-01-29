import { AlertTriangle, ShieldAlert, BadgeDollarSign, CheckCircle2, TrendingUp, Lock } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { ReinstatementModal } from "@/components/ReinstatementModal";


// SEO Metadata Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<import("next").Metadata> {
  const { slug } = await params;
  const { data } = await supabase.from('violations').select('*').eq('slug', slug).single();

  if (!data) return { title: 'Violation Not Found' };

  return {
    title: `${data.code} Insurance Help | Forgiven in 48 Hours | TruckInsure`,
    description: `Stuck with a ${data.code} (${data.official_name})? We specialize in high-risk truck insurance. Get a quote even with Tier ${data.severity_tier} violations.`,
    openGraph: {
      title: `${data.code} - Uninsurable? Not Anymore.`,
      description: `Don't let ${data.official_name} end your career. We have 3 underwriters who will write this risk.`,
    }
  };
}

// pSEO Power: Generate a static page for EVERY violation in our database at build time.
export async function generateStaticParams() {
  const { data: violations } = await supabase.from('violations').select('slug');
  return (violations || []).map((v) => ({
    slug: v.slug,
  }));
}

export default async function ViolationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // LIVE DATABASE QUERY (Parallel Fetch for Cross-Linking)
  const [{ data: routeData }, { data: relatedFilings }] = await Promise.all([
    supabase.from('violations').select('*').eq('slug', slug).single(),
    supabase.from('state_filings').select('slug, form_id, state_code').limit(3)
  ]);

  if (!routeData) return notFound();
  
  // Normalize data shape (DB uses snake_case, but our initial types might have varied, 
  // but here we are using raw DB result which matches schema directly)
  const data = routeData;

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        'name': `${data.code} Insurance Recovery`,
        'serviceType': 'High Risk Truck Insurance',
        'provider': {
          '@type': 'Organization',
          'name': 'TruckInsure',
          'url': 'https://truckcoverageexperts.com'
        },
        'areaServed': 'US',
        'audience': {
          '@type': 'Audience',
          'audienceType': 'Commercial Truck Drivers'
        },
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
          'description': 'Free Quote'
        }
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': `How do I fix a ${data.official_name} (${data.code}) violation?`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `Follow these steps: ${(data.rehab_steps as string[]).join('. ')}.`
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-industrial-900 text-silver font-mono selection:bg-safety-orange selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. The "Panic Header" */}
      <header className="border-b border-industrial-700 bg-industrial-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-safety-orange" />
            <span className="font-display font-bold text-xl tracking-tighter text-white">
              {data.code} // LIVE ACCESS
            </span>
          </div>
          <div className="text-xs text-industrial-500 hidden md:block">
            FMCSA DATABASE // SECURE
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        {/* 2. The "Reality Check" - Specific Intro */}
        <section className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-safety-orange/10 text-safety-orange text-xs font-bold mb-6 border border-safety-orange/20 animate-pulse">
            <AlertTriangle className="w-3 h-3" />
            CRITICAL SEVERITY: TIER {data.severity_tier}
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[0.9] tracking-tighter uppercase break-words">
            DID YOU GET HIT WITH A <br className="hidden md:block"/>
            <span className="text-safety-orange">{data.code}</span>?
          </h1>
          
          <p className="text-xl md:text-2xl text-industrial-500 max-w-2xl leading-relaxed">
            "{data.official_name}." This isn't just a ticket. 
            To Progressive and Geico, <span className="text-silver border-b border-safety-orange">this is a character flaw.</span>
          </p>
        </section>

        {/* 3. The "Data Dashboard" - The Industrial Proof */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          <div className="bg-industrial-800 border border-industrial-700 p-6 relative overflow-hidden group hover:border-safety-orange/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BadgeDollarSign className="w-24 h-24" />
            </div>
            <div className="text-industrial-500 text-sm mb-2 font-bold tracking-widest uppercase">Avg FMCSA Fine</div>
            <div className="text-4xl font-display font-bold text-white">${data.fine_avg.toLocaleString()}</div>
            <div className="text-xs text-safety-orange mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% vs National Avg
            </div>
          </div>

          <div className="bg-industrial-800 border border-industrial-700 p-6 relative overflow-hidden group hover:border-safety-orange/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldAlert className="w-24 h-24" />
            </div>
            <div className="text-industrial-500 text-sm mb-2 font-bold tracking-widest uppercase">Rejection Rate</div>
            <div className="text-4xl font-display font-bold text-white">{data.rejection_rate}</div>
            <div className="text-xs text-industrial-500 mt-2">
              Auto-declined by standard carriers
            </div>
          </div>

          <div className="bg-industrial-800 border border-industrial-700 p-6 relative overflow-hidden group hover:border-safety-orange/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckCircle2 className="w-24 h-24" />
            </div>
            <div className="text-industrial-500 text-sm mb-2 font-bold tracking-widest uppercase">Survival Prob.</div>
            <div className="text-4xl font-display font-bold text-safety-yellow">{data.survival_prob}</div>
            <div className="text-xs text-industrial-500 mt-2">
              With "High Risk" Specialists
            </div>
          </div>
        </section>

        {/* 4. The "Expert" Content - Why Giants Miss This */}
        <section className="mb-20 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl text-white mb-6">WHY YOU'RE BLOCKED</h2>
            <div className="space-y-6 text-industrial-500">
              <p>
                Standard insurers view {data.code} not as a mistake, but as <strong className="text-silver">fraud</strong>. Their underwriting algorithms are hard-coded to reject this violation code instantly.
              </p>
              <p>
                You don't need a "better quote." You need a <strong className="text-silver">Distressed Risk Specialist</strong> who understands that a logbook error doesn't mean you can't drive a truck.
              </p>
            </div>
          </div>
          
          <div className="bg-industrial-800/50 border border-industrial-700 p-6 rounded-lg">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-safety-orange rounded-full animate-pulse"></span>
              RECOVERY PROTOCOL
            </h3>
            <ul className="space-y-4">
              {(data.rehab_steps as string[]).map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-silver">
                  <span className="font-mono text-industrial-500">0{i+1}</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. The CTA - "Get Clean" */}
        <section className="border-t border-industrial-700 pt-20">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl md:text-5xl text-white mb-8">
              PROGRESSIVE SAID NO. <br />
              <span className="text-safety-orange">WE SAY YES.</span>
            </h2>
            <p className="text-lg text-industrial-500 mb-10 max-w-xl">
              We connect you directly with the 3 underwriters in the US who specialize in {data.code} recoveries. No judgment. Just coverage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/quote"
                className="bg-safety-orange hover:bg-orange-600 text-black font-bold px-8 py-4 text-center rounded transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                REQUEST HIGH-RISK QUOTE
              </Link>
              
              <ReinstatementModal>
                <button 
                  className="w-full sm:w-auto border border-industrial-600 hover:border-silver text-silver hover:text-white px-8 py-4 text-center rounded transition-all uppercase font-bold"
                >
                  DOWNLOAD REINSTATEMENT GUIDE
                </button>
              </ReinstatementModal>
            </div>
          </div>
        </section>

        {/* 6. Internal Linking - "Related Compliance" */}
        <section className="border-t border-industrial-800 pt-12">
          <h3 className="text-industrial-500 font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-sm">
            <ShieldAlert className="w-4 h-4" /> Related Compliance Filings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedFilings?.map((filing: any) => (
              <Link 
                key={filing.slug}
                href={`/filing/${filing.slug}`}
                className="block bg-industrial-800/50 border border-industrial-700 p-4 hover:border-blue-500 transition-colors group"
              >
                <div className="flex justify-between items-start">
                  <span className="text-white font-bold group-hover:text-blue-400">{filing.form_id}</span>
                  <span className="text-industrial-600 text-xs font-mono">{filing.state_code}</span>
                </div>
                <div className="text-xs text-industrial-500 mt-2">View Filing Requirements →</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="border-t border-industrial-800 bg-industrial-900 py-12 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-end">
          <div className="text-industrial-600 text-xs font-mono">
            © 2026 VIOLATION.CODE // HIGH RISK DIVISION
          </div>
        </div>
      </footer>
    </div>
  );
}
