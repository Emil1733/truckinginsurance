'use client';

import Link from 'next/link';
import { CheckCircle2, ClipboardCheck, RotateCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import posthog from 'posthog-js';

const items = [
  'Driver application is complete and signed',
  'Initial MVR and required driving-history inquiries are collected',
  'Road-test certificate or accepted equivalent is documented',
  'Medical qualification documentation is current',
  'Annual MVR review is scheduled or documented',
  'Annual driver violation certification and review are recorded',
  'File owner and next review date are assigned',
];

const storageKey = 'truck-coverage-dq-checklist-v1';

export default function DQFileChecklist() {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (Array.isArray(saved) && saved.length === items.length) setChecked(saved);
    } catch {
      // A saved checklist is helpful, but it should never block the page.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checked));
  }, [checked]);

  const completed = useMemo(() => checked.filter(Boolean).length, [checked]);
  const isComplete = completed === items.length;

  function toggle(index: number) {
    if (!started) {
      setStarted(true);
      posthog.capture('dq_checklist_started', { source: 'driver_qualification_file_checklist' });
    }
    setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value));
  }

  function reset() {
    setChecked(items.map(() => false));
    setStarted(false);
    localStorage.removeItem(storageKey);
    posthog.capture('dq_checklist_reset');
  }

  useEffect(() => {
    if (isComplete) posthog.capture('dq_checklist_completed', { item_count: items.length });
  }, [isComplete]);

  return (
    <section className="bg-industrial-800 border-2 border-yellow-500/40 rounded-lg p-6 lg:p-8" aria-labelledby="dq-checklist-heading">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div><div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2"><ClipboardCheck className="w-4 h-4" /> Free checklist</div><h2 id="dq-checklist-heading" className="text-2xl font-bold text-white">Check your DQ file progress</h2></div>
        <button type="button" onClick={reset} className="text-industrial-400 hover:text-white text-sm inline-flex items-center gap-2" aria-label="Reset checklist"><RotateCcw className="w-4 h-4" /> Reset</button>
      </div>
      <div className="mb-6"><div className="flex justify-between text-sm text-industrial-400 mb-2"><span>{completed} of {items.length} items checked</span><span>{Math.round((completed / items.length) * 100)}%</span></div><div className="h-2 bg-industrial-900 rounded-full overflow-hidden"><div className="h-full bg-yellow-400 transition-all" style={{ width: `${(completed / items.length) * 100}%` }} /></div></div>
      <div className="space-y-3">
        {items.map((item, index) => <label key={item} className="flex gap-3 items-start bg-industrial-900/60 border border-industrial-700 rounded p-4 cursor-pointer hover:border-yellow-400/60"><input type="checkbox" checked={checked[index]} onChange={() => toggle(index)} className="mt-1 h-4 w-4 accent-yellow-400" /><span className={checked[index] ? 'text-white line-through decoration-yellow-400/70' : 'text-industrial-300'}>{item}</span></label>)}
      </div>
      {isComplete ? <div className="mt-6 border border-green-500/40 bg-green-950/30 rounded p-5"><div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /><div><p className="text-white font-bold">Your basic DQ-file checklist is complete.</p><p className="text-sm text-industrial-300 mt-1">Keep the source documents and review dates together. A completed checklist does not replace a review of the current rules or your carrier’s specific operation.</p><Link href="/trucking-insurance-readiness?problem=documents" className="inline-block mt-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-3 rounded">Prepare the rest of my carrier review</Link></div></div></div> : <p className="text-sm text-industrial-500 mt-5">Your progress is saved in this browser. No contact information is required to use the checklist.</p>}
    </section>
  );
}
