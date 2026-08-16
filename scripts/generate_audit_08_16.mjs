import { getSearchPerformance } from '../src/lib/gsc.ts';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  const end = new Date('2026-08-16');
  const start = new Date('2026-07-17');
  const prevEnd = new Date('2026-07-16');
  const prevStart = new Date('2026-06-17');

  const endStr = end.toISOString().split('T')[0];
  const startStr = start.toISOString().split('T')[0];
  const prevEndStr = prevEnd.toISOString().split('T')[0];
  const prevStartStr = prevStart.toISOString().split('T')[0];

  console.log('Querying GSC API for Last 30 Days: ' + startStr + ' to ' + endStr);
  const currentData = await getSearchPerformance(startStr, endStr);
  console.log('Querying GSC API for Prev 30 Days: ' + prevStartStr + ' to ' + prevEndStr);
  const prevData = await getSearchPerformance(prevStartStr, prevEndStr);

  let currentClicks = 0, currentImps = 0;
  currentData.forEach(r => { currentClicks += r.clicks; currentImps += r.impressions; });

  let prevClicks = 0, prevImps = 0;
  prevData.forEach(r => { prevClicks += r.clicks; prevImps += r.impressions; });

  console.log('\n--- GSC AUDIT SUMMARY (LAST 30 DAYS) ---');
  console.log('Previous 30 Days: Clicks: ' + prevClicks + ', Impressions: ' + prevImps);
  console.log('Last 30 Days: Clicks: ' + currentClicks + ', Impressions: ' + currentImps);
  console.log('\nTop 20 Queries (Last 30 Days):');
  currentData.slice(0, 20).forEach(r => {
    console.log('- ' + r.keys[0] + ' on ' + r.keys[1] + ': ' + r.clicks + ' clicks, ' + r.impressions + ' imps');
  });
}

run().catch(console.error);
