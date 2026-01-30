import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowRight, ShieldAlert, Zap, FileWarning, Truck, Map, AlertTriangle } from "lucide-react";

export default async function Home() {
  // Parallel Data Fetching (Limited to 6 for "Preview" Mode)
  const [{ data: violations }, { data: filings }, { data: trailers }] = await Promise.all([
    supabase.from('violations').select('*').order('severity_tier', { ascending: false }).limit(6),
    supabase.from('state_filings').select('*').order('state_code', { ascending: true }).limit(6),
    supabase.from('trailer_risk_profiles').select('*').order('premium_multiplier', { ascending: false }).limit(6)
  ]);

  return (
    <div className="min-h-screen bg-industrial-900 text-silver font-mono selection:bg-safety-orange selection:text-black">
      
      {/* HERO: THE PROBLEM SOLVER */}
      <section className="relative px-6 py-20 border-b border-industrial-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-industrial-800 to-industrial-900">
        <div className="max-w-6xl mx-auto text-center mb-16">
           <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter">
             The Shop for the <span className="text-safety-orange">Uninsurable.</span>
           </h1>
           <p className="text-xl text-industrial-400 max-w-2xl mx-auto">
             If other agents said "No," you are in the right place. Select your problem below.
           </p>
        </div>

        {/* DASHBOARD GRID (BIG BUTTONS FOR FAT FINGERS) */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* CARD 1: VIOLATIONS */}
          <Link href="#violations" className="group bg-industrial-800 p-8 rounded-xl border border-industrial-700 hover:border-red-500 hover:bg-industrial-800/80 transition-all shadow-lg hover:shadow-red-900/20">
             <div className="flex items-center justify-between mb-4">
               <div className="w-12 h-12 bg-red-900/30 text-red-500 rounded-lg flex items-center justify-center border border-red-900/50 group-hover:bg-red-500 group-hover:text-black transition-colors">
                 <AlertTriangle className="w-6 h-6" />
               </div>
               <ArrowRight className="text-industrial-600 group-hover:text-red-500 transition-colors" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">I Have a Ticket</h3>
             <p className="text-sm text-industrial-400">DUI, Reckless Driving, or Out-of-Service violations.</p>
          </Link>

          {/* CARD 2: BROKER DENIALS */}
          <Link href="#brokers" className="group bg-industrial-800 p-8 rounded-xl border border-industrial-700 hover:border-safety-orange hover:bg-industrial-800/80 transition-all shadow-lg hover:shadow-orange-900/20">
             <div className="flex items-center justify-between mb-4">
               <div className="w-12 h-12 bg-orange-900/30 text-safety-orange rounded-lg flex items-center justify-center border border-orange-900/50 group-hover:bg-safety-orange group-hover:text-black transition-colors">
                 <ShieldAlert className="w-6 h-6" />
               </div>
               <ArrowRight className="text-industrial-600 group-hover:text-safety-orange transition-colors" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">Denied by Broker</h3>
             <p className="text-sm text-industrial-400">Amazon Relay, CH Robinson, or TQL rejected your insurance.</p>
          </Link>

          {/* CARD 3: PERMITS */}
          <Link href="#filings" className="group bg-industrial-800 p-8 rounded-xl border border-industrial-700 hover:border-blue-500 hover:bg-industrial-800/80 transition-all shadow-lg hover:shadow-blue-900/20">
             <div className="flex items-center justify-between mb-4">
               <div className="w-12 h-12 bg-blue-900/30 text-blue-500 rounded-lg flex items-center justify-center border border-blue-900/50 group-hover:bg-blue-500 group-hover:text-black transition-colors">
                 <Map className="w-6 h-6" />
               </div>
               <ArrowRight className="text-industrial-600 group-hover:text-blue-500 transition-colors" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">I Need a Filing</h3>
             <p className="text-sm text-industrial-400">SR-22, Form E, Form H, or BMC-91X for new authorities.</p>
          </Link>

        </div>
      </section>

      {/* SECTION: BROKER RECOVERY (HIGH PRIORITY) */}
      <section id="brokers" className="py-20 px-6 border-b border-industrial-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-2 h-8 bg-safety-orange rounded-full"></div>
            <h2 className="text-3xl font-display text-white">BROKER DENIALS</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
             {[
                { name: 'Amazon Relay', slug: 'amazon-relay', limit: '$1M Auto / $100k Cargo' },
                { name: 'C.H. Robinson', slug: 'ch-robinson', limit: 'Risk Assessment Override' },
                { name: 'TQL', slug: 'tql', limit: 'Reefer Breakdown Req' },
                { name: 'Coyote Logistics', slug: 'coyote-logistics', limit: '30-Day Authority Rule' },
                { name: 'Landstar', slug: 'landstar', limit: 'Safety Score Vetting' },
             ].map((broker) => (
                <Link 
                  key={broker.slug}
                  href={`/broker/${broker.slug}`}
                  className="flex items-center justify-between p-6 bg-industrial-800 rounded border border-industrial-700 hover:border-safety-orange transition-colors group"
                >
                  <div>
                    <div className="font-bold text-white group-hover:text-safety-orange">{broker.name}</div>
                    <div className="text-xs text-industrial-500">{broker.limit}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-industrial-600 group-hover:text-safety-orange" />
                </Link>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION: CONDITIONAL SAFETY RATINGS (VECTOR 6) */}
      <section id="safety-ratings" className="py-20 px-6 border-b border-industrial-800 bg-black/40 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-900/10 blur-[100px] rounded-full -z-10"></div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-yellow-900/30 text-yellow-500 text-xs font-bold mb-4 border border-yellow-800 uppercase tracking-widest">
              <AlertTriangle className="w-4 h-4" /> THE DEATH SPIRAL
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              CONDITIONAL SAFETY RATING?
            </h2>
            <p className="text-xl text-industrial-400 max-w-2xl mx-auto">
              A downgrade to "Conditional" usually causes a 30-day cancellation notice. 
              We can lift the notice by proving you have a <strong>Corrective Action Plan (CAP)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
             {[
               { num: 1, name: 'General', slug: 'factor-1-general' },
               { num: 2, name: 'Driver', slug: 'factor-2-driver' },
               { num: 3, name: 'Operational', slug: 'factor-3-operational' },
               { num: 4, name: 'Vehicle', slug: 'factor-4-vehicle-maintenance' },
               { num: 5, name: 'Hazmat', slug: 'factor-5-hazmat' },
               { num: 6, name: 'Crash', slug: 'factor-6-crash-rate' },
             ].map((factor) => (
                <Link 
                  key={factor.slug}
                  href={`/safety-rating/${factor.slug}`}
                  className="group bg-industrial-800 p-4 rounded border border-industrial-700 hover:border-yellow-500 transition-all text-center hover:-translate-y-1"
                >
                   <div className="text-xs text-industrial-500 font-bold mb-2 uppercase tracking-widest">FACTOR {factor.num}</div>
                   <div className="text-white font-bold group-hover:text-yellow-500 transition-colors">{factor.name}</div>
                </Link>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION: LATEST VIOLATIONS (PREVIEW) */}
      <section id="violations" className="py-20 px-6 border-b border-industrial-800 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-2 h-8 bg-red-500 rounded-full"></div>
              <h2 className="text-3xl font-display text-white">COMMON VIOLATIONS</h2>
            </div>
            <Link href="/violations" className="text-sm text-industrial-500 hover:text-white uppercase tracking-widest font-bold">View All &rarr;</Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {violations?.map((v) => (
               <Link key={v.code} href={`/violation/${v.slug}`} className="block bg-industrial-800 p-6 rounded border border-industrial-700 hover:border-red-500 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xl font-bold text-white">{v.code}</span>
                    <span className="text-xs bg-red-900/30 text-red-500 px-2 py-1 rounded border border-red-900/50">TIER {v.severity_tier}</span>
                  </div>
                  <p className="text-industrial-400 text-sm line-clamp-2">{v.official_name}</p>
               </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: STATE FILINGS (PREVIEW) */}
      <section id="filings" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
             <div className="flex items-center gap-4">
              <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
              <h2 className="text-3xl font-display text-white">STATE PERMITS</h2>
            </div>
            <Link href="/filings" className="text-sm text-industrial-500 hover:text-white uppercase tracking-widest font-bold">View All &rarr;</Link>
          </div>

           <div className="grid md:grid-cols-3 gap-6">
            {filings?.map((f) => (
               <Link key={f.slug} href={`/filing/${f.slug}`} className="block bg-industrial-800 p-6 rounded border border-industrial-700 hover:border-blue-500 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-2xl font-bold text-industrial-600">{f.state_code}</span>
                    <ArrowRight className="w-5 h-5 text-industrial-600" />
                  </div>
                  <div className="text-white font-bold">{f.form_id}</div>
                  <p className="text-xs text-industrial-500 mt-2">{f.official_name}</p>
               </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

