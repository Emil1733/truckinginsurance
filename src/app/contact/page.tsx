import Link from 'next/link';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Truck Coverage Experts',
  description: 'Get in touch with our high-risk insurance specialists. 24/7 support for policy changes, filings, and claims.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-industrial-900 font-mono text-silver">
      <nav className="border-b border-industrial-800 bg-industrial-900/90 backdrop-blur sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <Link href="/" className="text-xl font-bold tracking-tighter text-white">TRUCK COVERAGE EXPERTS</Link>
           <Link href="/quote" className="text-xs font-bold bg-safety-orange text-black px-4 py-2 rounded">
             GET QUOTE
           </Link>
         </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
          CONTACT US
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <p className="text-xl text-industrial-400">
              Real humans. No phone trees. We understand urgency because downtime costs you money.
            </p>
            
            <div className="space-y-6 text-lg">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-safety-orange mt-1" />
                <div>
                  <div className="text-white font-bold">Phone</div>
                  <a href="tel:+18005550199" className="hover:text-white transition-colors">(800) 555-0199</a>
                  <div className="text-xs text-industrial-500">Mon-Fri: 8am - 6pm EST</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-safety-orange mt-1" />
                <div>
                  <div className="text-white font-bold">Email</div>
                  <a href="mailto:support@truckcoverageexperts.com" className="hover:text-white transition-colors">support@truckcoverageexperts.com</a>
                  <div className="text-xs text-industrial-500">24/7 Certificate Requests</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-safety-orange mt-1" />
                <div>
                  <div className="text-white font-bold">Headquarters</div>
                  <address className="not-italic">
                    123 Compliance Way<br />
                    Dallas, TX 75201
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Form Placeholder */}
          <div className="bg-industrial-800 p-8 rounded-xl border border-industrial-700">
            <h2 className="text-white font-bold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" /> QUICK REQUEST
            </h2>
            <form className="space-y-4">
               <div>
                 <label className="block text-xs font-bold uppercase mb-1">DOT Number</label>
                 <input type="text" className="w-full bg-industrial-900 border border-industrial-600 rounded p-3 text-white focus:border-safety-orange outline-none" placeholder="USDOT#" />
               </div>
               <div>
                 <label className="block text-xs font-bold uppercase mb-1">Email</label>
                 <input type="email" className="w-full bg-industrial-900 border border-industrial-600 rounded p-3 text-white focus:border-safety-orange outline-none" placeholder="name@company.com" />
               </div>
               <div>
                 <label className="block text-xs font-bold uppercase mb-1">Message</label>
                 <textarea className="w-full bg-industrial-900 border border-industrial-600 rounded p-3 text-white focus:border-safety-orange outline-none h-32" placeholder="How can we help?" />
               </div>
               <button className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3 rounded transition-colors">
                 SEND MESSAGE
               </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
