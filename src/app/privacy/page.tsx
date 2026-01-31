export const metadata = {
  title: 'Privacy Policy | Truck Coverage Experts',
  description: 'How we collect, use, and protect your personal and business data.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-industrial-900 font-mono text-silver px-6 py-20">
      <main className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-industrial">
           <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
           
           <h2 className="text-xl text-white font-bold mt-8 mb-4">1. Data Collection</h2>
           <p className="mb-4">
             We collect business information (DOT Number, MC Number) and personal contact details solely for the purpose of providing insurance quotes and federal filing services.
           </p>

           <h2 className="text-xl text-white font-bold mt-8 mb-4">2. SMS Consent</h2>
           <p className="mb-4">
             By providing your phone number, you consent to receive SMS updates regarding your quote status and policy renewals. You may opt-out at any time by replying STOP.
           </p>

           <h2 className="text-xl text-white font-bold mt-8 mb-4">3. Data Sharing</h2>
           <p className="mb-4">
             We do not sell your data. We share your information only with our direct insurance carrier partners (e.g., Progressive, Northland, Lloyd's) to obtain bindable quotes.
           </p>
        </div>
      </main>
    </div>
  );
}
