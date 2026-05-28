import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free DOT Insurance Lookup & Compliance Score | Truck Coverage Experts',
  description: 'Enter your FMCSA DOT number to get a forensic insurance readiness score. See how your Out-of-Service rates and safety ratings affect your truck insurance premiums.',
  alternates: {
    canonical: 'https://truckcoverageexperts.com/dot-insurance-lookup',
  },
};

export default function DotLookupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
