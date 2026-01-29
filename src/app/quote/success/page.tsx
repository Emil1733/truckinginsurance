import Link from "next/link";
import { CheckCircle2, PhoneCall } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-industrial-900 flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-industrial-800 border border-industrial-700 p-8 rounded-lg shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-safety-orange/10 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-safety-orange" />
          </div>
        </div>
        
        <h1 className="font-display text-4xl text-white mb-4">RECEIVED.</h1>
        <p className="text-industrial-500 mb-8">
          Your profile has been routed to our High-Risk Underwriting Desk. An agent will contact you within <span className="text-white font-bold">2 hours</span>.
        </p>

        <div className="bg-industrial-900/50 p-4 rounded mb-8 border border-industrial-700">
          <p className="text-xs text-industrial-500 mb-2 uppercase tracking-widest">Urgent Case?</p>
          <a href="tel:1-800-555-0199" className="text-xl font-bold text-silver flex items-center justify-center gap-2 hover:text-safety-orange transition-colors">
            <PhoneCall className="w-5 h-5" /> 1-800-555-0199
          </a>
        </div>

        <Link 
          href="/" 
          className="block w-full bg-silver hover:bg-white text-black font-bold py-3 rounded transition-colors"
        >
          RETURN TO DATABASE
        </Link>
      </div>
    </div>
  );
}
