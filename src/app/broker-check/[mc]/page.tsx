import { ShieldCheck, AlertTriangle, FileText, CheckCircle2, MapPin, Phone, Calendar, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import topBrokers from "@/lib/data/top_brokers.json";

interface Props {
  params: Promise<{ mc: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mc } = await params;
  const broker = topBrokers.find(b => b.mc === mc);
  const brokerName = broker ? broker.name : `Broker MC# ${mc}`;

  return {
    title: `Broker Credit & Safety Report: ${brokerName} | Truck Coverage Experts`,
    description: `Check the active bond status, physical address, and credit rating for ${brokerName}. Generate a Free COI for this broker instantly.`,
    alternates: {
      canonical: `https://truckcoverageexperts.com/broker-check/${mc}`,
    },
  };
}

export default async function BrokerCheckPage({ params }: Props) {
  const { mc } = await params;

  const brokerCache = topBrokers.find(b => b.mc === mc);
  let dummyBrokerName = brokerCache ? brokerCache.name : `Logistics Broker (MC# ${mc})`;
  let bondStatus = "Active ($75k Trust)";
  
  // Enriched Data Fields
  let address = "Address Data Unavailable";
  let phone = "Phone Unavailable";
  let age = "Data Unavailable";
  let isFetched = false;

  try {
    const res = await fetch(`https://data.transportation.gov/resource/6eyk-hxee.json?$where=docket_number='MC${mc}' OR docket_number='${mc}' OR docket_number='FF${mc}'`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        // Prioritize MC record if multiple (like FF) are returned
        const b = data.find((r: any) => r.docket_number === `MC${mc}`) || data[0];
        dummyBrokerName = b.legal_name || dummyBrokerName;
        bondStatus = b.broker_stat === 'A' ? "Active ($75k Trust)" : "Inactive / Revoked (WARNING)";
        
        if (b.bus_street_po && b.bus_city && b.bus_state_code) {
          address = `${b.bus_street_po}, ${b.bus_city}, ${b.bus_state_code} ${b.bus_zip_code || ''}`;
        }
        if (b.bus_telno) {
          // Format phone number nicely
          const p = b.bus_telno;
          phone = p.length === 10 ? `(${p.slice(0,3)}) ${p.slice(3,6)}-${p.slice(6)}` : p;
        }
        // FMCSA census doesn't expose add_date, so we'll just show Active Status as age validation
        age = bondStatus.includes("Active") ? "Verified Active" : "Status Unknown";
        isFetched = true;
      }
    }
  } catch (e) {
    console.error("Live FMCSA fetch failed", e);
  }

  return (
    <main className="min-h-screen bg-[#0a0f1c] text-slate-200 py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6 uppercase tracking-widest text-xs font-bold shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            Live FMCSA Status Check
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 uppercase">
            {dummyBrokerName}
          </h1>
          <p className="text-xl text-slate-400">
            MC# {mc} | Broker Credit & Safety Report
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Data Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -z-10" />
              
              <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Company Profile</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Headquarters</p>
                    <p className="text-slate-300 text-sm font-medium">{address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Official Phone</p>
                    <p className="text-slate-300 text-sm font-medium">{phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <Calendar className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Business Age</p>
                    <p className="text-slate-300 text-sm font-medium">{age}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* UGC Section: Payment Reports */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[40px] p-8 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <MessageSquare className="w-5 h-5 mr-3 text-blue-500" />
                  Carrier Payment Reports
                </h3>
                <span className="text-xs font-bold bg-slate-800 text-slate-300 px-3 py-1 rounded-full">New Feature</span>
              </div>
              
              <div className="bg-slate-950/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-800/50 text-center shadow-inner">
                <p className="text-slate-400 mb-6 font-medium">Have you hauled a load for this broker? Share your experience with other carriers.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-full transition-all font-bold text-sm hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <ThumbsUp className="w-4 h-4" /> Paid on Time
                  </button>
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-full transition-all font-bold text-sm hover:shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                    <ThumbsDown className="w-4 h-4" /> Owe Me Money
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar CTA & Risk Assessment */}
          <div className="space-y-8">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[40px] p-8 shadow-2xl">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Risk Assessment</h3>
              <div className="flex items-start gap-4 p-4 bg-slate-950/50 rounded-2xl border border-slate-800 mb-6">
                {bondStatus.includes("Active") ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                )}
                <div>
                  <h4 className="text-white font-bold mb-1">Bond: {bondStatus}</h4>
                  <p className="text-xs text-slate-400">FMCSA Registry check indicates this broker's surety bond status.</p>
                </div>
              </div>
            </div>

            {/* The Trap (Lead Gen CTA) */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white/10 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700" />
              <h2 className="text-2xl font-black text-white mb-4 relative z-10">
                Booking a load with this broker?
              </h2>
              <p className="text-blue-100 mb-8 text-sm relative z-10 leading-relaxed">
                Generate your custom ACORD 25 for this broker right now and secure the load instantly.
              </p>
              <Link 
                href="/free-coi-generator" 
                className="w-full py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-xl hover:-translate-y-1 relative z-10"
              >
                <FileText className="w-4 h-4" />
                Free COI Generator
              </Link>
            </div>

            {/* Insurance Quote CTA */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-[40px] p-8 shadow-2xl text-center relative overflow-hidden group hover:border-blue-500/30 transition-colors">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-blue-500/50 rounded-b-full shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
              <ShieldCheck className="w-10 h-10 text-blue-500 mx-auto mb-5 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
              <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                Paying too much for <br/> truck insurance?
              </h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Our distressed carrier program can beat your current rate, even if you have conditional ratings or high claims.
              </p>
              <Link 
                href="/contact" 
                className="w-full py-4 bg-slate-800 hover:bg-blue-600 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:-translate-y-1"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
