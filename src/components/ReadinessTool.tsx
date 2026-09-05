'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ClipboardCheck } from 'lucide-react';

const options = {
  equipment: ['Box truck', 'Hot shot pickup and trailer', 'Car hauler / auto transport', 'Semi tractor-trailer', 'Other commercial truck'],
  authority: ['New authority / startup', 'Already operating', 'Leasing onto another carrier'],
  cargo: ['General freight', 'Vehicles', 'Household goods', 'Construction or equipment', 'Other or mixed cargo'],
};

export default function ReadinessTool() {
  const [result, setResult] = useState<{ equipment: string; authority: string; cargo: string; radius: string } | null>(null);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
    setResult({ equipment: values.equipment, authority: values.authority, cargo: values.cargo, radius: values.radius });
  }
  if (result) return <ReadinessCapture result={result} onReset={() => setResult(null)} />;
  return <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-7 space-y-5"><div className="flex items-center gap-3"><ClipboardCheck className="text-blue-400 w-7 h-7" /><h2 className="text-2xl font-black text-white">Check your insurance readiness</h2></div><p className="text-slate-400">Answer four questions to generate a practical preparation checklist. This is educational guidance, not a coverage determination.</p>{[['equipment', 'Equipment type', options.equipment], ['authority', 'Authority status', options.authority], ['cargo', 'Primary cargo', options.cargo]].map(([name, label, items]) => <label key={name as string} className="block text-sm font-bold text-slate-300">{label as string}<select name={name as string} required className="mt-2 w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white">{(items as string[]).map(item => <option key={item}>{item}</option>)}</select></label>)}<label className="block text-sm font-bold text-slate-300">Operating radius<select name="radius" required className="mt-2 w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white"><option>Local / under 100 miles</option><option>Regional / multiple states</option><option>Interstate / long haul</option></select></label><button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl">Generate my checklist</button></form>;
}

function ReadinessCapture({ result, onReset }: { result: { equipment: string; authority: string; cargo: string; radius: string }; onReset: () => void }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ readinessReport: true, name, email, businessType: result.equipment, state: 'All states', landingPage: '/trucking-insurance-readiness' }) });
    if (response.ok) setSent(true);
    else setError('We could not save your request. Please try again.');
  }
  if (sent) return <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-7 text-center"><CheckCircle2 className="text-emerald-400 w-10 h-10 mx-auto mb-4" /><h2 className="text-2xl font-black text-white mb-2">Checklist requested</h2><p className="text-slate-400 mb-5">Your readiness request was received. A quote review is available if you want help with the next step.</p><Link href="/quote" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-5 py-3 rounded-xl">Request a quote review <ArrowRight className="w-4 h-4" /></Link></div>;
  return <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-7"><div className="flex items-center gap-3 mb-5"><CheckCircle2 className="text-emerald-400 w-7 h-7" /><h2 className="text-2xl font-black text-white">Your readiness checklist</h2></div><p className="text-slate-400 mb-6">Based on {result.equipment}, {result.cargo.toLowerCase()}, and a {result.authority.toLowerCase()} operation, discuss these items before operating.</p><ul className="space-y-3 mb-7">{['Commercial auto liability limits and applicable filings', 'Motor truck cargo limits and commodity exclusions', 'Physical damage for the truck, trailer, and attached equipment', 'Driver experience, MVRs, vehicle schedule, and loss history', 'Broker, shipper, certificate, and contract requirements', 'State and federal requirements for your operating radius'].map(item => <li key={item} className="flex gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />{item}</li>)}</ul><form onSubmit={submit} className="border-t border-slate-800 pt-6 space-y-3"><p className="text-sm text-slate-300 font-bold">Email me this checklist</p><input required value={name} onChange={event => setName(event.target.value)} placeholder="Full name" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white" /><input required type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="Email address" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white" /><button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl">Request follow-up by email</button>{error && <p className="text-sm text-red-400">{error}</p>}</form><button type="button" onClick={onReset} className="mt-4 text-sm text-slate-400 hover:text-white">Start over</button></div>;
}
