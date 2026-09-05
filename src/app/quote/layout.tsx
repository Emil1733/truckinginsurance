import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commercial Truck Insurance Quote Review',
  description: 'Request a commercial truck insurance quote review. Share your operation details so a licensed insurance professional can review coverage, filings, and available options.',
  alternates: { canonical: 'https://www.truckcoverageexperts.com/quote' },
  openGraph: {
    title: 'Commercial Truck Insurance Quote Review',
    description: 'Prepare your trucking operation details for a commercial insurance and filing review.',
  },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
