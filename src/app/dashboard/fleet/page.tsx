import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { AddVehicleForm } from '@/components/dashboard/AddVehicleForm'
import { Truck, Trash2, AlertCircle } from 'lucide-react'
import { deleteVehicle } from '@/actions/fleet'

export default async function FleetPage() {
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
  
  const { data: vehicles } = await supabase
    .from('carrier_fleet')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">My Fleet</h1>
        <p className="text-industrial-400">Manage your active units and VINs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: Add Vehicle Form */}
        <div className="lg:col-span-1">
            <div className="bg-industrial-900 border border-industrial-800 p-6 rounded-lg sticky top-8">
                <h3 className="text-xl font-display font-bold text-white mb-4">Add Unit</h3>
                <AddVehicleForm />
            </div>
        </div>

        {/* RIGHT: Vehicle List */}
        <div className="lg:col-span-2 space-y-4">
            {!vehicles || vehicles.length === 0 ? (
                <div className="bg-industrial-900/50 border border-industrial-800 border-dashed rounded-lg p-12 text-center">
                    <Truck className="h-10 w-10 text-industrial-600 mx-auto mb-4" />
                    <p className="text-industrial-400">No vehicles added yet.</p>
                </div>
            ) : (
                vehicles.map((v) => (
                    <div key={v.id} className="bg-industrial-900 border border-industrial-800 p-6 rounded-lg flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-industrial-800 rounded-full flex items-center justify-center">
                                <span className="font-bold text-silver text-xs">{v.year ? v.year.toString().slice(2) : 'TR'}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-lg">{v.unit_number}</h4>
                                <p className="text-industrial-400 text-sm">
                                    {v.year} {v.make} {v.model}
                                </p>
                                <p className="text-industrial-600 text-xs font-mono mt-1">VIN: {v.vin}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs font-bold rounded uppercase tracking-wider border border-green-900/50">
                                {v.type}
                            </span>
                            
                            <DeleteButton id={v.id} />
                        </div>
                    </div>
                ))
            )}
        </div>

      </div>
    </div>
  )
}

// Small Client Component for Delete (Since we can't accept onClick in Server Component)
// We'll define it here or import. Let's make it inline-able via a separate file if needed, 
// but for standard Next.js, form actions are best.
// Actually, let's just make a small form for delete.
function DeleteButton({ id }: { id: string }) {
    return (
        <form action={async () => {
            "use server"
            await deleteVehicle(id)
        }}>
            <button className="text-industrial-600 hover:text-red-400 p-2 transition-colors" title="Remove Vehicle">
                <Trash2 className="h-5 w-5" />
            </button>
        </form>
    )
}
