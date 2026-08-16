"use client";
import { useState } from "react";
import { CheckCircle2, ChevronRight, Loader2, ShieldCheck, Truck } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function NicheLeadForm({ stateName, nicheName }: { stateName: string, nicheName: string }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", phone: "", email: "", vehicleYear: "", vehicleMake: "" });

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const nextStep = (e: any) => { e.preventDefault(); setStep(2); };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      let affiliateId = null;
      if (typeof window !== "undefined") { affiliateId = localStorage.getItem("affiliate_ref"); }
      await supabase.from('leads').insert([{
        lead_type: nicheName,
        source: affiliateId ? `affiliate_${affiliateId}` : 'organic',
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        state: stateName,
        metadata: { vehicle: `${formData.vehicleYear} ${formData.vehicleMake}` }
      }]);
      setSuccess(true);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  if (success) {
    return (
      <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-500/30 rounded-3xl p-8 text-center shadow-2xl">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-bounce" />
        <h3 className="text-2xl font-black text-white mb-2">Quote Request Received!</h3>
        <p className="text-emerald-100/70 mb-6">Our {stateName} {nicheName} specialists are reviewing your details. We will call you within 15 minutes.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
        <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-500/30">
          <Truck className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Instant {stateName} Quote</h3>
          <p className="text-sm text-slate-400">Step {step} of 2</p>
        </div>
      </div>
      <form onSubmit={step === 1 ? nextStep : handleSubmit} className="space-y-4">
        {step === 1 ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div><label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Vehicle Year</label>
            <input type="number" name="vehicleYear" required value={formData.vehicleYear} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white" /></div>
            <div><label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Vehicle Make/Model</label>
            <input type="text" name="vehicleMake" required value={formData.vehicleMake} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white" /></div>
            <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 group">Continue to Driver Details <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">First Name</label>
              <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white" /></div>
              <div><label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Last Name</label>
              <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white" /></div>
            </div>
            <div><label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white" /></div>
            <div><label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white" /></div>
            <div className="pt-2 flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="px-6 py-4 bg-slate-800 text-white font-bold rounded-xl">Back</button>
              <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Get My Quote Now"}</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}