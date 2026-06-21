import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free COI Generator for Truckers | Instant Certificate of Insurance',
  description: 'Stop waiting on your insurance agent. Generate a custom Certificate of Insurance (COI) instantly for any freight broker. Upload your dec page and get your COI in minutes.',
  alternates: {
    canonical: 'https://truckcoverageexperts.com/free-coi-generator',
  },
};

export default function CoiGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Free ACORD 25 COI Generator",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD"
        },
        "description": "Instantly generate and download Certificates of Insurance (ACORD 25) for freight brokers without waiting for your agent."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is an ACORD 25 Certificate of Insurance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Certificate of Liability Insurance (ACORD 25) is a document proving your motor carrier has active auto liability, cargo, and general liability coverage. Brokers require this document with their name listed as the Certificate Holder to book loads."
            }
          },
          {
            "@type": "Question",
            "name": "How fast will I receive my COI PDF?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Immediately. Our software instantly processes your master document, stamps the new certificate holder details, and triggers an immediate download to your device."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
