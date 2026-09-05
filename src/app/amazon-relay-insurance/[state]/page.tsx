import { US_STATES } from "@/lib/data/us-states";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import NicheLeadForm from "@/components/NicheLeadForm";
import { ShieldCheck, TrendingUp, CheckCircle2 } from "lucide-react";
import { getStateInsuranceContext } from "@/lib/data/state-insurance-context";

export async function generateStaticParams() {
  return US_STATES.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const stateData = US_STATES.find(s => s.slug === state);
  if (!stateData) return {};
  return {
    title: `Best ${stateData.name} Amazon Relay Insurance Quotes (2026)`,
    description: `Review ${stateData.name} Amazon Relay insurance requirements, including liability and cargo coverage. Request help from a licensed insurance professional.`,
    alternates: { canonical: `https://www.truckcoverageexperts.com/amazon-relay-insurance/${stateData.slug}` }
  };
}

export default async function NicheStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const stateData = US_STATES.find(s => s.slug === state);
  if (!stateData) return notFound();
  const stateContext = getStateInsuranceContext(stateData.slug);

  // JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much is Amazon Relay Insurance in ${stateData.name}?`,
        "acceptedAnswer": { "@type": "Answer", "text": `The cost of Amazon Relay Insurance in ${stateData.name} depends on vehicle type, cargo, routes, drivers, authority status, required limits, deductibles, and claims history. A licensed professional can review options for the operation.` }
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
                  Amazon Relay Insurance <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">in ${stateData.name}</span>.
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed mb-8">
                  Review commercial auto, cargo, certificate, and onboarding considerations for carriers operating with Amazon Relay from ${stateData.name}. Requirements can depend on your equipment, contracts, routes, and authority.
                </p>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Instant DOT & FMCSA Filings</li>
                  <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> A-Rated Commercial Carriers</li>
                  <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-emerald-400" /> Specialized in Amazon Relay Requirements ($1M Auto Liability, $100k Cargo)</li>
                </ul>
              </div>
              <div className="lg:pl-8">
                <NicheLeadForm stateName={stateData.name} nicheName="Amazon Relay Insurance" />
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-bold text-white mb-3">${stateData.name} Amazon Relay insurance: what to prepare</h2>
          <p className="text-slate-400 max-w-3xl mb-4">{stateContext.focus}</p>
          <p className="text-slate-500 max-w-3xl mb-5">Have your vehicle schedule, cargo details, loss runs, certificate requirements, and broker or shipper instructions ready. {stateContext.filingNote}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/amazon-relay-insurance" className="border border-slate-700 text-slate-200 px-4 py-3 rounded hover:border-blue-400">Amazon Relay requirements guide</Link>
            <Link href="/insurance/reefer-breakdown-insurance" className="border border-slate-700 text-slate-200 px-4 py-3 rounded hover:border-blue-400">Reefer coverage guide</Link>
            <Link href="/uiia-certification" className="border border-slate-700 text-slate-200 px-4 py-3 rounded hover:border-blue-400">Port and interchange resources</Link>
            <Link href={stateContext.filingHref} className="border border-slate-700 text-slate-200 px-4 py-3 rounded hover:border-blue-400">{stateContext.filingLabel}</Link>
          </div>
        </section>

      </main>
    </>
  );
}
