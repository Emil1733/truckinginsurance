import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trucking Insurance Quote: Costs and Requirements',
  description:
    'Request a trucking insurance quote review. What the quote needs, what moves the premium, how long it takes, and why a bindable trucking price is never instant.',
  alternates: { canonical: 'https://www.truckcoverageexperts.com/quote' },
  openGraph: {
    title: 'Trucking Insurance Quote Review | Truck Coverage Experts',
    description:
      'Start a commercial trucking insurance quote review and learn what the file needs before carriers will quote it.',
  },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
