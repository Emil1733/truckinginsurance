import Link from 'next/link';
import { Truck, ShieldCheck, AlertTriangle, ArrowRight, FileText } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata = {
  title: 'Bobtail Insurance: What It Covers, and Why the Label Is Misleading',
  description:
    'Bobtail means a tractor without a trailer — a configuration test, not a purpose test. What a bobtail form covers, where deadheading falls, and how it differs from non-trucking liability.',
  alternates: {
    canonical: '/bobtail-insurance',
  },
};

const faqs = [
  [
    'Is bobtail insurance the same as non-trucking liability?',
    'Usually not, although the names are used interchangeably. A bobtail form is triggered by the configuration of the vehicle: a tractor with no trailer attached. A non-trucking liability form is triggered by the purpose of the trip: personal use outside the carrier\'s business, whether or not a trailer is attached. Most policies sold as "bobtail" today are written on a non-trucking form, so the label tells you very little. Read the insuring agreement and the exclusions.',
  ],
  [
    'Is bobtail insurance required by federal law?',
    'No federal rule requires an owner-operator to buy bobtail coverage by name. The federal leasing rule at 49 CFR 376.12(j) requires the lease to state who is responsible for insurance beyond the carrier\'s legal obligation — naming bobtail as the example — and what the carrier may charge back if it provides the coverage. The requirement therefore comes from the lease or the carrier, not from a statute.',
  ],
  [
    'Does bobtail cover me while I am pulling an empty trailer?',
    'Usually not. Pulling a trailer, even an empty one, is the definition of not bobtailing. That is the deadhead gap: if you are under dispatch, the carrier\'s primary liability should respond; if you are moving the trailer for personal reasons, a non-trucking form may respond where a strict bobtail form would not.',
  ],
  [
    'Does it cover the trailer, the load, or my own truck?',
    'None of them. Bobtail liability is liability for injury and property damage you cause to other people. Freight needs motor truck cargo coverage, the trailer and tractor need physical damage coverage, and your own injuries need occupational accident coverage or workers compensation.',
  ],
  [
    'I run under my own authority. Do I need it?',
    'Usually not. Bobtail exists because a leased tractor is covered by the carrier only while it is in the carrier\'s service. Under your own MC number, your primary commercial auto liability already responds whether the tractor is loaded, empty or running without a trailer. What you need instead is cargo coverage and physical damage.',
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

export default function BobtailInsurancePage() {
  return (
    <div className="min-h-screen bg-industrial-900 font-mono text-silver">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteHeader ctaLabel="Request a review" statusLabel="Owner-operator coverage" />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-900/30 text-safety-orange text-xs font-bold mb-6 border border-orange-800 uppercase tracking-widest">
              <Truck className="w-4 h-4" /> TRACTOR WITHOUT A TRAILER
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              BOBTAIL INSURANCE
            </h1>
            <p className="text-xl text-industrial-400 mb-6">
              Bobtailing is a physical description: a tractor running with no trailer attached. Bobtail
              insurance is written around that configuration. The problem is that the industry uses the
              word for two different products, and the one your lease names may not be the one you think
              you bought.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-safety-orange text-industrial-900 px-6 py-3 rounded font-bold uppercase text-sm hover:bg-yellow-500 transition-colors"
              >
                Request a quote review <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/non-trucking-liability-insurance"
                className="inline-flex items-center gap-2 border border-industrial-700 px-6 py-3 rounded font-bold uppercase text-sm text-silver hover:border-safety-orange hover:text-safety-orange transition-colors"
              >
                Compare with NTL
              </Link>
            </div>
          </div>

          <div className="bg-industrial-800 border border-industrial-700 rounded-lg p-7">
            <h2 className="text-sm font-bold text-safety-orange uppercase tracking-widest mb-4">
              The three names, and what each tests
            </h2>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-bold text-white">Bobtail</dt>
                <dd className="text-industrial-400">Is a trailer attached? No trailer, covered — the narrowest test.</dd>
              </div>
              <div>
                <dt className="font-bold text-white">Non-trucking liability</dt>
                <dd className="text-industrial-400">Whose business is the trip for? Personal use outside the carrier&apos;s business, with or without a trailer — the broadest test.</dd>
              </div>
              <div>
                <dt className="font-bold text-white">Unladen</dt>
                <dd className="text-industrial-400">Is there cargo on board? The meaning varies by policy, so this is the one to confirm in writing.</dd>
              </div>
            </dl>
            <p className="text-xs text-industrial-500 mt-5">
              Two owners can both say &ldquo;I have bobtail&rdquo; and be covered for entirely different trips.
            </p>
          </div>
        </div>

        {/* WHY IT EXISTS */}
        <section className="mb-16 max-w-3xl">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Why a leased tractor needs it at all</h2>
          <p className="text-industrial-400 leading-relaxed mb-4">
            When you lease to a carrier, federal rules put the truck in the carrier&apos;s service and make the
            carrier responsible for the public liability coverage the authority requires. That coverage
            follows the work. It does not follow you home, and it does not follow you to the shop on a
            Saturday.
          </p>
          <p className="text-industrial-400 leading-relaxed mb-4">
            A bobtail form answers the simplest version of that gap: the tractor is running with no
            trailer, so nothing in the carrier&apos;s freight operation is happening. A non-trucking form
            answers a slightly different question — whose business was the trip — and covers personal use
            even when a trailer happens to be attached.
          </p>
          <p className="text-industrial-400 leading-relaxed">
            If your operation is drop-and-hook and you take the tractor home between loads, the trailer
            question is not the one that matters. If you routinely run the tractor alone between
            terminals or to a shop, it may be. That is the decision the form makes for you, and it is why
            the lease wording matters more than the product name.
          </p>
        </section>

        {/* DEADHEAD */}
        <section className="mb-16 bg-industrial-800 border border-industrial-700 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-safety-orange" />
            <h2 className="text-2xl font-display font-bold text-white">The deadhead gap</h2>
          </div>
          <p className="text-industrial-300 leading-relaxed mb-4">
            Deadheading means running empty with the trailer still attached. It is the single most
            common place where an owner-operator believes they are covered and is not. A strict bobtail
            form will not respond, because a trailer is attached. A non-trucking form will not respond
            either if you are under dispatch, because the trip is the carrier&apos;s business.
          </p>
          <div className="overflow-x-auto border border-industrial-700 rounded">
            <table className="w-full text-sm">
              <thead className="bg-industrial-900 text-industrial-300">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Trip</th>
                  <th className="text-left px-4 py-3 font-bold">Should respond</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Empty trailer, heading to the next pickup under dispatch', 'Carrier\'s primary liability'],
                  ['Empty trailer, moving it for your own reasons', 'Non-trucking form, if the use is personal'],
                  ['Tractor only, running to a carrier-directed shop', 'Likely the carrier\'s policy'],
                  ['Tractor only, running to your own mechanic', 'Bobtail or non-trucking, depending on the form'],
                  ['Loaded trailer, any trip', 'Carrier\'s primary liability'],
                ].map(([trip, who]) => (
                  <tr key={trip} className="border-t border-industrial-800">
                    <td className="px-4 py-3 text-industrial-200">{trip}</td>
                    <td className="px-4 py-3 text-industrial-400">{who}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-industrial-400 mt-4">
            The goal is simple: never leave a trip where both policies can say no. Ask your carrier in
            writing when its policy responds, and buy coverage that starts where theirs stops.
          </p>
        </section>

        {/* WHAT IT IS NOT */}
        <section className="mb-16 grid md:grid-cols-2 gap-6">
          <div className="border border-industrial-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-5 h-5 text-safety-orange" />
              <h3 className="font-bold text-white">What it covers</h3>
            </div>
            <ul className="space-y-2 text-sm text-industrial-400">
              <li>Bodily injury you cause to other people</li>
              <li>Property damage you cause to other people</li>
              <li>Defence costs, up to the limit on the declarations</li>
              <li>Usually personal use of the tractor off dispatch</li>
            </ul>
          </div>
          <div className="border border-industrial-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-safety-orange" />
              <h3 className="font-bold text-white">What it does not</h3>
            </div>
            <ul className="space-y-2 text-sm text-industrial-400">
              <li>Your tractor — that is physical damage</li>
              <li>The trailer or the freight</li>
              <li>Your own injuries</li>
              <li>Any trip in the carrier&apos;s business</li>
              <li>Primary liability for your own authority</li>
            </ul>
          </div>
        </section>

        {/* LIMITS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-safety-orange" />
            <h2 className="text-2xl font-display font-bold text-white">The limit comes from your lease</h2>
          </div>
          <p className="text-industrial-400 max-w-3xl leading-relaxed mb-4">
            There is no statutory number for this coverage, because it is not a filing. Your lease sets
            it, usually alongside a requirement that the carrier be named as certificate holder. Leases in
            the market ask for anything from a few hundred thousand to a million in combined single limit,
            and some simply require proof that you carry something. Read the insurance section and buy the
            figure it names.
          </p>
          <p className="text-industrial-400 max-w-3xl leading-relaxed">
            The premium is usually modest because the exposure only exists off duty, so the difference
            between the lease minimum and a million is small in absolute terms. Buying the cheapest form
            that satisfies a certificate request is where owners get caught — the policy that costs least
            is often the one with the narrowest definition of dispatch.
          </p>
        </section>

        {/* WHEN THE LABEL FITS */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold text-white mb-4">
            When a bobtail form is the right buy — and when it is not
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="border border-industrial-700 rounded-lg p-6">
              <h3 className="font-bold text-white mb-3">Bobtail fits when</h3>
              <ul className="space-y-2 text-industrial-400">
                <li>The lease names bobtail specifically and the carrier will only accept that form</li>
                <li>Your pattern is terminal-to-terminal tractor moves with no trailer</li>
                <li>Most of your off-duty miles are solo runs — home, shop, yard</li>
                <li>You rarely move a trailer outside the carrier&apos;s instructions</li>
              </ul>
            </div>
            <div className="border border-industrial-700 rounded-lg p-6">
              <h3 className="font-bold text-white mb-3">Non-trucking liability fits when</h3>
              <ul className="space-y-2 text-industrial-400">
                <li>You drop and hook, so the trailer is often still attached</li>
                <li>You use the truck for personal errands, appointments or home time</li>
                <li>Your lease says &ldquo;non-trucking liability&rdquo; or &ldquo;unladen&rdquo; rather than bobtail</li>
                <li>You want one policy that answers the personal-use question regardless of configuration</li>
              </ul>
            </div>
          </div>
          <p className="text-industrial-400 max-w-3xl leading-relaxed mt-6">
            The most useful question to ask before buying is not &ldquo;which is cheaper&rdquo; but &ldquo;where
            exactly does the carrier&apos;s policy stop responding, and does this form start there?&rdquo; Get
            that in writing from the carrier, then hand the answer and the lease page to the agent. Two
            paragraphs of email at that stage are worth more than any comparison table, including this
            one, because they describe your operation instead of the average one.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-16 max-w-3xl">
          <h2 className="text-2xl font-display font-bold text-white mb-5">Questions owners ask</h2>
          <div className="space-y-4">
            {faqs.map(([question, answer]) => (
              <div key={question} className="bg-industrial-800 border border-industrial-700 rounded-lg p-6">
                <h3 className="font-bold text-white mb-2">{question}</h3>
                <p className="text-sm text-industrial-400">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SOURCES + CTA */}
        <section className="mb-12 max-w-3xl">
          <h2 className="text-sm font-bold text-industrial-400 uppercase tracking-widest mb-3">Sources</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-376/subpart-A/section-376.12" target="_blank" rel="noopener noreferrer nofollow" className="text-safety-orange hover:underline">
                49 CFR 376.12(j), insurance responsibility in the lease
              </a>
            </li>
            <li>
              <a href="https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387" target="_blank" rel="noopener noreferrer nofollow" className="text-safety-orange hover:underline">
                49 CFR Part 387, federal financial responsibility
              </a>
            </li>
          </ul>
        </section>

        <section className="bg-gradient-to-r from-orange-900/40 to-industrial-800 border border-orange-800 rounded-lg p-8 md:p-12 text-center">
          <Truck className="w-8 h-8 text-safety-orange mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Get the form matched to your lease
          </h2>
          <p className="text-industrial-300 max-w-2xl mx-auto mb-6">
            Bobtail or non-trucking, tractor only or with the trailer attached, three hundred thousand or
            a million — the lease answers most of it. Send it over and have the policy built around what
            the carrier actually requires.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-safety-orange text-industrial-900 px-8 py-4 rounded font-bold uppercase hover:bg-yellow-500 transition-colors"
          >
            Request a quote review <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-industrial-500 mt-4">
            Coverage and requirements are subject to policy wording, underwriting and state availability.
          </p>
        </section>
      </main>
    </div>
  );
}
