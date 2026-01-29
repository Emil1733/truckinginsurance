import { FileText, ShieldCheck, AlertTriangle, Clock, BadgeDollarSign, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";


// SEO Metadata Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<import("next").Metadata> {
  const { slug } = await params;
  const { data } = await supabase.from('state_filings').select('*').eq('slug', slug).single();

  if (!data) return { title: 'Filing Not Found' };

  return {
    title: `File ${data.form_id} Online | One-Day Processing (${data.state_code}) | TruckInsure`,
    description: `Need a ${data.official_name} (${data.form_id})? We file electronically with the DMV/FMCSA in 15 minutes. Avoid the $${data.penalty_per_day}/day penalty.`,
    openGraph: {
      title: `Instant ${data.form_id} Filing - ${data.state_code}`,
      description: `Don't let your authority lapse. We are an authorized e-filer for ${data.official_name}.`,
    }
  };
}

export async function generateStaticParams() {
  // Fetch all slugs from the DB to generate pages at build time
  const { data: filings } = await supabase.from('state_filings').select('slug');
  return (filings || []).map((f) => ({
    slug: f.slug,
  }));
}

export default async function FilingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const { data: filing } = await supabase
    .from('state_filings')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!filing) return notFound();

  return (
    <div className="min-h-screen bg-industrial-900 text-silver font-mono selection:bg-blue-500 selection:text-white">
      {/* HEADER */}
      <header className="border-b border-industrial-800 bg-industrial-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-xl tracking-tighter text-white">
            TRUCK<span className="text-blue-500">INSURE</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-green-500">FILING PORTAL ONLINE</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* LEFT: THE COMPLIANCE DATA */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mb-6">
              <FileText className="w-3 h-3" /> OFFICIAL FORM: {filing.form_id}
            </div>
            
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-6 leading-[0.9]">
              {filing.official_name}
            </h1>
            
            <p className="text-xl text-industrial-400 mb-8 border-l-2 border-blue-500 pl-6">
              {filing.purpose}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="bg-industrial-800 p-6 rounded border border-industrial-700">
                <div className="text-industrial-500 text-xs font-bold mb-1 uppercase">Penalty Risk</div>
                <div className="text-2xl font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" /> ${filing.penalty_per_day}/day
                </div>
              </div>
              <div className="bg-industrial-800 p-6 rounded border border-industrial-700">
                <div className="text-industrial-500 text-xs font-bold mb-1 uppercase">Filing Speed</div>
                <div className="text-2xl font-bold text-blue-400 flex items-center gap-2">
                  <Clock className="w-5 h-5" /> INSTANT
                </div>
              </div>
            </div>

            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              COMPLIANCE REQUIREMENTS
            </h3>
            <ul className="space-y-4 mb-12">
              {[
                  "Active Authority Verification",
                  "Financial Responsibility Proof",
                  "Electronic Transmission to State/FMCSA",
                  "Instant PDF Certificate Download"
                ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-silver">
                  <CheckCircle2 className="w-4 h-4 text-industrial-600 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: THE ACTION CARD */}
          <div className="bg-industrial-800 border-2 border-blue-500/50 p-8 rounded-lg sticky top-24 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">FILE {filing.form_id} NOW</h2>
              <p className="text-industrial-400 text-sm">
                Avoid fines. We transmit electronically to {filing.state_code === 'US' ? 'FMCSA' : `${filing.state_code} DMV`}.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between p-4 bg-industrial-900 rounded border border-industrial-700">
                <span className="text-silver">Filing Fee</span>
                <span className="text-white font-bold">${filing.filing_fee}</span>
              </div>
              <div className="flex justify-between p-4 bg-industrial-900 rounded border border-industrial-700">
                <span className="text-silver">Processing</span>
                <span className="text-blue-400 font-bold uppercase">Same Day</span>
              </div>
              <div className="flex justify-between p-4 bg-green-500/10 rounded border border-green-500/20">
                <span className="text-green-400">Total Due</span>
                <span className="text-white font-bold">${filing.filing_fee + 25}</span>
              </div>
            </div>

            <Link 
              href="/quote"
              className="block w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 text-center rounded transition-all shadow-lg hover:shadow-blue-500/25"
            >
              START {filing.form_id} FILING
            </Link>
            
            <p className="text-center text-xs text-industrial-500 mt-4">
              Authorized e-filer for {filing.state_code}.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
