import { ShieldCheck, Anchor, Truck, AlertTriangle, Cog, BadgeDollarSign } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TRAILERS_DATA } from "@/lib/data/trailers";


// SEO Metadata Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<import("next").Metadata> {
  const { slug } = await params;
  const data = TRAILERS_DATA.find((trailer) => trailer.slug === slug);

  if (!data) return { title: 'Coverage Not Found' };

  return {
    title: `${data.display_name} Insurance | Coverage Review for Trucking Operations`,
    description: `Review commercial insurance considerations for ${data.display_name} operations and request help from a licensed insurance professional.`,
    openGraph: {
      title: `${data.display_name} Insurance | Truck Coverage Experts`,
      description: `Commercial insurance considerations and quote-review assistance for ${data.display_name} operations.`,
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
      }
    ]
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
          <Link href="/" className="font-display font-bold text-xl tracking-tighter text-white">TRUCK COVERAGE EXPERTS</Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-yellow-400">HEAVY HAUL DIVISION</span>
          </div>
        </div>
      </header>

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
                ? 'Commercial auto transport insurance for open and enclosed car carriers, including liability, vehicle-in-transit cargo, and physical damage considerations.'
                : 'Commercial insurance guidance for specialized trucking equipment and the cargo or property your operation carries.'}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-12">
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
            </div>

            <h2 className="text-white font-bold mb-4 flex items-center gap-2 text-red-500">
              <ShieldCheck className="w-5 h-5" />
              WATCH OUT FOR EXCLUSIONS
            </h2>
            <p className="text-sm text-industrial-500 mb-4">
              Coverage exclusions and conditions vary by policy and operation. A licensed insurance professional can review the details with you.
            </p>
            <ul className="space-y-4 mb-12">
              {exclusions.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-silver bg-red-900/10 p-3 rounded border border-red-900/30">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                  <span className="text-red-200">REVIEW THIS CONDITION: {item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: THE ACTION CARD */}
          <div className="bg-industrial-800 border-2 border-yellow-500/50 p-8 rounded-lg sticky top-24 shadow-[0_0_50px_rgba(234,179,8,0.1)]">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">INSURE THIS TRAILER</h2>
              <p className="text-industrial-400 text-sm">
                Request a quote review for {trailer.display_name} operations. Availability and timing depend on your submission and underwriting.
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
                Request {trailer.display_name} Quote Review
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
              <h2 className="text-3xl font-bold text-white mb-4">Car hauler insurance coverage</h2>
              <p className="text-industrial-400 mb-6">Auto hauler insurance is commercial truck insurance tailored to businesses transporting vehicles. The right policy depends on the equipment, vehicles in transit, routes, drivers, and contracts you accept.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  ['Primary auto liability', 'Protection for covered third-party bodily injury and property damage claims.'],
                  ['Motor truck cargo', 'Review cargo or vehicle-in-transit coverage for the cars you haul.'],
                  ['Physical damage', 'Coverage review for the tractor, trailer, and attached equipment.'],
                  ['General liability', 'May help address covered non-driving business liability exposures.'],
                  ['Loading and unloading', 'Confirm how the policy treats vehicle damage during loading and unloading.'],
                  ['Broker requirements', 'Compare requested limits, certificates, filings, and cargo terms before hauling.']
                ].map(([title, body]) => (
                  <div key={title} className="bg-industrial-800 border border-industrial-700 p-5 rounded">
                    <h3 className="text-white font-bold mb-2">{title}</h3>
                    <p className="text-sm text-industrial-400">{body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Requirements and cost factors</h2>
              <p className="text-industrial-400 mb-4">Insurance requirements vary by state, operating authority, vehicle weight, cargo, and whether you operate interstate or intrastate. Many brokers and shippers also set their own liability and cargo requirements.</p>
              <p className="text-industrial-400 mb-6">Premiums commonly depend on open versus enclosed equipment, vehicle values, operating radius, driver experience, new-authority status, loss runs, limits, deductibles, and the number of units. A licensed professional should confirm the requirements for your operation.</p>
              <Link href="/quote" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded uppercase">Request a car hauler quote review</Link>
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
              {[
                ['What is car hauler insurance?', 'It is specialized commercial auto transport insurance for businesses that move vehicles with open or enclosed car carriers.'],
                ['How much does car hauler insurance cost?', 'There is no single price. Underwriters consider equipment, vehicle values, routes, drivers, claims history, coverage limits, and the type of auto transport work.'],
                ['Do new authorities need auto hauler insurance?', 'New authorities may face different underwriting and broker requirements. Submit your operation details so a licensed professional can review available options.'],
                ['Is open or enclosed auto transport insurance different?', 'The equipment, cargo values, and contractual requirements can differ. Your policy should be reviewed against the vehicles and services you actually transport.']
              ].map(([question, answer]) => (
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
