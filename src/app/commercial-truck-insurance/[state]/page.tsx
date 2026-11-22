import { US_STATES } from "@/lib/data/us-states";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import NicheLeadForm from "@/components/NicheLeadForm";
import { ShieldCheck, CheckCircle2, FileText, MapPin } from "lucide-react";
import { getStateInsuranceContext } from "@/lib/data/state-insurance-context";
import { getStateContent } from "@/lib/data/state-insurance-content";

const CHECKED = "22 November 2026";

export async function generateStaticParams() {
  return US_STATES.map((state) => ({ state: state.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const stateData = US_STATES.find(s => s.slug === state);
  if (!stateData) return {};

  const content = getStateContent(stateData.slug);

  return {
    title: content?.seoTitle ?? `Commercial Truck Insurance in ${stateData.name}`,
    description:
      content?.seoDescription ??
      `Review ${stateData.name} commercial truck insurance options for Class 7 and 8 vehicles. Request help from a licensed insurance professional.`,
    alternates: { canonical: `https://www.truckcoverageexperts.com/commercial-truck-insurance/${stateData.slug}` },
    // A state only stays indexed once it carries written, source-checked content. Everything else
    // renders the generic layout but stays out of the index until it is written.
    robots: content ? undefined : { index: false, follow: true },
  };
}

export default async function NicheStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const stateData = US_STATES.find(s => s.slug === state);
  if (!stateData) return notFound();

  const stateContext = getStateInsuranceContext(stateData.slug);
  const content = getStateContent(stateData.slug);

  const schema = content
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": content.faqs.map(([question, answer]) => ({
          "@type": "Question",
          "name": question,
          "acceptedAnswer": { "@type": "Answer", "text": answer },
        })),
      }
    : {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How much is commercial truck insurance in ${stateData.name}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `The cost depends on equipment, routes, cargo, drivers, limits, deductibles and claims history. A licensed professional can review options for the operation.`,
            },
          },
        ],
      };

  if (!content) {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <main className="min-h-screen bg-slate-950">
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
              Commercial Truck Insurance in {stateData.name}
            </h1>
            <p className="text-slate-300 max-w-2xl mb-8">
              {stateContext.focus}
            </p>
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="space-y-4">
                <Link href="/commercial-truck-insurance" className="block border border-slate-700 text-slate-200 px-4 py-3 rounded hover:border-blue-400">
                  National commercial truck insurance guide
                </Link>
                <Link href="/insurance" className="block border border-slate-700 text-slate-200 px-4 py-3 rounded hover:border-blue-400">
                  Compare equipment insurance
                </Link>
                <Link href={stateContext.filingHref} className="block border border-slate-700 text-slate-200 px-4 py-3 rounded hover:border-blue-400">
                  {stateContext.filingLabel}
                </Link>
              </div>
              <NicheLeadForm stateName={stateData.name} nicheName="Commercial Truck Insurance" />
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="min-h-screen bg-slate-950">
        {/* HERO */}
        <section className="relative pt-20 pb-14 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-950 z-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 mb-6">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-sm font-semibold tracking-wider uppercase">
                    {stateData.name} commercial auto
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
                  Commercial Truck Insurance in {stateData.name}
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed mb-6">
                  {content.intro[0]}
                </p>
                <p className="text-sm text-slate-500">
                  Requirements checked {CHECKED} against the state regulator and the statute. Amounts and
                  forms change — confirm the current figure before you rely on it.
                </p>
              </div>
              <div className="lg:pl-8">
                <NicheLeadForm stateName={stateData.name} nicheName="Commercial Truck Insurance" />
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {content.intro.slice(1).map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-lg text-slate-300 leading-relaxed mb-5">
              {paragraph}
            </p>
          ))}
        </section>

        {/* WHAT THE STATE REQUIRES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="border border-slate-800 rounded-lg p-7 bg-slate-900/40">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-bold text-white">Who regulates it</h2>
              </div>
              <p className="text-white font-semibold mb-1">{content.regulator.name}</p>
              <p className="text-sm text-blue-300 mb-4">{content.regulator.authority}</p>
              <p className="text-slate-400 leading-relaxed">{content.regulator.plain}</p>
            </div>
            <div className="border border-slate-800 rounded-lg p-7 bg-slate-900/40">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-bold text-white">What gets filed, and by whom</h2>
              </div>
              <p className="text-white font-semibold mb-1">{content.filing.form}</p>
              <p className="text-sm text-blue-300 mb-4">{content.filing.filedBy}</p>
              <p className="text-slate-400 leading-relaxed">{content.filing.when}</p>
            </div>
          </div>
        </section>

        {/* LIMITS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl font-bold text-white mb-2">
            Minimum liability in {stateData.name}
          </h2>
          <p className="text-slate-400 mb-6 max-w-3xl">
            These are the statutory floors. They are not a recommendation, and they are frequently below
            what a broker, shipper or lender will ask you to carry.
          </p>
          <div className="overflow-x-auto border border-slate-800 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-slate-900 text-slate-300">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Operation</th>
                  <th className="text-left px-4 py-3 font-semibold">Minimum</th>
                </tr>
              </thead>
              <tbody>
                {content.limits.map((row) => (
                  <tr key={row.operation} className="border-t border-slate-800">
                    <td className="px-4 py-3 text-slate-200">
                      {row.operation}
                      {row.note ? <span className="block text-xs text-slate-500 mt-1">{row.note}</span> : null}
                    </td>
                    <td className="px-4 py-3 text-white font-semibold whitespace-nowrap">{row.limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 mt-4 max-w-3xl">{content.limitsNote}</p>
        </section>

        {/* WHO NEEDS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl font-bold text-white mb-5">Who this actually applies to</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {content.whoNeeds.map((item) => (
              <li key={item.slice(0, 40)} className="flex gap-3 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* LOCAL REALITY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl font-bold text-white mb-2">
            What {stateData.name} freight does to the quote
          </h2>
          <p className="text-slate-400 mb-6 max-w-3xl">
            The statute sets the floor. The work you actually do sets the price.
          </p>
          <div className="space-y-6">
            {content.local.map((item) => (
              <div key={item.heading} className="border-l-2 border-blue-500/40 pl-5">
                <h3 className="text-lg font-bold text-white mb-2">{item.heading}</h3>
                <p className="text-slate-400 leading-relaxed max-w-3xl">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl font-bold text-white mb-5">
            {stateData.name} questions
          </h2>
          <div className="space-y-5">
            {content.faqs.map(([question, answer]) => (
              <div key={question} className="border border-slate-800 rounded-lg p-6 bg-slate-900/40">
                <h3 className="font-bold text-white mb-2">{question}</h3>
                <p className="text-slate-400 leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SOURCES */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
            Where these figures come from
          </h2>
          <ul className="space-y-2 text-sm">
            {content.sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-blue-400 hover:underline"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* NEXT STEPS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Next steps</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/commercial-truck-insurance" className="border border-slate-700 text-slate-200 px-4 py-3 rounded hover:border-blue-400">
              National coverage guide
            </Link>
            <Link href="/insurance" className="border border-slate-700 text-slate-200 px-4 py-3 rounded hover:border-blue-400">
              Compare equipment programs
            </Link>
            <Link href={stateContext.filingHref} className="border border-slate-700 text-slate-200 px-4 py-3 rounded hover:border-blue-400">
              {stateContext.filingLabel}
            </Link>
            <Link href="/quote" className="border border-blue-500/50 text-blue-300 px-4 py-3 rounded hover:border-blue-400">
              Request a quote review
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
