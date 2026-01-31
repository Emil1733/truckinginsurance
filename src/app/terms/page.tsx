export const metadata = {
  title: 'Terms of Service | Truck Coverage Experts',
  description: 'Terms and conditions for using our website and services.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-industrial-900 font-mono text-silver px-6 py-20">
      <main className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-white mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-industrial">
           <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
           
           <h2 className="text-xl text-white font-bold mt-8 mb-4">1. Services</h2>
           <p className="mb-4">
             Truck Coverage Experts acts as a licensed insurance agency connecting motor carriers with specialized insurance products. We are not an insurance carrier.
           </p>

           <h2 className="text-xl text-white font-bold mt-8 mb-4">2. Binding Coverage</h2>
           <p className="mb-4">
             Coverage is not bound until you receive a written confirmation (Binder or COI) from an authorized agent. Submission of an application does not guarantee coverage.
           </p>

           <h2 className="text-xl text-white font-bold mt-8 mb-4">3. Accuracy of Information</h2>
           <p className="mb-4">
             You represent that all information provided regarding your fleet, drivers, and cargo is accurate. Misrepresentation may result in policy cancellation or denial of claims.
           </p>
        </div>
      </main>
    </div>
  );
}
