import Link from 'next/link'
import { PlusCircle, FileText, Clock, ArrowRight } from 'lucide-react'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export default async function QuotesPage() {
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
  
  const { data: quotes } = await supabase
    .from('saved_quotes')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Quote Wallet</h1>
          <p className="text-industrial-400">Manage your saved estimates and active binders.</p>
        </div>
        <Link href="/quote" className="bg-display-yellow hover:bg-yellow-400 text-industrial-900 px-4 py-2 rounded-md font-bold text-sm transition-colors flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            New Quote
        </Link>
      </div>

      {!quotes || quotes.length === 0 ? (
        /* EMPTY STATE */
        <div className="bg-industrial-900 border border-industrial-800 rounded-xl p-12 text-center">
            <div className="w-16 h-16 bg-industrial-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-industrial-500" />
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-2">No Saved Quotes</h3>
            <p className="text-industrial-400 max-w-sm mx-auto mb-8">
                Start a new quote to see premium estimates from top specialized carriers.
            </p>
            <Link href="/quote" className="text-display-yellow font-bold hover:text-white transition-colors">
                Start a Quote &rarr;
            </Link>
        </div>
      ) : (
        /* LIST STATE */
        <div className="grid gap-4">
            {quotes.map((quote) => (
                <div key={quote.id} className="bg-industrial-900 border border-industrial-800 p-6 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-industrial-700 transition-colors">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-industrial-800 rounded-lg">
                            <Clock className="h-6 w-6 text-display-yellow" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-lg">{quote.carrier_name}</p>
                            <p className="text-industrial-500 text-sm flex items-center gap-2">
                                Ref: <span className="font-mono text-silver">{quote.quote_reference}</span>
                                <span className="text-industrial-700">•</span>
                                {new Date(quote.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-industrial-500 text-xs uppercase tracking-wider mb-1">Est. Premium</p>
                            <p className="text-2xl font-display font-bold text-white">
                                {Number(quote.premium_estimate) > 0 
                                    ? `$${Number(quote.premium_estimate).toLocaleString()}` 
                                    : 'Processing'}
                            </p>
                        </div>
                        <Link href={`/dashboard/quotes/${quote.id}`} className="bg-industrial-800 hover:bg-industrial-700 text-white p-3 rounded-lg transition-colors">
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  )
}
