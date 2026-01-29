
import { FileText, Download, ShieldCheck, Lock } from "lucide-react";

export const metadata = {
  title: "Restricted: FMCSA Reinstatement Protocol | Truck Coverage Experts",
  robots: {
    index: false, // DO NOT INDEX THIS PAGE
    follow: false,
  },
};

export default function ReinstatementGuidePage() {
  return (
    <div className="min-h-screen bg-industrial-900 text-silver font-mono selection:bg-safety-orange selection:text-black">
      <div className="max-w-4xl mx-auto px-6 py-20">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-12 border-b border-industrial-800 pb-8">
          <div className="p-3 bg-green-500/10 rounded-full">
            <ShieldCheck className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <div className="text-xs font-bold text-green-500 tracking-widest uppercase mb-1">Access Granted</div>
            <h1 className="text-3xl font-display text-white">FMCSA Reinstatement Protocol</h1>
          </div>
        </div>

        {/* The PDF Viewer / Download Mockup */}
        <div className="bg-white text-black p-8 md:p-16 shadow-2xl rounded-sm relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <FileText className="w-64 h-64" />
          </div>

          <div className="max-w-2xl relative z-10">
            <h2 className="text-4xl font-display font-bold mb-6 text-industrial-900">
              OFFICIAL REINSTATEMENT STEPS
            </h2>
            <p className="font-serif text-lg mb-8 italic text-industrial-700">
              "The following protocol is used by 95% of successful reinstatement applicants..."
            </p>

            <div className="space-y-6 mb-12 font-sans">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold rounded-full shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Wait Out the 10-Hour Reset</h3>
                  <p>Do not attempt to move the vehicle until authorized. This triggers an immediate secondary flag.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold rounded-full shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Request DataQ Challenge</h3>
                  <p>If the officer marked "Fatigued" without physical evidence, file a challenge on the FMCSA portal immediately.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold rounded-full shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Secure "High Risk" Certificate</h3>
                  <p>Standard carriers will drop you. You need a certificate from a Surplus Lines carrier to prove financial responsibility to the state.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t-2 border-industrial-900 pt-8 mt-12 flex justify-between items-center">
            <div className="text-xs font-bold uppercase tracking-widest">Document ID: TRK-9982</div>
            <button className="bg-industrial-900 text-white px-6 py-3 font-bold flex items-center gap-2 hover:bg-industrial-800 transition-colors">
              <Download className="w-4 h-4" /> Download Full PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
