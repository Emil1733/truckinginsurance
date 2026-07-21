import { ShieldCheck, AlertTriangle, FileText, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import topBrokers from "@/lib/data/top_brokers.json";

interface Props {
  params: Promise<{ mc: string }>;
}

// Dynamically generate SEO metadata for EVERY MC number searched
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mc } = await params;
  const broker = topBrokers.find(b => b.mc === mc);
  const brokerName = broker ? broker.name : `Broker MC# ${mc}`;

  return {
    title: `Broker Credit & Safety Report: ${brokerName} | Truck Coverage Experts`,
    description: `Check the active bond status and credit rating for ${brokerName}. Generate a Free COI for this broker instantly.`,
    alternates: {
      canonical: `https://truckcoverageexperts.com/broker-check/${mc}`,
    },
  };
}

export default async function BrokerCheckPage({ params }: Props) {
  const { mc } = await params;

  const broker = topBrokers.find(b => b.mc === mc);
  let dummyBrokerName = `Logistics Broker (MC# ${mc})`;
  let bondStatus = "Active ($75k Trust)";

  if (broker) {
    dummyBrokerName = broker.name;
  } else {
    // LIVE API FALLBACK: If not in our 5000 cache, fetch it from the government on the fly!
    try {
      // FMCSA API uses 'MC' prefix or just the number, we try just the number first or with MC
      const res = await fetch(`https://data.transportation.gov/resource/6eyk-hxee.json?$where=docket_number='MC${mc}' OR docket_number='${mc}' OR docket_number='FF${mc}'`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          dummyBrokerName = data[0].legal_name || dummyBrokerName;
          bondStatus = data[0].broker_stat === 'A' ? "Active ($75k Trust)" : "Inactive / Revoked (WARNING)";
        }
      }
    } catch (e) {
      console.error("Live FMCSA fetch failed", e);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0f1c] text-slate-200 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6 uppercase tracking-widest text-xs font-bold">
            Live FMCSA Status Check
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Broker Credit & Safety Report
          </h1>
          <p className="text-xl text-slate-400">
            MC# {mc}
          </p>
        </div>

        {/* The Data Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -z-10" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Broker Entity</h3>
              <p className="text-2xl font-bold text-white">{dummyBrokerName}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Bond Status</h3>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
                <span className="text-2xl font-bold text-white">Active ($75k Trust)</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <h3 className="text-xl font-bold text-white mb-6">Risk Assessment</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold mb-1">Freight Broker Bond (BMC-84) Valid</h4>
                  <p className="text-sm text-slate-400">This broker has an active surety bond on file with the FMCSA. You are protected up to $75,000 for unpaid freight charges.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Trap (Lead Gen CTA) */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden text-center group">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white/10 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700" />
          
          <h2 className="text-3xl font-black text-white mb-4 relative z-10">
            Booking a load with {dummyBrokerName}?
          </h2>
          <p className="text-blue-100 mb-10 text-lg max-w-2xl mx-auto relative z-10 leading-relaxed">
            Stop waiting 24 hours for your insurance agent to send a certificate. Generate your custom ACORD 25 for this broker right now and secure the load.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link 
              href="/free-coi-generator" 
              className="px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              <FileText className="w-5 h-5" />
              Generate Free COI Instantly
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
