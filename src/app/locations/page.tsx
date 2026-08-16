import { US_STATES } from "@/lib/data/us-states";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Truck Insurance by State | Locations",
  description: "Find local commercial auto insurance requirements, filings, and quotes for Box Trucks, Hot Shots, and Amazon Relay in all 50 states.",
};

export default function LocationsPage() {
  const niches = [
    { name: "Box Truck Insurance", slug: "box-truck-insurance" },
    { name: "Hot Shot Insurance", slug: "hot-shot-insurance" },
    { name: "Amazon Relay Insurance", slug: "amazon-relay-insurance" },
    { name: "Commercial Truck Insurance", slug: "commercial-truck-insurance" },
    { name: "Uber Black Insurance", slug: "uber-black-insurance" }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Coverage by State</h1>
        <p className="text-slate-400 text-xl mb-12 max-w-3xl">Browse our specialized commercial auto insurance programs available in your state. We help motor carriers across the nation secure affordable coverage.</p>
        
        {niches.map(niche => (
          <div key={niche.slug} className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-blue-400 border-b border-slate-800 pb-2">{niche.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {US_STATES.map(state => (
                <Link key={state.slug} href={`/${niche.slug}/${state.slug}`} className="text-slate-300 hover:text-white hover:underline text-sm transition-colors">
                  {state.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}