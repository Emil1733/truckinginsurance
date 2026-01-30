"use client";

import { useState } from "react";
import { fetchCarrierSafety } from "@/actions/fmcsa";
import { BigNumpad } from "@/components/dashboard/BigNumpad";
import { SafetyGauge } from "@/components/dashboard/SafetyGauge";
import { FMCSAOverview } from "@/types/fmcsa";
import { AlertCircle, Truck, RefreshCw, Phone } from "lucide-react";
import Link from "next/link";
import { ReinstatementModal } from "@/components/ReinstatementModal";

export default function CheckScorePage() {
  const [dotNumber, setDotNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FMCSAOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const handleSearch = async () => {
    if (!dotNumber) return;
    setLoading(true);
    setError(null);
    setLogs([]);

    const res = await fetchCarrierSafety(dotNumber);
    if (res.debugLog) setLogs(res.debugLog); // Capture logs

    if (res.success && res.data) {
      setData(res.data);
    } else {
      setError(res.error || "Failed to fetch data");
    }
    setLoading(false);
  };
  


  const getBasicScore = (name: string) => {
    // FMCSA Basics come in an array. We search for the specific one.
    // NOTE: The API structure varies, assuming array of objects based on spec.
    const basics = data?.content.basics?.basic || [];
    // Just finding match based on substring for flexibility
    const found = basics.find(b => b.basic.toLowerCase().includes(name.toLowerCase()));
    return found && found.basicPercentile ? parseInt(found.basicPercentile) : 0;
  };
  
  const isAlert = (name: string) => {
     const basics = data?.content.basics?.basic || [];
     const found = basics.find(b => b.basic.toLowerCase().includes(name.toLowerCase()));
     // "Alert" status usually indicates they are above threshold
     return !!(found?.basicStatus === "Alert" || (found && found.basicPercentile && parseInt(found.basicPercentile) > 75));
  };

  return (
    <div className="min-h-screen bg-industrial-900 text-white font-mono flex flex-col">
      
      {/* NAVBAR */}
      <div className="p-4 border-b border-industrial-800 flex justify-between items-center bg-black/20">
         <div className="flex items-center gap-2 text-safety-orange font-bold tracking-widest">
            <Truck className="w-6 h-6" /> QCMOBILE
         </div>
         {data && (
           <button onClick={() => { setData(null); setDotNumber(''); }} className="text-xs text-industrial-400 uppercase border border-industrial-700 px-3 py-1 rounded">
             New Search
           </button>
         )}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        
        {/* STATE 1: LOADING */}
        {loading && (
           <div className="text-center animate-pulse">
             <RefreshCw className="w-16 h-16 text-safety-orange animate-spin mx-auto mb-4" />
             <h2 className="text-2xl font-bold">CONTACTING FMCSA...</h2>
             <p className="text-industrial-400">Fetching live inspection data</p>
           </div>
        )}

        {/* STATE 2: INPUT (NUMPAD) */}
        {!loading && !data && (
          <div className="w-full max-w-md">
             <h1 className="text-center text-2xl font-bold mb-8 text-industrial-200">ENTER USDOT NUMBER</h1>
             <div className="bg-black/40 border border-industrial-700 p-4 rounded-xl mb-6 text-center">
                <span className="text-4xl font-bold tracking-widest">{dotNumber || "_______"}</span>
             </div>
             {error && <div className="text-red-500 text-center mb-4 bg-red-900/20 p-2 rounded">{error}</div>}
             <BigNumpad 
               value={dotNumber} 
               onChange={setDotNumber} 
               onSubmit={handleSearch} 
             />
          </div>
        )}

        {/* STATE 3: DASHBOARD (GAUGES) */}
        {!loading && data && (
          <div className="w-full max-w-lg space-y-6">
             
             {/* CARRIER INFO Header */}
             <div className="text-center border-b border-industrial-800 pb-4">
               <h2 className="text-xl font-bold text-white">{data.content.carrier.legalName}</h2>
               <div className="text-sm text-industrial-400">DOT: {data.content.carrier.dotNumber} | {data.content.carrier.phyCity}, {data.content.carrier.phyState}</div>
               {data.content.carrier.safetyRating && (
                 <div className={`mt-2 inline-block px-3 py-1 rounded text-xs font-bold uppercase ${
                    data.content.carrier.safetyRating === 'Satisfactory' ? 'bg-green-900/50 text-green-500' : 'bg-red-900/50 text-red-500'
                 }`}>
                    RATING: {data.content.carrier.safetyRating}
                 </div>
               )}
             </div>

             {/* MAIN GAUGES */}
             <div className="grid grid-cols-1 gap-8">
                {/* Unsafe Driving is usually the killer */}
                <div className="bg-black/30 p-4 rounded-xl border border-industrial-800">
                   <SafetyGauge 
                     score={getBasicScore("Unsafe Driving")} 
                     label="UNSAFE DRIVING" 
                     isAlert={isAlert("Unsafe Driving")} 
                   />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 p-2 rounded-xl border border-industrial-800">
                    <SafetyGauge 
                      score={getBasicScore("Vehicle Maint")} 
                      label="MAINTENANCE" 
                      isAlert={isAlert("Vehicle Maint")} 
                    />
                  </div>
                  <div className="bg-black/30 p-2 rounded-xl border border-industrial-800">
                    <SafetyGauge 
                      score={getBasicScore("Hours")} 
                      label="H.O.S." 
                      isAlert={isAlert("Hours")} 
                    />
                  </div>
                </div>
             </div>

             {/* ALERT ACTION */}
             { (isAlert("Unsafe Driving") || isAlert("Vehicle Maint") || isAlert("Hours")) && (
                <div className="bg-red-900/20 border border-red-500 p-6 rounded-xl animate-pulse">
                   <div className="flex items-center gap-3 mb-3">
                     <AlertCircle className="w-8 h-8 text-red-500" />
                     <h3 className="text-xl font-bold text-red-500">INSURANCE RISK DETECTED</h3>
                   </div>
                   <p className="text-sm text-red-200 mb-4">Your scores are in the "Intervention Zone". Brokers may block you soon.</p>
                   
                   <ReinstatementModal>
                      <button className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                        <Phone className="w-5 h-5" /> TALK TO SAFETY AGENT
                      </button>
                   </ReinstatementModal>
                </div>
             )}

          </div>
        )}

      <div className="mt-8 p-4 bg-black text-green-500 font-mono text-xs overflow-auto max-w-full rounded border border-green-900 w-full opacity-50 hover:opacity-100 transition-opacity">
        <summary className="cursor-pointer font-bold mb-2">DEBUG DATA (Hover to view)</summary>
        <div className="mb-4 border-b border-green-900 pb-2">
            <strong>SERVER LOGS:</strong>
            {logs.map((L, i) => <div key={i}>{L}</div>)}
        </div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      </main>
    </div>
  );
}
