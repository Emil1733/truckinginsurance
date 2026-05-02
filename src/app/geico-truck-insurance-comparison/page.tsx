import { CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, FileText, Info, Search, ShieldAlert, BadgeCheck, ListChecks, Zap, XCircle, Scale, Brain, Shield } from "lucide-react";
import Link from "next/link";
import { GEICO_SECTIONS, ContentSection, BROKERS_DATA } from "@/lib/data/brokers";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BrokerLeadForm } from "@/components/BrokerLeadForm";

export const metadata = {
  title: "GEICO Truck Insurance: 5 Things They Don't Tell Owner-Operators",
  description: "Before you bind a GEICO commercial truck policy, read this forensic comparison. See why generalist insurance could cost you your authority.",
  alternates: {
    canonical: 'https://truckcoverageexperts.com/geico-truck-insurance-comparison',
  },
};

// Sub-components for Section Types
const StepperSection = ({ section }: { section: ContentSection }) => (
  <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10 overflow-hidden relative mb-12">
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full" />
    <h2 className="text-3xl font-bold text-white mb-2">{section.title}</h2>
    <p className="text-slate-500 mb-12 max-w-xl">{section.subtitle}</p>
    <div className="space-y-8">
      {section.steps?.map((step, i) => (
        <div key={i} className="flex gap-6 items-start group">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-xl shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
            {i + 1}
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
            <p className="text-slate-400 leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ComparisonSection = ({ section }: { section: ContentSection }) => (
  <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10 mb-12">
    <h2 className="text-3xl font-bold text-white mb-2">{section.title}</h2>
    <p className="text-slate-500 mb-10">{section.subtitle}</p>
    <div className="grid grid-cols-1 gap-4">
      {section.comparisons?.map((comp, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-red-500/5 rounded-3xl border border-red-500/10 flex items-center gap-4">
            <XCircle className="w-6 h-6 text-red-500 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-black text-red-400 mb-1">Generalist Policy</p>
              <p className="text-slate-300 font-medium">{comp.error}</p>
            </div>
          </div>
          <div className="p-6 bg-green-500/5 rounded-3xl border border-green-500/10 flex items-center gap-4">
            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-black text-green-400 mb-1">Specialist Policy</p>
              <p className="text-white font-bold">{comp.fix}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function GeicoComparisonPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-slate-800 bg-slate-950/50 pt-24 pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: 'Comparison Audit', href: '/' },
              { label: 'GEICO vs Specialist', href: '/geico-truck-insurance-comparison' }
            ]} 
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-8 animate-pulse">
                <Scale className="w-4 h-4 mr-2" />
                Comparison Audit: Generalist vs. Specialist
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-[0.9] mb-8">
                GEICO <br/>
                <span className="text-blue-500 italic text-5xl md:text-6xl">vs. Specialist</span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
                GEICO spends millions on advertising, but do they understand the 14 Federal Filings required for your authority? Before you bind with a car insurance company, read the forensic truth.
              </p>
            </div>
            
            <div className="lg:col-span-5">
              <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-[40px] border border-slate-800 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <BadgeCheck className="w-6 h-6 mr-2 text-blue-500" />
                  Compare Specialist Rates
                </h3>
                <BrokerLeadForm brokerName="GEICO Comparison" ctaText="GET SPECIALIST QUOTE" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8">
             {/* The "Danger" Meter */}
             <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10 backdrop-blur-sm mb-12">
              <h2 className="text-3xl font-bold text-white mb-10 flex items-center">
                <ShieldAlert className="w-8 h-8 mr-4 text-red-500" />
                The Generalist Risk Audit
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Filing Speed', val: 'Delayed', status: 'High Risk', color: 'text-red-500' },
                  { label: 'Carrier411 Sync', val: 'None', status: 'Restricted', color: 'text-red-500' },
                  { label: 'Claims Unit', val: 'Generic', status: 'Unqualified', color: 'text-red-500' },
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className={`text-2xl font-bold ${item.color}`}>{item.val}</p>
                    <p className="text-[10px] text-slate-600 mt-2 font-bold uppercase tracking-tighter">{item.status}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Render the Hijack Content */}
            {GEICO_SECTIONS.map((section, index) => (
              <div key={index}>
                {section.type === 'stepper' && <StepperSection section={section} />}
                {section.type === 'comparison' && <ComparisonSection section={section} />}
                {section.type === 'checklist' && (
                  <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10 mb-12">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                      <ShieldCheck className="w-8 h-8 mr-4 text-blue-500" />
                      {section.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.items?.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                          <span className="text-sm text-slate-400">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {section.type === 'text' && (
                  <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10 mb-12">
                    <h2 className="text-3xl font-bold text-white mb-6">{section.title}</h2>
                    <p className="text-lg text-slate-400 leading-relaxed whitespace-pre-wrap">{section.content}</p>
                  </div>
                )}
                {section.type === 'callout' && (
                   <div className="bg-red-500/10 border border-red-500/20 rounded-[32px] p-8 mb-12 flex gap-6">
                     <AlertTriangle className="w-8 h-8 text-red-500 shrink-0" />
                     <div>
                       <h4 className="text-xl font-bold text-white mb-2">{section.title}</h4>
                       <p className="text-slate-400">{section.content}</p>
                     </div>
                   </div>
                )}
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-8">
              {/* Compliance Network Sidebar */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-blue-500" />
                  Expert Network
                </h3>
                <div className="space-y-4">
                  <Link 
                    href="/amazon-relay-insurance"
                    className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all group"
                  >
                    <span className="text-sm font-bold text-slate-300 group-hover:text-white">Amazon Specialist</span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link 
                    href="/uiia-certification"
                    className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all group"
                  >
                    <span className="text-sm font-bold text-slate-300 group-hover:text-white">Port Gateway</span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link 
                    href="/broker/tql-approval"
                    className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all group"
                  >
                    <span className="text-sm font-bold text-slate-300 group-hover:text-white">TQL Specialist</span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-[40px] p-10">
                <Shield className="w-8 h-8 text-blue-500 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Specialist Claims Unit</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Our claims adjusters have 20+ years of experience in commercial trucking. We understand cargo perishability, ELD datachallenges, and the "Amazon Offset" claims process.
                </p>
                <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-xs text-blue-400 font-bold uppercase tracking-widest text-center">
                  Specialist Status: ACTIVE
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
