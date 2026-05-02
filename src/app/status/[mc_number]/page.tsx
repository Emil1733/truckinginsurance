import { AlertOctagon, Info, MapPin, Truck, Box, PhoneCall, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import RevocationTimer from "@/components/RevocationTimer";
import { createClient } from "@supabase/supabase-js";

// Create an admin client to bypass RLS (since this is a secure Server Component)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// SEO Metadata Generation
export async function generateMetadata({ params }: { params: Promise<{ mc_number: string }> }): Promise<import("next").Metadata> {
  const { mc_number } = await params;
  
  // Clean up the MC number from the slug (e.g. "mc-123456" -> "123456")
  const rawMc = mc_number.replace('mc-', '').toUpperCase();
  
  const { data } = await supabaseAdmin
    .from('fmcsa_revocations')
    .select('*')
    .eq('mc_number', rawMc)
    .single();

  if (!data) return { title: 'Status Not Found | Truck Coverage Experts' };

  return {
    title: `URGENT: ${data.company_name} (MC-${data.mc_number}) Revocation Notice`,
    description: `FMCSA WARNING: Operating authority for ${data.company_name} in ${data.address_city}, ${data.address_state} is scheduled for revocation due to ${data.violation_reason}.`,
    openGraph: {
      title: `${data.company_name} Revocation Warning`,
      description: `Authority revocation pending for MC-${data.mc_number}. Reinstatement required.`,
    },
    alternates: {
      canonical: `/status/mc-${rawMc.toLowerCase()}`,
    }
  };
}

export const revalidate = 3600; // 1 hour revalidation since countdowns are time sensitive

export async function generateStaticParams() {
  const { data: revocations } = await supabaseAdmin
    .from('fmcsa_revocations')
    .select('mc_number')
    .eq('status', 'PENDING');
    
  return (revocations || []).map((r) => ({
    mc_number: `mc-${r.mc_number.toLowerCase()}`,
  }));
}

export default async function RevocationPage({ params }: { params: Promise<{ mc_number: string }> }) {
  const { mc_number } = await params;
  const rawMc = mc_number.replace('mc-', '').toUpperCase();
  
  const { data } = await supabaseAdmin
    .from('fmcsa_revocations')
    .select('*')
    .eq('mc_number', rawMc)
    .single();

  if (!data) return notFound();

  const isResolved = data.status === 'RESOLVED';

  // JSON-LD Schema (Anti-Thin Content)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': data.company_name,
    'identifier': `MC-${data.mc_number}`,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': data.address_city,
      'addressRegion': data.address_state
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* HEADER BANNER */}
      <div className={`pt-32 pb-12 ${isResolved ? 'bg-emerald-900' : 'bg-red-950'} text-white border-b-4 ${isResolved ? 'border-emerald-500' : 'border-red-600'}`}>
        <div className="max-w-5xl mx-auto px-6">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "FMCSA Status", href: "/status" },
            { label: `MC-${data.mc_number}`, href: `/status/mc-${data.mc_number.toLowerCase()}` }
          ]} />
          
          <div className="mt-8 flex items-start gap-4">
            {isResolved ? (
              <ShieldAlert className="w-12 h-12 text-emerald-400 shrink-0" />
            ) : (
              <AlertOctagon className="w-12 h-12 text-red-500 shrink-0 animate-pulse" />
            )}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${isResolved ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                  {isResolved ? 'Authority Active' : 'Revocation Pending'}
                </span>
                <span className="text-slate-400 text-sm">MC-{data.mc_number} | USDOT {data.usdot_number}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4">
                {data.company_name}
              </h1>
              {!isResolved && (
                <p className="text-xl text-red-200/80 font-medium max-w-2xl">
                  FMCSA operating authority is scheduled to be revoked due to: <strong className="text-white">{data.violation_reason}</strong>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* MAIN COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          
          {!isResolved && (
            <section>
              <RevocationTimer targetDate={data.scheduled_revocation_date} />
            </section>
          )}

          {/* COMPANY PROFILE (ANTI-THIN CONTENT) */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-600" />
              Company Profile & Registration Data
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500 font-medium">Principal Place of Business</p>
                  <p className="text-slate-900 font-bold">{data.address_city}, {data.address_state}</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Operating out of {data.address_state}, {data.company_name} is required to maintain commercial auto liability insurance in compliance with both federal FMCSA limits and {data.address_state} state regulations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500 font-medium">Registered Fleet Size</p>
                  <p className="text-slate-900 font-bold">{data.power_units} Power Units | {data.drivers} Drivers</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 md:col-span-2">
                <Box className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm text-slate-500 font-medium">Authorized Cargo</p>
                  <p className="text-slate-900 font-bold">{data.cargo_type}</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Because this carrier is authorized to transport {data.cargo_type.toLowerCase()}, any lapse in the required Cargo or Liability insurance will trigger an immediate FMCSA revocation warning.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* BROKER WARNING SECTION */}
          <section className="bg-amber-50 rounded-2xl border-l-4 border-amber-500 p-8">
            <h3 className="text-xl font-bold text-amber-900 mb-2">Attention Freight Brokers & Shippers</h3>
            <p className="text-amber-800 leading-relaxed">
              Dispatching a load to <strong>{data.company_name}</strong> after the revocation deadline may result in severe federal penalties and un-insured cargo liabilities. Please verify their Form E has been successfully reinstated on the FMCSA SAFER system before releasing freight.
            </p>
          </section>

        </div>

        {/* SIDEBAR (THE LEAD TRAP) */}
        <div className="space-y-6">
          <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl sticky top-8">
            <h3 className="text-2xl font-black mb-4">Are you the owner?</h3>
            <p className="text-blue-100 mb-6">
              Do not let your MC Number get shut down. We can bind coverage and file your Form E today to stop the revocation.
            </p>
            
            <Link 
              href="/quote"
              className="flex items-center justify-center gap-2 w-full bg-white text-blue-700 py-4 px-6 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              Get Audit-Ready Quote <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="mt-6 pt-6 border-t border-blue-500/50">
              <p className="text-sm text-blue-200 mb-2">Or call for immediate filing:</p>
              <a href="tel:18005550199" className="flex items-center gap-2 text-xl font-bold">
                <PhoneCall className="w-5 h-5" />
                (800) 555-0199
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
