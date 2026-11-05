import { MetadataRoute } from 'next';
import { VIOLATIONS_DATA } from '@/lib/data/violations';
import { FILINGS_DATA } from '@/lib/data/filings';
import { TRAILERS_DATA } from '@/lib/data/trailers';
import { BROKERS_DATA } from '@/lib/data/brokers';
import { UBER_BLACK_STATES } from '@/lib/data/uber-black-states';
import { US_STATES } from '@/lib/data/us-states';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.truckcoverageexperts.com';

  // 1. Static Routes
  const staticRoutes = [
    '',
    '/about',
    '/locations',
    '/insurance',
    '/broker',
    '/check-score',
    '/dot-insurance-lookup',
    '/free-coi-generator',
    '/hot-shot',
    '/box-truck-insurance',
    '/trucking-insurance-requirements',
    '/dot-insurance-requirements',
    '/new-authority-insurance',
    '/trucking-insurance-readiness',
    '/carrier-readiness',
    '/contact',
    '/filings',
    '/violations',
    '/insurance/car-hauler-insurance-cost',
    '/insurance/car-hauler-insurance-requirements',
    '/insurance/dump-trailer-insurance',
    '/ifta-trucking-requirements',
    '/driver-qualification-file-checklist',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Programmatic: Violations
  const violationRoutes = VIOLATIONS_DATA.map((v) => ({
    url: `${baseUrl}/violation/${v.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Programmatic: Filings
  const filingRoutes = FILINGS_DATA.map((f) => ({
    url: `${baseUrl}/filing/${f.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 4. Programmatic: Specialized Insurance (Trailers)
  const insuranceRoutes = TRAILERS_DATA.map((t) => ({
    url: `${baseUrl}/insurance/${t.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 4b. Broker Approval Pages
  const brokerApprovalRoutes = BROKERS_DATA.map((b) => ({
    url: `${baseUrl}/broker/${b.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 4c. High-Spike Service Pages
  const serviceRoutes = [
    { url: `${baseUrl}/amazon-relay-insurance`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/dmv65mcp`, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/uiia-certification`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/geico-truck-insurance-comparison`, priority: 0.9, changeFrequency: 'weekly' as const },
  ];

  // 6. Programmatic: Safety Ratings (Fetched from DB with Pagination)
  const safetyRoutes: MetadataRoute.Sitemap = [];
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


  // 8. Programmatic: Revocation Status (Fetched with Admin Key to bypass RLS)
  const statusRoutes: MetadataRoute.Sitemap = [];
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
                lastModified: r.updated_at ? new Date(r.updated_at) : undefined,
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

  // 9. Programmatic: Uber Black Insurance by State

  const boxtruckRoutes = US_STATES.map((state) => ({
    url: `${baseUrl}/box-truck-insurance/${state.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));


  const hotshotRoutes = US_STATES.map((state) => ({
    url: `${baseUrl}/hot-shot-insurance/${state.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));


  const amazonrelayRoutes = US_STATES.map((state) => ({
    url: `${baseUrl}/amazon-relay-insurance/${state.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));


  const commercialtruckRoutes = US_STATES.map((state) => ({
    url: `${baseUrl}/commercial-truck-insurance/${state.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const uberBlackRoutes = UBER_BLACK_STATES.map((state) => ({
    url: `${baseUrl}/uber-black-insurance/${state.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    ...staticRoutes,
    ...violationRoutes,
    ...filingRoutes,
    ...insuranceRoutes,
    ...brokerApprovalRoutes,
    ...serviceRoutes,
    ...safetyRoutes,
    ...statusRoutes,
    ...boxtruckRoutes,
    ...hotshotRoutes,
    ...amazonrelayRoutes,
    ...commercialtruckRoutes,
    ...uberBlackRoutes,
  ];
}
