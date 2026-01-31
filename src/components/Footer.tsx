import Link from 'next/link';
import { Truck, ShieldAlert, FileText, Map, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-industrial-800 text-industrial-400 font-mono text-sm py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
        
        {/* BRAND */}
        <div className="col-span-1">
           <Link href="/" className="text-white font-bold tracking-tighter text-lg flex items-center gap-2 mb-4">
             <Truck className="w-6 h-6 text-safety-orange" />
             TRUCK COVERAGE EXPERTS
           </Link>
           <p className="mb-4 text-xs leading-relaxed">
             Specializing in high-risk commercial auto liability, cargo insurance, and federal filings for distressed motor carriers.
           </p>
           <div className="flex items-center gap-2 text-white font-bold">
             <Phone className="w-4 h-4" /> (800) 555-0199
           </div>
        </div>

        {/* COMPLIANCE */}
        <div className="col-span-1">
          <h3 className="text-white font-bold uppercase tracking-widest mb-4 text-xs">Compliance</h3>
          <ul className="space-y-2">
            <li><Link href="/violations" className="hover:text-safety-orange transition-colors">FMCSA Violations Directory</Link></li>
            <li><Link href="/check-score" className="hover:text-safety-orange transition-colors">Carrier Health Check</Link></li>
            <li><Link href="/broker" className="hover:text-safety-orange transition-colors">Broker Requirements</Link></li>
            <li><Link href="/safety-rating" className="hover:text-safety-orange transition-colors">Conditional Rating Recovery</Link></li>
          </ul>
        </div>

        {/* COVERAGE */}
        <div className="col-span-1">
          <h3 className="text-white font-bold uppercase tracking-widest mb-4 text-xs">Insurance</h3>
          <ul className="space-y-2">
            <li><Link href="/insurance" className="hover:text-safety-orange transition-colors">By Trailer Type</Link></li>
            <li><Link href="/insurance/hazmat-tanker-insurance" className="hover:text-safety-orange transition-colors">Hazmat Tankers</Link></li>
            <li><Link href="/insurance/auto-hauler-car-carrier-insurance" className="hover:text-safety-orange transition-colors">Auto Haulers</Link></li>
            <li><Link href="/hot-shot" className="hover:text-safety-orange transition-colors">Hot Shot Insurance</Link></li>
          </ul>
        </div>

        {/* PERMITS */}
        <div className="col-span-1">
          <h3 className="text-white font-bold uppercase tracking-widest mb-4 text-xs">Filings</h3>
          <ul className="space-y-2">
            <li><Link href="/filings" className="hover:text-safety-orange transition-colors">State Permit Directory</Link></li>
            <li><Link href="/filing/mcp65-california-dmv-filing" className="hover:text-safety-orange transition-colors">CA MCP-65 Filing</Link></li>
            <li><Link href="/filing/sr22-texas-trucking-insurance" className="hover:text-safety-orange transition-colors">Texas SR-22</Link></li>
            <li><Link href="/filing/bmc91x-federal-filing-fmsca" className="hover:text-safety-orange transition-colors">BMC-91X (Federal)</Link></li>
            <li><Link href="/route" className="hover:text-safety-orange transition-colors">Route Permit Calculator</Link></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-industrial-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>© {new Date().getFullYear()} Truck Coverage Experts. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
