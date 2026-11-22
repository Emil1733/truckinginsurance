/**
 * GSC baseline snapshot.
 *
 * Records the "before" state for every page published or rewritten in the 2026-11-22 session,
 * so the 8-week review has a dated comparison instead of a memory.
 *
 * Run: node scripts/gsc-baseline.cjs [label]
 * Output: analytics/gsc-baseline-<label>.json
 *
 * Credentials come from .env.local (GSC_CLIENT_EMAIL, GSC_PRIVATE_KEY), which the project already
 * uses for Search Console access. The service account must hold access to the property.
 */
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const SITE = 'sc-domain:truckcoverageexperts.com';
const LABEL = process.argv[2] || new Date().toISOString().slice(0, 10);

const URLS = [
  '/commercial-truck-insurance',
  '/commercial-truck-insurance/florida',
  '/commercial-truck-insurance/texas',
  '/commercial-truck-insurance/california',
  '/commercial-truck-insurance/indiana',
  '/commercial-truck-insurance/new-york',
  '/commercial-truck-insurance/new-jersey',
  '/commercial-truck-insurance/pennsylvania',
  '/commercial-truck-insurance/illinois',
  '/non-trucking-liability-insurance',
  '/bobtail-insurance',
  '/box-truck-insurance',
  '/semi-truck-insurance',
  '/uber-black-insurance',
  '/quote',
];

function loadEnv() {
  const file = path.resolve(__dirname, '..', '.env.local');
  const out = {};
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    out[m[1]] = value.replace(/\\n/g, '\n');
  }
  return out;
}

(async () => {
  const env = loadEnv();
  const keyFile = process.env.GSC_KEY_FILE;
  const auth = new google.auth.GoogleAuth({
    ...(keyFile
      ? { keyFile }
      : {
          credentials: {
            client_email: env.GSC_CLIENT_EMAIL,
            private_key: env.GSC_PRIVATE_KEY,
          },
        }),
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const sc = google.searchconsole({ version: 'v1', auth });

  const daily = async (startDate, endDate, dimensions) => {
    const rows = [];
    for (let startRow = 0; startRow < 200000; startRow += 25000) {
      const res = await sc.searchanalytics.query({
        siteUrl: SITE,
        requestBody: { startDate, endDate, dimensions, rowLimit: 25000, startRow },
      });
      const got = res.data.rows || [];
      rows.push(...got);
      if (got.length < 25000) break;
    }
    return rows;
  };

  // Whole-property totals for context.
  const siteTotals = {};
  for (const [label, start, end] of [
    ['last90', '2026-08-24', '2026-11-22'],
    ['last7', '2026-11-16', '2026-11-22'],
  ]) {
    const rows = await daily(start, end, ['date']);
    siteTotals[label] = rows.reduce(
      (a, r) => ({ clicks: a.clicks + (r.clicks || 0), impressions: a.impressions + (r.impressions || 0) }),
      { clicks: 0, impressions: 0 }
    );
  }

  // Page-level rows, then filter to the tracked set.
  const pages90 = await daily('2026-08-24', '2026-11-22', ['page']);
  const byPage = new Map();
  for (const row of pages90) {
    const p = row.keys[0].replace(/^https?:\/\/(www\.)?truckcoverageexperts\.com/, '');
    const cur = byPage.get(p) || { clicks: 0, impressions: 0, positionSum: 0, n: 0 };
    cur.clicks += row.clicks || 0;
    cur.impressions += row.impressions || 0;
    cur.positionSum += (row.position || 0) * (row.impressions || 1);
    cur.n += row.impressions || 1;
    byPage.set(p, cur);
  }

  const results = [];
  for (const url of URLS) {
    const stats = byPage.get(url) || { clicks: 0, impressions: 0, positionSum: 0, n: 1 };
    let inspection = null;
    try {
      const res = await sc.urlInspection.index.inspect({
        requestBody: { inspectionUrl: `https://www.truckcoverageexperts.com${url}`, siteUrl: SITE },
      });
      inspection = res.data.inspectionResult?.indexStatusResult || null;
    } catch (err) {
      inspection = { error: err.message };
    }
    results.push({
      url,
      clicks90d: stats.clicks,
      impressions90d: stats.impressions,
      avgPosition90d: stats.impressions ? +(stats.positionSum / stats.n).toFixed(1) : null,
      verdict: inspection?.verdict || null,
      coverageState: inspection?.coverageState || null,
      indexingState: inspection?.indexingState || null,
      lastCrawl: inspection?.lastCrawlTime || null,
      canonical: inspection?.googleCanonical || null,
    });
  }

  const out = { label: LABEL, generatedAt: new Date().toISOString(), site: SITE, siteTotals, pages: results };
  const dir = path.resolve(__dirname, '..', 'analytics');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `gsc-baseline-${LABEL}.json`);
  fs.writeFileSync(file, JSON.stringify(out, null, 2));

  console.log(`site 90d: ${siteTotals.last90.clicks} clicks / ${siteTotals.last90.impressions} impressions`);
  console.log(`site  7d: ${siteTotals.last7.clicks} clicks / ${siteTotals.last7.impressions} impressions`);
  console.log('');
  console.log('url'.padEnd(52), 'clk90', 'imp90', 'pos', 'verdict', 'coverage');
  for (const r of results) {
    console.log(
      r.url.padEnd(52),
      String(r.clicks90d).padStart(5),
      String(r.impressions90d).padStart(6),
      String(r.avgPosition90d ?? '-').padStart(5),
      (r.verdict || '-').padEnd(14),
      r.coverageState || '-'
    );
  }
  console.log(`\nwrote ${file}`);
})().catch((err) => {
  console.error('baseline failed:', err.message);
  process.exit(1);
});
