import Link from 'next/link';
import {
  Truck,
  ShieldCheck,
  FileText,
  BadgeDollarSign,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Commercial Truck Insurance: Cost, Coverage & Requirements',
  description:
    'What commercial truck insurance covers, what federal and state minimums apply, which documents a carrier needs before quoting, and how filings connect to the policy.',
  alternates: {
    canonical: '/commercial-truck-insurance',
  },
  openGraph: {
    title: 'Commercial Truck Insurance: Coverage, Cost & Requirements | Truck Coverage Experts',
    description:
      'Coverage, minimums, rating factors, quote documents and filings for commercial trucking operations.',
  },
};

const faqs = [
  [
    'How much does commercial truck insurance cost?',
    'There is no single rate. Premium is built from the equipment and cargo, the operating radius, gross vehicle weight, driver records and experience, how long the authority has been active, the limits and deductibles you choose, garaging location, and prior claims. Two carriers with identical trucks can be quoted very differently because of driver history and authority age, which is why a generic average is a poor planning number.',
  ],
  [
    'What is the minimum insurance for a commercial truck?',
    'For-hire operations generally start at $750,000 of public liability for general freight, with higher requirements for oil, hazardous materials and certain passenger operations. Intrastate operations follow state minimums instead, and some states require a state-specific filing before the plates or authority are released. Confirm the current figure with the carrier and the state authority before you buy, because the requirement follows the cargo and the operation, not the truck alone.',
  ],
  [
    'What is the difference between motor truck cargo and general liability?',
    'Auto liability responds to injury or damage you cause to others on the road. Motor truck cargo responds to the freight you are hauling while it is in your care. General liability responds to premises and operations exposures that are not auto. Brokers and shippers often require cargo limits by contract, so the coverage a contract demands can exceed the legal minimum.',
  ],
  [
    'What is non-trucking liability or bobtail coverage?',
    'It responds when a power unit is being operated without a trailer and outside a dispatched load, which is a gap under many motor carrier policies. Owner-operators leased to a carrier are usually required to carry it, and some carriers offer it as an endorsement rather than a separate policy.',
  ],
  [
    'Can a brand new authority get commercial truck insurance?',
    'Yes, but the file has to work harder. With no loss history of your own, underwriters look at driver experience, motor vehicle records, the commodity, the radius and the equipment, and they may ask for proof of prior coverage or a down payment structure. Preparing complete documents up front is the difference between a quote and a decline.',
  ],
  [
    'What documents does a carrier need before quoting?',
    'Usually: the legal entity name and address, MC and DOT numbers and authority status, a driver list with licence details and experience, three to five years of loss runs if you have prior coverage, an equipment schedule with VINs, the cargo you haul, the operating radius, and any broker or shipper insurance requirements. The more complete the file, the more accurate the quote.',
  ],
  [
    'Do I need a filing as well as a policy?',
    'Often yes. Federal filings such as BMC-91X prove financial responsibility to FMCSA, and states run their own versions: California uses the MCP-65 with a DMV-65 certificate, Texas uses its own intrastate forms, and household goods movers have separate requirements. The filing is evidence of coverage, not coverage itself, and a lapse in the policy can void it.',
  ],
  [
    'How long does it take to get covered?',
    'A clean file with prior coverage can move in days; a new authority with unusual cargo or driver history takes longer because more underwriting review is required. Filing processing time is separate and depends on the authority, so build both into your start date rather than assuming the policy date is the operating date.',
  ],
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};

const equipment = [
  ['Semi truck / Class 8 tractor', '/semi-truck-insurance'],
  ['Box truck', '/box-truck-insurance'],
  ['Auto hauler / car carrier', '/insurance/auto-hauler-car-carrier-insurance'],
  ['Dump trailer', '/insurance/dump-trailer-insurance'],
  ['Bottom dump', '/insurance/bottom-dump-trailer-insurance'],
  ['End dump', '/insurance/end-dump-trailer-insurance'],
  ['Hazmat tanker', '/insurance/hazmat-tanker-insurance'],
  ['Pneumatic dry bulk', '/insurance/pneumatic-dry-bulk-insurance'],
  ['Lowboy / RGN heavy haul', '/insurance/lowboy-rgn-heavy-haul-insurance'],
  ['Intermodal chassis / container', '/insurance/intermodal-chassis-container-insurance'],
  ['Reefer breakdown', '/insurance/reefer-breakdown-insurance'],
  ['Bull hauler / livestock', '/insurance/bull-hauler-livestock-insurance'],
  ['Hot shot (pickup and trailer)', '/hot-shot'],
];

const states = [
  ['Florida', '/commercial-truck-insurance/florida'],
  ['California', '/commercial-truck-insurance/california'],
  ['Texas', '/commercial-truck-insurance/texas'],
  ['Indiana', '/commercial-truck-insurance/indiana'],
  ['New York', '/commercial-truck-insurance/new-york'],
  ['New Jersey', '/commercial-truck-insurance/new-jersey'],
  ['Pennsylvania', '/commercial-truck-insurance/pennsylvania'],
  ['Illinois', '/commercial-truck-insurance/illinois'],
];

const coverage = [
  {
    title: 'Auto liability',
    body: 'Required in nearly every for-hire operation. It responds to bodily injury and property damage you cause to others. Federal financial responsibility rules set the floor, and brokers and shippers routinely require more.',
  },
  {
    title: 'Motor truck cargo',
    body: 'Covers the freight in your care. Limits are often set by the shipper contract rather than by law, and high-value or high-theft commodities change both the price and the underwriting questions.',
  },
  {
    title: 'Physical damage',
    body: 'Collision and comprehensive for the power unit and trailer. Deductibles and stated-value versus actual-cash-value terms matter more here than on any other line.',
  },
  {
    title: 'General liability',
    body: 'Premises and operations exposure away from the vehicle: loading docks, storage, and third-party contracts. Frequently requested on top of the auto policy.',
  },
  {
    title: 'Non-trucking liability / bobtail',
    body: 'Fills the gap when the tractor runs without a trailer or outside a dispatched load. Commonly required of owner-operators leased to a carrier.',
  },
  {
    title: 'Occupational accident or workers compensation',
    body: 'Depends on how the operation is structured and where it operates. Owner-operators and incorporated drivers are treated differently from employees.',
  },
];

const factors = [
  ['Equipment and GVW', 'Tractor, trailer type, stated value, and gross weight change the base rate and the physical damage exposure.'],
  ['Commodity and cargo value', 'Hazmat, high-theft freight, produce, and household goods all carry different treatment than general freight.'],
  ['Radius', 'Local, regional, intermediate, and long haul are rated differently, and the radius drives both price and eligibility.'],
  ['Drivers', 'Experience, motor vehicle records, and how many drivers share the equipment are the most common reason a quote changes after submission.'],
  ['Authority age', 'A new MC number has no loss history, which affects both price and which carriers will offer terms at all.'],
  ['Limits and deductibles', 'Raising liability limits or lowering the physical damage deductible moves premium quickly; the cheapest quote is not the same as the right one.'],
  ['Claims and lapses', 'Prior losses and any gap in coverage follow the operation and can outweigh everything else on the file.'],
];

export default function CommercialTruckInsurancePage() {
  return (
    <div className="min-h-screen bg-industrial-900 font-mono text-silver">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteHeader ctaLabel="Request a review" statusLabel="Commercial coverage guide" />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-900/30 text-safety-orange text-xs font-bold mb-6 border border-orange-800 uppercase tracking-widest">
              <Truck className="w-4 h-4" /> FOR-HIRE AND PRIVATE CARRIERS
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              COMMERCIAL TRUCK <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-safety-orange to-yellow-500">
                INSURANCE
              </span>
            </h1>
            <p className="text-xl text-industrial-400 mb-8 max-w-lg">
              What the policy covers, what the law requires, what moves the premium, and what a
              carrier needs in hand before it will quote a trucking operation. Written for owner-operators,
              new authorities, and small fleets comparing coverage.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-safety-orange text-industrial-900 px-6 py-3 rounded font-bold uppercase text-sm hover:bg-yellow-500 transition-colors"
              >
                Request a quote review <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/new-authority-insurance"
                className="inline-flex items-center gap-2 border border-industrial-700 px-6 py-3 rounded font-bold uppercase text-sm text-silver hover:border-safety-orange hover:text-safety-orange transition-colors"
              >
                New authority checklist
              </Link>
            </div>
          </div>

          <div className="bg-industrial-800 border border-industrial-700 rounded-lg p-8">
            <h2 className="text-sm font-bold text-safety-orange uppercase tracking-widest mb-4">
              Before you call a carrier
            </h2>
            <ul className="space-y-3 text-industrial-300 text-sm">
              {[
                'Legal entity name, address, and MC/DOT numbers',
                'Driver list with licence details and experience',
                'Three to five years of loss runs, if you have prior coverage',
                'Equipment schedule with VINs and stated values',
                'Cargo description and operating radius',
                'Broker or shipper insurance requirements',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-industrial-500 mt-5">
              An incomplete file is the most common reason a quote stalls or comes back higher than
              the first indication.
            </p>
          </div>
        </div>

        {/* COVERAGE */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            What commercial truck insurance actually covers
          </h2>
          <p className="text-industrial-400 max-w-3xl mb-8">
            It is not one policy. A trucking operation usually buys several lines that respond to
            different things, and the gaps between them are where claims get denied.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {coverage.map((item) => (
              <div key={item.title} className="bg-industrial-800 border border-industrial-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-5 h-5 text-safety-orange" />
                  <h3 className="font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-sm text-industrial-400">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-industrial-500 mt-5">
            The two off-duty coverages cause the most confusion:{' '}
            <Link href="/non-trucking-liability-insurance" className="underline hover:text-safety-orange">
              non-trucking liability
            </Link>{' '}
            is triggered by whose business the trip is for, while{' '}
            <Link href="/bobtail-insurance" className="underline hover:text-safety-orange">
              bobtail
            </Link>{' '}
            is triggered by whether a trailer is attached.
          </p>
        </section>

        {/* MINIMUMS */}
        <section className="mb-16 bg-industrial-800 border border-industrial-700 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-safety-orange" />
            <h2 className="text-2xl font-display font-bold text-white">
              What you are legally required to carry
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-industrial-300">
            <div>
              <h3 className="font-bold text-white mb-2">Interstate</h3>
              <p className="mb-3">
                Federal financial responsibility rules set a floor that depends on what you haul.
                General freight commonly starts at <strong className="text-white">$750,000</strong> of
                public liability, with higher requirements for oil, hazardous materials, and certain
                passenger operations.
              </p>
              <p>
                The filing that proves it is usually the BMC-91X, submitted by the insurer. A policy
                without the filing does not activate authority, and a lapse can void both.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Intrastate</h3>
              <p className="mb-3">
                States set their own minimums, and several require a state-specific filing before
                plates or authority are issued: California uses the MCP-65 supported by a DMV-65
                certificate, Texas uses its own intrastate forms, and household goods movers face
                separate requirements.
              </p>
              <p>
                State minimums can sit above the federal floor. Rating an operation as if the federal
                figure were the answer is a common and expensive mistake.
              </p>
            </div>
          </div>
          <p className="text-xs text-industrial-500 mt-6">
            Requirements change and depend on cargo, weight, and route. Confirm the current figure with
            the issuing authority and your carrier before binding coverage.
          </p>
        </section>

        {/* PRICING */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <BadgeDollarSign className="w-6 h-6 text-safety-orange" />
            <h2 className="text-3xl font-display font-bold text-white">What drives the premium</h2>
          </div>
          <p className="text-industrial-400 max-w-3xl mb-8">
            Published averages are close to useless for a single operation, because the same truck can
            be quoted across a wide range depending on these factors.
          </p>
          <div className="space-y-3">
            {factors.map(([label, body]) => (
              <div key={label} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 border-b border-industrial-800 pb-3">
                <div className="md:w-64 flex-shrink-0 font-bold text-white text-sm">{label}</div>
                <p className="text-sm text-industrial-400">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EQUIPMENT */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="w-6 h-6 text-safety-orange" />
            <h2 className="text-3xl font-display font-bold text-white">Coverage by equipment type</h2>
          </div>
          <p className="text-industrial-400 max-w-3xl mb-8">
            Underwriting treats a car hauler differently from a tanker, and a dump trailer differently
            from a reefer. Start from the equipment you actually run.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {equipment.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between gap-3 bg-industrial-800 border border-industrial-700 rounded px-4 py-3 text-sm text-silver hover:border-safety-orange transition-colors"
              >
                <span>{label}</span>
                <ArrowRight className="w-4 h-4 text-industrial-500 group-hover:text-safety-orange" />
              </Link>
            ))}
          </div>
          <p className="text-sm text-industrial-500 mt-4">
            <Link href="/insurance" className="underline hover:text-safety-orange">
              See all equipment programs
            </Link>
          </p>
        </section>

        {/* STATES */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Coverage by state</h2>
          <p className="text-industrial-400 max-w-3xl mb-8">
            State rules change the filing, the minimum limit, and sometimes the forms the authority
            requires. These are the states with the most intrastate demand.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {states.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="bg-industrial-800 border border-industrial-700 rounded px-4 py-3 text-sm text-silver hover:border-safety-orange transition-colors text-center"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* DECLINES */}
        <section className="mb-16 bg-industrial-800 border border-industrial-700 rounded-lg p-8">
          <h2 className="text-2xl font-display font-bold text-white mb-4">
            Why quotes get declined or repriced
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-industrial-300">
            <ul className="space-y-3">
              <li className="flex gap-3">
                <AlertTriangle className="w-4 h-4 text-safety-orange flex-shrink-0 mt-0.5" />
                <span>Driver records with moving violations, suspensions, or very little verifiable experience.</span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="w-4 h-4 text-safety-orange flex-shrink-0 mt-0.5" />
                <span>Cargo the market has stopped writing, or a commodity described too vaguely to rate.</span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="w-4 h-4 text-safety-orange flex-shrink-0 mt-0.5" />
                <span>A lapse in prior coverage, or loss runs that cannot be produced.</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <AlertTriangle className="w-4 h-4 text-safety-orange flex-shrink-0 mt-0.5" />
                <span>Equipment values that do not match the schedule, or VINs that cannot be verified.</span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="w-4 h-4 text-safety-orange flex-shrink-0 mt-0.5" />
                <span>Broker or shipper contracts requiring limits the proposed policy does not carry.</span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="w-4 h-4 text-safety-orange flex-shrink-0 mt-0.5" />
                <span>An authority so new that no carrier will offer terms without a down payment or inspection.</span>
              </li>
            </ul>
          </div>
          <p className="text-sm text-industrial-400 mt-6">
            Most of these are fixable before submission. See{' '}
            <Link href="/new-authority-insurance" className="underline hover:text-safety-orange">
              new authority insurance
            </Link>{' '}
            and{' '}
            <Link href="/trucking-insurance-requirements" className="underline hover:text-safety-orange">
              trucking insurance requirements
            </Link>
            .
          </p>
        </section>

        {/* FILINGS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-safety-orange" />
            <h2 className="text-3xl font-display font-bold text-white">
              The filings that go with the policy
            </h2>
          </div>
          <p className="text-industrial-400 max-w-3xl mb-6">
            A filing is proof of coverage sent to a regulator. It is not coverage. The policy has to be
            in force, and a cancellation can take the filing with it.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <Link href="/filing/bmc91x-federal-filing-fmsca" className="bg-industrial-800 border border-industrial-700 rounded p-5 hover:border-safety-orange transition-colors">
              <div className="font-bold text-white mb-1">BMC-91X</div>
              <p className="text-industrial-400">Federal proof of liability coverage filed with FMCSA to activate or maintain authority.</p>
            </Link>
            <Link href="/filing/mcp65-california-dmv-filing" className="bg-industrial-800 border border-industrial-700 rounded p-5 hover:border-safety-orange transition-colors">
              <div className="font-bold text-white mb-1">MCP-65 / DMV-65</div>
              <p className="text-industrial-400">California intrastate filing supporting the Motor Carrier Permit.</p>
            </Link>
            <Link href="/filings" className="bg-industrial-800 border border-industrial-700 rounded p-5 hover:border-safety-orange transition-colors">
              <div className="font-bold text-white mb-1">All filings</div>
              <p className="text-industrial-400">BMC-34, Form H, PL-914, Form E and state-specific requirements.</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-white mb-6">
            Commercial truck insurance questions
          </h2>
          <div className="space-y-4">
            {faqs.map(([question, answer]) => (
              <div key={question} className="bg-industrial-800 border border-industrial-700 rounded-lg p-6">
                <h3 className="font-bold text-white mb-2">{question}</h3>
                <p className="text-sm text-industrial-400">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-orange-900/40 to-industrial-800 border border-orange-800 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Have the file ready? Request a quote review.
          </h2>
          <p className="text-industrial-300 max-w-2xl mx-auto mb-6">
            A licensed insurance professional reviews the operation, the equipment and the filings
            together, and tells you what is missing before it becomes a decline.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-safety-orange text-industrial-900 px-8 py-4 rounded font-bold uppercase hover:bg-yellow-500 transition-colors"
          >
            Request a quote review <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-industrial-500 mt-4">
            Coverage and requirements are subject to current rules, underwriting, and state availability.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
