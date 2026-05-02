import { Metadata } from "next";
import { CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, FileText, Info, Search, ShieldAlert, BadgeCheck, ListChecks, Zap, XCircle, ArrowDownCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BROKERS_DATA, ContentSection } from "@/lib/data/brokers";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BrokerLeadForm } from "@/components/BrokerLeadForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const broker = BROKERS_DATA.find((b) => b.slug === slug);

  if (!broker) return { title: 'Broker Approval Guide' };

  return {
    title: `How to bypass the ${broker.name.split(' ')[0]} Vetting Firewall | 48-Hour Approval`,
    description: `Stop getting rejected by ${broker.name.split(' ')[0]}. Our forensic insurance audit helps you bypass the automated vetting system and get approved for loads in 48 hours.`,
    alternates: {
      canonical: `https://truckcoverageexperts.com/broker/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return BROKERS_DATA.map((broker) => ({
    slug: broker.slug,
  }));
}

// Sub-components for Section Types
const StepperSection = ({ section }: { section: ContentSection }) => (
  <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10 overflow-hidden relative">
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full" />
    <h2 className="text-3xl font-bold text-white mb-2">{section.title}</h2>
    <p className="text-slate-500 mb-12 max-w-xl">{section.subtitle}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {section.steps?.map((step, i) => (
        <div key={i} className="relative group">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg relative z-10 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
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
  <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10">
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
  <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10">
    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
      <ListChecks className="w-8 h-8 mr-4 text-blue-500" />
      {section.title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
      {section.items?.map((item, i) => (
        <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-800/50">
          <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-slate-400 font-medium">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const CalloutSection = ({ section }: { section: ContentSection }) => (
  <div className="bg-gradient-to-r from-blue-600/10 to-transparent border border-blue-500/20 rounded-[32px] p-8 flex gap-6 items-start">
    <div className="bg-blue-600 p-3 rounded-2xl shrink-0">
      <Zap className="w-6 h-6 text-white" />
    </div>
    <div>
      <h4 className="text-xl font-bold text-white mb-2">{section.title}</h4>
      <p className="text-slate-400 leading-relaxed">{section.content}</p>
    </div>
  </div>
);

export default async function BrokerApprovalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const broker = BROKERS_DATA.find((b) => b.slug === slug);

  if (!broker) return notFound();

  return (
    <main className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* Header Section */}
      <div className="relative overflow-hidden border-b border-slate-800 bg-slate-950/50 pt-12 pb-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[
              { label: 'Brokers', href: '/broker' },
              { label: broker.name, href: `/broker/${broker.slug}` }
            ]} 
          />
          
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 mb-8 animate-pulse">
                <ShieldAlert className="w-4 h-4 mr-2" />
                Urgent: Broker Approval Status
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
                {broker.name.split(' ')[0]} <span className="text-blue-500 italic">Carrier Approval</span> <br/>
                Guide 2026
              </h1>
              <p className="mt-8 text-xl text-slate-400 leading-relaxed max-w-2xl">
                Denied by {broker.name.split(' ')[0]}? Most carriers fail vetting due to "invisible" policy loopholes. We specialize in TQL and Amazon-compliant coverage.
              </p>
            </div>
            
            <div className="lg:col-span-5 bg-slate-900/50 backdrop-blur-xl p-8 rounded-[32px] border border-slate-800 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <BadgeCheck className="w-6 h-6 mr-2 text-blue-500" />
                Request Approval Audit
              </h3>
              <div className="space-y-6">
                <p className="text-slate-400 text-sm leading-relaxed">
                  Enter your MC number and details below. Our underwriters will audit your safety record for {broker.name.split(' ')[0]} compliance.
                </p>
                <BrokerLeadForm brokerName={broker.name} ctaText={broker.ctaText} />
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <span>SLA: 30 Mins</span>
                  <span>Compliance: EDI Direct</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            {/* The Requirements Grid */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-10 flex items-center">
                <FileText className="w-8 h-8 mr-4 text-blue-500" />
                Insurance Minimums
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Auto Liability', val: broker.requirements.autoLiability, icon: ShieldCheck },
                  { label: 'Cargo Insurance', val: broker.requirements.cargoInsurance, icon: ShieldCheck },
                  { label: 'General Liability', val: broker.requirements.generalLiability, icon: ShieldCheck },
                  { label: 'Trailer Interchange', val: broker.requirements.trailerInterchange, icon: ShieldCheck },
                ].filter(i => i.val).map((item, i) => (
                  <div key={i} className="p-8 bg-slate-950/50 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-colors group">
                    <item.icon className="w-6 h-6 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-xs font-black text-slate-500 uppercase tracking-tighter mb-1">{item.label}</p>
                    <p className="text-2xl font-bold text-white">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Render Componentized Content Sections */}
            {broker.sections.map((section, index) => (
              <div key={index}>
                {section.type === 'stepper' && <StepperSection section={section} />}
                {section.type === 'comparison' && <ComparisonSection section={section} />}
                {section.type === 'checklist' && <ChecklistSection section={section} />}
                {section.type === 'callout' && <CalloutSection section={section} />}
                {section.type === 'text' && (
                  <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10">
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                      <Search className="w-8 h-8 mr-4 text-blue-500" />
                      {section.title}
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed">{section.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-8 space-y-8">
              <div className="bg-slate-900/40 border border-slate-800 rounded-[40px] p-10">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Search className="w-5 h-5 mr-2 text-blue-500" />
                  Compliance Network
                </h3>
                <div className="space-y-4">
                  {BROKERS_DATA.filter(b => b.id !== broker.id).map((other, i) => (
                    <Link 
                      key={i}
                      href={`/broker/${other.slug}`}
                      className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all group"
                    >
                      <span className="text-sm font-bold text-slate-300 group-hover:text-white">{other.name.split(' ')[0]} Approval</span>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
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
                  <Link 
                    href="/uiia-certification"
                    className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all group"
                  >
                    <span className="text-sm font-bold text-slate-300 group-hover:text-white">UIIA Port Gateway</span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link 
                    href="/geico-truck-insurance-comparison"
                    className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all group"
                  >
                    <span className="text-sm font-bold text-slate-300 group-hover:text-white">GEICO Comparison</span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <h3 className="text-2xl font-bold mb-6 relative z-10">Digital Filing active</h3>
                <p className="text-blue-100 text-sm mb-8 leading-relaxed relative z-10 italic">
                  "Our system automatically syncs your new certificate with the {broker.name.split(' ')[0]} compliance database the second you bind."
                </p>
                <Link href="/contact" className="inline-flex items-center px-6 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-slate-100 transition-all relative z-10 w-full justify-center">
                  Verify My MC#
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>

              <div className="p-10 bg-slate-900/50 border border-slate-800 rounded-[40px] backdrop-blur-sm">
                <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Required Holder Address</h4>
                <div className="space-y-4">
                  {broker.coiRequirements.slice(0, 1).map((r, i) => (
                    <div key={i} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-blue-400">
                      {r}
                    </div>
                  ))}
                  <p className="text-[10px] text-slate-500">Manual address entry errors cause 40% of rejections.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
