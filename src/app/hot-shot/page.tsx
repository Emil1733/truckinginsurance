import Link from 'next/link';
import { CDLCalculator } from '@/components/CDLCalculator';
import { Truck, CheckCircle2, FileText, Shield, ArrowRight } from 'lucide-react';
import { ReinstatementModal } from '@/components/ReinstatementModal';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata = {
  title: 'Hot Shot Trucking Insurance: Coverage, Cost & Requirements (2026)',
  description: 'Review hot shot trucking insurance coverage, cost factors, authority requirements, cargo protection, and quote preparation for pickup-and-trailer operations.',
  alternates: {
    canonical: '/hot-shot',
  },
};

const faqs = [
  ['What insurance does a hot shot trucking business need?', 'Many hot shot operators review commercial auto liability, motor truck cargo, and physical damage for the pickup and trailer. Trailer interchange, general liability, occupational accident, or workers compensation may also matter depending on the operation and contracts.'],
  ['How much does hot shot insurance cost?', 'Cost varies with the pickup and trailer, cargo, radius, driver history, authority age, prior coverage, claims, limits, and deductibles. New ventures can be evaluated differently from established carriers, so a generic average may not represent your operation.'],
  ['Do hot shot truckers need a CDL?', 'A CDL may depend on the actual and rated combination weight, configuration, and applicable rules. Insurance underwriting may still review driver experience and motor vehicle records even when a CDL is not required.'],
  ['What is needed for a hot shot insurance quote?', 'Prepare the driver list, vehicle and trailer details, cargo description, operating radius, authority status, loss history, and any broker or shipper requirements.'],
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

export default function HotShotPage() {
  return (
    <div className="min-h-screen bg-industrial-900 font-mono text-silver">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteHeader ctaLabel="Get insured" />

      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
           <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-orange-900/30 text-safety-orange text-xs font-bold mb-6 border border-orange-800 uppercase tracking-widest">
                <Truck className="w-4 h-4" /> REVOLUTIONIZING LOGISTICS
             </div>
             <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
               HOT SHOT TRUCKING <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-safety-orange to-yellow-500">INSURANCE GUIDE.</span>
             </h1>
             <p className="text-xl text-industrial-400 mb-8 max-w-lg">
               Review commercial insurance for pickup-and-trailer operations, including dually trucks,
               gooseneck trailers, local hauling, interstate freight, and new authorities. CDL
               requirements depend on the vehicle and combination, while insurance needs depend on
               your cargo, radius, drivers, contracts, and authority.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quote" className="bg-safety-orange text-black font-bold py-4 px-8 rounded flex items-center justify-center gap-2 hover:bg-orange-500 transition-colors">
                  REQUEST A QUOTE REVIEW <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#checklist" className="border border-industrial-600 text-white font-bold py-4 px-8 rounded flex items-center justify-center hover:bg-industrial-800 transition-colors">
                  VIEW CHECKLIST
                </Link>
             </div>
           </div>

            <div className="relative">
             <div className="absolute -inset-4 bg-safety-orange/20 blur-xl rounded-full opacity-50 pointer-events-none"></div>
             <CDLCalculator />
           </div>
        </div>

        {/* CHECKLIST SECTION */}
        <section id="checklist" className="mb-20">
           <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-industrial-800 flex-1"></div>
            <h2 className="text-2xl font-display text-white tracking-widest">THE HOT SHOT STARTUP CHECKLIST</h2>
            <div className="h-px bg-industrial-800 flex-1"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
             {[
               { icon: FileText, title: '1. Business setup', desc: 'Confirm your entity, vehicle ownership, operating model, cargo, and whether you will haul under your own authority or lease on.' },
               { icon: Truck, title: '2. DOT and MC status', desc: 'Check the current FMCSA authority process and avoid unofficial services that add unnecessary fees.' },
               { icon: Shield, title: '3. Coverage review', desc: 'Discuss commercial auto liability, cargo, physical damage, and any broker or shipper requirements with a licensed professional.' },
               { icon: CheckCircle2, title: '4. Documents and filings', desc: 'Prepare driver, vehicle, loss-run, cargo, and authority information. A BOC-3 is a process-agent filing, not insurance.' },
             ].map((step, i) => (
               <div key={i} className="bg-industrial-800 p-6 rounded border border-industrial-700 hover:border-blue-500 transition-colors group">
                  <step.icon className="w-10 h-10 text-industrial-600 mb-4 group-hover:text-blue-500 transition-colors" />
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-industrial-400">{step.desc}</p>
               </div>
             ))}
          </div>
        </section>

        <section className="mb-20 grid lg:grid-cols-2 gap-8">
          <div className="bg-industrial-800 border border-industrial-700 rounded p-8">
            <h2 className="text-3xl font-bold text-white mb-4">What hot shot insurance may include</h2>
            <p className="text-industrial-400 leading-relaxed mb-5">A hot shot policy is shaped by the operation, not just the pickup truck. Coverage to discuss may include:</p>
            <ul className="space-y-3 text-industrial-300">{['Primary commercial auto liability', 'Motor truck cargo coverage', 'Physical damage for the pickup and trailer', 'Trailer interchange or non-owned trailer coverage when applicable', 'General liability, occupational accident, or workers compensation where appropriate'].map(item => <li key={item} className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-safety-orange shrink-0" />{item}</li>)}</ul>
          </div>
          <div className="bg-industrial-800 border border-industrial-700 rounded p-8">
            <h2 className="text-3xl font-bold text-white mb-4">What affects hot shot insurance cost?</h2>
            <p className="text-industrial-400 leading-relaxed mb-5">Insurers commonly review the truck and trailer, operating radius, cargo, driver history, authority age, prior coverage, claims, limits, and deductibles. New ventures may be evaluated differently from established carriers.</p>
            <p className="text-industrial-400 leading-relaxed">There is no universal “cheap” rate. The fastest way to receive a useful review is to prepare your driver list, vehicle details, cargo description, radius, authority information, and loss history.</p>
          </div>
        </section>

        <section className="mb-20 border-t border-industrial-800 pt-12">
          <h2 className="text-3xl font-bold text-white mb-4">Hot shot trucking insurance resources</h2>
          <p className="text-industrial-400 max-w-3xl mb-6">Hot shot operators may need to review pickup or dually configuration, trailer type, operating radius, cargo, authority status, and state requirements. Use these related guides to plan the insurance conversation.</p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/hot-shot-insurance/texas" className="bg-industrial-800 border border-industrial-700 p-5 hover:border-safety-orange transition-colors">
              <span className="text-safety-orange font-bold">Texas hot shot insurance</span>
              <span className="block text-sm text-industrial-400 mt-2">State-specific starting points for Texas operators.</span>
            </Link>
            <Link href="/insurance/lowboy-rgn-heavy-haul-insurance" className="bg-industrial-800 border border-industrial-700 p-5 hover:border-safety-orange transition-colors">
              <span className="text-safety-orange font-bold">Heavy-haul coverage guide</span>
              <span className="block text-sm text-industrial-400 mt-2">Review specialized equipment and high-value cargo considerations.</span>
            </Link>
            <Link href="/trucking-insurance-readiness" className="bg-blue-950/40 border border-blue-800 p-5 hover:border-safety-orange transition-colors">
              <span className="text-safety-orange font-bold">Build your readiness checklist</span>
              <span className="block text-sm text-industrial-400 mt-2">Organize cargo, radius, authority, and document details before requesting a quote review.</span>
            </Link>
            <Link href="/filing/bmc91x-federal-filing-fmsca" className="bg-industrial-800 border border-industrial-700 p-5 hover:border-safety-orange transition-colors">
              <span className="text-safety-orange font-bold">Federal filing guide</span>
              <span className="block text-sm text-industrial-400 mt-2">Understand the insurance filing topic before applying for authority.</span>
            </Link>
          </div>
        </section>

        <section className="mb-20 border-t border-industrial-800 pt-12">
          <h2 className="text-3xl font-bold text-white mb-6">Hot shot insurance questions</h2>
          <div className="space-y-3">
            {faqs.map(([question, answer]) => (
              <details key={question} className="border-b border-industrial-800 py-5">
                <summary className="cursor-pointer text-lg font-bold text-white">{question}</summary>
                <p className="text-industrial-400 leading-relaxed mt-3">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FAQ / REINSTATEMENT CTA */}
        <div className="bg-black/40 rounded-2xl p-8 md:p-12 border border-industrial-800 text-center">
           <h2 className="text-3xl font-bold text-white mb-4">ALREADY DENIED COVERAGE?</h2>
           <p className="text-industrial-400 max-w-2xl mx-auto mb-8">
             New ventures can be harder to place with some markets. 
             If you bought a truck before getting a quote, you might be panicking. 
             We write New Ventures every single day.
           </p>
           <ReinstatementModal>
             <button className="text-safety-orange font-bold uppercase tracking-widest hover:text-white transition-colors border-b border-safety-orange hover:border-white pb-1">
               Download the New Authority Survival Guide
             </button>
           </ReinstatementModal>
        </div>

      </main>
    </div>
  );
}
