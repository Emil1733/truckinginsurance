import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://truckcoverageexperts.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/', 
          '/admin/', 
          '/api/',
          '/*.sql',
          '/*.csv',
          '/*.json',
          '/*.log',
          '/*.mjs',
          '/*.config.*',
          '/.env*'
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
