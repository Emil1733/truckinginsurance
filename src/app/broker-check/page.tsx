"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldCheck } from "lucide-react";

export default function BrokerSearchDirectory() {
  const [mcNumber, setMcNumber] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMc = mcNumber.replace(/[^0-9]/g, ""); // strip "MC-" or spaces
    if (cleanMc) {
      router.push(`/broker-check/${cleanMc}`);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0f1c] text-slate-200 py-24 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-8">
          <ShieldCheck className="w-4 h-4 mr-2" />
          Live FMCSA Broker Verification
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
          Check a Broker's Credit <br className="hidden md:block"/> & Bond Status
        </h1>
        
        <p className="text-xl text-slate-400 mb-12">
          Enter a Freight Broker's MC Number below to verify their active surety bond and generate a custom COI instantly.
        </p>

        <form onSubmit={handleSearch} className="relative group max-w-xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[32px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-[32px] p-2">
            <div className="pl-6 pr-2 text-slate-400">
              MC-
            </div>
            <input
              type="text"
              value={mcNumber}
              onChange={(e) => setMcNumber(e.target.value)}
              placeholder="123456"
              className="w-full bg-transparent border-none outline-none text-white text-2xl font-bold placeholder-slate-600 py-4"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] px-8 py-4 font-bold flex items-center transition-colors"
            >
              <Search className="w-5 h-5 mr-2" />
              Check Broker
            </button>
          </div>
        </form>

        <div className="mt-12 text-slate-500 text-sm flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Connected to FMCSA SAFER Database
        </div>

      </div>
    </main>
  );
}
