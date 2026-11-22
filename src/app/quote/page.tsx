'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import posthog from 'posthog-js';
import { attributionKeys, readLeadAttribution } from '@/lib/lead-attribution';
import { submitLead } from '../actions';
import { ArrowRight, AlertTriangle, ShieldCheck, User, Truck, CheckCircle2 } from 'lucide-react';

export default function QuotePage() {
  const [submission, submitQuote, isSubmitting] = useActionState(async (previous: Parameters<typeof submitLead>[0], form: FormData) => {
    const stored = readLeadAttribution();
    const query = new URLSearchParams(window.location.search);
    form.set('landingPage', stored.landingPage || '/quote');
    for (const key of attributionKeys) {
      const value = query.get(key) || stored[key];
      if (value) form.set(key, value);
    }
    return submitLead(previous, form);
  }, null);
  const router = useRouter();
  const tracked = useRef(false);
  const [step, setStep] = useState(1);
  const [violation, setViolation] = useState('');
  const [cdlYears, setCdlYears] = useState('');
  const saved = submission !== null && 'saved' in submission;
  const submissionError = submission && 'error' in submission ? submission.error : null;

  useEffect(() => {
    if (!saved || tracked.current) return;
    tracked.current = true;
    try {
      posthog.capture('quote_lead_saved', { form: 'quote', page_path: '/quote' });
    } catch {
      console.warn('Quote analytics event could not be queued.');
    } finally {
      router.replace('/quote/success');
    }
  }, [saved, router]);
  
  return (
    <div className="min-h-screen bg-industrial-900">
      {/* INTRO */}
      <section className="border-b border-industrial-800 px-6 py-12 md:py-14">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-safety-orange mb-4">
            Quote review
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase text-white leading-[1.05] mb-5">
            Trucking insurance quote
          </h1>
          <p className="text-lg text-industrial-400 max-w-2xl leading-relaxed">
            Three questions and a phone number get the review started. You will not get a bindable price
            in thirty seconds, and neither will anyone else quoting a trucking operation honestly â€” what
            you get is a licensed professional reading your file and coming back with carriers that will
            actually write it.
          </p>
        </div>
      </section>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar / Progress */}
        <div className="w-full md:w-1/3 bg-industrial-800 p-8 border-r border-industrial-700 flex flex-col justify-between">
          <div>
            <div className="font-display text-2xl text-white mb-8">
              COMMERCIAL TRUCK <span className="text-safety-orange">QUOTE REVIEW</span>
            </div>

            <div className="space-y-6">
              <StepIndicator current={step} number={1} title="Violation Check" icon={<AlertTriangle />} />
              <StepIndicator current={step} number={2} title="Driver History" icon={<Truck />} />
              <StepIndicator current={step} number={3} title="Contact Info" icon={<User />} />
            </div>
          </div>

          <div className="hidden md:block text-xs text-industrial-500 mt-12">
            SECURE 256-BIT ENCRYPTED TRANSMISSION
          </div>
        </div>

      {/* Main Form Area */}
      <div className="w-full md:w-2/3 p-6 md:p-12 flex items-center justify-center">
        <form action={submitQuote} className="max-w-lg w-full">
          
          {/* STEP 1: VIOLATION */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-3xl font-display text-white mb-6">What best describes your insurance request?</h2>
              <div className="space-y-4 mb-8">
                <RadioCard name="violation_code" value="New authority" label="New authority / startup" selected={violation} onChange={setViolation} />
                <RadioCard name="violation_code" value="New coverage" label="New commercial coverage" selected={violation} onChange={setViolation} />
                <RadioCard name="violation_code" value="Replacing coverage" label="Replacing current coverage" selected={violation} onChange={setViolation} />
                <RadioCard name="violation_code" value="Coverage issue" label="Coverage issue or difficult placement" selected={violation} onChange={setViolation} />
                <RadioCard name="violation_code" value="Other" label="Other trucking insurance request" selected={violation} onChange={setViolation} />
              </div>
              <button 
                type="button" 
                disabled={!violation}
                onClick={() => setStep(2)}
                className="w-full bg-safety-orange hover:bg-orange-600 text-black font-bold py-4 rounded flex items-center justify-center gap-2 disabled:opacity-50"
              >
                NEXT STEP <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: DRIVER STATS */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-3xl font-display text-white mb-6">How much experience do you have?</h2>
              
              <div className="mb-6">
                <label className="block text-industrial-500 text-xs font-bold uppercase mb-2">Years with CDL</label>
                <input 
                  type="number" 
                  name="cdl_years"
                  min={0}
                  step={1}
                  value={cdlYears}
                  onChange={(event) => setCdlYears(event.target.value)}
                  placeholder="e.g. 5" 
                  required
                  className="w-full bg-industrial-800 border-b-2 border-industrial-600 focus:border-safety-orange text-white text-2xl py-2 px-4 outline-none transition-colors"
                />
              </div>

              <div className="bg-industrial-800/50 p-4 rounded border border-industrial-700 mb-8">
                <div className="flex gap-3">
                  <ShieldCheck className="text-green-500 shrink-0" />
                  <p className="text-sm text-silver">
                    Driver experience, vehicle details, cargo, authority, and operating radius can all affect a quote review.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="w-1/3 border border-industrial-600 text-industrial-500 font-bold py-4 rounded hover:text-white hover:border-white"
                >
                  BACK
                </button>
                <button 
                  type="button" 
                  disabled={!cdlYears || !Number.isSafeInteger(Number(cdlYears)) || Number(cdlYears) < 0}
                  onClick={() => setStep(3)}
                  className="w-2/3 bg-white hover:bg-gray-200 text-black font-bold py-4 rounded flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  NEXT STEP <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CONTACT */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-3xl font-display text-white mb-6">Where should we send the review?</h2>
              
              <div className="space-y-6 mb-8">
                <InputField name="driver_name" label="Full Name" type="text" placeholder="John Doe" />
                <InputField name="phone" label="Phone Number" type="tel" placeholder="(555) 123-4567" />
                <InputField name="email" label="Email Address" type="email" placeholder="john@trucking.com" />
                {violation === 'Replacing coverage' && (
                  <label className="block text-sm text-silver">
                    Current policy renewal date (optional)
                    <input type="date" name="renewalDate" className="mt-2 block w-full rounded bg-industrial-800 px-4 py-3 text-white" />
                  </label>
                )}
                <input type="hidden" name="violation_code" value={violation} />
                <input type="hidden" name="cdl_years" value={cdlYears} />
              </div>

              <div className="flex gap-4">
                <button 
                  type="button" 
                  onClick={() => setStep(2)}
                  className="w-1/3 border border-industrial-600 text-industrial-500 font-bold py-4 rounded hover:text-white hover:border-white"
                >
                  BACK
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting || saved}
                  className="w-2/3 bg-safety-orange hover:bg-orange-600 text-black font-bold py-4 rounded flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'SENDING REQUEST' : 'REQUEST MY REVIEW'}
                </button>
              </div>
              {submissionError && <p role="alert" className="mt-4 text-sm text-red-300">{submissionError}</p>}
              <p className="text-xs text-industrial-600 mt-4 text-center">
                By submitting, you agree to be contacted about your commercial insurance request.
              </p>
            </div>
          )}

        </form>
        </div>
      </div>

      {/* CONTENT */}
      <section className="border-t border-industrial-800 px-6 py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Can I get a trucking insurance quote instantly online?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'A bindable trucking quote is not an instant product. Underwriters need the equipment, the commodity, the radius, the drivers and the loss history before a carrier will commit to terms. Sites that return a number in thirty seconds are usually capturing a phone number, not quoting a policy. What can happen quickly is the review: submit the operation and a licensed professional comes back with carriers that will write it.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How much does trucking insurance cost?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'There is no meaningful average for a single operation. Premium is built from the power unit and trailer, the cargo and its value, the radius, gross vehicle weight, driver records and experience, how long the authority has been active, the limits and deductibles chosen, and prior claims. Two carriers with identical trucks are quoted differently because of driver history and authority age, which is why a published average is a poor planning number.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Do I need insurance before I get my authority?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Effectively yes. FMCSA will not activate an MC number until the insurer has filed proof of liability, and several states will not issue plates or a state authority certificate until their own filing is on record. The practical order is to have the quote, then bind, then let the insurer file â€” which means the quote has to happen before the authority is live, not after.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What if I have violations, a lapse, or a brand new authority?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'That is the part of the market this site is built for. A new authority has no loss history of its own, and a lapse or a moving violation narrows which carriers will look at the file. It does not make the operation uninsurable, but it does mean the file has to be presented properly: complete documents, an accurate description of the work, and an agent who knows which markets write that profile.',
                  },
                },
              ],
            }),
          }}
        />

        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-4">
            What a trucking quote is, and what it is not
          </h2>
          <p className="text-industrial-400 leading-relaxed mb-4">
            A quote is not a price you can bind. Trucking underwriting is a judgement about how likely
            this specific operation is to have a claim: what it hauls, how far, who drives, how long the
            authority has existed, and what happened on the last policy. No website can answer that from
            a form, which is why the credible version of this page asks for a review rather than printing
            a number.
          </p>
          <p className="text-industrial-400 leading-relaxed mb-10">
            What you get here is a licensed insurance professional reading the file and coming back with
            carriers that will actually write it, the limits they will offer, and the filings the
            operation needs. If the answer is that the file needs work before anyone will quote it, you
            will hear that too â€” it is more useful than a price that evaporates at underwriting.
          </p>

          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-4">
            Why the form asks about violations first
          </h2>
          <p className="text-industrial-400 leading-relaxed mb-10">
            Because it changes which markets are worth approaching. A clean file and a file with an
            out-of-service violation or a DUI are not the same conversation, and starting with the
            driver history stops everyone wasting a week. The same applies to a lapse in coverage: it
            follows the operation into the next quote and it is better raised now than discovered when a
            carrier declines.
          </p>

          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-4">
            What moves the number
          </h2>
          <ul className="space-y-3 text-industrial-400 leading-relaxed mb-10">
            <li>
              <span className="text-white font-bold">Equipment and gross weight.</span> Tractor, trailer
              type, stated value and GVW set the base rate and the physical damage exposure.
            </li>
            <li>
              <span className="text-white font-bold">Commodity and cargo value.</span> Hazmat, high-theft
              freight and produce are treated differently from general freight, and the shipper contract
              often sets a cargo limit the law never mentions.
            </li>
            <li>
              <span className="text-white font-bold">Radius.</span> Local, regional and long haul are
              rated differently. In a state the size of Texas, radius matters more than the truck does.
            </li>
            <li>
              <span className="text-white font-bold">Drivers.</span> Experience and motor vehicle records
              are the most common reason a quote changes after submission.
            </li>
            <li>
              <span className="text-white font-bold">Authority age.</span> A new MC number has no loss
              history, which affects both price and who will offer terms at all.
            </li>
            <li>
              <span className="text-white font-bold">Limits and deductibles.</span> Raising liability or
              lowering the physical damage deductible moves premium faster than anything else on the file.
            </li>
          </ul>

          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-4">
            How long it takes
          </h2>
          <p className="text-industrial-400 leading-relaxed mb-4">
            Submitting takes a few minutes. A clean file with prior coverage usually comes back the same
            day or the next. A brand new authority, an unusual commodity or a driver with a record takes
            longer, because more carriers have to be approached and some will want an inspection or a
            down payment structure.
          </p>
          <p className="text-industrial-400 leading-relaxed mb-10">
            Filings run on their own clock and are worth planning around. A federal BMC-91X is usually
            electronic and quick; a state filing can take weeks â€” California&apos;s Motor Carrier Permit is
            a mailing process, and a Texas Form E has to be in TxMCCS before the TxDMV number issues. The
            quote date is not the operating date.
          </p>

          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-4">
            Have this ready when we call
          </h2>
          <p className="text-industrial-400 leading-relaxed mb-4">
            You do not need any of it to submit the form, but the quote firms up faster with it:
          </p>
          <ul className="space-y-2 text-industrial-400 leading-relaxed mb-10">
            <li>Legal entity name and address, with MC and DOT numbers and authority status</li>
            <li>A driver list with licence details, years of experience and any violations</li>
            <li>Three to five years of loss runs if you have carried coverage before</li>
            <li>An equipment schedule with VINs, stated values and trailer types</li>
            <li>The cargo you haul and the radius you actually run</li>
            <li>Any broker or shipper insurance requirement in writing</li>
          </ul>

          <div className="bg-industrial-800 border border-industrial-700 rounded-lg p-6 mb-10">
            <p className="text-sm text-industrial-400 leading-relaxed">
              New to authority and not sure what applies?{' '}
              <a href="/new-authority-insurance" className="text-safety-orange underline">
                Start with the new authority guide
              </a>
              , or read{' '}
              <a href="/commercial-truck-insurance" className="text-safety-orange underline">
                what commercial truck insurance covers
              </a>
              . If the truck never leaves one state,{' '}
              <a href="/commercial-truck-insurance/texas" className="text-safety-orange underline">
                Texas
              </a>
              ,{' '}
              <a href="/commercial-truck-insurance/california" className="text-safety-orange underline">
                California
              </a>{' '}
              and{' '}
              <a href="/commercial-truck-insurance/illinois" className="text-safety-orange underline">
                Illinois
              </a>{' '}
              each have their own credential, and one of them is probably yours.
            </p>
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-3">
            Can I get an instant quote?
          </h2>
          <p className="text-industrial-400 leading-relaxed mb-6">
            Not a bindable one, and that is not a limitation of this site â€” it is how the product works.
            Submit the three steps above and the review comes back with real terms. If you would rather
            talk it through first, say so in the contact step and someone will call.
          </p>
        </div>
      </section>
    </div>
  );
}

// Sub-components for cleaner code
function StepIndicator({ current, number, title, icon }: { current: number, number: number, title: string, icon: ReactNode }) {
  const isActive = current === number;
  const isCompleted = current > number;
  
  return (
    <div className={`flex items-center gap-4 transition-opacity ${current >= number ? 'opacity-100' : 'opacity-40'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
        ${isActive ? 'border-safety-orange text-safety-orange' : 
          isCompleted ? 'bg-safety-orange border-safety-orange text-black' : 
          'border-industrial-600 text-industrial-600'}`}>
        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : icon}
      </div>
      <div className="font-bold text-silver uppercase text-sm tracking-wider">{title}</div>
    </div>
  );
}

function RadioCard({ name, value, label, selected, onChange }: { name: string, value: string, label: string, selected: string, onChange: (val: string) => void }) {
  return (
    <label className="flex items-center p-4 border border-industrial-600 rounded cursor-pointer hover:border-safety-orange hover:bg-industrial-800 transition-all group">
      <input 
        type="radio" 
        name={name} 
        value={value} 
        className="accent-safety-orange w-5 h-5" 
        checked={selected === value}
        onChange={(e) => onChange(e.target.value)}
        required 
      />
      <span className="ml-3 text-silver font-bold group-hover:text-white">{label}</span>
    </label>
  );
}

function InputField({ name, label, type, placeholder }: { name: string, label: string, type: string, placeholder: string }) {
  return (
    <div>
      <label className="block text-industrial-500 text-xs font-bold uppercase mb-2">{label}</label>
      <input 
        type={type} 
        name={name} 
        placeholder={placeholder} 
        required
        className="w-full bg-industrial-800 border-b-2 border-industrial-600 focus:border-safety-orange text-white py-3 px-4 outline-none transition-colors"
      />
    </div>
  );
}

