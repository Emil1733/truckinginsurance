import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Request a Trucking Certificate of Insurance',
  description: 'Learn who to contact and what to provide when a freight broker asks for an updated trucking certificate of insurance.',
  alternates: { canonical: '/free-coi-generator' },
};

export default function CertificateGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
