import { US_STATES } from "@/lib/data/us-states";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import NicheLeadForm from "@/components/NicheLeadForm";
import { ShieldCheck, TrendingUp, CheckCircle2 } from "lucide-react";

export async function generateStaticParams() {
  return US_STATES.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
  const stateData = US_STATES.find(s => s.slug === params.state);
  if (!stateData) return {};
  return {
    title: `Best ${stateData.name} Hot Shot Trucking Insurance Quotes (2026)`,
    description: `Compare ${stateData.name} Hot Shot Trucking Insurance rates. We specialize in F-350s & Flatbed Trailers in ${stateData.name}. Get cheap commercial truck insurance quotes today.`,
    alternates: { canonical: `https://www.truckcoverageexperts.com/hot-shot-insurance/${stateData.slug}` }
  };
}

export default function NicheStatePage({ params }: { params: { state: string } }) {
  const stateData = US_STATES.find(s => s.slug === params.state);
  if (!stateData) return notFound();

  // JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much is Hot Shot Trucking Insurance in ${stateData.name}?`,
        "acceptedAnswer": { "@type": "Answer", "text": `The cost of Hot Shot Trucking Insurance in ${stateData.name} depends on your driving record and cargo. We compare top commercial auto carriers to find the cheapest rate.` }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen bg-slate-950">
        
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-950 z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 mb-6">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-sm font-semibold tracking-wider uppercase">${stateData.name} Commercial Auto</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
                  Affordable <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Hot Shot Trucking Insurance</span> in ${stateData.name}.
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed mb-8">
                  We specialize in commercial auto coverage for F-350s & Flatbed Trailers. Get access to exclusive programs for ${stateData.name} motor carriers and save thousands on your annual premium.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Instant DOT & FMCSA Filings</li>
                  <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> A-Rated Commercial Carriers</li>
                  <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Specialized in F-350s & Flatbed Trailers</li>
                </ul>
              </div>
              <div className="lg:pl-8">
                <NicheLeadForm stateName={stateData.name} nicheName="Hot Shot Trucking Insurance" />
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}