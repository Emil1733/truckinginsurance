import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle2, FileText, ShieldCheck, Truck } from 'lucide-react';
import NicheLeadForm from '@/components/NicheLeadForm';
import { Footer } from '@/components/Footer';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata = {
  title: 'Semi Truck Insurance: Cost, Requirements & Hard-to-Place Files',
  description:
    'What a Class 8 tractor policy covers, the $750,000 federal floor, what underwriters actually price, and why new authorities and bad records get declined.',
  alternates: { canonical: '/semi-truck-insurance' },
};

const faqs = [
  [
    'How much does semi truck insurance cost?',
    'There is no honest single number, and any page that prints one is guessing. Premium is built per power unit from the tractor value, the trailer and cargo, the radius, driver experience and records, how long the authority has existed, and the limits and deductibles you choose. Two owner-operators with identical 2020 tractors are quoted differently because of driver history and prior claims. Ask for a range on your file rather than an average for the country.',
  ],
  [
    'What is the minimum insurance for a semi truck?',
    'For interstate for-hire general freight, the federal floor is $750,000 of public liability. Oil and most listed hazardous materials sit at $1,000,000, and certain bulk or high-hazard loads at $5,000,000. Those are federal minimums under 49 CFR 387.9 and they have not changed since the 1980s. Purely intrastate work follows the state instead, and the state number can be higher (New Jersey requires $1,500,000 on heavy trucks based there).',
  ],
  [
    'Why do new authorities get declined or quoted so high?',
    'Because there is no loss history to price. A brand new MC number has never had a claim and has never demonstrated it can avoid one, so underwriters lean on driver experience, motor vehicle records, the commodity and the radius instead. Many markets want two years of verifiable CDL experience and a driver over 25. The file is placeable — it just has to go to carriers that write new ventures, which is a narrower list than the standard market.',
  ],
  [
    'Do I need my own policy if I lease onto a carrier?',
    'Not for liability while you are under the carrier\'s dispatch — the federal leasing rules put that on the carrier. What you need is coverage for the time you are not: non-trucking liability if the tractor is used for personal purposes off dispatch, and physical damage on your own equipment if the carrier does not cover it. Read the insurance section of the lease; it has to say who provides what.',
  ],
  [
    'What is trailer interchange and do I need it?',
    'It responds when you are pulling a trailer you do not own — which is most drop-and-hook freight — and the owner of that trailer claims damage against you. Terminals and brokers often require it, and the UIIA agreement decides whether you get the chassis at all. It is separate from your own physical damage, which only covers equipment you own or lease.',
  ],
  [
    'Can I get semi truck insurance with a DUI or an out-of-service violation?',
    'Usually, at a price and through a narrower set of carriers. A recent DUI, a suspension, or multiple violations moves the file into non-standard markets, and some will decline outright depending on how recent and how many. What helps is accuracy: an honest description of the operation, complete driver records, and an agent who knows which markets write that profile rather than submitting everywhere.',
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

const coverage = [
  {
    title: 'Auto liability',
    body: 'Injury and property damage you cause to others. The $750,000 federal floor for general freight covers the public, not your equipment, and the MCS-90 endorsement on the policy is what guarantees payment up to the filed limit.',
  },
  {
    title: 'Motor truck cargo',
    body: 'The freight in your trailer. No statute sets this for general freight; the shipper contract does. Electronics, pharmaceuticals and high-theft freight need limits and conditions that reflect the load.',
  },
  {
    title: 'Physical damage',
    body: 'Collision and comprehensive on the tractor and trailer you own. Stated value versus actual cash value changes what a total loss pays, and a financed tractor carries a lender requirement on the deductible.',
  },
  {
    title: 'Trailer interchange',
    body: 'For drop-and-hook work using someone else\'s trailer. It responds when that owner claims damage. Separate from your own physical damage, and often required before a terminal releases equipment.',
  },
  {
    title: 'Non-trucking liability / bobtail',
    body: 'For a leased owner-operator, this covers the tractor when it is running outside the carrier\'s business. The lease decides who buys it; the policy wording decides when it answers.',
  },
  {
    title: 'Occupational accident',
    body: 'Owner-operators are usually not covered by the carrier\'s workers compensation. Occupational accident is the common substitute, and it is not the same product.',
  },
];

const factors = [
  ['Tractor and trailer value', 'A $40,000 used tractor and a $180,000 new one are different physical damage exposures, and the trailer is priced separately.'],
  ['Commodity', 'General freight, produce, high-theft freight and hazmat each carry different underwriting treatment. Hazmat also raises the legal floor.'],
  ['Radius', 'Local, regional, intermediate and long haul are rated differently. Radius is the first question after the commodity.'],
  ['Driver experience and records', 'Two years of verifiable CDL experience and a clean MVR is the market standard. Below that, the list of carriers willing to look shrinks fast.'],
  ['Authority age and loss history', 'A new MC number has no history of its own. A lapse or a prior claim follows the operation into the next quote.'],
  ['Limits and deductibles', 'Raising liability, adding cargo or lowering the physical damage deductible each move premium. The cheapest combination is rarely the one that survives a claim.'],
];

export default function SemiTruckInsurancePage() {
  return (
    <div className="min-h-screen bg-industrial-900 font-mono text-silver">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteHeader ctaHref="#quote-review" ctaLabel="Request a review" statusLabel="Class 8 coverage" />

      <main>
        {/* HERO */}
        <section className="border-b border-industrial-800 px-6 py-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-900/30 text-safety-orange text-xs font-bold mb-6 border border-orange-800 uppercase tracking-widest">
                <Truck className="w-4 h-4" /> CLASS 8 TRACTOR
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold uppercase text-white leading-[1.05] mb-6">
                Semi truck insurance
              </h1>
              <p className="text-xl text-industrial-400 mb-6">
                A tractor-trailer is where the money and the exposure both get large. The policy has to
                satisfy a federal minimum, a broker contract, a lender and, if you are leased on, a
                carrier&apos;s requirement — and those four numbers are rarely the same.
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
                  Coverage overview
                </Link>
              </div>
            </div>
            <div id="quote-review">
              <NicheLeadForm stateName="your state" nicheName="Semi Truck Insurance" />
            </div>
          </div>
        </section>

        {/* COVERAGE */}
        <section className="max-w-7xl mx-auto px-6 py-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-3">
            What a tractor policy is made of
          </h2>
          <p className="text-industrial-400 max-w-3xl mb-8 leading-relaxed">
            Six coverages, usually bought in some combination. The gaps between them are where a
            tractor-trailer claim turns into a personal one.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coverage.map((item) => (
              <div key={item.title} className="bg-industrial-800 border border-industrial-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-5 h-5 text-safety-orange" />
                  <h3 className="font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-sm text-industrial-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MINIMUMS */}
        <section className="border-y border-industrial-800 bg-industrial-800/40">
          <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-safety-orange" />
                <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white">
                  The federal floor
                </h2>
              </div>
              <p className="text-industrial-400 leading-relaxed mb-4">
                Under 49 CFR 387.9, a for-hire carrier of general freight at 10,001 lbs or more carries
                $750,000 of public liability. Oil and most listed hazardous materials sit at $1,000,000,
                and certain bulk or high-hazard loads at $5,000,000. Those figures have not moved in
                decades, which is why the contract often sets a higher one.
              </p>
              <p className="text-industrial-400 leading-relaxed">
                Brokers and shippers commonly require $1,000,000 in auto liability and $100,000 in cargo
                before they will tender a load. A carrier working on $750,000 is legal and still
                unbookable, which is a distinction worth understanding before the first load offer.
              </p>
            </div>
            <div className="bg-industrial-900 border border-industrial-700 rounded-lg p-6">
              <h3 className="font-bold text-white mb-3">Who requires what</h3>
              <ul className="space-y-3 text-sm text-industrial-400">
                <li><span className="text-white font-semibold">FMCSA</span> — the federal minimum, filed by your insurer as BMC-91X before an MC number activates.</li>
                <li><span className="text-white font-semibold">The broker or shipper</span> — a contract number, commonly $1,000,000 liability and $100,000 cargo.</li>
                <li><span className="text-white font-semibold">The lender</span> — physical damage on the tractor, with a deductible ceiling.</li>
                <li><span className="text-white font-semibold">The carrier you lease to</span> — the lease names what you must carry beyond its own policy.</li>
                <li><span className="text-white font-semibold">The state</span> — intrastate minimums, which can sit above the federal figure.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* COST */}
        <section className="max-w-7xl mx-auto px-6 py-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-3">
            What underwriters actually price
          </h2>
          <p className="text-industrial-400 max-w-3xl mb-8 leading-relaxed">
            A semi policy is priced per power unit from a small set of inputs. Everything else is
            detail.
          </p>
          <div className="space-y-4">
            {factors.map(([label, body]) => (
              <div key={label} className="flex flex-col md:flex-row gap-2 md:gap-6 border-b border-industrial-800 pb-4">
                <div className="md:w-64 shrink-0 font-bold text-white text-sm">{label}</div>
                <p className="text-sm text-industrial-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HARD TO PLACE */}
        <section className="border-y border-industrial-800 bg-industrial-800/40">
          <div className="max-w-7xl mx-auto px-6 py-14">
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-3">
              The files that need a specialist
            </h2>
            <p className="text-industrial-400 max-w-3xl mb-8 leading-relaxed">
              Some semi files are straightforward and any agency can place them. These are the ones that
              come back declined from a standard market — and the ones worth placing properly rather than
              re-submitting everywhere.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                ['Brand new authority', 'No loss history, no prior coverage, sometimes a driver with eighteen months behind the wheel. Placeable, but only through markets that write new ventures.'],
                ['A lapse in coverage', 'A gap follows the operation. Underwriters read it as a signal about how the business is run, and it can outweigh an otherwise clean file.'],
                ['Driver records', 'A DUI, a suspension or several violations moves the file into non-standard markets. Recency and count matter more than the violation itself.'],
                ['Unusual or high-hazard cargo', 'Hazmat, high-theft freight, oversize and heavy haul each narrow the list. Some also raise the legal minimum, so the price and the requirement move together.'],
                ['Owner-operator leasing on', 'Different problem: the carrier covers the tractor under dispatch, so the gap is off-duty time. That is non-trucking liability, not a second primary policy.'],
                ['Fleet with mixed history', 'One bad driver inside a clean fleet still prices the whole schedule. Isolating or excluding that driver is sometimes the difference between a quote and a decline.'],
              ].map(([title, body]) => (
                <div key={title} className="bg-industrial-900 border border-industrial-700 rounded-lg p-6">
                  <h3 className="font-bold text-white mb-2">{title}</h3>
                  <p className="text-sm text-industrial-400 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MISTAKES */}
        <section className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 mb-5">
            <FileText className="w-6 h-6 text-safety-orange" />
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white">
              Where tractor claims go wrong
            </h2>
          </div>
          <div className="space-y-4 max-w-3xl">
            {[
              ['Buying to the federal minimum', 'It is legal and it will not get you loaded. The contract number is the one that matters, and it is usually $1,000,000.'],
              ['Assuming the carrier covers the tractor at all times', 'It covers the tractor in the carrier\'s service. Weekends, personal trips and the shop run sit outside that unless you bought something for them.'],
              ['No trailer interchange on drop-and-hook', 'You are pulling equipment you do not own. When it comes back damaged, that claim lands on you.'],
              ['Stated value set at the loan balance', 'The lender is protected and you are not. If the tractor is worth more than the payoff, insure the value, not the balance.'],
              ['Describing the operation more favourably than it is', 'A radius or commodity that does not match the work is a rating error, and a rating error is grounds to rescind a policy — after the claim.'],
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
        </section>

        {/* FAQ */}
        <section className="max-w-4xl mx-auto px-6 pb-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-6">
            Semi truck questions
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
              <a href="https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-376/subpart-A/section-376.12" target="_blank" rel="noopener noreferrer nofollow" className="text-safety-orange hover:underline">
                49 CFR 376.12, lease requirements including insurance
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
          <h2 className="font-display text-2xl font-bold uppercase text-white mb-4">Related</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/non-trucking-liability-insurance" className="border border-industrial-700 text-silver px-4 py-3 rounded hover:border-safety-orange">
              Non-trucking liability for leased tractors
            </Link>
            <Link href="/bobtail-insurance" className="border border-industrial-700 text-silver px-4 py-3 rounded hover:border-safety-orange">
              Bobtail coverage
            </Link>
            <Link href="/commercial-truck-insurance" className="border border-industrial-700 text-silver px-4 py-3 rounded hover:border-safety-orange">
              Commercial truck insurance
            </Link>
            <Link href="/quote" className="border border-industrial-700 text-silver px-4 py-3 rounded hover:border-safety-orange">
              Start a quote review
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
