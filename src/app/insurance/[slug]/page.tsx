import { ShieldCheck, Anchor, Truck, AlertTriangle, Cog, BadgeDollarSign } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TRAILERS_DATA } from "@/lib/data/trailers";
import { SiteHeader } from "@/components/SiteHeader";

const carHaulerFaqs = [
  ['What does car hauler insurance cover?', 'A car-hauling policy is built around commercial auto liability and the vehicles in your care. The review may also include physical damage, general liability, and coverage for loading and unloading, depending on the operation and policy wording.'],
  ['How much does car hauler insurance cost?', 'There is no reliable one-size-fits-all price. Open or enclosed equipment, vehicle values, radius, drivers, claims history, limits, deductibles, and new-authority status can all change the quote.'],
  ['What are common car hauler insurance requirements?', 'Brokers and shippers commonly ask for primary liability, vehicle-in-transit cargo, certificates of insurance, and sometimes specific limits or endorsements. Federal and state filing requirements depend on the operation.'],
  ['Is open or enclosed auto transport insurance different?', 'The vehicles carried, equipment value, theft controls, loading process, and contract requirements can differ. Tell the reviewer whether you haul open, enclosed, or both before comparing quotes.'],
];

const carHaulerCoverage = [
  ['Primary auto liability', 'Helps address covered third-party bodily injury and property damage claims arising from your trucking operation.'],
  ['Vehicles in transit', 'Ask how the policy treats customer vehicles while they are loaded, in your custody, being moved, and being delivered.'],
  ['Physical damage', 'Review protection for your tractor, car carrier, and attached equipment, including deductibles and stated values.'],
  ['Loading and unloading', 'Damage can happen before the truck leaves. Confirm how loading, unloading, ramps, straps, and handling are treated.'],
  ['Theft and unattended vehicles', 'Tell the reviewer where equipment and customer vehicles are parked overnight and what security controls you use.'],
  ['Broker and shipper terms', 'Compare the proposed limits, certificates, filings, and cargo language with the contracts you actually accept.'],
];


// SEO Metadata Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<import("next").Metadata> {
  const { slug } = await params;
  const data = TRAILERS_DATA.find((trailer) => trailer.slug === slug);

  if (!data) return { title: 'Coverage Not Found' };

  const isCarHaulerPage = slug === 'auto-hauler-car-carrier-insurance';

  return {
    title: isCarHaulerPage ? 'Car Hauler Insurance: Coverage, Cost & Requirements' : `${data.display_name} Insurance | Coverage Review for Trucking Operations`,
    description: isCarHaulerPage
      ? 'Understand car hauler, auto hauler, and car hauling insurance: vehicle-in-transit coverage, broker requirements, cost factors, and quote preparation.'
      : `Review commercial insurance considerations for ${data.display_name} operations and request help from a licensed insurance professional.`,
    openGraph: {
      title: isCarHaulerPage ? 'Car Hauler Insurance: Coverage, Cost & Requirements | Truck Coverage Experts' : `${data.display_name} Insurance | Truck Coverage Experts`,
      description: isCarHaulerPage ? 'Plain-language guidance for car haulers on liability, vehicles in transit, broker requirements, and the information needed for a quote review.' : `Commercial insurance considerations and quote-review assistance for ${data.display_name} operations.`,
    },
    alternates: {
      canonical: `/insurance/${slug}`,
    }
  };
}

export async function generateStaticParams() {
  return TRAILERS_DATA.map((t) => ({
    slug: t.slug,
  }));
}

export default async function TrailerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Parallel Data Fetching
  const [{ data: relatedFilings }] = await Promise.all([
    supabase.from('state_filings').select('slug, form_id, official_name').limit(3)
  ]);

  const trailer = TRAILERS_DATA.find((item) => item.slug === slug);
  if (!trailer) return notFound();

  const isCarHauler = slug === 'auto-hauler-car-carrier-insurance';
  const pageName = isCarHauler ? 'Car Hauler Insurance' : `${trailer.display_name} Insurance`;

  // Cast exclusions safely
  const exclusions = (trailer.common_exclusions || []) as string[];

  // JSON-LD Schema
  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://www.truckcoverageexperts.com'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Insurance',
            'item': 'https://www.truckcoverageexperts.com/insurance'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': trailer.display_name,
            'item': `https://www.truckcoverageexperts.com/insurance/${slug}`
          }
        ]
      },
      {
        '@type': 'FinancialProduct',
        'name': pageName,
        'description': isCarHauler
          ? 'Commercial auto transport insurance information for car haulers, auto carriers, and vehicle transport businesses.'
          : `Commercial insurance review for ${trailer.display_name} operations. Coverage and limits depend on underwriting and applicable requirements.`,
        'provider': {
          '@type': 'Organization',
          'name': 'Truck Coverage Experts',
          'url': 'https://www.truckcoverageexperts.com'
        },
        'feesAndCommissionsSpecification': `Coverage conditions to review: ${exclusions.join(', ')}`
      },
      ...(isCarHauler ? [{
        '@type': 'FAQPage',
        'mainEntity': carHaulerFaqs.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      }] : [])
    ]
  };

  return (
    <div className="min-h-screen bg-industrial-900 text-silver font-mono selection:bg-yellow-400 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader statusLabel={isCarHauler ? 'Auto transport coverage' : 'Heavy haul division'} ctaLabel="Request a review" />

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <Breadcrumbs items={[
          { label: 'Insurance', href: '/insurance' },
          { label: trailer.display_name, href: `/insurance/${slug}` }
        ]} />
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* LEFT: THE ASSET DATA */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-400/10 text-yellow-400 text-xs font-bold border border-yellow-400/20 mb-6 uppercase tracking-widest">
              <Truck className="w-3 h-3" /> SPECIALIZED EQUIPMENT
            </div>
            
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-6 leading-[0.9]">
              {pageName}
            </h1>
            
            <p className="text-xl text-industrial-400 mb-8 border-l-4 border-yellow-400 pl-6 italic">
              {isCarHauler
                ? 'If you move customer vehicles with an open or enclosed carrier, your insurance needs to address both the truck and the vehicles in your care. Here is what to review before you ask for a quote.'
                : 'Commercial insurance guidance for specialized trucking equipment and the cargo or property your operation carries.'}
            </p>

            {isCarHauler ? (
              <div className="bg-industrial-800 p-6 rounded border border-industrial-700 mb-12">
                <div className="text-yellow-400 text-xs font-bold mb-2 uppercase tracking-wider">The short version</div>
                <p className="text-white leading-relaxed">The cheapest-looking quote is not useful if it does not match the value of the cars you haul, your loading process, or the certificate and cargo terms your broker requires.</p>
              </div>
            ) : <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="bg-industrial-800 p-6 rounded border border-industrial-700">
                <div className="text-industrial-500 text-xs font-bold mb-1 uppercase">Typical Cargo Review</div>
                <div className="text-2xl font-bold text-white flex items-center gap-2">
                  <BadgeDollarSign className="w-5 h-5 text-green-500" /> ${trailer.min_cargo_limit.toLocaleString()}
                </div>
              </div>
              <div className="bg-industrial-800 p-6 rounded border border-industrial-700">
                <div className="text-industrial-500 text-xs font-bold mb-1 uppercase">Specialty Risk</div>
                <div className="text-2xl font-bold text-yellow-500 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> {trailer.premium_multiplier}x
                </div>
              </div>
            </div>}

            <h2 className="text-white font-bold mb-4 flex items-center gap-2 text-red-500">
              <ShieldCheck className="w-5 h-5" />
              {isCarHauler ? 'Questions to ask before you bind' : 'WATCH OUT FOR EXCLUSIONS'}
            </h2>
            <p className="text-sm text-industrial-500 mb-4">
              {isCarHauler ? 'Ask these questions before choosing a car-hauler policy. The answers should match how you actually load, park, move, and deliver vehicles.' : 'Coverage exclusions and conditions vary by policy and operation. A licensed insurance professional can review the details with you.'}
            </p>
            <ul className="space-y-4 mb-12">
              {exclusions.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-silver bg-red-900/10 p-3 rounded border border-red-900/30">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                  <span className="text-red-200">{isCarHauler ? `Ask about: ${item}` : `REVIEW THIS CONDITION: ${item}`}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: THE ACTION CARD */}
          <div className="bg-industrial-800 border-2 border-yellow-500/50 p-8 rounded-lg sticky top-24 shadow-[0_0_50px_rgba(234,179,8,0.1)]">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">{isCarHauler ? 'Review your car-hauler operation' : 'INSURE THIS TRAILER'}</h2>
              <p className="text-industrial-400 text-sm">
                {isCarHauler ? 'Share the equipment, routes, drivers, and cargo details that determine whether a quote fits your auto-transport work.' : `Request a quote review for ${trailer.display_name} operations. Availability and timing depend on your submission and underwriting.`}
              </p>
            </div>

            {/* Visual: The "Grid" */}
            <div className="grid grid-cols-3 gap-1 mb-8 opacity-50">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-12 border border-yellow-500/20 bg-industrial-900/50"></div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <Link 
                href="/quote"
                className="block w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 text-center rounded transition-all shadow-lg hover:shadow-yellow-400/25 active:scale-[0.98] uppercase"
              >
                {isCarHauler ? 'Start my car-hauler quote review' : `Request ${trailer.display_name} Quote Review`}
              </Link>
            </div>
            
            <div className="mt-6 flex justify-center gap-6 text-industrial-600">
              <Cog className="w-6 h-6 animate-spin-slow" />
              <Anchor className="w-6 h-6" />
            </div>
          </div>
        </div>

        {isCarHauler && (
          <section className="mt-20 grid lg:grid-cols-2 gap-12 border-t border-industrial-800 pt-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">What car hauler insurance needs to address</h2>
              <p className="text-industrial-400 mb-6">Car hauling is different from ordinary freight because the cargo is someone else’s vehicle. A useful review starts with how many cars you carry, their typical value, how they are loaded, and what happens if one is damaged before delivery.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {carHaulerCoverage.map(([title, body]) => (
                  <div key={title} className="bg-industrial-800 border border-industrial-700 p-5 rounded">
                    <h3 className="text-white font-bold mb-2">{title}</h3>
                    <p className="text-sm text-industrial-400">{body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">What changes the cost?</h2>
              <p className="text-industrial-400 mb-4">Car hauler insurance cost is driven by the risk your operation presents, not just the number of trucks. Open versus enclosed equipment, the value and mix of vehicles, operating radius, driver history, loss runs, limits, deductibles, and new-authority status all matter.</p>
              <p className="text-industrial-400 mb-6">Requirements also come from more than one place: federal or state rules, your broker’s contract, and the shipper’s requested limits. Compare those requirements with the actual policy and certificate before accepting a load.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/insurance/car-hauler-insurance-cost" className="inline-block border border-yellow-400 text-yellow-400 font-bold px-5 py-3 rounded">See cost factors</Link>
                <Link href="/insurance/car-hauler-insurance-requirements" className="inline-block border border-industrial-600 text-silver font-bold px-5 py-3 rounded">See requirements</Link>
                <Link href="/trucking-insurance-readiness?problem=quote" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-5 py-3 rounded">Build my checklist</Link>
              </div>
            </div>
          </section>
        )}

        {isCarHauler && (
          <section className="mt-16 border-t border-industrial-800 pt-12 grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Open vs. enclosed car hauling</h2>
              <p className="text-industrial-400 leading-relaxed mb-4">Open carriers are common for everyday vehicle transport. Enclosed carriers may handle higher-value, collector, luxury, or specialty vehicles. The equipment, security, loading method, and customer contracts can change the underwriting review.</p>
              <p className="text-industrial-400 leading-relaxed">Be specific about what you haul. “Auto transport” can mean dealer moves, auctions, private customers, salvage, repossessions, or specialty vehicles—and those are not always evaluated the same way.</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Have these details ready</h2>
              <ul className="space-y-3 text-industrial-400">
                {['Open or enclosed carrier, make/model, and number of cars', 'States or radius where you operate and whether you cross state lines', 'Typical vehicle value and the highest-value vehicle you carry', 'Driver list, experience, prior insurance, and loss runs', 'Operating authority status and any broker or shipper requirements'].map((item) => (
                  <li key={item} className="flex gap-3"><span className="text-yellow-400">✓</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {!isCarHauler && <section className="mt-16 border-t border-industrial-800 pt-12 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Coverage considerations for {trailer.display_name}</h2>
            <p className="text-industrial-400 leading-relaxed">{trailer.coverage_focus}</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Requirements to discuss</h2>
            <p className="text-industrial-400 leading-relaxed">{trailer.requirements_note}</p>
            <p className="text-xs text-industrial-500 mt-4">Coverage, limits, filings, and eligibility depend on the operation, underwriting, and applicable state or federal requirements.</p>
          </div>
        </section>}

        {!isCarHauler && <section className="mt-16 border-t border-industrial-800 pt-12 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">What affects {trailer.display_name} insurance cost?</h2>
            <p className="text-industrial-400 leading-relaxed">{trailer.cost_factors}</p>
            <Link href="/quote" className="inline-block mt-6 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-5 py-3 rounded uppercase">Request a quote review</Link>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">{trailer.display_name} insurance FAQ</h2>
            {trailer.faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-white font-bold mb-2">{item.question}</h3>
                <p className="text-industrial-400 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>}

        {isCarHauler && (
          <section className="mt-16 border-t border-industrial-800 pt-12 max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-6">Car hauler insurance questions</h2>
            <div className="space-y-5">
              {carHaulerFaqs.map(([question, answer]) => (
                <div key={question} className="border-b border-industrial-800 pb-5">
                  <h3 className="text-white font-bold mb-2">{question}</h3>
                  <p className="text-industrial-400">{answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {isCarHauler && (
          <section className="mt-12 flex flex-wrap gap-3">
            <Link href="/insurance/car-hauler-insurance-cost" className="border border-industrial-700 px-4 py-3 rounded hover:border-yellow-400">Car hauler insurance cost</Link>
            <Link href="/insurance/car-hauler-insurance-requirements" className="border border-industrial-700 px-4 py-3 rounded hover:border-yellow-400">Car hauler requirements</Link>
            <Link href="/trucking-insurance-readiness?problem=quote" className="border border-yellow-400 text-yellow-400 px-4 py-3 rounded hover:bg-yellow-400 hover:text-black">Build my car-hauler checklist</Link>
          </section>
        )}

        {/* RELATED FILINGS SECTION */}
        <div className="mt-24 border-t border-industrial-800 pt-12">
          <h3 className="text-white font-bold mb-8 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-yellow-500" />
            COMPLIANCE REQUIREMENTS FOR THIS EQUIPMENT
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedFilings?.map((f: { slug: string; form_id: string; official_name: string }) => (
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

        <section className="mt-16 border-t border-industrial-800 pt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Related trucking insurance resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/insurance" className="bg-industrial-800 border border-industrial-700 p-4 hover:border-yellow-500 transition-colors">
              <span className="text-yellow-500 font-bold">All equipment programs</span>
              <span className="block text-sm text-industrial-400 mt-2">Compare specialized commercial truck insurance pages.</span>
            </Link>
            <Link href="/filing/bmc91x-federal-filing-fmsca" className="bg-industrial-800 border border-industrial-700 p-4 hover:border-yellow-500 transition-colors">
              <span className="text-yellow-500 font-bold">BMC-91X filing guide</span>
              <span className="block text-sm text-industrial-400 mt-2">Review a common federal insurance filing topic.</span>
            </Link>
            <Link href="/broker/tql-approval" className="bg-industrial-800 border border-industrial-700 p-4 hover:border-yellow-500 transition-colors">
              <span className="text-yellow-500 font-bold">Broker requirements</span>
              <span className="block text-sm text-industrial-400 mt-2">See how broker contracts can affect coverage review.</span>
            </Link>
            <Link href="/quote" className="bg-yellow-400 hover:bg-yellow-300 text-black p-4 transition-colors">
              <span className="font-bold">Request a quote review</span>
              <span className="block text-sm mt-2">Submit your operation details for licensed assistance.</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
