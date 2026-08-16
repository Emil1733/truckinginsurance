import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'truckcoverageexperts.com',
          },
        ],
        destination: 'https://www.truckcoverageexperts.com/:path*',
        permanent: true,
      },
      // Fix 404 Crawl Budget Leaks
      {
        source: '/route/:path*',
        destination: '/filings',
        permanent: true,
      },
      {
        source: '/broker/:path*',
        destination: '/broker-approval/:path*',
        permanent: true,
      },
    ];
  },
  
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/hot-shot-insurance/:state',
          has: [{ type: 'header', key: 'accept', value: '(?i).*application/json.*' }],
          destination: '/api/agentic/quote?niche=hot-shot&state=:state',
        },
        {
          source: '/box-truck-insurance/:state',
          has: [{ type: 'header', key: 'accept', value: '(?i).*application/json.*' }],
          destination: '/api/agentic/quote?niche=box-truck&state=:state',
        },
        {
          source: '/amazon-relay-insurance/:state',
          has: [{ type: 'header', key: 'accept', value: '(?i).*application/json.*' }],
          destination: '/api/agentic/quote?niche=amazon-relay&state=:state',
        },
        {
          source: '/commercial-truck-insurance/:state',
          has: [{ type: 'header', key: 'accept', value: '(?i).*application/json.*' }],
          destination: '/api/agentic/quote?niche=commercial-truck&state=:state',
        },
        {
          source: '/uber-black-insurance/:state',
          has: [{ type: 'header', key: 'accept', value: '(?i).*application/json.*' }],
          destination: '/api/agentic/quote?niche=uber-black&state=:state',
        }
      ]
    };
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
