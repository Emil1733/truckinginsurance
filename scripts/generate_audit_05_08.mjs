import { getSearchPerformance } from '../src/lib/gsc.ts';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: 'c:/Users/tevat/truckinsurancesite/web/.env.local' });

async function generateAudit() {
  console.log('--- GSC Forensic Audit (04/29 - 05/08) ---');
  
  const startDate = '2026-04-29';
  const endDate = '2026-05-06'; // Accounting for 2-day GSC lag
  
  const exportDir = 'c:/Users/tevat/truckinsurancesite/gsc_exports/05-08-2026';

  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  try {
    console.log(`Fetching Search Performance from ${startDate} to ${endDate}...`);
    const data = await getSearchPerformance(startDate, endDate);
    
    // Save raw data for comparison
    fs.writeFileSync(path.join(exportDir, 'insurance_queries_audit.json'), JSON.stringify(data, null, 2));
    console.log('Audit data saved successfully in ' + exportDir);

  } catch (error) {
    console.error('Failed to generate audit:', error);
  }
}

generateAudit();
