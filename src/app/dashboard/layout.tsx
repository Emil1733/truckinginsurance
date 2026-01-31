"use client"

import { createBrowserClient } from '@supabase/ssr'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Truck, 
  LayoutDashboard, 
  FileText, 
  ShieldAlert, 
  LogOut, 
  Settings,
  CreditCard 
} from 'lucide-react'
import { useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Fleet', href: '/dashboard/fleet', icon: Truck },
    { name: 'Quotes', href: '/dashboard/quotes', icon: CreditCard },
    { name: 'Compliance', href: '/dashboard/compliance', icon: ShieldAlert },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-industrial-950 flex transition-all selection:bg-display-yellow selection:text-industrial-900">
      
      {/* SIDEBAR (Desktop) */}
      <div className="hidden lg:flex w-64 bg-industrial-900 border-r border-industrial-800 flex-col flex-shrink-0">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 text-silver hover:text-white transition-colors">
            <Truck className="h-6 w-6 text-display-yellow" />
            <span className="font-display font-bold text-lg tracking-tight">TCE DASHBOARD</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-industrial-800 text-display-yellow shadow-sm border border-industrial-700' 
                    : 'text-industrial-400 hover:bg-industrial-800 hover:text-white'
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? 'text-display-yellow' : 'text-industrial-500'}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-industrial-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* MOBILE HEADER */}
      <div className="absolute top-0 left-0 w-full lg:hidden bg-industrial-900 border-b border-industrial-800 p-4 flex items-center justify-between z-20">
        <Link href="/" className="flex items-center gap-2 text-silver">
          <Truck className="h-6 w-6 text-display-yellow" />
          <span className="font-display font-bold">TCE</span>
        </Link>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-industrial-300">
          <LayoutDashboard className="h-6 w-6" />
        </button>
      </div>

      {/* MAIN CONTENT Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:pl-0 pt-16 lg:pt-0">
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
                {children}
            </div>
        </main>
      </div>
    </div>
  )
}
