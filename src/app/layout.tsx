import type { Metadata } from "next";
import { Oswald, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CSPostHogProvider } from './providers';
import PostHogPageView from "./PostHogPageView";
import { Suspense } from 'react';

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Truck Insurance for the 1% | High Risk Specialists",
  description:
    "Don't let a violation code end your career. We specialize in the uninsurable.",
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
