'use client';

import { useState } from 'react';
import { ShieldCheck, FileText, UploadCloud, ArrowRight, CheckCircle2, AlertTriangle, Building, Truck, Clock } from 'lucide-react';
import Link from 'next/link';

export default function CoiGeneratorPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileObj, setFileObj] = useState<File | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    dotNumber: '',
    email: '',
    companyName: '',
    brokerName: '',
    brokerAddress: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setFileObj(e.target.files[0]);
    }
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!fileObj) throw new Error('Please upload your Master COI first.');

      const data = new FormData();
      data.append('file', fileObj);
      data.append('dotNumber', formData.dotNumber);
      data.append('email', formData.email);
      data.append('companyName', formData.companyName);
      data.append('brokerName', formData.brokerName);
      data.append('brokerAddress', formData.brokerAddress);

      const res = await fetch('/api/generate-coi', {
        method: 'POST',
        body: data
      });
      
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to generate PDF');
      }

      // Handle the PDF Download
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `COI_${formData.brokerName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-[#060913]/60 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-blue-500" />
            <span>TRUCK COVERAGE <span className="text-blue-500">EXPERTS</span></span>
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen" />

        <div className="max-w-3xl mx-auto text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-xs font-black mb-6 border border-blue-500/20 uppercase tracking-widest shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <Clock className="w-4 h-4 animate-pulse" /> Stop Waiting On Your Agent
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.05]">
            Instant COI <span className="text-blue-500">Generator</span>
          </h1>
          <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            Need a Certificate of Insurance for a broker right now? Upload your master COI or Dec Page, enter the new holder details, and we will generate it instantly for free.
          </p>
        </div>

        <div className="max-w-2xl mx-auto relative z-20">
          {!success ? (
            <div className="bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/20">
              
              {/* Progress Bar */}
              <div className="flex gap-2 mb-10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`h-2 flex-1 rounded-full transition-colors duration-500 ${step >= i ? 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white/10'}`} />
                ))}
              </div>

              <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
                
                {/* STEP 1: Upload Current COI */}
                {step === 1 && (
                  <div className="animate-in slide-in-from-right-8 duration-500 space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                      <FileText className="w-6 h-6 text-blue-400" /> Upload Master COI
                    </h2>
                    <p className="text-sm text-slate-400 mb-6">
                      Upload your current master Certificate of Insurance or Policy Declaration Page so our system can extract your active coverage limits.
                    </p>
                    
                    <label className="border-2 border-dashed border-blue-500/30 hover:border-blue-500 rounded-2xl p-10 text-center bg-blue-500/5 hover:bg-blue-500/10 transition-colors cursor-pointer group flex flex-col items-center justify-center min-h-[250px]">
                      <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.jpg,.jpeg,.png" />
                      {fileName ? (
                        <>
                          <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
                          <p className="text-lg font-bold text-white mb-2">File Attached Successfully</p>
                          <p className="text-sm text-blue-400 font-medium">{fileName}</p>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="w-16 h-16 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                          <p className="text-xl font-bold text-white mb-2">Tap to Upload File</p>
                          <p className="text-sm text-slate-400">Accepts PDF, JPG, or PNG (Max 5MB)</p>
                        </>
                      )}
                    </label>
                  </div>
                )}

                {/* STEP 2: Broker / Holder Info */}
                {step === 2 && (
                  <div className="animate-in slide-in-from-right-8 duration-500 space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                      <Building className="w-6 h-6 text-blue-400" /> New Certificate Holder
                    </h2>
                    <p className="text-sm text-slate-400 mb-6">
                      Enter the details of the freight broker or shipper that is requesting this certificate.
                    </p>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 pl-2">Broker / Holder Name</label>
                      <input
                        type="text"
                        name="brokerName"
                        value={formData.brokerName}
                        onChange={handleInputChange}
                        placeholder="e.g. Amazon Relay, TQL, etc."
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 pl-2">Holder Address</label>
                      <input
                        type="text"
                        name="brokerAddress"
                        value={formData.brokerAddress}
                        onChange={handleInputChange}
                        placeholder="Full address required for COI"
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3: Carrier Details */}
                {step === 3 && (
                  <div className="animate-in slide-in-from-right-8 duration-500 space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                      <Truck className="w-6 h-6 text-blue-400" /> Delivery Details
                    </h2>
                    <p className="text-sm text-slate-400 mb-6">
                      Almost done. Where should we email the generated PDF?
                    </p>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 pl-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@company.com"
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 pl-2">US DOT Number</label>
                      <input
                        type="text"
                        name="dotNumber"
                        value={formData.dotNumber}
                        onChange={handleInputChange}
                        placeholder="e.g. 1234567"
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 pl-2">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="John Doe Trucking LLC"
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-6">
                  {step > 1 && (
                    <button 
                      type="button" 
                      onClick={prevStep}
                      className="px-6 py-4 rounded-2xl font-bold text-slate-300 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button 
                    type="submit"
                    disabled={loading || (step === 1 && !fileName)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : step === 3 ? 'Generate My COI' : 'Next Step'} 
                    {!loading && step !== 3 && <ArrowRight className="w-5 h-5" />}
                  </button>
                </div>
                
                {error && (
                  <p className="text-red-400 text-sm font-bold flex items-center justify-center gap-2 bg-red-500/10 py-3 rounded-xl border border-red-500/20">
                    <AlertTriangle className="w-5 h-5 shrink-0" /> {error}
                  </p>
                )}
              </form>
            </div>
          ) : (
            <div className="text-center animate-in zoom-in duration-500 bg-[#0a0f1c]/80 backdrop-blur-xl border border-emerald-500/30 p-12 rounded-[3rem] shadow-2xl shadow-emerald-900/20">
               <CheckCircle2 className="w-24 h-24 text-emerald-400 mx-auto mb-6" />
               <h2 className="text-4xl font-black text-white mb-4 tracking-tight">COI Generated!</h2>
               <p className="text-lg text-slate-300 mb-8 font-light">
                 Your customized Certificate of Insurance for <strong>{formData.brokerName}</strong> has been downloaded to your device.
               </p>
               <div className="bg-black/40 border border-white/5 p-6 rounded-2xl mb-8">
                  <p className="text-sm text-slate-400 mb-2">A backup copy was also sent to:</p>
                  <p className="text-xl text-white font-medium">{formData.email}</p>
               </div>
               <p className="text-slate-400 text-sm font-light">
                 Need to update your coverage limits? Reply to our email and an agent will assist you instantly.
               </p>
            </div>
          )}
        </div>

        {/* SEO & FAQ Section */}
        <div className="max-w-4xl mx-auto mt-32 border-t border-white/10 pt-20 relative z-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">How Our Free ACORD 25 COI Generator Works</h2>
            <p className="text-slate-400 leading-relaxed text-lg max-w-2xl mx-auto">
              We built this tool because truckers and freight dispatchers shouldn't have to lose high-paying loads just because their insurance agent is out of the office.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">What is a Certificate of Insurance?</h3>
              <p className="text-slate-400 text-sm leading-loose font-light">
                A Certificate of Liability Insurance (specifically the ACORD 25 form) is a document proving your motor carrier has active auto liability, cargo, and general liability coverage. Freight brokers like Amazon Relay, TQL, and CH Robinson require you to provide a COI with their exact company name and address listed as the "Certificate Holder" before they will dispatch a load to you.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Why is this tool free?</h3>
              <p className="text-slate-400 text-sm leading-loose font-light">
                As a specialized commercial truck insurance agency, we know how frustrating slow certificate turnaround times are. We provide this instant generation tool as a free public utility to the trucking industry. If you ever want an agency that answers the phone 24/7 and generates certificates instantly, you know who to call.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Is this a legally binding document?</h3>
              <p className="text-slate-400 text-sm leading-loose font-light">
                This tool programmatically stamps the new Certificate Holder's name and address onto the Master Policy Declaration you upload. It does not alter your coverage limits, change your policy standing, or bind new coverage. It is strictly for administrative forwarding purposes based on the master document you provide.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">How fast will I receive my PDF?</h3>
              <p className="text-slate-400 text-sm leading-loose font-light">
                Immediately. Once you enter your DOT number and the broker's information, our software processes the vector coordinates of your master document and instantly downloads the updated PDF to your device while simultaneously emailing you a backup copy.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
