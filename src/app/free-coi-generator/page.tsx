import { SiteHeader } from '@/components/SiteHeader';

export default function CertificateRequestGuide() {
  return (
    <>
      <SiteHeader statusLabel="Certificate of insurance" ctaLabel="Request a review" />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-5 font-display text-4xl font-bold text-white">Request a Certificate of Insurance</h1>
        <p className="mb-8 text-silver">
          If a broker needs a new certificate holder listed, ask the agent or insurer that services your policy to issue an updated certificate. Keep your existing certificate as issued.
        </p>
        <h2 className="mb-4 text-2xl font-bold text-white">What to send your agent</h2>
        <ul className="mb-8 list-disc space-y-2 pl-5 text-silver">
          <li>Your trucking company name and policy number</li>
          <li>The broker’s exact legal name and mailing address</li>
          <li>Any written coverage or endorsement requirements from the broker</li>
          <li>The delivery deadline and where the broker wants the certificate sent</li>
        </ul>
        <p className="text-silver">
          Need help finding the right contact?{' '}
          <a className="text-yellow-400 underline underline-offset-4" href="mailto:support@truckcoverageexperts.com?subject=Certificate%20of%20Insurance%20assistance">Email Truck Coverage Experts support</a>.
        </p>
      </main>
    </>
  );
}
