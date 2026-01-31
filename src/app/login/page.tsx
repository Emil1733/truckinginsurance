"use client"

import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Truck, ShieldCheck, FileText, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      setMessage("Error: " + error.message)
    } else {
      setMessage("Check your email for the magic link!")
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div className="min-h-screen bg-industrial-900 flex">
      {/* LEFT: The Value Proposition */}
      <div className="hidden lg:flex w-1/2 bg-industrial-800 p-12 flex-col justify-between border-r border-industrial-700">
        <div>
          <Link href="/" className="flex items-center gap-2 text-silver mb-12">
            <Truck className="h-6 w-6 text-display-yellow" />
            <span className="font-display font-bold text-xl tracking-tight">TRUCK COVERAGE EXPERTS</span>
          </Link>
          
          <h1 className="font-display text-5xl text-white font-bold mb-6">
            The Command Center for <span className="text-display-yellow">Smart Carriers</span>.
          </h1>
          <p className="text-xl text-industrial-400 max-w-md">
            Stop guessing your compliance status. Claim your USDOT profile and manage your entire fleet in one secure dashboard.
          </p>
        </div>

        <div className="space-y-8">
          <Feature 
            icon={<ShieldCheck className="h-6 w-6 text-green-400" />}
            title="Instant Certificate Access"
            desc="Generate COIs for brokers instantly. No more waiting on hold."
          />
          <Feature 
            icon={<FileText className="h-6 w-6 text-blue-400" />}
            title="Active Filing Monitoring"
            desc="We watch your BMC-91X and MCS-150 status 24/7."
          />
          <Feature 
            icon={<ArrowRight className="h-6 w-6 text-amber-400" />}
            title="Quote Wallet"
            desc="Save quoting scenarios and compare 'What If' prices."
          />
        </div>

        <div className="text-industrial-500 text-sm">
          © 2026 Truck Coverage Experts. Secure SSL Encrypted.
        </div>
      </div>

      {/* RIGHT: The Login Form */}
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2 text-silver">
              <Truck className="h-6 w-6 text-display-yellow" />
              <span className="font-display font-bold text-xl">TRUCK COVERAGE EXPERTS</span>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-industrial-400">Enter your email to sign in or create an account.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-industrial-300 mb-1">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-industrial-950 border border-industrial-700 rounded-lg px-4 py-3 text-white placeholder-industrial-600 focus:outline-none focus:ring-2 focus:ring-display-yellow focus:border-transparent transition-all"
                placeholder="dispatch@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-display-yellow text-industrial-900 font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending Link...' : 'Continue with Email'}
            </button>

            {message && (
              <div className={`p-4 rounded-lg text-sm ${message.startsWith('Error') ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                {message}
              </div>
            )}
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-industrial-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-industrial-900 text-industrial-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex justify-center items-center gap-3 bg-industrial-800 border border-industrial-700 hover:bg-industrial-700 text-white font-medium py-3 rounded-lg transition-all"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-industrial-900 rounded-lg flex items-center justify-center border border-industrial-700">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-bold font-display">{title}</h3>
        <p className="text-industrial-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}
