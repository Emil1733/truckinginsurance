import { UBER_BLACK_STATES } from "@/lib/data/uber-black-states";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShieldCheck, CarFront, CheckCircle2, AlertTriangle, FileText, MapPin, Building2, ChevronRight, HelpCircle } from "lucide-react";
import UberBlackLeadForm from "@/components/UberBlackLeadForm";
import Link from "next/link";

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return UBER_BLACK_STATES.map((state) => ({
    state: state.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params;
  const stateData = UBER_BLACK_STATES.find((s) => s.slug === state);
  
  if (!stateData) {
    return { title: 'Not Found' };
  }

  return {
    title: `Uber Black Insurance Requirements in ${stateData.name} | Truck Coverage Experts`,
    description: `Learn the commercial livery and Uber Black insurance requirements for ${stateData.name}. Get instant quotes for your TCP or ${stateData.agency} permits.`,
    alternates: {
      canonical: `https://truckcoverageexperts.com/uber-black-insurance/${state}`,
    },
  };
}

export default async function UberBlackStatePage({ params }: Props) {
  const { state } = await params;
  const stateData = UBER_BLACK_STATES.find((s) => s.slug === state);

  if (!stateData) {
    notFound();
  }

  // Schema generation for rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What are the Uber Black insurance requirements in ${stateData.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `To drive for Uber Black in ${stateData.name}, you are typically required to carry a commercial auto liability policy with limits of ${stateData.liability}. You must also comply with the local ${stateData.agency} regulations.`
        }
      },
      {
        "@type": "Question",
        "name": `Does ${stateData.name} require a special permit for Uber Black?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, in addition to commercial insurance, most luxury livery drivers in ${stateData.name} (especially in cities like ${stateData.cities}) must hold an active permit from the ${stateData.agency}.`
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-[#0a0f1c] text-slate-200">
        
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6 font-bold text-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <MapPin className="w-4 h-4 mr-2" />
                  {stateData.name} Livery Requirements
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
                  Uber Black Insurance in {stateData.name}
                </h1>
                <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                  Get your {stateData.liability} commercial liability policy and instantly satisfy the 
                  <span className="text-white font-bold"> {stateData.agency} </span> 
                  requirements to start driving in {stateData.cities} and across the state.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-sm text-slate-400 font-medium">State Requirement</p>
                      <p className="text-white font-bold">{stateData.liability} Liability</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
                    <Building2 className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-slate-400 font-medium">Regulatory Body</p>
                      <p className="text-white font-bold">{stateData.agency}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* LEAD CAPTURE FORM */}
              <div className="lg:pl-8">
                <UberBlackLeadForm stateName={stateData.name} />
              </div>
            </div>
          </div>
        </section>

        {/* RICH CONTENT SECTION (PROGRAMMATIC SEO MEAT) */}
        <section className="py-20 bg-slate-950 border-t border-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-white mb-8 text-center">
              The Complete Guide to Commercial Livery Insurance in {stateData.name}
            </h2>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                If you are planning to upgrade from UberX or UberXL to the highly lucrative <strong>Uber Black</strong> or <strong>Uber SUV</strong> tiers in {stateData.name}, 
                you can no longer rely on a personal auto insurance policy or the standard rideshare endorsement. 
                Because you are operating a premium black car service, both Uber and the {stateData.agency} classify your vehicle as a commercial livery business.
              </p>
              
              <h3 className="text-2xl font-bold text-white mt-12 mb-4 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-blue-500" />
                Minimum Coverage Limits
              </h3>
              <p>
                To legally operate and receive dispatches from the Uber app in {stateData.name}, you are required to hold a commercial auto liability policy with a minimum limit of <strong>{stateData.liability}</strong>. 
                This high limit is mandated not just by the rideshare platform, but heavily enforced by the {stateData.agency} to protect high-net-worth passengers in the event of a catastrophic accident. 
                Without proof of this specific {stateData.liability} limit (often provided via an ACORD 25 Certificate of Insurance), your Uber Black account will be immediately waitlisted or suspended.
              </p>

              <h3 className="text-2xl font-bold text-white mt-12 mb-4 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-blue-500" />
                Navigating the {stateData.agency}
              </h3>
              <p>
                Driving in major metropolitan hubs like {stateData.cities} requires rigorous compliance. 
                The {stateData.agency} oversees all commercial transportation permits in {stateData.name}. 
                When we write your commercial livery policy, we don't just hand you a piece of paper; we actively assist in filing the necessary state forms directly with the {stateData.agency} so your permit is activated faster. 
                This prevents the dreaded "insurance pending" delays that keep drivers off the road for weeks.
              </p>

              <div className="bg-blue-900/10 border border-blue-500/20 rounded-2xl p-8 my-12">
                <h4 className="text-xl font-bold text-white mb-3">Does Uber Provide Any Insurance?</h4>
                <p className="text-slate-300 mb-0">
                  While Uber provides contingent liability for standard rideshare drivers (UberX) during Period 1, 2, and 3, <strong>Uber Black drivers act as independent limousine companies</strong>. 
                  You are required to maintain your own primary {stateData.liability} commercial policy 24/7, whether the app is on or off. This is why having a dedicated commercial livery policy is non-negotiable in {stateData.name}.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAMMATIC FAQ SECTION */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-white mb-10 text-center flex items-center justify-center gap-3">
              <HelpCircle className="w-8 h-8 text-blue-500" />
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                <h3 className="text-lg font-bold text-white mb-2">How much does Uber Black insurance cost in {stateData.name}?</h3>
                <p className="text-slate-400">
                  Premiums vary based on your driving record, garaging zip code (e.g., rates in {stateData.cities.split(',')[0]} may differ from rural areas), and the value of your vehicle (Suburban vs. Escalade). On average, drivers can expect to pay between $6,000 and $12,000 annually. We shop multiple livery carriers to find you the absolute lowest rate.
                </p>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                <h3 className="text-lg font-bold text-white mb-2">Can I use my policy for private clients outside of Uber?</h3>
                <p className="text-slate-400">
                  Yes! Because this is a true commercial auto policy filed with the {stateData.agency}, you are legally allowed to build your own book of private clients, run airport runs independently, or drive for other platforms like Lyft Black or Blacklane simultaneously.
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                <h3 className="text-lg font-bold text-white mb-2">How fast can I get my ACORD certificate for Uber?</h3>
                <p className="text-slate-400">
                  Immediately upon binding the policy. We know that every day you aren't driving is money lost. We instantly issue the specific certificate required by Uber and the {stateData.agency} with the exact {stateData.liability} limits displayed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INTERNAL LINKING HUB (SEO CRITICAL) */}
        <section className="py-16 bg-slate-950/80 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-bold text-white mb-6">Uber Black & Livery Coverage Across the U.S.</h3>
            <p className="text-slate-400 text-sm mb-8">
              We provide commercial livery policies tailored for high-end transportation professionals nationwide. Check the specific regulatory and insurance requirements for your operating state below:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {UBER_BLACK_STATES.filter(s => s.slug !== state).slice(0, 12).map((s) => (
                <Link 
                  key={s.slug} 
                  href={`/uber-black-insurance/${s.slug}`}
                  className="text-sm text-slate-400 hover:text-blue-400 hover:underline transition-colors flex items-center"
                >
                  <ChevronRight className="w-3 h-3 mr-1 opacity-50" />
                  {s.name} Livery Ins.
                </Link>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-900 flex flex-wrap gap-6 text-sm">
              <Link href="/free-coi-generator" className="text-slate-400 hover:text-white transition-colors">Generate Certificate of Insurance</Link>
              <Link href="/check-score" className="text-slate-400 hover:text-white transition-colors">Check DOT Safety Score</Link>
              <Link href="/filings" className="text-slate-400 hover:text-white transition-colors">Commercial Filings Directory</Link>
              <Link href="/broker-check" className="text-slate-400 hover:text-white transition-colors">Broker Credit Reports</Link>
              <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact Our Agents</Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
