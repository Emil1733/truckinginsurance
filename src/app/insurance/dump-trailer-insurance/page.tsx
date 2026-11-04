import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata = {
  title: 'Dump Trailer Insurance: Coverage, Cost and Requirements',
  description: 'Understand dump trailer insurance for end dumps, bottom dumps and belly dumps, including liability, cargo, physical damage, rollover, unloading and jobsite questions.',
  alternates: { canonical: '/insurance/dump-trailer-insurance' },
};

const coverageQuestions = [
  ['Primary auto liability', 'Review the liability limit for the truck and operation, including the routes, vehicles and work you actually perform.'],
  ['Physical damage', 'Discuss the tractor, trailer, hydraulic equipment and attached accessories. A dump trailer can have more than the road-going value to insure.'],
  ['Cargo and material hauled', 'Tell the reviewer whether you haul aggregate, asphalt, dirt, sand, debris, construction material or another commodity. Cargo terms can differ.'],
  ['Loading and unloading', 'The loss may happen at the pit, plant, jobsite or dump site rather than on the highway. Ask how unloading and tipping operations are treated.'],
  ['Off-road and jobsite work', 'If the truck leaves public roads, operates on construction sites or works around customers’ property, disclose that activity before comparing policies.'],
  ['Rollover and overturn exposure', 'Uneven ground, a raised body, shifting material and hurried unloading can create a different risk than ordinary dry freight hauling.'],
];

const quoteDetails = [
  'End dump, bottom dump or belly dump equipment, including make, model and year',
  'The materials you haul and the typical weight or value of each load',
  'Where you load and unload, including pits, plants, farms, roads and construction sites',
  'Operating radius, states traveled and whether you work interstate or intrastate',
  'Driver information, prior insurance, claims history and loss runs',
  'Any broker, contractor, municipality or shipper certificate and limit requirements',
];

export default function DumpTrailerInsurancePage() {
  return (
    <main className="min-h-screen bg-industrial-900 text-silver font-mono">
      <SiteHeader ctaLabel="Request a review" statusLabel="Dump operations guide" />

      <section className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-400/10 text-yellow-400 text-xs font-bold border border-yellow-400/20 mb-6 uppercase tracking-widest">
          <Truck className="w-4 h-4" /> DUMP TRAILER INSURANCE GUIDE
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[0.95] mb-6">Dump Trailer Insurance</h1>
        <p className="text-xl text-industrial-400 max-w-3xl leading-relaxed">Dump trailer insurance is not just a standard truck policy with a different trailer attached. The material, dump site, raised-body operation, equipment and time spent off public roads all affect the questions an underwriter will ask.</p>
        <div className="mt-10 bg-industrial-800 border border-industrial-700 rounded p-6 max-w-3xl">
          <p className="text-white leading-relaxed"><span className="text-yellow-400 font-bold">Start with the work.</span> An end dump hauling aggregate has a different operating profile from a belly dump serving an asphalt crew or a bottom dump working around a construction site. Describe the actual operation before choosing limits.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-white mb-6">What dump trailer insurance should address</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {coverageQuestions.map(([title, body]) => (
            <div key={title} className="bg-industrial-800 border border-industrial-700 p-6 rounded">
              <h3 className="text-white font-bold mb-2">{title}</h3>
              <p className="text-industrial-400 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">End dump, bottom dump or belly dump?</h2>
          <p className="text-industrial-400 leading-relaxed mb-4">The trailer type changes how the work is performed. End dumps raise the body and may face tip-over or hydraulic concerns. Bottom and belly dumps release material differently and may spend more time around paving, aggregate or construction operations.</p>
          <p className="text-industrial-400 leading-relaxed">Do not describe the operation only as “dump trucking.” Tell the reviewer what you haul, where you load, where you unload, whether you enter jobsites, and whether the equipment is used for anything besides hauling.</p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link href="/insurance/end-dump-trailer-insurance" className="border border-industrial-700 px-4 py-3 rounded hover:border-yellow-400">End dump coverage guide</Link>
            <Link href="/insurance/bottom-dump-trailer-insurance" className="border border-industrial-700 px-4 py-3 rounded hover:border-yellow-400">Bottom dump coverage guide</Link>
          </div>
        </div>
        <div className="bg-industrial-800 border border-industrial-700 p-7 rounded">
          <h2 className="text-3xl font-bold text-white mb-4">What affects the cost?</h2>
          <p className="text-industrial-400 leading-relaxed">There is no dependable single price for dump trailer insurance. Premium and eligibility may reflect equipment value, truck and trailer count, material hauled, radius, driver history, claims, limits, deductibles, off-road work and the frequency of loading or unloading.</p>
          <p className="text-industrial-400 leading-relaxed mt-4">A quote review is more useful when the information matches the contracts and jobs you accept. Omitting jobsite or unloading activity can create a coverage question later.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Prepare these details</h2>
          <ul className="space-y-4 text-industrial-400">
            {quoteDetails.map((item) => (
              <li key={item} className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /><span>{item}</span></li>
            ))}
          </ul>
        </div>
        <div className="bg-yellow-400 text-black p-8 rounded">
          <ShieldCheck className="w-8 h-8 mb-4" />
          <h2 className="text-2xl font-bold mb-3">Not sure what applies to your operation?</h2>
          <p className="mb-6">Use the readiness checklist to organize your equipment, authority, cargo and operating details before requesting a quote review.</p>
          <Link href="/trucking-insurance-readiness?problem=coverage" className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded font-bold uppercase">Build my checklist <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24 border-t border-industrial-800 pt-12">
        <h2 className="text-3xl font-bold text-white mb-5">Related dump-trailer resources</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/insurance/end-dump-trailer-insurance" className="border border-industrial-700 px-4 py-3 rounded hover:border-yellow-400">End dump insurance</Link>
          <Link href="/insurance/bottom-dump-trailer-insurance" className="border border-industrial-700 px-4 py-3 rounded hover:border-yellow-400">Bottom dump insurance</Link>
          <Link href="/insurance" className="border border-industrial-700 px-4 py-3 rounded hover:border-yellow-400">All equipment coverage guides</Link>
          <Link href="/trucking-insurance-readiness?problem=coverage" className="border border-yellow-400 text-yellow-400 px-4 py-3 rounded hover:bg-yellow-400 hover:text-black">Use the readiness checklist</Link>
        </div>
      </section>
    </main>
  );
}
