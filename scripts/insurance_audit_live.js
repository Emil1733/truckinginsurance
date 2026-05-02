const { google } = require('googleapis');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: '.env.local' });

async function getInsuranceAudit() {
  console.log('--- LIVE INSURANCE QUERY AUDIT (USING JSON FILE) ---');
  
  const siteUrl = 'sc-domain:truckcoverageexperts.com';
  const keyPath = path.join(__dirname, '../../gsc_credentials.json');

  const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const gsc = google.webmasters({ version: 'v3', auth });

  try {
    const today = new Date();
    const startDate = '2026-03-03'; 
    const endDate = today.toISOString().split('T')[0];

    console.log(`Auditing ${siteUrl} performance from ${startDate}...`);
    
    const response = await gsc.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query', 'page'],
        rowLimit: 500,
      },
    });

    const rows = response.data.rows || [];
    
    // Sort by impressions descending to find the "juice"
    const results = rows
      .map(row => ({
        query: row.keys[0],
        page: row.keys[1],
        clicks: row.clicks,
        impressions: row.impressions,
        position: Math.round(row.position * 10) / 10
      }))
      .sort((a, b) => b.impressions - a.impressions);

    console.log('\n--- TOP RANKINGS (LIVE DATA - POST MARCH 3) ---');
    console.table(results.slice(0, 50));

    const outputPath = path.join(__dirname, '../../gsc_exports/03-16-2026/insurance_queries_audit.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

    // Also generate a markdown table for the user
    let mdTable = "| Query | Impressions | Clicks | Position | Page |\n| :--- | :--- | :--- | :--- | :--- |\n";
    results.slice(0, 50).forEach(r => {
      mdTable += `| ${r.query} | ${r.impressions} | ${r.clicks} | ${r.position} | ${r.page.replace('https://www.truckcoverageexperts.com', '')} |\n`;
    });

    const reportPath = path.join(__dirname, '../../gsc_exports/03-16-2026/live_audit_report.md');
    fs.writeFileSync(reportPath, `# Live Search Audit (March 3 - March 16)\n\n${mdTable}`);

    console.log(`\nAudit saved to: ${outputPath}`);
    console.log(`Report saved to: ${reportPath}`);

  } catch (err) {
    console.error('API Error:', err.message);
  }
}

getInsuranceAudit();
