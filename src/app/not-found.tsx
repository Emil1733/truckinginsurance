
import Link from 'next/link';
import { TriangleAlert, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-industrial-900 flex flex-col items-center justify-center p-6 font-mono">
      <div className="bg-industrial-800 border border-industrial-700 p-8 md:p-12 rounded-lg max-w-lg w-full text-center shadow-2xl">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-safety-orange/20 rounded-full mb-8">
          <TriangleAlert className="w-10 h-10 text-safety-orange animate-pulse" />
        </div>
        
        <h1 className="text-4xl font-display font-bold text-white mb-4">404: ROUTE NOT FOUND</h1>
        
        <p className="text-industrial-400 mb-8 text-lg">
          The requested compliance file or route does not exist in our database. It may have been moved or archived.
        </p>

        <div className="grid gap-4">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 bg-safety-orange text-black font-bold py-3 px-6 rounded hover:bg-orange-500 transition-colors uppercase tracking-wider"
          >
            <Home className="w-5 h-5" /> Return to Base
          </Link>
          
          <Link 
            href="/contact" 
            className="flex items-center justify-center gap-2 border border-industrial-600 text-industrial-400 font-bold py-3 px-6 rounded hover:text-white hover:border-white transition-colors uppercase tracking-wider"
          >
            Report Missing Page
          </Link>
        </div>
      </div>
      
      <div className="mt-8 text-industrial-600 text-xs text-center max-w-sm">
        Error Code: 404_NOT_FOUND. <br/>
        Reference: FMCSA_COMPLIANCE_NULL
      </div>
    </div>
  );
}
