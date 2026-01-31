import type { Metadata } from "next";
import { Oswald, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CSPostHogProvider } from './providers';
import PostHogPageView from "./PostHogPageView";
import { Footer } from "@/components/Footer";
import { Suspense } from 'react';

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://truckcoverageexperts.com'),
  title: {
    template: '%s | Truck Coverage Experts',
    default: 'Truck Insurance for the 1% | High Risk Specialists',
  },
  description:
    "High-risk commercial truck insurance specialists. We insure carriers with FMCSA violations, conditional safety ratings, and broker 'Do Not Load' bans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${jetbrainsMono.variable} antialiased bg-industrial-900 text-silver font-mono selection:bg-safety-orange selection:text-black`}
      >
        <CSPostHogProvider>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          {children}
          <Footer />
        </CSPostHogProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'InsuranceAgency',
              'name': 'Truck Coverage Experts',
              'url': 'https://truckcoverageexperts.com',
              'logo': 'https://truckcoverageexperts.com/logo.png',
              'description': 'Specialized high-risk trucking insurance and federal filing services.',
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': '123 Compliance Way',
                'addressLocality': 'Dallas',
                'addressRegion': 'TX',
                'postalCode': '75201',
                'addressCountry': 'US'
              },
              'contactPoint': {
                '@type': 'ContactPoint',
                'telephone': '+1-800-555-0199',
                'contactType': 'customer service',
                'areaServed': 'US',
                'availableLanguage': 'English'
              }
            })
          }}
        />
      </body>
    </html>
  );
}
