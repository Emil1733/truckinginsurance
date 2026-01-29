import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowRight, ShieldAlert, Zap, FileWarning } from "lucide-react";

export default async function Home() {
  // Parallel Data Fetching
  const [{ data: violations }, { data: filings }] = await Promise.all([
    supabase.from('violations').select('*').order('severity_tier', { ascending: false }),
    supabase.from('state_filings').select('*').order('state_code', { ascending: true })
  ]);

  return (
    <div className="min-h-screen bg-industrial-900 text-silver font-mono selection:bg-safety-orange selection:text-black">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 border-b border-industrial-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-industrial-800 to-industrial-900">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-safety-orange/30 bg-safety-orange/5 text-safety-orange text-xs font-bold tracking-widest uppercase">
            Specialized High-Risk Insurance
          </div>
          <h1 className="font-display text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[0.9]">
            UNINSURABLE? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-safety-orange to-safety-yellow">
              NOT ANYMORE.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-industrial-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            The major carriers rely on algorithms that auto-reject specific violation codes. 
            We rely on specialized underwriters who understand <strong className="text-silver">rehabilitation</strong>.
          </p>
        </div>
      </section>

      {/* The Directory "Hub" */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-display text-3xl text-white flex items-center gap-3">
            <FileWarning className="text-safety-orange" />
            VIOLATION DATABASE
          </h2>
          <div className="text-xs text-industrial-600 font-mono hidden sm:block">
            INDEXING {violations?.length || 0} ACTIVE CODES
          </div>
        </div>


        {/* SECTION 2: FILINGS (VECTOR 2) */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px bg-industrial-800 flex-1"></div>
            <h2 className="text-2xl font-display text-white tracking-widest">STATE FILINGS</h2>
            <div className="h-px bg-industrial-800 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filings?.map((f) => (
              <Link 
                key={f.slug}
                href={`/filing/${f.slug}`}
                className="group relative bg-industrial-800 border border-industrial-700 p-6 hover:border-blue-500 transition-all hover:-translate-y-1 block"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="font-mono text-4xl text-industrial-700 font-bold group-hover:text-industrial-600 transition-colors">
                    {f.state_code}
                  </div>
                  <ArrowRight className="text-industrial-600 group-hover:text-blue-500 transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold text-silver mb-2 group-hover:text-white">
                  {f.form_id}
                </h3>
                <p className="text-sm text-industrial-400 line-clamp-2">
                  {f.official_name}
                </p>

                <div className="mt-4 pt-4 border-t border-industrial-700 flex justify-between text-xs font-mono">
                  <span className="text-blue-500">INSTANT FILE</span>
                  <span className="text-industrial-500">PENALTY: ${f.penalty_per_day}/DAY</span>
                </div>
              </Link>
            ))}
            
            {(!filings || filings.length === 0) && (
              <div className="col-span-full py-12 text-center text-industrial-600 border border-dashed border-industrial-800 rounded">
                DATABASE SYNCING... TRY REFRESHING OR CHECK SUPABASE CONNECTION.
              </div>
            )}
          </div>
        </div>

        {/* SECTION 1: VIOLATIONS (VECTOR 1) */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px bg-industrial-800 flex-1"></div>
          <h2 className="text-2xl font-display text-white tracking-widest">VIOLATION CODES</h2>
          <div className="h-px bg-industrial-800 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {violations?.map((violation) => (
            <Link 
              key={violation.code}
              href={`/violation/${violation.slug}`}
              className="group bg-industrial-800 border border-industrial-700 hover:border-safety-orange p-6 transition-all hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="font-display text-2xl text-white group-hover:text-safety-orange transition-colors">
                  {violation.code}
                </div>
                <div className={`text-xs px-2 py-1 rounded font-bold ${
                  violation.severity_tier >= 9 ? 'bg-red-900/30 text-red-500' : 
                  violation.severity_tier >= 7 ? 'bg-orange-900/30 text-orange-500' :
                  'bg-yellow-900/30 text-yellow-500'
                }`}>
                  TIER {violation.severity_tier}
                </div>
              </div>
              
              <h3 className="text-silver font-bold mb-2 line-clamp-1">{violation.official_name}</h3>
              <p className="text-xs text-industrial-500 mb-6 uppercase tracking-wider">
                {violation.layman_name}
              </p>

              <div className="flex items-center text-safety-orange text-sm font-bold gap-2 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                VIEW RECOVERY PLAN <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Value Props */}
      <section className="border-t border-industrial-800 bg-industrial-800/20 py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-industrial-800 rounded-full flex items-center justify-center mb-6 border border-industrial-700 text-safety-orange">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-white font-bold mb-2">Instant Filings</h3>
            <p className="text-industrial-500 text-sm">We file Forms E, H, and SR-22s electronically. No waiting for an agent to fax common forms.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-industrial-800 rounded-full flex items-center justify-center mb-6 border border-industrial-700 text-safety-orange">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="absolute opacity-85 blur-[60px] -z-10 w-[30rem] h-[30rem] bg-orange-400 rounded-full"></div>
            <h3 className="text-white font-bold mb-2">Distressed Markets</h3>
            <p className="text-industrial-500 text-sm">Access to Lloyd's of London and Prime Insurance. We go where Progressive won't.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-industrial-800 rounded-full flex items-center justify-center mb-6 border border-industrial-700 text-safety-orange">
              <FileWarning className="w-8 h-8" />
            </div>
            <h3 className="text-white font-bold mb-2">Violation Experts</h3>
            <p className="text-industrial-500 text-sm">We know the difference between a "Clerical 395.8e" and a "Fraudulent one". It matters.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
