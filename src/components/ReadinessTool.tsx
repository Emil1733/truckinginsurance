'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ClipboardCheck } from 'lucide-react';
import posthog from 'posthog-js';

const options = {
  problem: ['I am starting a new authority', 'I need an insurance filing', 'A broker or shipper requested insurance', 'I want a commercial truck insurance quote', 'My current policy was cancelled or is difficult to place', 'I need to understand my coverage requirements'],
  equipment: ['Box truck', 'Hot shot pickup and trailer', 'Car hauler / auto transport', 'Semi tractor-trailer', 'Other commercial truck'],
  authority: ['New authority / startup', 'Already operating', 'Leasing onto another carrier'],
  cargo: ['General freight', 'Vehicles', 'Household goods', 'Construction or equipment', 'Other or mixed cargo'],
};

export default function ReadinessTool() {
  const [initialProblem, setInitialProblem] = useState('');
  const [result, setResult] = useState<{ problem: string; equipment: string; authority: string; cargo: string; radius: string } | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const problem = params.get('problem');
    const referrerPath = document.referrer ? new URL(document.referrer).pathname : '';
    const attribution = ['utm_source', 'utm_medium', 'utm_campaign', 'gclid'].reduce<Record<string, string>>((values, key) => {
      const value = params.get(key);
      if (value) values[key] = value;
      return values;
    }, {});
    if (Object.keys(attribution).length) sessionStorage.setItem('tce_attribution', JSON.stringify(attribution));
    const problemMap: Record<string, string> = {
      'new-authority': options.problem[0],
      filing: options.problem[1],
      broker: options.problem[2],
      quote: options.problem[3],
      policy: options.problem[4],
      requirements: options.problem[5],
    };
    const inferredProblem = problem || (
      referrerPath.includes('/filing/') || referrerPath.includes('/filings') ? 'filing' :
      referrerPath.includes('/new-authority') ? 'new-authority' :
      referrerPath.includes('/broker') ? 'broker' :
      referrerPath.includes('/dot-insurance') || referrerPath.includes('/trucking-insurance-requirements') ? 'requirements' :
      referrerPath.includes('/insurance/') || referrerPath.includes('/box-truck') || referrerPath.includes('/hot-shot') ? 'quote' :
      ''
    );
    if (inferredProblem && problemMap[inferredProblem]) setInitialProblem(problemMap[inferredProblem]);
    posthog.capture('readiness_tool_viewed', { inferred_problem: inferredProblem || 'none', referrer_path: referrerPath || 'direct' });
  }, []);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries()) as Record<string, string>;
    const nextResult = { problem: values.problem, equipment: values.equipment, authority: values.authority, cargo: values.cargo, radius: values.radius };
    posthog.capture('readiness_tool_completed', { primary_problem: nextResult.problem, equipment: nextResult.equipment, authority: nextResult.authority, cargo: nextResult.cargo, radius: nextResult.radius });
    setResult(nextResult);
  }
  if (result) return <ReadinessCapture result={result} onReset={() => setResult(null)} />;
  return <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-7 space-y-5"><div className="flex items-center gap-3"><ClipboardCheck className="text-blue-400 w-7 h-7" /><h2 className="text-2xl font-black text-white">Check your insurance readiness</h2></div><p className="text-slate-400">Answer five questions to generate a practical preparation checklist. This is educational guidance, not a coverage determination.</p><label className="block text-sm font-bold text-slate-300">What brings you here?<select name="problem" required value={initialProblem || options.problem[0]} onChange={event => setInitialProblem(event.target.value)} className="mt-2 w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white">{options.problem.map(item => <option key={item}>{item}</option>)}</select></label>{[['equipment', 'Equipment type', options.equipment], ['authority', 'Authority status', options.authority], ['cargo', 'Primary cargo', options.cargo]].map(([name, label, items]) => <label key={name as string} className="block text-sm font-bold text-slate-300">{label as string}<select name={name as string} required className="mt-2 w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white">{(items as string[]).map(item => <option key={item}>{item}</option>)}</select></label>)}<label className="block text-sm font-bold text-slate-300">Operating radius<select name="radius" required className="mt-2 w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white"><option>Local / under 100 miles</option><option>Regional / multiple states</option><option>Interstate / long haul</option></select></label><button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl">Generate my checklist</button></form>;
}

function ReadinessCapture({ result, onReset }: { result: { problem: string; equipment: string; authority: string; cargo: string; radius: string }; onReset: () => void }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const params = new URLSearchParams(window.location.search);
    let storedAttribution: Record<string, string> = {};
    try { storedAttribution = JSON.parse(sessionStorage.getItem('tce_attribution') || '{}') as Record<string, string>; } catch { storedAttribution = {}; }
    const getAttribution = (key: string) => params.get(key) || storedAttribution[key] || null;
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ readinessReport: true, name, phone, email, businessType: result.equipment, state: 'All states', authorityStatus: result.authority, primaryProblem: result.problem, cargo: result.cargo, radius: result.radius, landingPage: '/trucking-insurance-readiness', referrer: document.referrer || null, utmSource: getAttribution('utm_source'), utmMedium: getAttribution('utm_medium'), utmCampaign: getAttribution('utm_campaign'), gclid: getAttribution('gclid'), consent }) });
      if (!response.ok) {
        setError('We could not save your request. Please check your details and try again.');
        return;
      }
      posthog.capture('readiness_lead_submitted', { primary_problem: result.problem, equipment: result.equipment, has_phone: Boolean(phone), acquisition_source: getAttribution('utm_source') || 'none' });
      setSent(true);
    } catch {
      setError('The request could not reach the server. Please try again in a moment.');
    }
  }
  if (sent) return <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-7 text-center"><CheckCircle2 className="text-emerald-400 w-10 h-10 mx-auto mb-4" /><h2 className="text-2xl font-black text-white mb-2">Checklist requested</h2><p className="text-slate-400 mb-5">Your readiness request was received. A quote review is available if you want help with the next step.</p><Link href="/quote" className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-5 py-3 rounded-xl">Request a quote review <ArrowRight className="w-4 h-4" /></Link></div>;
  return <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-7"><div className="flex items-center gap-3 mb-5"><CheckCircle2 className="text-emerald-400 w-7 h-7" /><h2 className="text-2xl font-black text-white">Your readiness checklist</h2></div><p className="text-slate-400 mb-6">Based on your goal to {result.problem.toLowerCase()}, with {result.equipment}, {result.cargo.toLowerCase()}, and a {result.authority.toLowerCase()} operation, discuss these items before operating.</p><ul className="space-y-3 mb-7">{['Commercial auto liability limits and applicable filings', 'Motor truck cargo limits and commodity exclusions', 'Physical damage for the truck, trailer, and attached equipment', 'Driver experience, MVRs, vehicle schedule, and loss history', 'Broker, shipper, certificate, and contract requirements', 'State and federal requirements for your operating radius'].map(item => <li key={item} className="flex gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />{item}</li>)}</ul><form onSubmit={submit} className="border-t border-slate-800 pt-6 space-y-3"><p className="text-sm text-slate-300 font-bold">Email me this checklist</p><input required value={name} onChange={event => setName(event.target.value)} placeholder="Full name" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white" /><input required type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="Email address" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white" /><input type="tel" value={phone} onChange={event => setPhone(event.target.value)} placeholder="Phone number (optional for quote help)" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white" /><label className="flex items-start gap-3 text-xs text-slate-400 leading-relaxed"><input required type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} className="mt-1 accent-blue-600" /><span>I agree to be contacted about this readiness request by email, phone, or text by Truck Coverage Experts or a licensed insurance professional assisting with my review.</span></label><button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl">Email my checklist and next steps</button>{error && <p className="text-sm text-red-400">{error}</p>}</form><button type="button" onClick={onReset} className="mt-4 text-sm text-slate-400 hover:text-white">Start over</button></div>;
}
