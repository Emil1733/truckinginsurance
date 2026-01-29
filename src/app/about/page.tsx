import Link from "next/link";
import { ShieldCheck, MapPin, Phone, Award, Users, FileText } from "lucide-react";

export const metadata = {
  title: "About Truck Coverage Experts | High Risk Specialists",
  description: "We are the only agency dedicated 100% to distressed trucking risks. Learn about our specialized underwriting team.",
};

export default function AboutPage() {
  // E-E-A-T Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'mainEntity': {
      '@type': 'InsuranceAgency',
      'name': 'Truck Coverage Experts',
      'foundingDate': '2015',
      'description': 'Specialized agency for high-risk commercial trucking insurance.',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '123 Compliance Way',
        'addressLocality': 'Dallas',
        'addressRegion': 'TX',
        'postalCode': '75201',
        'addressCountry': 'US'
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+1-800-555-0199',
        'contactType': 'customer service'
      },
      'employee': [
        {
          '@type': 'Person',
          'name': 'Marcus Vance',
          'jobTitle': 'Senior Underwriter (Hazmat Division)'
        },
        {
          '@type': 'Person',
          'name': 'Sarah Jenkins',
          'jobTitle': 'Lead Compliance Officer'
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-industrial-900 text-silver font-mono selection:bg-safety-orange selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* HEADER */}
      <header className="border-b border-industrial-800 bg-industrial-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-xl tracking-tighter text-white">
            TRUCK COVERAGE EXPERTS
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-bold">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <Link href="/contact" className="hover:text-white transition-colors">CONTACT</Link>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="py-20 px-6 border-b border-industrial-800">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-industrial-800 text-industrial-400 text-xs font-bold mb-6 border border-industrial-700 uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3" /> ESTABLISHED 2015
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-8 leading-[0.9]">
              WE INSURE WHAT <br />
              <span className="text-safety-orange">OTHERS FEAR.</span>
            </h1>
            <p className="text-xl md:text-2xl text-industrial-400 max-w-3xl leading-relaxed">
              Standard agencies want "clean" records. We specialize in the messy ones. 
              Violations, lapses, and high-risk cargo are not dealbreakers here. 
              They are our specialty.
            </p>
          </div>
        </section>

        {/* THE MISSION */}
        <section className="py-20 px-6 bg-industrial-800/30">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">THE UNINSURABLE GAP</h2>
              <div className="space-y-6 text-industrial-400">
                <p>
                  In 2015, we noticed a disturbing trend: Good drivers were losing their livelihoods 
                  over single paperwork errors (Form E lapses) or minor 395.8 logbook violations.
                </p>
                <p>
                  Major carriers explicitly blacklist these codes. We built <strong className="text-white">Truck Coverage Experts</strong> to build a bridge between high-risk drivers and the 
                  select group of underwriters willing to look past the algorithm.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-industrial-900 p-6 rounded border border-industrial-700">
                <div className="text-4xl font-bold text-white mb-2">2,500+</div>
                <div className="text-xs text-industrial-500 uppercase tracking-widest">Drivers Reinstated</div>
              </div>
              <div className="bg-industrial-900 p-6 rounded border border-industrial-700">
                <div className="text-4xl font-bold text-safety-orange mb-2">99%</div>
                <div className="text-xs text-industrial-500 uppercase tracking-widest">Filing Acceptance</div>
              </div>
              <div className="bg-industrial-900 p-6 rounded border border-industrial-700 col-span-2">
                <div className="text-4xl font-bold text-white mb-2">$500M+</div>
                <div className="text-xs text-industrial-500 uppercase tracking-widest">Cargo Value Insured</div>
              </div>
            </div>
          </div>
        </section>

        {/* THE TEAM (TRUST SIGNALS) */}
        <section className="py-20 px-6 border-t border-industrial-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-white mb-12 flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-500" />
              MEET THE UNDERWRITERS
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Member 1 */}
              <div className="bg-industrial-800 border-2 border-industrial-800 hover:border-blue-500/50 transition-colors p-6 rounded-lg group">
                <div className="w-16 h-16 bg-industrial-700 rounded-full mb-6 flex items-center justify-center text-2xl font-bold text-industrial-500 group-hover:bg-blue-900 group-hover:text-blue-400 transition-colors">
                  MV
                </div>
                <h3 className="text-xl font-bold text-white">Marcus Vance</h3>
                <p className="text-blue-400 text-xs font-bold uppercase mb-4">Senior Lead Underwriter</p>
                <p className="text-sm text-industrial-400">
                  Former hazardous materials logistics coordinator. Specializes in Hazmat (Class 3 & 8) and Heavy Haul compliance.
                </p>
              </div>

              {/* Member 2 */}
              <div className="bg-industrial-800 border-2 border-industrial-800 hover:border-blue-500/50 transition-colors p-6 rounded-lg group">
                 <div className="w-16 h-16 bg-industrial-700 rounded-full mb-6 flex items-center justify-center text-2xl font-bold text-industrial-500 group-hover:bg-blue-900 group-hover:text-blue-400 transition-colors">
                  SJ
                </div>
                <h3 className="text-xl font-bold text-white">Sarah Jenkins</h3>
                <p className="text-blue-400 text-xs font-bold uppercase mb-4">Compliance Officer</p>
                <p className="text-sm text-industrial-400">
                  Expert in FMCSA DataQs appeals and SR-22/Form E reinstatements. Prevents future suspensions.
                </p>
              </div>

               {/* Member 3 */}
               <div className="bg-industrial-800 border-2 border-industrial-800 hover:border-blue-500/50 transition-colors p-6 rounded-lg group">
                 <div className="w-16 h-16 bg-industrial-700 rounded-full mb-6 flex items-center justify-center text-2xl font-bold text-industrial-500 group-hover:bg-blue-900 group-hover:text-blue-400 transition-colors">
                  DR
                </div>
                <h3 className="text-xl font-bold text-white">David Ross</h3>
                <p className="text-blue-400 text-xs font-bold uppercase mb-4">Fleet Risk Manager</p>
                <p className="text-sm text-industrial-400">
                  Focuses on fleet expansion strategies (5-50 units) and reducing MOD scores for better rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OFFICE LOCATION (LOCAL SEO) */}
        <section className="py-20 px-6 border-t border-industrial-800 bg-black/20">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-safety-orange" />
                HEADQUARTERS
              </h2>
              <address className="not-italic text-industrial-400 space-y-2 mb-8 border-l-2 border-industrial-700 pl-4">
                <strong className="text-white block">Truck Coverage Experts</strong>
                123 Compliance Way, Suite 400<br />
                Dallas, TX 75201<br />
                United States
              </address>
              
              <div className="flex items-center gap-3 text-white font-bold text-lg">
                <Phone className="w-5 h-5 text-safety-orange" />
                +1 (800) 555-0199
              </div>
              <p className="text-xs text-industrial-600 mt-2">
                Mon-Fri: 8:00 AM - 6:00 PM CST
              </p>
            </div>
            
            <div className="bg-industrial-800 rounded-lg p-8 flex flex-col justify-center text-center border-2 border-safety-orange/20">
              <h3 className="text-xl font-bold text-white mb-4">NEED IMMEDIATE COVERAGE?</h3>
              <p className="text-industrial-400 mb-8">
                Our underwriters are standing by to review your violation codes.
              </p>
              <Link 
                href="/quote"
                className="bg-safety-orange hover:bg-orange-500 text-black font-bold py-4 rounded transition-all shadow-lg hover:shadow-orange-500/20"
              >
                START SECURE QUOTE
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-industrial-800 bg-industrial-900 py-12 px-6 text-center">
        <div className="text-industrial-600 text-xs font-mono">
          © 2026 TRUCK COVERAGE EXPERTS // DALLAS, TX
        </div>
      </footer>
    </div>
  );
}
