import { CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, FileText, Info, Search, ShieldAlert, BadgeCheck, ListChecks, Zap, XCircle, Anchor, Ship, Box, Truck } from "lucide-react";
import Link from "next/link";
import { UIIA_SECTIONS, ContentSection, BROKERS_DATA } from "@/lib/data/brokers";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BrokerLeadForm } from "@/components/BrokerLeadForm";

export const metadata = {
  title: 'UIIA Port Certification | 48-Hour Port Access & Amazon Intermodal Gateway',
  description: 'Need port access? Get your UIIA certification in 48 hours. We specialize in EDI insurance filings for US ports and Amazon Relay intermodal loads.',
  alternates: {
    canonical: 'https://truckcoverageexperts.com/uiia-certification',
  },
};

// Sub-components for Section Types
const StepperSection = ({ section }: { section: ContentSection }) => (
  <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10 overflow-hidden relative mb-12">
    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/5 blur-3xl rounded-full" />
    <h2 className="text-3xl font-bold text-white mb-2">{section.title}</h2>
    <p className="text-slate-500 mb-12 max-w-xl">{section.subtitle}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {section.steps?.map((step, i) => (
        <div key={i} className="relative group">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-lg relative z-10 shadow-lg shadow-cyan-600/20 group-hover:scale-110 transition-transform">
              {i + 1}
            </div>
            {i < (section.steps?.length || 0) - 1 && (
              <div className="hidden lg:block absolute left-10 w-full h-[2px] bg-slate-800 top-5 -z-0" />
            )}
          </div>
          <h4 className="text-white font-bold mb-2">{step.title}</h4>
          <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const ComparisonSection = ({ section }: { section: ContentSection }) => (
  <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10 mb-12">
    <h2 className="text-3xl font-bold text-white mb-2">{section.title}</h2>
    <p className="text-slate-500 mb-10">{section.subtitle}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {section.comparisons?.map((comp, i) => (
        <div key={i} className="grid grid-cols-1 gap-1 border border-slate-800 rounded-3xl overflow-hidden">
          <div className="p-4 bg-red-500/5 flex items-center gap-3 border-b border-slate-800">
            <XCircle className="w-5 h-5 text-red-500 shrink-0" />
            <span className="text-sm text-red-200 font-medium">{comp.error}</span>
          </div>
          <div className="p-4 bg-green-500/5 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
            <span className="text-sm text-green-200 font-bold">{comp.fix}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ChecklistSection = ({ section }: { section: ContentSection }) => (
  <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10 mb-12">
    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
      <ListChecks className="w-8 h-8 mr-4 text-cyan-500" />
      {section.title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
      {section.items?.map((item, i) => (
        <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-800/50">
          <div className="w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-cyan-500" />
          </div>
          <span className="text-slate-400 font-medium">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function UIIAPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-slate-800 bg-slate-950/50 pt-24 pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: 'Rescue Funnels', href: '/' },
              { label: 'UIIA Port Gateway', href: '/uiia-certification' }
            ]} 
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-8 animate-pulse">
                <Anchor className="w-4 h-4 mr-2" />
                Infrastructure Gateway: UIIA Port Certification
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-[0.9] mb-8">
                UIIA <span className="text-cyan-500 italic text-5xl">Certification</span> <br/>
                <span className="text-white">& Amazon Intermodal</span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
                Need port access? We provide direct EDI filings to the UIIA database, securing your intermodal certification in 48 hours. Satisfy Amazon Relay intermodal requirements today.
              </p>
            </div>
            
            <div className="lg:col-span-5">
              <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-[40px] border border-slate-800 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <BadgeCheck className="w-6 h-6 mr-2 text-cyan-500" />
                  Request UIIA Audit
                </h3>
                <BrokerLeadForm brokerName="UIIA Port Certification" ctaText="GET PORT CERTIFIED NOW" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8">
             {/* Port Compliance Matrix */}
             <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10 backdrop-blur-sm mb-12">
              <h2 className="text-3xl font-bold text-white mb-10 flex items-center">
                <Ship className="w-8 h-8 mr-4 text-cyan-500" />
                Intermodal Filing Matrix
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Filing Type', val: 'UIIA Standard (EDI)' },
                  { label: 'Turnaround', val: '< 48 Hours' },
                  { label: 'Port Status', base: 'Active Gate Access' },
                  { label: 'Intermodal', val: 'Amazon Relay Sync' },
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800 group hover:border-cyan-500/50 transition-all">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-2xl font-bold text-white">{item.val || item.base}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Render the 1,500+ Word Structured Content */}
            {UIIA_SECTIONS.map((section, index) => (
              <div key={index}>
                {section.type === 'stepper' && <StepperSection section={section} />}
                {section.type === 'comparison' && <ComparisonSection section={section} />}
                {section.type === 'checklist' && <ChecklistSection section={section} />}
                {section.type === 'text' && (
                  <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10 mb-12">
                    <h2 className="text-3xl font-bold text-white mb-6">{section.title}</h2>
                    <p className="text-lg text-slate-400 leading-relaxed whitespace-pre-wrap">{section.content}</p>
                  </div>
                )}
                {section.type === 'callout' && (
                   <div className="bg-cyan-600/10 border border-cyan-500/20 rounded-[32px] p-8 mb-12 flex gap-6">
                     <ShieldAlert className="w-8 h-8 text-cyan-500 shrink-0" />
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
                  <Search className="w-5 h-5 mr-2 text-cyan-500" />
                  Compliance Network
                </h3>
                <div className="space-y-4">
                  {BROKERS_DATA.map((other, i) => (
                    <Link 
                      key={i}
                      href={`/broker/${other.slug}`}
                      className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all group"
                    >
                      <span className="text-sm font-bold text-slate-300 group-hover:text-white">{other.name.split(' ')[0]} Approval</span>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                  <Link 
                    href="/amazon-relay-insurance"
                    className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all group"
                  >
                    <span className="text-sm font-bold text-slate-300 group-hover:text-white">Amazon Relay Rescue</span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link 
                    href="/dmv65mcp"
                    className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-red-500/50 hover:bg-slate-900 transition-all group"
                  >
                    <span className="text-sm font-bold text-slate-300 group-hover:text-white">CA DMV MCP Rescue</span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
                <h3 className="text-xl font-bold mb-4 relative z-10 flex items-center">
                  <Box className="w-5 h-5 mr-2 text-cyan-500" />
                  Amazon Intermodal
                </h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed relative z-10">
                  Hauling Amazon chassis requires a specific UIIA agreement. We provide the 48-hour certification needed to unlock Amazon Relay intermodal loads.
                </p>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[10px] text-cyan-500">
                  UIIA STATUS: EDI_CONNECTED<br/>
                  GATE_SYNC: 48HR_SLA
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
