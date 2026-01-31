"use client";

import { useState } from "react";
import { fetchCarrierSafety } from "@/actions/fmcsa";
import { claimDotNumber } from "@/actions/claim-authority";
import { Search, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

export function ClaimAuthorityWidget() {
  const [step, setStep] = useState<"SEARCH" | "CONFIRM">("SEARCH");
  const [loading, setLoading] = useState(false);
  const [dotInput, setDotInput] = useState("");
  const [carrierData, setCarrierData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!dotInput) return;
    setLoading(true);
    setError(null);

    const result = await fetchCarrierSafety(dotInput);
    if (result.success && result.data) {
      setCarrierData(result.data.content.carrier);
      setStep("CONFIRM");
    } else {
      setError(result.error || "Carrier not found.");
    }
    setLoading(false);
  };

  const handleClaim = async () => {
    setLoading(true);
    const result = await claimDotNumber(carrierData.dotNumber);
    if (result.success) {
      location.reload(); // Simple refresh to update dashboard state
    } else {
      setError(result.error || "Claim failed.");
      setLoading(false);
    }
  };

  if (step === "CONFIRM" && carrierData) {
    return (
      <div className="bg-industrial-900 border border-industrial-800 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-800">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">Is this you?</h2>
        
        <div className="bg-industrial-950 p-4 rounded-lg border border-industrial-800 my-6 text-left max-w-sm mx-auto">
            <p className="text-industrial-500 text-xs uppercase tracking-wider mb-1">Company Name</p>
            <p className="text-white font-bold text-lg mb-4">{carrierData.legalName}</p>
            
            <div className="flex justify-between">
                <div>
                    <p className="text-industrial-500 text-xs uppercase tracking-wider mb-1">DOT Number</p>
                    <p className="text-silver font-mono">{carrierData.dotNumber}</p>
                </div>
                <div className="text-right">
                    <p className="text-industrial-500 text-xs uppercase tracking-wider mb-1">Location</p>
                    <p className="text-silver">{carrierData.phyCity}, {carrierData.phyState}</p>
                </div>
            </div>
        </div>

        <div className="flex gap-3 justify-center">
            <button 
                onClick={() => setStep("SEARCH")}
                className="px-4 py-2 text-industrial-400 hover:text-white transition-colors"
            >
                No, search again
            </button>
            <button 
                onClick={handleClaim}
                disabled={loading}
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
            >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Yes, Claim Profile
            </button>
        </div>
        {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
      </div>
    );
  }

  // SEARCH STATE
  return (
    <div className="bg-industrial-900 border border-industrial-800 rounded-xl p-8 md:p-12 text-center">
      <div className="w-16 h-16 bg-industrial-800 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="h-8 w-8 text-display-yellow" />
      </div>
      <h2 className="text-2xl font-display font-bold text-white mb-2">Claim Your Authority</h2>
      <p className="text-industrial-400 max-w-lg mx-auto mb-8">
        Connect your USDOT Number to unlock automatic compliance tracking, instant COI generation, and fleet management.
      </p>

      <div className="max-w-md mx-auto relative">
        <div className="flex gap-2">
          <input
            type="text"
            value={dotInput}
            onChange={(e) => setDotInput(e.target.value)}
            placeholder="Enter USDOT Number..."
            className="flex-1 bg-industrial-950 border border-industrial-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-display-yellow focus:outline-none placeholder-industrial-600"
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-industrial-800 hover:bg-industrial-700 text-white px-6 py-3 rounded-lg font-bold border border-industrial-700 transition-colors flex items-center gap-2"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Search"}
          </button>
        </div>
        {error && (
            <div className="mt-4 p-3 bg-red-900/20 border border-red-900/50 rounded text-red-400 text-sm flex items-center gap-2 justify-center">
                <AlertTriangle className="h-4 w-4" />
                {error}
            </div>
        )}
        <p className="text-xs text-industrial-500 mt-3 flex items-center justify-center gap-1">
          We verify ownership via SAFER database email match.
        </p>
      </div>
    </div>
  );
}
