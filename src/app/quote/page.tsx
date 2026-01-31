'use client';

import { useState } from 'react';
import { submitLead } from '../actions';
import { ArrowRight, AlertTriangle, ShieldCheck, User, Truck } from 'lucide-react';

export default function QuotePage() {
  const [step, setStep] = useState(1);
  
  return (
    <div className="min-h-screen bg-industrial-900 flex flex-col md:flex-row">
      {/* Sidebar / Progress */}
      <div className="w-full md:w-1/3 bg-industrial-800 p-8 border-r border-industrial-700 flex flex-col justify-between">
        <div>
          <div className="font-display text-2xl text-white mb-8">
            HIGH RISK <span className="text-safety-orange">QUOTE</span>
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
        <form action={submitLead} className="max-w-lg w-full">
          
          {/* STEP 1: VIOLATION */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-3xl font-display text-white mb-6">What violation caused the decline?</h2>
              <div className="space-y-4 mb-8">
                <RadioCard name="violation_code" value="395.8e" label="395.8(e) - False Logs" />
                <RadioCard name="violation_code" value="392.2S" label="392.2S - Speeding 15+ Over" />
                <RadioCard name="violation_code" value="382.215" label="382.215 - Drug/Alcohol" />
                <RadioCard name="violation_code" value="Other" label="Other / Multiple Violations" />
                <RadioCard name="violation_code" value="None" label="None - New Authority / Startup" />
              </div>
              <button 
                type="button" 
                onClick={() => setStep(2)}
                className="w-full bg-safety-orange hover:bg-orange-600 text-black font-bold py-4 rounded flex items-center justify-center gap-2"
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
                  placeholder="e.g. 5" 
                  required
                  className="w-full bg-industrial-800 border-b-2 border-industrial-600 focus:border-safety-orange text-white text-2xl py-2 px-4 outline-none transition-colors"
                />
              </div>

              <div className="bg-industrial-800/50 p-4 rounded border border-industrial-700 mb-8">
                <div className="flex gap-3">
                  <ShieldCheck className="text-green-500 shrink-0" />
                  <p className="text-sm text-silver">
                    Note: We specialize in drivers with <strong className="text-white">5+ years</strong> experience who made a single mistake.
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
                  onClick={() => setStep(3)}
                  className="w-2/3 bg-white hover:bg-gray-200 text-black font-bold py-4 rounded flex items-center justify-center gap-2"
                >
                  NEXT STEP <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CONTACT */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-3xl font-display text-white mb-6">Where should we send the quote?</h2>
              
              <div className="space-y-6 mb-8">
                <InputField name="driver_name" label="Full Name" type="text" placeholder="John Doe" />
                <InputField name="phone" label="Phone Number" type="tel" placeholder="(555) 123-4567" />
                <InputField name="email" label="Email Address" type="email" placeholder="john@trucking.com" />
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
                  className="w-2/3 bg-safety-orange hover:bg-orange-600 text-black font-bold py-4 rounded flex items-center justify-center gap-2"
                >
                  GET MY QUOTE
                </button>
              </div>
              <p className="text-xs text-industrial-600 mt-4 text-center">
                By submitting, you agree to receive a call from a specialist underwriter.
              </p>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}

// Sub-components for cleaner code
function StepIndicator({ current, number, title, icon }: { current: number, number: number, title: string, icon: any }) {
  const isActive = current === number;
  const isCompleted = current > number;
  
  return (
    <div className={`flex items-center gap-4 transition-opacity ${current >= number ? 'opacity-100' : 'opacity-40'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
        ${isActive ? 'border-safety-orange text-safety-orange' : 
          isCompleted ? 'bg-safety-orange border-safety-orange text-black' : 
          'border-industrial-600 text-industrial-600'}`}>
        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : number}
      </div>
      <div className="font-bold text-silver uppercase text-sm tracking-wider">{title}</div>
    </div>
  );
}

function RadioCard({ name, value, label }: { name: string, value: string, label: string }) {
  return (
    <label className="flex items-center p-4 border border-industrial-600 rounded cursor-pointer hover:border-safety-orange hover:bg-industrial-800 transition-all group">
      <input type="radio" name={name} value={value} className="accent-safety-orange w-5 h-5" required />
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

import { CheckCircle2 } from 'lucide-react';
