import { MetadataRoute } from 'next';
import { VIOLATIONS_DATA } from '@/lib/data/violations';
import { FILINGS_DATA } from '@/lib/data/filings';
import { TRAILERS_DATA } from '@/lib/data/trailers';
import { BROKERS_DATA } from '@/lib/data/brokers';
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

  // 4b. Broker Approval Pages
  const brokerApprovalRoutes = BROKERS_DATA.map((b) => ({
    url: `${baseUrl}/broker/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 4c. High-Spike Service Pages
  const serviceRoutes = [
    { url: `${baseUrl}/amazon-relay-insurance`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/dmv65mcp`, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/uiia-certification`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/geico-truck-insurance-comparison`, priority: 0.9, changeFrequency: 'weekly' as const },
  ].map(s => ({
    ...s,
    lastModified: new Date(),
  }));

  // 5. Programmatic: Brokers (Fetched from DB with Pagination)
  let brokerRoutes: MetadataRoute.Sitemap = [];
  try {
      let hasMore = true;
      let page = 0;
      const pageSize = 1000;
      
      while(hasMore) {
          const { data: brokers } = await supabase
            .from('brokers')
            .select('slug')
            .range(page * pageSize, (page + 1) * pageSize - 1);
            
          if (brokers && brokers.length > 0) {
              const chunk = brokers.map((b) => ({
                url: `${baseUrl}/broker/${b.slug}`,
                lastModified: new Date(),
                changeFrequency: 'daily' as const,
                priority: 0.9,
              }));
              brokerRoutes.push(...chunk);
              
              if (brokers.length < pageSize) hasMore = false;
              page++;
          } else {
              hasMore = false;
          }
      }
  } catch (err) {
      console.error('Sitemap DB broker fetch failed:', err);
  }

  // 6. Programmatic: Safety Ratings (Fetched from DB with Pagination)
  let safetyRoutes: MetadataRoute.Sitemap = [];
  try {
      let hasMore = true;
      let page = 0;
      const pageSize = 1000;

      while(hasMore) {
          const { data: factors } = await supabase
            .from('safety_factors')
            .select('slug')
            .range(page * pageSize, (page + 1) * pageSize - 1);

          if (factors && factors.length > 0) {
              const chunk = factors.map((f) => ({
                url: `${baseUrl}/safety-rating/${f.slug}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
              }));
              safetyRoutes.push(...chunk);

              if (factors.length < pageSize) hasMore = false;
              page++;
          } else {
              hasMore = false;
          }
      }
  } catch (err) {
      console.error('Sitemap DB safety fetch failed:', err);
  }

  // 7. Programmatic: High Volume Routes (Fetched from DB with Pagination)
  let routeRoutes: MetadataRoute.Sitemap = [];
  try {
      let hasMore = true;
      let page = 0;
      const pageSize = 1000;

      while(hasMore) {
        const { data: routes } = await supabase
            .from('routes')
            .select('slug')
            .range(page * pageSize, (page + 1) * pageSize - 1);

        if (routes && routes.length > 0) {
            const chunk = routes.map((r) => ({
                url: `${baseUrl}/route/${r.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly' as const,
                priority: 0.8,
            }));
            routeRoutes.push(...chunk);

            if (routes.length < pageSize) hasMore = false;
            page++;
        } else {
            hasMore = false;
        }
      }
  } catch (err) {
      console.error('Sitemap DB route fetch failed:', err);
  }

  // 8. Programmatic: Revocation Status (Fetched with Admin Key to bypass RLS)
  let statusRoutes: MetadataRoute.Sitemap = [];
  try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      let hasMore = true;
      let page = 0;
      const pageSize = 1000;

      while(hasMore) {
        const { data: revocations } = await supabaseAdmin
            .from('fmcsa_revocations')
            .select('mc_number, updated_at')
            .eq('status', 'PENDING')
            .range(page * pageSize, (page + 1) * pageSize - 1);

        if (revocations && revocations.length > 0) {
            const chunk = revocations.map((r) => ({
                url: `${baseUrl}/status/mc-${r.mc_number.toLowerCase()}`,
                lastModified: r.updated_at ? new Date(r.updated_at) : new Date(),
                changeFrequency: 'always' as const,
                priority: 1.0, // Highest priority since these expire fast
            }));
            statusRoutes.push(...chunk);

            if (revocations.length < pageSize) hasMore = false;
            page++;
        } else {
            hasMore = false;
        }
      }
  } catch (err) {
      console.error('Sitemap DB status fetch failed:', err);
  }

  return [
    ...staticRoutes,
    ...violationRoutes,
    ...filingRoutes,
    ...insuranceRoutes,
    ...brokerApprovalRoutes,
    ...serviceRoutes,
    ...brokerRoutes,
    ...safetyRoutes,
    ...routeRoutes,
    ...statusRoutes,
  ];
}
