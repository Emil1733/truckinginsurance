import Link from 'next/link';
import { ShieldCheck, AlertTriangle, FileText, ArrowRight, CheckCircle2, Truck } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Non-Trucking Liability Insurance: What It Covers and When It Fails',
  description:
    'Non-trucking liability covers a leased owner-operator off dispatch. What it excludes, why the lease requires it, where deadheading falls, and how it differs from bobtail.',
  alternates: {
    canonical: '/non-trucking-liability-insurance',
  },
};

const faqs = [
  [
    'Is non-trucking liability insurance required by law?',
    'Not by name. The federal leasing rule at 49 CFR 376.12(j) requires the lease to state who is responsible for insurance beyond the carrier\'s own legal obligation, and it names bobtail coverage as the example. In practice the requirement comes from the lease or the motor carrier, not from a statute that says every owner-operator must carry NTL. That is why the lease, not a state filing, is the document that decides whether you need it.',
  ],
  [
    'Does NTL cover me while I am under dispatch?',
    'No, and this is the mistake that costs people the most. A non-trucking form excludes use in the business of the carrier you are leased to, loaded or empty. If you are running to a pickup at the carrier\'s direction, the carrier\'s primary liability is supposed to respond. If you bought NTL and assumed it covered those miles, you have paid for a policy that will not answer.',
  ],
  [
    'What is the deadhead gray zone?',
    'Driving empty is not one situation. Deadheading to a load at the carrier\'s direction is business use and the carrier\'s policy should respond. Driving home after you have been released, or taking the tractor to a shop the carrier did not send you to, sits closer to personal use and is where NTL is meant to apply. The facts of the trip and the wording of the form decide it, which is why dispatch records matter after a crash.',
  ],
  [
    'Does non-trucking liability cover the trailer or the freight?',
    'Neither. NTL is liability coverage for injury and property damage you cause to other people. Cargo in your care needs motor truck cargo coverage, potentially through the carrier, and the trailer is a separate physical damage question. A policy sold as non-trucking liability is not a substitute for either.',
  ],
  [
    'I run under my own authority. Do I need NTL?',
    'Usually not. If the truck operates under your own MC number, your primary commercial auto liability covers the tractor whether it is loaded, empty or parked at home, because there is no carrier whose business your personal trip falls outside of. NTL exists to fill a gap created by leasing on. Running your own authority generally creates a different set of gaps, starting with cargo and physical damage.',
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

const scenarios = [
  ['Loaded trailer, assigned load', 'Carrier\'s primary liability', 'Excluded', 'Excluded'],
  ['Empty, running to a pickup at the carrier\'s direction', 'Carrier\'s primary liability', 'Usually excluded (business use)', 'Usually not covered (trailer attached)'],
  ['Tractor only, driving home after release', 'Usually not responding', 'Covered if personal', 'Usually covered'],
  ['Empty trailer attached, personal trip', 'Usually not responding', 'Often covered (no business use)', 'Often not covered (trailer attached)'],
  ['Personal errand in the tractor', 'No', 'Covered', 'Covered'],
  ['Hauling for anyone else', 'No', 'Excluded', 'Excluded'],
];

export default function NonTruckingLiabilityPage() {
  return (
    <div className="min-h-screen bg-industrial-900 font-mono text-silver">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteHeader ctaLabel="Request a review" statusLabel="Leased owner-operator coverage" />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-900/30 text-safety-orange text-xs font-bold mb-6 border border-orange-800 uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> OFF-DISPATCH LIABILITY
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              NON-TRUCKING LIABILITY INSURANCE
            </h1>
            <p className="text-xl text-industrial-400 mb-6">
              When you lease your truck to a carrier, its policy covers the truck while it is working for
              the carrier. It does not cover you driving home, running an errand, or moving the tractor on
              a day off. That gap is what non-trucking liability fills — and the exclusion that decides
              whether a claim gets paid is about <em>why</em> you were driving, not whether a trailer was
              attached.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-safety-orange text-industrial-900 px-6 py-3 rounded font-bold uppercase text-sm hover:bg-yellow-500 transition-colors"
              >
                Request a quote review <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/bobtail-insurance"
                className="inline-flex items-center gap-2 border border-industrial-700 px-6 py-3 rounded font-bold uppercase text-sm text-silver hover:border-safety-orange hover:text-safety-orange transition-colors"
              >
                Compare with bobtail
              </Link>
            </div>
          </div>

          <div className="bg-industrial-800 border border-industrial-700 rounded-lg p-7">
            <h2 className="text-sm font-bold text-safety-orange uppercase tracking-widest mb-4">
              What it will not do
            </h2>
            <ul className="space-y-3 text-sm text-industrial-300">
              {[
                'Cover you under dispatch, loaded or empty',
                'Cover freight in your care',
                'Repair or replace your tractor',
                'Pay for your own injuries',
                'Stand in for your own primary liability',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <AlertTriangle className="w-4 h-4 text-safety-orange flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-industrial-500 mt-5">
              A policy described as bobtail may be written on a different form and respond differently.
              The form, not the label, is what you are buying.
            </p>
          </div>
        </div>

        {/* THE TEST */}
        <section className="mb-16 max-w-3xl">
          <h2 className="text-3xl font-display font-bold text-white mb-4">The test is purpose, not trailer</h2>
          <p className="text-industrial-400 leading-relaxed mb-4">
            Non-trucking liability is usually written as a business auto policy with the non-trucking use
            endorsement attached. That endorsement excludes a covered truck while it is used to carry
            property in any business, and while it is used in the business of the person or company you
            leased it to. Both halves matter. The first rules out hauling anything for anyone. The second
            rules out the miles you run because your carrier told you to.
          </p>
          <p className="text-industrial-400 leading-relaxed mb-4">
            That is why the same truck can be covered at 7pm and uninsured at 7am. If you were heading to
            a pickup the carrier assigned, the carrier&apos;s policy is the one that should respond, and NTL
            excludes it. If you were driving home after being released, NTL is exactly what was built for
            that trip. Nothing about the physical truck changed; the business purpose did.
          </p>
          <p className="text-industrial-400 leading-relaxed">
            Read the definitions of &ldquo;business use&rdquo; and &ldquo;dispatch&rdquo; in the actual form before you buy,
            because two policies with the same name can answer that question differently.
          </p>
        </section>

        {/* SCENARIOS */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold text-white mb-2">Which policy responds, by trip</h2>
          <p className="text-industrial-500 text-sm mb-5">
            General guidance only — the facts of the trip and the wording of both policies decide.
          </p>
          <div className="overflow-x-auto border border-industrial-700 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-industrial-800 text-industrial-300">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Situation</th>
                  <th className="text-left px-4 py-3 font-bold">Carrier&apos;s primary</th>
                  <th className="text-left px-4 py-3 font-bold">Non-trucking liability</th>
                  <th className="text-left px-4 py-3 font-bold">Bobtail form</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((row) => (
                  <tr key={row[0]} className="border-t border-industrial-800">
                    <td className="px-4 py-3 text-industrial-200">{row[0]}</td>
                    <td className="px-4 py-3 text-industrial-400">{row[1]}</td>
                    <td className="px-4 py-3 text-industrial-400">{row[2]}</td>
                    <td className="px-4 py-3 text-industrial-400">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-industrial-500 mt-4">
            <Link href="/bobtail-insurance" className="underline hover:text-safety-orange">
              Bobtail is a different trigger
            </Link>{' '}
            — configuration rather than purpose. Most policies sold as bobtail are actually non-trucking
            forms, so the two pages are worth reading together.
          </p>
        </section>

        {/* LEASE */}
        <section className="mb-16 bg-industrial-800 border border-industrial-700 rounded-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-safety-orange" />
            <h2 className="text-2xl font-display font-bold text-white">Why your lease mentions it</h2>
          </div>
          <p className="text-industrial-300 leading-relaxed mb-4">
            The federal leasing rules require the lease to spell out who provides insurance beyond the
            carrier&apos;s own legal obligation, and they name bobtail coverage as the example. The same
            provision covers what the carrier may charge back if it supplies the coverage for you. That is
            why the lease usually states a required limit and asks for the carrier to be named on the
            certificate.
          </p>
          <p className="text-industrial-300 leading-relaxed mb-4">
            It also means the requirement is contractual rather than statutory. Nothing in federal law
            says an owner-operator must buy non-trucking liability by name — the lease does. A carrier
            that requires it can also decline a certificate that does not match its wording, which is why
            sending the agent the insurance page of the lease is faster than guessing at the limit.
          </p>
          <p className="text-industrial-300 leading-relaxed">
            One more thing worth knowing: some states will not accept a non-trucking or bobtail policy as
            proof of insurance for registration or apportioned plates, because the form excludes the very
            use the state is asking about. If you are plating the truck yourself, check that before you
            rely on the NTL certificate.
          </p>
        </section>

        {/* LIMITS */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold text-white mb-4">Limits, and what drives the price</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="border border-industrial-700 rounded-lg p-6">
              <h3 className="font-bold text-white mb-3">The limit</h3>
              <p className="text-industrial-400 mb-3">
                There is no statutory figure to quote here, because this coverage is not a filing. The
                number comes from your lease, your lender or the carrier. Many leases ask for
                $1,000,000; some ask for $300,000 or $500,000, and some only require that the carrier be
                named as certificate holder. Read the lease and buy the number it names, not the cheapest
                number available.
              </p>
              <p className="text-industrial-400">
                A higher limit costs very little on this form because the exposure is limited to off-duty
                use. Buying the lease minimum when the lease actually asks for a million is a false
                economy that surfaces at the first serious claim.
              </p>
            </div>
            <div className="border border-industrial-700 rounded-lg p-6">
              <h3 className="font-bold text-white mb-3">What moves the premium</h3>
              <ul className="space-y-2 text-industrial-400">
                <li>The limit you choose, which is the biggest single input</li>
                <li>Whether the form covers personal use with a trailer attached</li>
                <li>Territory and how the tractor is parked when it is not working</li>
                <li>Driving record and years of experience</li>
                <li>Whether the carrier requires additional insured status</li>
                <li>The value of the tractor — not for the liability, but because physical damage is usually quoted alongside it</li>
              </ul>
            </div>
          </div>
        </section>

        {/* MISTAKES */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-safety-orange" />
            <h2 className="text-2xl font-display font-bold text-white">The five mistakes that show up in claims</h2>
          </div>
          <div className="space-y-4">
            {[
              ['Assuming it covers dispatch miles', 'The most expensive misunderstanding on this page. NTL excludes business use, so the miles to your next pickup belong to the carrier\'s policy.'],
              ['Thinking the trailer is covered', 'The trailer is a separate physical damage item, and freight is cargo coverage. Neither is inside a liability form.'],
              ['Buying the wrong limit for the lease', 'A certificate that does not match the lease is a compliance failure even if the policy is otherwise fine.'],
              ['Letting the policy lapse between leases', 'The gap is not just the premium. A lapse in coverage follows you into the next quote at exactly the moment you are least attractive to an underwriter.'],
              ['Confusing it with primary liability', 'NTL cannot be filed with FMCSA or used to activate authority. It is a personal-use layer, not an operating credential.'],
            ].map(([title, body]) => (
              <div key={title} className="flex gap-3 border-b border-industrial-800 pb-3">
                <CheckCircle2 className="w-5 h-5 text-safety-orange flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">{title}</div>
                  <p className="text-sm text-industrial-400">{body}</p>
                </div>
              </div>
            ))}
          </div>
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
                49 CFR 376.12, lease requirements including insurance responsibility
              </a>
            </li>
            <li>
              <a href="https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387" target="_blank" rel="noopener noreferrer nofollow" className="text-safety-orange hover:underline">
                49 CFR Part 387, minimum levels of financial responsibility
              </a>
            </li>
          </ul>
        </section>

        <section className="bg-gradient-to-r from-orange-900/40 to-industrial-800 border border-orange-800 rounded-lg p-8 md:p-12 text-center">
          <Truck className="w-8 h-8 text-safety-orange mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Send the lease page, get the right form
          </h2>
          <p className="text-industrial-300 max-w-2xl mx-auto mb-6">
            The fastest way to buy the wrong policy is to ask for &ldquo;bobtail&rdquo; without saying what the
            carrier requires. Send the insurance section of your lease and a licensed professional can
            match the form to it.
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
      <Footer />
    </div>
  );
}
