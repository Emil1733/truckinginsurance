import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle2, FileText, ShieldCheck, Truck } from 'lucide-react';
import NicheLeadForm from '@/components/NicheLeadForm';
import { Footer } from '@/components/Footer';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata = {
  title: 'Box Truck Insurance: Coverage, Cost & Non-CDL Requirements',
  description:
    'What box truck insurance covers, why the 10,001 lb and 26,001 lb lines change everything, what moves the premium, and the mistakes that get claims denied.',
  alternates: { canonical: 'https://www.truckcoverageexperts.com/box-truck-insurance' },
};

const faqs = [
  [
    'Do I need a CDL to drive a box truck?',
    'Not if the truck is rated at 26,000 lbs GVWR or less. The CDL line is 26,001 lbs, plus a trailer over 10,000 lbs, so a 26-foot straight truck is usually a non-CDL vehicle. That is a licensing answer, not an insurance one: underwriters still look at driver age, experience and motor vehicle records, and some carriers will not write a driver under 23 or 25 regardless of licence class.',
  ],
  [
    'Is a USDOT number required for a box truck?',
    'It depends on weight and where you drive. A commercial motor vehicle at 10,001 lbs GVWR or more operating in interstate commerce needs a USDOT number, and so does anything carrying placarded hazardous materials. Purely intrastate work follows the state rules, and several states set their own thresholds — Texas registers intrastate carriers over 26,000 lbs, while Pennsylvania applies the federal safety rules from 17,001 lbs.',
  ],
  [
    'Does a personal auto policy cover a box truck used for deliveries?',
    'Almost never. Personal auto policies exclude business use, and delivery work is business use by any reading. The gap is not just the vehicle: if the policy was written for personal use and the truck is running routes, a claim can be denied on the use rather than the driving — which is the worst possible outcome, because you have paid premiums for years and still own the loss.',
  ],
  [
    'How much cargo coverage does a box truck need?',
    'There is no legal minimum for general freight cargo on a box truck; the requirement comes from the shipper or platform contract. Common contract levels are $100,000 for platform delivery work, and higher for electronics, pharmaceuticals or anything with a theft problem. Underwriters also ask what the cargo is worth per load, not just what the contract says, because a $100,000 limit on a $250,000 load is a limit you will test.',
  ],
  [
    'Can I insure a box truck with a bad driving record?',
    'Usually, though the market narrows. A recent DUI, a suspension, or several moving violations will push the file toward non-standard carriers, and some will decline outright. What helps is an accurate description of the operation, complete driver information, and an agent who knows which markets write that profile instead of submitting it everywhere and collecting declines.',
  ],
  [
    'Is box truck insurance cheaper than tractor-trailer insurance?',
    'Often, but not reliably. The truck is worth less and the radius is shorter, which helps. Against that, final-mile delivery has high claim frequency from tight yards, low bridges and stop density, and cargo theft exposure can be worse because the freight is unattended at the kerb. A box truck running local delivery is a different risk from a box truck running linehaul, and the price reflects the difference.',
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

const classes = [
  {
    weight: 'Under 10,001 lbs GVWR',
    label: 'Light box truck, cargo van chassis',
    body: 'No USDOT number needed for interstate work, no federal filing, and the federal financial responsibility floor does not apply. Many of these still need commercial coverage because the use is commercial, and shipper contracts often demand limits well above anything the law requires.',
  },
  {
    weight: '10,001 to 26,000 lbs GVWR',
    label: 'The 16 to 26 foot straight truck',
    body: 'The common box truck. USDOT number required for interstate work, still non-CDL at 26,000 lbs. Federal minimum for for-hire general freight is $750,000 of liability, which is also the number most brokers and platforms ask for. This is the class where most claims and most underpricing happen.',
  },
  {
    weight: '26,001 lbs and above',
    label: 'CDL territory',
    body: 'A CDL is required, and the vehicle is a commercial motor vehicle for every practical purpose. Insurance is priced closer to a tractor-trailer, and the operation is usually treated as trucking rather than delivery.',
  },
];

const costFactors = [
  ['Gross vehicle weight and value', 'A $30,000 used 16-footer and a $90,000 new 26-footer are different physical damage exposures even when the liability limit is identical.'],
  ['What you carry', 'Electronics, pharmaceuticals and high-theft freight change both the rate and the underwriting questions. General freight in sealed pallets does not.'],
  ['How the truck is used', 'Final-mile delivery with 40 stops a day is a different loss pattern from one linehaul run. Stop density, kerbside parking and unattended freight are the exposure, not the miles.'],
  ['Drivers', 'Age, experience and motor vehicle records are the single most common reason a box truck quote changes after submission. Under-25 drivers narrow the market sharply.'],
  ['Radius and garaging', 'Local, regional and interstate are rated differently, and where the truck parks overnight matters for theft and weather claims.'],
  ['Limits and deductibles', 'Liability, cargo and physical damage each price separately. Buying the state minimum and then discovering a platform requires $1,000,000 is the most common expensive correction.'],
];

export default function BoxTruckInsuranceHub() {
  return (
    <div className="min-h-screen bg-industrial-900 font-mono text-silver">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteHeader ctaHref="#quote-review" ctaLabel="Request a review" statusLabel="Box truck coverage guide" />

      <main>
        {/* HERO */}
        <section className="border-b border-industrial-800 px-6 py-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-900/30 text-safety-orange text-xs font-bold mb-6 border border-orange-800 uppercase tracking-widest">
                <Truck className="w-4 h-4" /> STRAIGHT TRUCK COVERAGE
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold uppercase text-white leading-[1.05] mb-6">
                Box truck insurance
              </h1>
              <p className="text-xl text-industrial-400 mb-6">
                The truck is the easy part. What prices a box truck policy is what you put in it, where
                you park it, and who drives it — which is why two 26-footers on the same street can carry
                completely different premiums.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#quote-review"
                  className="inline-flex items-center gap-2 bg-safety-orange text-industrial-900 px-6 py-3 rounded font-bold uppercase text-sm hover:bg-yellow-500 transition-colors"
                >
                  Request a quote review <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/commercial-truck-insurance"
                  className="inline-flex items-center gap-2 border border-industrial-700 px-6 py-3 rounded font-bold uppercase text-sm text-silver hover:border-safety-orange hover:text-safety-orange transition-colors"
                >
                  Commercial coverage guide
                </Link>
              </div>
            </div>
            <div id="quote-review">
              <NicheLeadForm stateName="your state" nicheName="Box Truck Insurance" />
            </div>
          </div>
        </section>

        {/* COMPONENTS */}
        <section className="max-w-7xl mx-auto px-6 py-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-4">
            What the policy is actually made of
          </h2>
          <p className="text-industrial-400 max-w-3xl mb-8 leading-relaxed">
            There is no single "box truck insurance". It is a stack of coverages, and the gaps between
            them are where claims get denied.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-industrial-800 border border-industrial-700 rounded-lg p-6">
              <ShieldCheck className="w-5 h-5 text-safety-orange mb-4" />
              <h3 className="font-bold text-white mb-2">Auto liability</h3>
              <p className="text-sm text-industrial-400 leading-relaxed">
                Injury and property damage you cause to other people. The legal floor at 10,001 lbs and
                above is $750,000 for for-hire general freight; the contract floor is usually the same
                number, and sometimes higher.
              </p>
            </div>
            <div className="bg-industrial-800 border border-industrial-700 rounded-lg p-6">
              <FileText className="w-5 h-5 text-safety-orange mb-4" />
              <h3 className="font-bold text-white mb-2">Motor truck cargo</h3>
              <p className="text-sm text-industrial-400 leading-relaxed">
                The freight in your care. No statute sets this for general freight — the shipper or
                platform does. Electronics and pharmaceuticals need limits that reflect the load, not the
                contract boilerplate.
              </p>
            </div>
            <div className="bg-industrial-800 border border-industrial-700 rounded-lg p-6">
              <CheckCircle2 className="w-5 h-5 text-safety-orange mb-4" />
              <h3 className="font-bold text-white mb-2">Physical damage</h3>
              <p className="text-sm text-industrial-400 leading-relaxed">
                Collision and comprehensive on the truck and permanently attached equipment such as a
                liftgate. If the truck is financed, the lender requires it and will name a deductible
                ceiling.
              </p>
            </div>
          </div>
          <p className="text-sm text-industrial-500 mt-6 max-w-3xl">
            Add general liability if you load at customer premises, and non-trucking liability if the
            truck is leased to a carrier that covers it only under dispatch.
          </p>
        </section>

        {/* WEIGHT CLASSES */}
        <section className="border-y border-industrial-800 bg-industrial-800/40">
          <div className="max-w-7xl mx-auto px-6 py-14">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-3">
              Three weight classes, three different rules
            </h2>
            <p className="text-industrial-400 max-w-3xl mb-8 leading-relaxed">
              The GVWR on the door jamb decides most of what follows: licensing, USDOT registration, the
              federal minimum and which carriers will look at the file.
            </p>
            <div className="space-y-4">
              {classes.map((item) => (
                <div key={item.weight} className="bg-industrial-900 border border-industrial-700 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-2">
                    <div className="font-display text-xl font-bold text-safety-orange md:w-64 shrink-0">{item.weight}</div>
                    <div className="text-xs uppercase tracking-widest text-industrial-500">{item.label}</div>
                  </div>
                  <p className="text-sm text-industrial-400 leading-relaxed md:pl-[17.5rem]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COST */}
        <section className="max-w-7xl mx-auto px-6 py-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-3">
            What moves the number
          </h2>
          <p className="text-industrial-400 max-w-3xl mb-8 leading-relaxed">
            There is no honest average here. Underwriters build the price from these six inputs, and two
            trucks with the same badge can land far apart.
          </p>
          <div className="space-y-4">
            {costFactors.map(([label, body]) => (
              <div key={label} className="flex flex-col md:flex-row gap-2 md:gap-6 border-b border-industrial-800 pb-4">
                <div className="md:w-64 shrink-0 font-bold text-white text-sm">{label}</div>
                <p className="text-sm text-industrial-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MISPRICED USES */}
        <section className="max-w-7xl mx-auto px-6 pb-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-3">
            The uses that get mispriced
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="border border-industrial-700 rounded-lg p-6">
              <h3 className="font-bold text-white mb-2">Final-mile and platform delivery</h3>
              <p className="text-sm text-industrial-400 leading-relaxed">
                Forty stops a day means forty chances to clip a car, take out a canopy or leave freight
                unattended. It is frequency risk, not severity risk, and it is priced as such. If the work
                comes through a platform, the contract sets the limits — read it before you buy.
              </p>
            </div>
            <div className="border border-industrial-700 rounded-lg p-6">
              <h3 className="font-bold text-white mb-2">Moving and household goods</h3>
              <p className="text-sm text-industrial-400 leading-relaxed">
                Moving other people&apos;s household goods is regulated separately from freight in most
                states, and it usually needs its own authority, a tariff and valuation coverage rather
                than a cargo limit. A carrier doing occasional moves under a freight policy is exposed in
                a way the policy will not answer for.
              </p>
            </div>
            <div className="border border-industrial-700 rounded-lg p-6">
              <h3 className="font-bold text-white mb-2">Contractors and service work</h3>
              <p className="text-sm text-industrial-400 leading-relaxed">
                A box truck carrying your own tools and materials is private carriage, which changes who
                needs a USDOT number and what the cargo exposure is. Tools are usually insured under
                inland marine or a tool floater, not motor truck cargo.
              </p>
            </div>
            <div className="border border-industrial-700 rounded-lg p-6">
              <h3 className="font-bold text-white mb-2">Linehaul in a straight truck</h3>
              <p className="text-sm text-industrial-400 leading-relaxed">
                Some box trucks run 500-mile lanes rather than local routes. That is priced closer to
                tractor-trailer work than to delivery, and describing it as local delivery to get a lower
                rate is the kind of thing that surfaces at claims, not at binding.
              </p>
            </div>
          </div>
        </section>

        {/* MISTAKES */}
        <section className="border-y border-industrial-800 bg-industrial-800/40">
          <div className="max-w-7xl mx-auto px-6 py-14">
            <div className="flex items-center gap-3 mb-5">
              <AlertTriangle className="w-6 h-6 text-safety-orange" />
              <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white">
                Five mistakes that show up at claim time
              </h2>
            </div>
            <div className="space-y-4 max-w-3xl">
              {[
                ['Personal auto policy on a working truck', 'Business use is excluded. The claim is denied on the use, not the driving, and a financed truck still has to be paid for.'],
                ['Describing the operation as something it is not', 'A linehaul truck described as local delivery, or a for-hire carrier described as a contractor, gets a rate for a risk that is not being run. That is grounds to rescind, not just to reprice.'],
                ['Buying the state minimum for a platform contract', 'The legal floor and the contract floor are different numbers, and the gap is usually $250,000 or more.'],
                ['Skipping cargo because "the shipper insures it"', 'Sometimes true, usually not. When the shipper\'s policy pays, it pays and then subrogates against you.'],
                ['No physical damage on a financed truck', 'The lender requires it, the lease may require it, and without it a single at-fault collision ends the business rather than the year.'],
              ].map(([title, body]) => (
                <div key={title} className="flex gap-3 border-b border-industrial-800 pb-3">
                  <CheckCircle2 className="w-5 h-5 text-safety-orange shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-sm">{title}</div>
                    <p className="text-sm text-industrial-400 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DOCS */}
        <section className="max-w-7xl mx-auto px-6 py-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-4">
            What to have ready
          </h2>
          <ul className="grid md:grid-cols-2 gap-3 text-sm text-industrial-300 max-w-4xl">
            {[
              'Vehicle year, make, VIN, GVWR and stated value, with any liftgate or body equipment',
              'Cargo description and the value of a typical load, not just the contract limit',
              'Operating radius and where the truck is parked overnight',
              'Driver list with dates of birth, licence details and years of experience',
              'Three to five years of loss runs, or a clean declaration if this is a first policy',
              'MC and DOT numbers if you hold authority, or the carrier you are leased to',
              'Any platform, broker or shipper insurance requirement in writing',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-safety-orange shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 pb-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-6">
            Box truck questions
          </h2>
          <div className="space-y-4">
            {faqs.map(([question, answer]) => (
              <div key={question} className="bg-industrial-800 border border-industrial-700 rounded-lg p-6">
                <h3 className="font-bold text-white mb-2">{question}</h3>
                <p className="text-sm text-industrial-400 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SOURCES */}
        <section className="max-w-4xl mx-auto px-6 pb-14">
          <h2 className="text-sm font-bold text-industrial-400 uppercase tracking-widest mb-3">Sources</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387/subpart-A/section-387.9" target="_blank" rel="noopener noreferrer nofollow" className="text-safety-orange hover:underline">
                49 CFR 387.9, minimum levels of financial responsibility
              </a>
            </li>
            <li>
              <a href="https://www.fmcsa.dot.gov/registration/do-i-need-usdot-number" target="_blank" rel="noopener noreferrer nofollow" className="text-safety-orange hover:underline">
                FMCSA, do I need a USDOT number
              </a>
            </li>
            <li>
              <a href="https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-383" target="_blank" rel="noopener noreferrer nofollow" className="text-safety-orange hover:underline">
                49 CFR Part 383, commercial driver licence standards
              </a>
            </li>
          </ul>
        </section>

        {/* NEXT */}
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <h2 className="font-display text-2xl font-bold uppercase text-white mb-4">Next steps</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/commercial-truck-insurance" className="border border-industrial-700 text-silver px-4 py-3 rounded hover:border-safety-orange">
              Commercial truck insurance guide
            </Link>
            <Link href="/quote" className="border border-industrial-700 text-silver px-4 py-3 rounded hover:border-safety-orange">
              Start a quote review
            </Link>
            <Link href="/amazon-relay-insurance" className="border border-industrial-700 text-silver px-4 py-3 rounded hover:border-safety-orange">
              Amazon Relay coverage
            </Link>
            <Link href="/trucking-insurance-requirements" className="border border-industrial-700 text-silver px-4 py-3 rounded hover:border-safety-orange">
              Insurance requirements
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
