import { getGSCClient } from '../src/lib/gsc.ts';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: 'c:/Users/tevat/truckinsurancesite/web/.env.local' });

async function fetchGscData(gsc, startDate, endDate) {
  const siteUrl = process.env.SITE_URL || 'sc-domain:truckcoverageexperts.com';
  console.log(`Querying ${siteUrl} from ${startDate} to ${endDate} (USA only)...`);
  const response = await gsc.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['query', 'page'],
      dimensionFilterGroups: [{
        filters: [{
          dimension: 'country',
          operator: 'equals',
          expression: 'usa'
        }]
      }],
      rowLimit: 500,
    },
  });
  return response.data.rows || [];
}

async function runAudit() {
  const gsc = await getGSCClient();
  
  // Last 30 Days (Accounting for 2-day lag)
  const last30Start = '2026-06-06';
  const last30End = '2026-07-05';
  
  // Previous 30 Days
  const prev30Start = '2026-05-07';
  const prev30End = '2026-06-05';

  const exportDir = 'c:/Users/tevat/truckinsurancesite/gsc_exports/07-07-2026';
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  try {
    const last30Data = await fetchGscData(gsc, last30Start, last30End);
    const prev30Data = await fetchGscData(gsc, prev30Start, prev30End);
    
    fs.writeFileSync(path.join(exportDir, 'last_30_days_usa.json'), JSON.stringify(last30Data, null, 2));
    fs.writeFileSync(path.join(exportDir, 'prev_30_days_usa.json'), JSON.stringify(prev30Data, null, 2));

    // Simple analysis for the AI to read
    const metricsLast30 = { clicks: 0, impressions: 0 };
    last30Data.forEach(r => { metricsLast30.clicks += r.clicks; metricsLast30.impressions += r.impressions; });

    const metricsPrev30 = { clicks: 0, impressions: 0 };
    prev30Data.forEach(r => { metricsPrev30.clicks += r.clicks; metricsPrev30.impressions += r.impressions; });

    console.log('\n--- GSC AUDIT SUMMARY ---');
    console.log(`Previous 30 Days (${prev30Start} to ${prev30End}): Clicks: ${metricsPrev30.clicks}, Impressions: ${metricsPrev30.impressions}`);
    console.log(`Last 30 Days (${last30Start} to ${last30End}): Clicks: ${metricsLast30.clicks}, Impressions: ${metricsLast30.impressions}`);
    
    // Top rising queries
    console.log('\nTop 5 Queries (Last 30 Days):');
    last30Data.sort((a,b) => b.clicks - a.clicks).slice(0, 5).forEach(r => {
      console.log(`- "${r.keys[0]}" on ${r.keys[1]}: ${r.clicks} clicks, ${r.impressions} imps`);
    });

  } catch (error) {
    console.error('Failed to generate audit:', error);
  }
}

runAudit();
