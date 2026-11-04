import Link from 'next/link';
import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, ShieldCheck, Truck } from 'lucide-react';
import { SiteHeader } from '@/components/SiteHeader';
import DQFileChecklist from '@/components/DQFileChecklist';

export const metadata = {
  title: 'Driver Qualification File Checklist: FMCSA DQ File Requirements',
  description: 'Use this practical driver qualification file checklist to organize FMCSA DQ file documents, annual reviews, MVRs, medical records, and audit preparation.',
  alternates: { canonical: '/driver-qualification-file-checklist' },
};

const requiredItems = [
  ['Driver application', 'Keep the completed employment application and the information required for the driver qualification process.'],
  ['Driving record inquiries', 'Document the required investigation of the driver’s driving history, including applicable previous-employer inquiries.'],
  ['Motor vehicle record', 'Keep the MVR obtained during qualification and the records required for recurring reviews.'],
  ['Road test or equivalent', 'Keep the road-test certificate or documentation of an accepted equivalent qualification.'],
  ['Medical qualification', 'Keep the medical examiner documentation required for the driver and operation.'],
  ['Annual review records', 'Track the annual MVR inquiry, review, and driver certification of violations when applicable.'],
];

const auditMistakes = [
  'Treating a DQ file as a one-time hiring folder instead of a file with recurring review dates.',
  'Assuming a CDL copy alone proves the driver is fully qualified for the operation.',
  'Failing to document annual MVR reviews and the driver’s violation certification.',
  'Mixing DQ-file records with drug-and-alcohol Clearinghouse records without tracking both obligations.',
  'Using an old internet checklist without checking the current FMCSA rule and the carrier’s operation.',
];

export default function DriverQualificationFileChecklistPage() {
  return (
    <main className="min-h-screen bg-industrial-900 text-silver font-mono">
      <SiteHeader ctaLabel="Request a review" statusLabel="Carrier compliance guide" />

      <section className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-400/10 text-yellow-400 text-xs font-bold border border-yellow-400/20 mb-6 uppercase tracking-widest"><ClipboardCheck className="w-4 h-4" /> DRIVER QUALIFICATION FILE GUIDE</div>
        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[0.95] mb-6">Driver Qualification File Checklist</h1>
        <p className="text-xl text-industrial-400 max-w-3xl leading-relaxed">A Driver Qualification File, often called a DQ file or DQF, is the carrier’s record of how it qualified and continues to review a driver. Use this checklist to organize the file before an audit, a new-hire review, or a conversation with your safety provider.</p>
        <div className="mt-10 bg-industrial-800 border border-industrial-700 rounded p-6 max-w-3xl"><p className="text-white leading-relaxed"><span className="text-yellow-400 font-bold">The practical point:</span> a driver file is not finished when the driver is hired. Some records must be updated or reviewed on a recurring schedule.</p></div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Core DQ file documents to organize</h2>
        <div className="grid md:grid-cols-2 gap-4">{requiredItems.map(([title, body]) => <div key={title} className="bg-industrial-800 border border-industrial-700 p-6 rounded"><h3 className="text-white font-bold mb-2">{title}</h3><p className="text-industrial-400 leading-relaxed">{body}</p></div>)}</div>
        <p className="text-sm text-industrial-500 mt-6">This is a practical starting checklist, not a substitute for reviewing the current rule, the carrier’s operation, and any applicable state or company requirements.</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16" id="checklist">
        <DQFileChecklist />
      </section>

      <section className="bg-industrial-800/40 border-y border-industrial-800">
        <div className="max-w-5xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12">
          <div><h2 className="text-3xl font-bold text-white mb-4">Annual DQ file review</h2><p className="text-industrial-400 leading-relaxed mb-5">The annual review is where many carriers lose track of the file. Create a simple schedule for each driver and record the completion date, reviewer, and result.</p><ul className="space-y-3 text-industrial-300">{['Request and review the driver’s current MVR', 'Obtain the driver’s annual certification of violations', 'Document the carrier’s review of the driving record', 'Check medical qualification and license information', 'Calendar the next review instead of relying on memory'].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />{item}</li>)}</ul></div>
          <div><h2 className="text-3xl font-bold text-white mb-4">Owner-operators and non-CDL drivers</h2><p className="text-industrial-400 leading-relaxed mb-4">The file requirements depend on the carrier’s relationship with the driver and the vehicle operation. An owner-operator, leased driver, employee, and non-CDL driver should not automatically be treated as the same case.</p><p className="text-industrial-400 leading-relaxed">A non-CDL driver may still be subject to qualification and medical-record requirements when operating a commercial motor vehicle. Confirm the exact rule that applies instead of using “non-CDL” as a shortcut.</p></div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12">
        <div><h2 className="text-3xl font-bold text-white mb-4">Common audit mistakes</h2><ul className="space-y-4 text-industrial-400">{auditMistakes.map((item) => <li key={item} className="flex gap-3"><span className="text-yellow-400 font-bold">!</span><span>{item}</span></li>)}</ul></div>
        <div className="bg-industrial-800 border border-industrial-700 p-7 rounded"><h2 className="text-3xl font-bold text-white mb-4">Electronic DQ files</h2><p className="text-industrial-400 leading-relaxed mb-4">An electronic file can make recurring reviews easier to track, but software does not replace the carrier’s responsibility to collect the right records, protect sensitive information, and produce the file when it is requested.</p><p className="text-industrial-400 leading-relaxed">Whether you use folders, a spreadsheet, or a compliance platform, give every driver a clear file owner and review schedule.</p></div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16 grid lg:grid-cols-2 gap-12">
        <div><h2 className="text-3xl font-bold text-white mb-4">Official starting points</h2><div className="space-y-3"><a href="https://www.fmcsa.dot.gov/safety/passenger-safety/guidelines-and-driver-qualifications-motor-carriers-passengers-parts-390-391" target="_blank" rel="noreferrer" className="block border border-industrial-700 rounded p-4 hover:border-yellow-400"><FileText className="inline w-5 h-5 text-yellow-400 mr-3" /><span className="font-bold text-white">FMCSA driver qualification guidance</span></a><a href="https://csa.fmcsa.dot.gov/safetyplanner/Resources/FormsLibrary.aspx" target="_blank" rel="noreferrer" className="block border border-industrial-700 rounded p-4 hover:border-yellow-400"><FileText className="inline w-5 h-5 text-yellow-400 mr-3" /><span className="font-bold text-white">FMCSA Safety Planner forms library</span></a><Link href="/trucking-insurance-requirements" className="block border border-industrial-700 rounded p-4 hover:border-yellow-400"><FileText className="inline w-5 h-5 text-yellow-400 mr-3" /><span className="font-bold text-white">Commercial trucking requirements</span></Link></div></div>
        <div className="bg-yellow-400 text-black p-8 rounded"><Truck className="w-8 h-8 mb-4" /><h2 className="text-2xl font-bold mb-3">Preparing for an insurance review?</h2><p className="mb-6">Your DQ file is one part of the carrier picture. Use the readiness tool to organize authority, equipment, cargo, radius, and document details before requesting a quote review.</p><Link href="/trucking-insurance-readiness?problem=documents" className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded font-bold uppercase">Build my carrier checklist <ArrowRight className="w-4 h-4" /></Link></div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24 border-t border-industrial-800 pt-12"><h2 className="text-3xl font-bold text-white mb-5">Keep the compliance workflow connected</h2><div className="flex flex-wrap gap-3"><Link href="/ifta-trucking-requirements" className="border border-industrial-700 px-4 py-3 rounded hover:border-yellow-400">IFTA requirements</Link><Link href="/carrier-readiness" className="border border-industrial-700 px-4 py-3 rounded hover:border-yellow-400">Carrier readiness center</Link><Link href="/trucking-insurance-readiness?problem=documents" className="border border-yellow-400 text-yellow-400 px-4 py-3 rounded hover:bg-yellow-400 hover:text-black">Use the readiness checklist</Link></div></section>
    </main>
  );
}
