import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, ShieldCheck, Truck } from 'lucide-react';

export const metadata = {
  title: 'Car Hauler Insurance Requirements: Liability, Cargo and Filings',
  description: 'Understand car hauler insurance requirements for auto transport businesses, including liability, vehicle-in-transit cargo, physical damage, broker limits, and federal filings.',
  alternates: { canonical: '/insurance/car-hauler-insurance-requirements' },
};

const requirements = [
  ['Primary auto liability', 'Review the liability limit required for your authority, routes, vehicle configuration, and broker or shipper contracts.'],
  ['Vehicle-in-transit cargo', 'Confirm that the coverage form addresses the customer vehicles you transport, including loading, unloading, custody, and damage conditions.'],
  ['Physical damage', 'Discuss coverage for the tractor, car carrier, and attached equipment based on their value and use.'],
  ['Operating authority filings', 'Interstate carriers may need federal insurance filings. Confirm the appropriate filing and effective date for your authority.'],
  ['Broker and shipper requirements', 'A broker may request specific liability, cargo, certificate-holder, additional-insured, or endorsement terms.'],
  ['State and local rules', 'Intrastate requirements and permits can differ by state. Confirm the rules that apply to your home state and routes.'],
];

export default function CarHaulerInsuranceRequirementsPage() {
  return (
    <main className="min-h-screen bg-industrial-900 text-silver font-mono">
      <nav className="border-b border-industrial-800 bg-industrial-900/90 sticky top-0 z-50"><div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"><Link href="/" className="text-xl font-bold tracking-tighter text-white">TRUCK COVERAGE EXPERTS</Link><Link href="/quote" className="text-xs font-bold bg-yellow-400 text-black px-4 py-2 rounded">REQUEST A REVIEW</Link></div></nav>
      <section className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-400/10 text-yellow-400 text-xs font-bold border border-yellow-400/20 mb-6 uppercase tracking-widest"><Truck className="w-4 h-4" /> AUTO TRANSPORT COMPLIANCE GUIDE</div>
        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[0.95] mb-6">Car Hauler Insurance Requirements</h1>
        <p className="text-xl text-industrial-400 max-w-3xl leading-relaxed">Car hauler requirements depend on whether you operate interstate or intrastate, your equipment and cargo, your authority status, and the contracts you accept. Use this guide to organize your review before requesting a quote.</p>
      </section>
      <section className="max-w-5xl mx-auto px-6 pb-16"><h2 className="text-3xl font-bold text-white mb-6">Common auto transport insurance requirements</h2><div className="grid md:grid-cols-2 gap-4">{requirements.map(([title, body]) => <div key={title} className="bg-industrial-800 border border-industrial-700 p-6 rounded"><h3 className="text-white font-bold mb-2">{title}</h3><p className="text-industrial-400 leading-relaxed">{body}</p></div>)}</div></section>
      <section className="max-w-5xl mx-auto px-6 pb-16 grid lg:grid-cols-2 gap-12"><div><h2 className="text-3xl font-bold text-white mb-4">Documents to prepare</h2><ul className="space-y-4 text-industrial-400">{['DOT and MC authority information', 'Vehicle and trailer schedule', 'Cargo type and approximate vehicle values', 'Driver information and loss runs', 'Broker or shipper insurance instructions'].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />{item}</li>)}</ul></div><div className="bg-industrial-800 border border-industrial-700 p-8 rounded"><FileText className="w-8 h-8 text-yellow-400 mb-4" /><h2 className="text-2xl font-bold text-white mb-3">Federal filing resource</h2><p className="text-industrial-400 mb-6">Review the BMC-91X filing topic, then confirm the filing and limits that apply to your operation with a licensed professional.</p><Link href="/filing/bmc91x-federal-filing-fmsca" className="inline-flex items-center gap-2 text-yellow-400 font-bold">Open filing guide <ArrowRight className="w-4 h-4" /></Link></div></section>
      <section className="max-w-5xl mx-auto px-6 pb-24 border-t border-industrial-800 pt-12"><h2 className="text-3xl font-bold text-white mb-5">Continue your car hauler review</h2><div className="flex flex-wrap gap-3"><Link href="/insurance/auto-hauler-car-carrier-insurance" className="border border-industrial-700 px-4 py-3 rounded hover:border-yellow-400"><ShieldCheck className="inline w-4 h-4 mr-2" />Coverage guide</Link><Link href="/insurance/car-hauler-insurance-cost" className="border border-industrial-700 px-4 py-3 rounded hover:border-yellow-400">Insurance cost factors</Link><Link href="/quote" className="bg-yellow-400 text-black font-bold px-4 py-3 rounded">Request a quote review</Link></div></section>
    </main>
  );
}
