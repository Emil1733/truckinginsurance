"use client";

import { useState } from "react";
import { X, Lock, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function ReinstatementModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { error } = await supabase.from('leads').insert({ email, source: 'reinstatement_guide' });
      if (error) throw error;
      
      setStatus("success");
      // Redirect after short delay
      setTimeout(() => {
        router.push("/resources/reinstatement-guide");
      }, 1500);
      
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <div className="relative bg-industrial-900 border border-industrial-700 w-full max-w-md p-8 rounded-none shadow-2xl">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-industrial-500 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6 text-center">
              <div className="inline-flex justify-center items-center w-12 h-12 bg-safety-orange/20 rounded-full mb-4">
                <Lock className="w-6 h-6 text-safety-orange" />
              </div>
              <h2 className="font-display text-3xl text-white mb-2">RESTRICTED INTEL</h2>
              <p className="text-industrial-400 text-sm">
                The Reinstatement Protocol is reserved for active operators. Enter your email to verify active status.
              </p>
            </div>

            {status === "success" ? (
              <div className="text-center py-8 animate-in fade-in zoom-in">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-white font-bold text-xl">ACCESS GRANTED</p>
                <p className="text-industrial-500 text-sm">Redirecting to secure file...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-industrial-500 mb-1 uppercase">Official Work Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="driver@logistics.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 border border-industrial-700 text-white px-4 py-3 focus:outline-none focus:border-safety-orange transition-colors"
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full bg-safety-orange hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
                  UNLOCK GUIDE
                </button>
                
                {status === "error" && (
                  <p className="text-red-500 text-xs text-center">System Error. Please try again.</p>
                )}
                
                <p className="text-[10px] text-center text-industrial-600">
                  By unlocking, you agree to receive FMCSA regulatory updates.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
