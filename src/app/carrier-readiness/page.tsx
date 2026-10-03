import Link from 'next/link';
import { ArrowRight, BadgeCheck, ClipboardCheck, FileCheck2, FileText, ShieldCheck, Truck } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';

export const metadata = {
  title: 'Carrier Readiness Center | Truck Coverage Experts',
  description: 'Prepare for trucking authority, insurance filings, broker approval, certificates, and a commercial truck insurance quote with practical step-by-step guidance.',
  alternates: { canonical: 'https://www.truckcoverageexperts.com/carrier-readiness' },
};

const situations = [
  { title: 'Starting a new trucking company', description: 'Understand the information, documents, authority status, equipment details, and coverage discussion points to prepare before you begin operating.', href: '/new-authority-insurance', label: 'New authority guide', icon: Truck },
  { title: 'Getting an insurance filing', description: 'Learn how BMC-91X, MCP-65, Form E, BOC-3, and related filings fit into the authority and operating process.', href: '/filings', label: 'Explore filings', icon: FileCheck2 },
  { title: 'Trying to get approved by a broker', description: 'Prepare the limits, cargo details, certificates, endorsements, and operating information a broker or shipper may request.', href: '/broker', label: 'Broker requirements', icon: BadgeCheck },
  { title: 'Choosing coverage for your equipment', description: 'Start with the way you haul—box truck, hot shot, auto transport, semi, or another commercial operation—and identify the details that affect review.', href: '/insurance', label: 'Browse equipment coverage', icon: ShieldCheck },
];

export default function CarrierReadinessPage() {
  return (
    <main className="min-h-screen bg-industrial-900 text-silver selection:bg-safety-orange selection:text-black">
      <SiteHeader statusLabel="Carrier readiness center" ctaLabel="Request a review" />
      <section className="border-b border-industrial-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-industrial-800 to-industrial-900 px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-5 max-w-2xl text-sm font-bold uppercase tracking-[0.2em] text-safety-orange">A practical starting point for carriers</p>
            <h1 className="max-w-4xl font-display text-5xl font-bold uppercase tracking-tight text-white md:text-7xl">Get ready before you request truck insurance.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-industrial-300 md:text-xl">The Carrier Readiness Center helps owner-operators and small fleets organize the next step—authority, filings, broker requirements, equipment, and quote preparation—in one place.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/trucking-insurance-readiness" className="inline-flex items-center justify-center gap-2 rounded-lg bg-safety-orange px-6 py-4 font-bold text-black transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-safety-orange focus:ring-offset-2 focus:ring-offset-industrial-900">Start the free readiness check <ArrowRight className="h-5 w-5" /></Link>
              <Link href="/quote" className="inline-flex items-center justify-center gap-2 rounded-lg border border-industrial-600 px-6 py-4 font-bold text-white transition hover:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-industrial-900">Request a quote review</Link>
            </div>
          </div>
          <div className="border border-industrial-700 bg-black/25 p-7 md:p-8">
            <div className="mb-6 flex items-center gap-3 border-b border-industrial-700 pb-5"><ClipboardCheck className="h-7 w-7 text-safety-orange" /><h2 className="text-xl font-bold text-white">What to have ready</h2></div>
            <ul className="space-y-4 text-sm leading-6 text-industrial-300">{['Equipment type, year, and value', 'Cargo and the lanes you plan to run', 'DOT/MC or authority status', 'Driver, vehicle, and loss-history information', 'Broker limits, certificates, or endorsements requested'].map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-safety-orange" />{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="border-b border-industrial-800 px-6 py-20"><div className="mx-auto max-w-6xl"><div className="mb-12 max-w-3xl"><h2 className="font-display text-4xl font-bold uppercase text-white md:text-5xl">Start with the problem in front of you.</h2><p className="mt-5 text-lg leading-8 text-industrial-300">You do not need to understand every insurance term before asking for help. Choose the situation that best matches what you are trying to do, then follow the relevant preparation path.</p></div><div className="divide-y divide-industrial-800 border-y border-industrial-800">{situations.map(({ title, description, href, label, icon: Icon }, index) => <div key={title} className="grid gap-6 py-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8"><div className="flex h-12 w-12 items-center justify-center rounded-lg border border-industrial-700 bg-industrial-800 text-safety-orange"><Icon className="h-6 w-6" /></div><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-industrial-500">0{index + 1}</p><h3 className="text-2xl font-bold text-white">{title}</h3><p className="mt-3 max-w-2xl leading-7 text-industrial-300">{description}</p></div><Link href={href} className="inline-flex items-center gap-2 font-bold text-safety-orange hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-safety-orange">{label} <ArrowRight className="h-4 w-4" /></Link></div>)}</div></div></section>

      <section className="bg-black/25 px-6 py-20"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center"><div><h2 className="font-display text-4xl font-bold uppercase text-white md:text-5xl">Turn scattered details into a useful next step.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-industrial-300">Our free readiness check gives you a practical preparation list based on your operation. It is educational guidance—not a promise of eligibility, a final quote, or a coverage determination.</p></div><div className="border border-safety-orange/40 bg-industrial-800 p-8"><FileText className="mb-5 h-8 w-8 text-safety-orange" /><h3 className="text-2xl font-bold text-white">Build your checklist</h3><p className="mt-3 leading-7 text-industrial-300">Answer a few questions, see what to prepare, and decide whether you want a quote review.</p><Link href="/trucking-insurance-readiness" className="mt-7 inline-flex items-center gap-2 font-bold text-safety-orange hover:text-orange-300">Open the readiness tool <ArrowRight className="h-4 w-4" /></Link></div></div></section>
    </main>
  );
}
