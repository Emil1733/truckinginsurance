"use client";

import { useState } from "react";
import { Calculator, CheckCircle2, AlertTriangle, Truck } from "lucide-react";

export function CDLCalculator() {
  const [truckGVWR, setTruckGVWR] = useState<number | "">("");
  const [trailerGVWR, setTrailerGVWR] = useState<number | "">("");

  const calculate = () => {
    const truck = Number(truckGVWR) || 0;
    const trailer = Number(trailerGVWR) || 0;
    const gcwr = truck + trailer;
    
    // CDL Rules Simplified
    // Class A CDL is required if:
    // 1. GCWR is 26,001 or more AND
    // 2. Trailer is HEAVIER than 10,000 lbs
    
    const isOver26k = gcwr >= 26001;
    const isTrailerHeavy = trailer > 10000;
    
    let result = "non-cdl";
    if (isOver26k && isTrailerHeavy) {
      result = "cdl-a";
    } else if (isOver26k && !isTrailerHeavy) {
        // Technically Class B territory but usually just means truck is huge
        result = "cdl-b"; 
    }

    return { result, gcwr };
  };

  const { result, gcwr } = calculate();

  return (
    <div className="bg-industrial-800 p-8 rounded-xl border border-industrial-700 shadow-2xl">
      <div className="flex items-center gap-3 mb-6 border-b border-industrial-700 pb-4">
        <Calculator className="w-6 h-6 text-safety-orange" />
        <h3 className="text-xl font-bold text-white">DO I NEED A CDL?</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-xs font-mono text-industrial-400 mb-2 uppercase">Truck GVWR (lbs)</label>
          <input 
            type="number" 
            placeholder="e.g. 14000 (RAM 3500)" 
            value={truckGVWR}
            onChange={(e) => setTruckGVWR(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full bg-black/50 border border-industrial-600 text-white px-4 py-3 rounded focus:outline-none focus:border-safety-orange transition-colors font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-industrial-400 mb-2 uppercase">Trailer GVWR (lbs)</label>
          <input 
            type="number" 
            placeholder="e.g. 12000 (Mini Float)" 
            value={trailerGVWR}
            onChange={(e) => setTrailerGVWR(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full bg-black/50 border border-industrial-600 text-white px-4 py-3 rounded focus:outline-none focus:border-safety-orange transition-colors font-mono"
          />
        </div>
      </div>

      <div className={`p-6 rounded-lg border-2 transition-all ${
        result === 'cdl-a' ? 'bg-red-900/20 border-red-500' : 
        result === 'cdl-b' ? 'bg-orange-900/20 border-orange-500' :
        'bg-green-900/20 border-green-500'
      }`}>
        <div className="flex justify-between items-start mb-2">
           <div className="text-xs font-mono text-industrial-400 uppercase">Total GCWR: {gcwr.toLocaleString()} lbs</div>
           {result === 'cdl-a' && <span className="px-2 py-1 bg-red-500 text-black text-xs font-bold rounded">CDL REQUIRED</span>}
           {result === 'non-cdl' && <span className="px-2 py-1 bg-green-500 text-black text-xs font-bold rounded">NON-CDL LEGAL</span>}
        </div>

        {result === 'cdl-a' && (
          <div className="flex gap-3">
             <AlertTriangle className="w-8 h-8 text-red-500 shrink-0" />
             <div>
               <h4 className="text-red-500 font-bold mb-1">CDL CLASS A REQUIRED</h4>
               <p className="text-sm text-industrial-300">Your combo exceeds 26,000 lbs AND trailer is over 10k. You are in "Big Rig" territory. Fines for operating without a CDL are severe.</p>
             </div>
          </div>
        )}

        {result === 'cdl-b' && (
          <div className="flex gap-3">
             <AlertTriangle className="w-8 h-8 text-orange-500 shrink-0" />
             <div>
               <h4 className="text-orange-500 font-bold mb-1">CDL CLASS B LIKELY</h4>
                <p className="text-sm text-industrial-300">Your vehicle is heavy (&gt;26k) but trailer is light (&lt;10k). Common for dump trucks, box trucks.</p>
             </div>
          </div>
        )}

        {result === 'non-cdl' && (
          <div className="flex gap-3">
             <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" />
             <div>
               <h4 className="text-green-500 font-bold mb-1">YOU ARE GOOD TO GO (NON-CDL)</h4>
               <p className="text-sm text-industrial-300">You are under the 26,001 lb threshold. You just need a standard customized MC# and Dot Number. We can insure this startup today.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
