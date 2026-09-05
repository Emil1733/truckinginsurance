import Link from 'next/link';
import { ArrowRight, BadgeDollarSign, CheckCircle2, Truck } from 'lucide-react';

export const metadata = {
  title: 'Car Hauler Insurance Cost: What Affects Your Premium',
  description: 'Learn what affects car hauler and auto transport insurance cost, including equipment, vehicle values, routes, drivers, cargo limits, and loss history.',
  alternates: { canonical: '/insurance/car-hauler-insurance-cost' },
};

const factors = [
  ['Open or enclosed equipment', 'Enclosed carriers may transport higher-value vehicles, while open carriers have different loading, exposure, and capacity considerations.'],
  ['Vehicles in transit', 'The number and value of customer vehicles, cargo limits, and the coverage form used for vehicle-in-transit claims matter.'],
  ['Operating radius', 'Local, regional, and interstate routes can create different underwriting and filing questions.'],
  ['Drivers and experience', 'Driving history, experience with vehicle loading, hiring standards, and the number of drivers can affect review.'],
  ['Authority and contracts', 'New-authority status and broker or shipper requirements may affect requested limits and eligibility.'],
  ['Loss runs and deductibles', 'Prior claims, loss history, selected limits, and deductibles are commonly considered when pricing coverage.'],
];

export default function CarHaulerInsuranceCostPage() {
  return (
    <main className="min-h-screen bg-industrial-900 text-silver font-mono">
      <nav className="border-b border-industrial-800 bg-industrial-900/90 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter text-white">TRUCK COVERAGE EXPERTS</Link>
          <Link href="/quote" className="text-xs font-bold bg-yellow-400 text-black px-4 py-2 rounded">REQUEST A REVIEW</Link>
        </div>
      </nav>
      <section className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-400/10 text-yellow-400 text-xs font-bold border border-yellow-400/20 mb-6 uppercase tracking-widest"><Truck className="w-4 h-4" /> AUTO TRANSPORT INSURANCE GUIDE</div>
        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[0.95] mb-6">Car Hauler Insurance Cost</h1>
        <p className="text-xl text-industrial-400 max-w-3xl leading-relaxed">There is no single price for car hauler insurance. Auto transport premiums depend on the vehicles you move, your carrier and trailer, routes, drivers, authority status, claims history, and the limits required by customers or brokers.</p>
        <div className="mt-10 grid sm:grid-cols-3 gap-4">{['Equipment and vehicle values', 'Routes and operating radius', 'Drivers, claims, and limits'].map((label) => <div key={label} className="bg-industrial-800 border border-industrial-700 p-5 rounded"><BadgeDollarSign className="w-5 h-5 text-yellow-400 mb-3" /><p className="text-white font-bold">{label}</p></div>)}</div>
      </section>
      <section className="max-w-5xl mx-auto px-6 pb-16"><h2 className="text-3xl font-bold text-white mb-6">What affects auto hauler insurance cost?</h2><div className="grid md:grid-cols-2 gap-4">{factors.map(([title, body]) => <div key={title} className="bg-industrial-800 border border-industrial-700 p-6 rounded"><h3 className="text-white font-bold mb-2">{title}</h3><p className="text-industrial-400 leading-relaxed">{body}</p></div>)}</div></section>
      <section className="max-w-5xl mx-auto px-6 pb-16 grid lg:grid-cols-2 gap-12"><div><h2 className="text-3xl font-bold text-white mb-4">Prepare for a quote review</h2><ul className="space-y-4 text-industrial-400">{['List each tractor, trailer, and equipment value.', 'Describe open or enclosed hauling and the vehicles transported.', 'Prepare driver information, loss runs, routes, and authority details.', 'Collect broker or shipper limits and certificate instructions.'].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />{item}</li>)}</ul></div><div className="bg-yellow-400 text-black p-8 rounded"><h2 className="text-2xl font-bold mb-3">Need a car hauler quote review?</h2><p className="mb-6">Submit your operation details for review by a licensed insurance professional. Coverage, limits, pricing, and availability depend on underwriting.</p><Link href="/quote" className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded font-bold uppercase">Request a review <ArrowRight className="w-4 h-4" /></Link></div></section>
      <section className="max-w-5xl mx-auto px-6 pb-24 border-t border-industrial-800 pt-12"><h2 className="text-3xl font-bold text-white mb-5">Related car hauler resources</h2><div className="flex flex-wrap gap-3"><Link href="/insurance/auto-hauler-car-carrier-insurance" className="border border-industrial-700 px-4 py-3 rounded hover:border-yellow-400">Car hauler coverage guide</Link><Link href="/insurance/car-hauler-insurance-requirements" className="border border-industrial-700 px-4 py-3 rounded hover:border-yellow-400">Car hauler requirements</Link><Link href="/filing/bmc91x-federal-filing-fmsca" className="border border-industrial-700 px-4 py-3 rounded hover:border-yellow-400">BMC-91X filing guide</Link></div></section>
    </main>
  );
}
