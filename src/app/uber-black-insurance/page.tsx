import Link from 'next/link';
import { CarFront, ShieldCheck, FileText, MapPin, AlertTriangle, ArrowRight } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import { Footer } from '@/components/Footer';
import { UBER_BLACK_STATES } from '@/lib/data/uber-black-states';

export const metadata = {
  title: 'Uber Black Insurance: State Requirements & Limits (2026)',
  description:
    'What Uber Black and black-car operators need to carry, how the state regulator and the platform requirement differ, and the liability minimums by market.',
  alternates: {
    canonical: '/uber-black-insurance',
  },
};

const faqs = [
  [
    'Does the Uber app insurance cover a black-car operator?',
    'The platform policy applies in defined phases, usually from accepting a trip through drop-off, and the cover and limits differ between phases. It is not a substitute for the operator policy that satisfies the state regulator, and most markets require proof of that policy before a vehicle is approved.',
  ],
  [
    'Why do the state minimum and the Uber requirement differ?',
    'They are two different obligations. The state regulator sets the minimum for a for-hire passenger vehicle and issues the authority. The platform sets its own requirement on top, which is often higher, and can change without notice. A policy has to satisfy both.',
  ],
  [
    'What is a TCP licence in California?',
    'It is the charter-party carrier permit issued by the CPUC for passenger-carrying operations. Operating for hire without it is an enforcement issue independent of insurance, and coverage questions follow the authority question.',
  ],
  [
    'Can a black-car operator insure a personal vehicle?',
    'It can be written, but a personal auto policy generally excludes for-hire use. The exposure is the gap between what the vehicle is rated for and what it is actually doing, which is why the for-hire policy and the state authority have to match the operation.',
  ],
  [
    'What documents are needed for a quote?',
    'The authority or permit number, the entity and garaging address, the vehicle list with VINs and stated values, the driver list with licence details, the markets and airports served, prior coverage and loss history, and the platform or contract insurance requirement in writing.',
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

export default function UberBlackInsurancePage() {
  return (
    <div className="min-h-screen bg-industrial-900 font-mono text-silver">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteHeader ctaLabel="Request a review" statusLabel="Rideshare and black car coverage" />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-green-900/30 text-green-500 text-xs font-bold mb-6 border border-green-800 uppercase tracking-widest">
            <CarFront className="w-4 h-4" /> PASSENGER FOR HIRE
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            UBER BLACK INSURANCE BY STATE
          </h1>
          <p className="text-lg text-industrial-400">
            Black-car and livery work sits between two rulebooks: the state regulator that issues the
            authority, and the platform that sets its own coverage requirement on top. The limits below
            are the state minimums the operator policy has to meet — check the platform requirement
            separately, because it is usually higher.
          </p>
        </header>

        <section className="mb-12 overflow-x-auto">
          <h2 className="text-2xl font-display font-bold text-white mb-4">State limits and regulators</h2>
          <table className="w-full text-sm border border-industrial-700">
            <thead className="bg-industrial-800 text-industrial-300">
              <tr>
                <th className="text-left px-4 py-3 font-bold">State</th>
                <th className="text-left px-4 py-3 font-bold">Regulator</th>
                <th className="text-left px-4 py-3 font-bold">Liability minimum</th>
                <th className="text-left px-4 py-3 font-bold">Guide</th>
              </tr>
            </thead>
            <tbody>
              {UBER_BLACK_STATES.map((state) => (
                <tr key={state.slug} className="border-t border-industrial-800">
                  <td className="px-4 py-3 text-white">{state.name}</td>
                  <td className="px-4 py-3 text-industrial-400">{state.agency}</td>
                  <td className="px-4 py-3 text-industrial-300">{state.liability}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/uber-black-insurance/${state.slug}`}
                      className="text-safety-orange hover:underline"
                    >
                      {state.name} guide
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-industrial-500 mt-3">
            Minimums and regulator names change. Confirm the current figures with the state authority and
            the platform before relying on them.
          </p>
        </section>

        <section className="mb-12 grid md:grid-cols-2 gap-6">
          <div className="bg-industrial-800 border border-industrial-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-5 h-5 text-safety-orange" />
              <h3 className="font-bold text-white">What the policy usually has to show</h3>
            </div>
            <ul className="space-y-2 text-sm text-industrial-400">
              <li>For-hire authority or permit for the operation, not a personal-use rating</li>
              <li>Liability at or above the state minimum and the platform requirement</li>
              <li>Medical payments or PIP where the state requires it</li>
              <li>Physical damage on vehicles that are usually high-value</li>
              <li>Named drivers, because the platform requirement follows the driver</li>
            </ul>
          </div>
          <div className="bg-industrial-800 border border-industrial-700 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-safety-orange" />
              <h3 className="font-bold text-white">Where operators get caught</h3>
            </div>
            <ul className="space-y-2 text-sm text-industrial-400">
              <li>Personal auto policy on a vehicle doing for-hire work</li>
              <li>State minimum met but the platform requirement not met</li>
              <li>Driver added to the app but not to the policy</li>
              <li>Airport or city permits that require their own certificate</li>
              <li>Entity named on the authority but not on the policy</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-safety-orange" />
            <h2 className="text-2xl font-display font-bold text-white">Start from the market you operate in</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {UBER_BLACK_STATES.map((state) => (
              <Link
                key={state.slug}
                href={`/uber-black-insurance/${state.slug}`}
                className="bg-industrial-800 border border-industrial-700 rounded px-4 py-3 text-sm text-silver hover:border-safety-orange transition-colors text-center"
              >
                {state.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-display font-bold text-white mb-4">Questions</h2>
          <div className="space-y-4">
            {faqs.map(([question, answer]) => (
              <div key={question} className="bg-industrial-800 border border-industrial-700 rounded-lg p-6">
                <h3 className="font-bold text-white mb-2">{question}</h3>
                <p className="text-sm text-industrial-400">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-orange-900/40 to-industrial-800 border border-orange-800 rounded-lg p-8 md:p-12 text-center">
          <FileText className="w-8 h-8 text-safety-orange mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-white mb-4">
            Have the authority and the vehicle list ready?
          </h2>
          <p className="text-industrial-300 max-w-2xl mx-auto mb-6">
            A licensed insurance professional can review the permit, the vehicles and the platform
            requirement together, and confirm what the current policy does and does not cover.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-safety-orange text-industrial-900 px-8 py-4 rounded font-bold uppercase hover:bg-yellow-500 transition-colors"
          >
            Request a quote review <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
