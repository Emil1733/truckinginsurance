import Link from 'next/link'
import { PlusCircle, AlertTriangle } from 'lucide-react'
import { ClaimAuthorityWidget } from '@/components/dashboard/ClaimAuthorityWidget'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  
  // Fetch Profile
  const { data: profile } = await supabase
    .from('carrier_profiles')
    .select('*')
    .eq('id', user?.id)
    .single()

  const hasAuth = profile?.usdot_number

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Overview</h1>
          <p className="text-industrial-400">
            {hasAuth ? profile.company_name : "Welcome back. Let's get set up."}
          </p>
        </div>
        <div className="flex items-center gap-3">
            <Link href="/quote" className="bg-display-yellow hover:bg-yellow-400 text-industrial-900 px-4 py-2 rounded-md font-bold text-sm transition-colors flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                New Quote
            </Link>
        </div>
      </div>

      {hasAuth ? (
        /* FULL DASHBOARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="USDOT Number" value={profile.usdot_number} />
          <StatCard label="Safety Rating" value="Conditional" highlight /> 
          <StatCard label="Fleet Size" value={profile.fleet_size || "1"} />
          
          <div className="col-span-1 md:col-span-3 bg-industrial-900 border border-industrial-800 p-6 rounded-lg mt-4">
            <h3 className="text-xl font-display font-bold text-white mb-4">Compliance Actions</h3>
            <div className="p-4 bg-red-900/10 border border-red-900/30 rounded flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-1" />
                <div>
                    <p className="text-red-400 font-bold">Safety Rating Alert</p>
                    <p className="text-industrial-400 text-sm">Your rating is currently <strong>Conditional</strong>. This affects your insurance premiums.</p>
                    <Link href="/rehab" className="text-red-400 text-sm underline mt-2 inline-block hover:text-red-300">View Rehab Plan</Link>
                </div>
            </div>
          </div>
        </div>
      ) : (
        /* ONBOARDING VIEW */
        <ClaimAuthorityWidget />
      )}

    </div>
  )
}

function StatCard({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) {
    return (
        <div className="bg-industrial-900 border border-industrial-800 p-6 rounded-lg">
            <p className="text-industrial-500 text-sm font-medium uppercase tracking-wider mb-1">{label}</p>
            <p className={`text-3xl font-display font-bold ${highlight ? 'text-display-yellow' : 'text-white'}`}>{value}</p>
        </div>
    )
}
