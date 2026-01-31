import { MetadataRoute } from 'next';
import { VIOLATIONS_DATA } from '@/lib/data/violations';
import { FILINGS_DATA } from '@/lib/data/filings';
import { TRAILERS_DATA } from '@/lib/data/trailers';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://truckcoverageexperts.com';

  // 1. Static Routes
  const staticRoutes = [
    '',
    '/about',
    '/check-score',
    '/hot-shot',
    '/contact',
    '/filings',
    '/violations',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Programmatic: Violations
  const violationRoutes = VIOLATIONS_DATA.map((v) => ({
    url: `${baseUrl}/violation/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Programmatic: Filings
  const filingRoutes = FILINGS_DATA.map((f) => ({
    url: `${baseUrl}/filing/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 4. Programmatic: Specialized Insurance (Trailers)
  const insuranceRoutes = TRAILERS_DATA.map((t) => ({
    url: `${baseUrl}/insurance/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 5. Programmatic: Brokers (Fetched from DB)
  let brokerRoutes: MetadataRoute.Sitemap = [];
  try {
      const { data: brokers } = await supabase.from('brokers').select('slug');
      if (brokers) {
          brokerRoutes = brokers.map((b) => ({
            url: `${baseUrl}/broker/${b.slug}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
          }));
      }
  } catch (err) {
      console.error('Sitemap DB broker fetch failed:', err);
  }

  // 6. Programmatic: Safety Ratings (Fetched from DB)
  let safetyRoutes: MetadataRoute.Sitemap = [];
  try {
      const { data: factors } = await supabase.from('safety_factors').select('slug');
      if (factors) {
          safetyRoutes = factors.map((f) => ({
            url: `${baseUrl}/safety-rating/${f.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          }));
      }
  } catch (err) {
      console.error('Sitemap DB safety fetch failed:', err);
  }

  // 7. Programmatic: High Volume Routes (Fetched from DB)
  let routeRoutes: MetadataRoute.Sitemap = [];
  try {
      const { data: routes } = await supabase.from('routes').select('slug');
      if (routes) {
          routeRoutes = routes.map((r) => ({
            url: `${baseUrl}/route/${r.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
          }));
      }
  } catch (err) {
      console.error('Sitemap DB route fetch failed:', err);
  }

  return [
    ...staticRoutes,
    ...violationRoutes,
    ...filingRoutes,
    ...insuranceRoutes,
    ...brokerRoutes,
    ...safetyRoutes,
    ...routeRoutes,
  ];
}
