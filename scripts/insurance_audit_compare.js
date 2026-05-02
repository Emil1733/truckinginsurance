const { google } = require('googleapis');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const webDir = 'c:/Users/tevat/truckinsurancesite/web';
const projectDir = 'c:/Users/tevat/truckinsurancesite';

dotenv.config({ path: path.join(webDir, '.env.local') });

async function compareInsuranceAudit() {
  console.log('--- LIVE INSURANCE QUERY AUDIT & COMPARISON ---');
  
  const siteUrl = 'sc-domain:truckcoverageexperts.com';
  const keyPath = path.join(projectDir, 'gsc_credentials.json');

  const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const gsc = google.webmasters({ version: 'v3', auth });

  try {
    const today = new Date('2026-04-29');
    const startDate = '2026-03-16'; 
    const endDate = today.toISOString().split('T')[0];

    console.log(`Auditing ${siteUrl} performance from ${startDate} to ${endDate}...`);
    
    const response = await gsc.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query', 'page'],
        rowLimit: 1000,
      },
    });

    const rows = response.data.rows || [];
    
    // Filter for insurance-intent keywords
    const insuranceKeywords = [
      'insurance', 'filing', 'mcp', 'sr22', 'sr-22', 'bmc', 'form', 'requirement', 'cost', 'quote', 'broker', 'tql', 'amazon relay'
    ];

    const currentResults = rows
      .filter(row => {
        const query = row.keys[0].toLowerCase();
        return insuranceKeywords.some(k => query.includes(k));
      })
      .map(row => ({
        query: row.keys[0],
        page: row.keys[1],
        clicks: row.clicks,
        impressions: row.impressions,
        position: Math.round(row.position * 10) / 10
      }))
      .sort((a, b) => b.impressions - a.impressions);

    // Load previous data (from March 16 audit)
    const prevAuditPath = path.join(projectDir, 'gsc_exports/03-16-2026/insurance_queries_audit.json');
    let previousResults = [];
    if (fs.existsSync(prevAuditPath)) {
      previousResults = JSON.parse(fs.readFileSync(prevAuditPath, 'utf8'));
      console.log(`Loaded ${previousResults.length} rows from previous audit.`);
    } else {
      console.warn(`Previous audit not found at ${prevAuditPath}`);
    }

    // Comparison logic
    let totalImpsCurrent = 0;
    let totalClicksCurrent = 0;
    currentResults.forEach(r => {
      totalImpsCurrent += r.impressions;
      totalClicksCurrent += r.clicks;
    });

    let totalImpsPrev = 0;
    let totalClicksPrev = 0;
    previousResults.forEach(r => {
      totalImpsPrev += r.impressions;
      totalClicksPrev += r.clicks;
    });

    const impsGrowth = totalImpsPrev > 0 ? Math.round(((totalImpsCurrent - totalImpsPrev) / totalImpsPrev) * 100) : 100;
    
    console.log(`\n--- METRICS COMPARISON ---`);
    console.log(`Impressions: ${totalImpsPrev} -> ${totalImpsCurrent} (${impsGrowth > 0 ? '+' : ''}${impsGrowth}%)`);
    console.log(`Clicks: ${totalClicksPrev} -> ${totalClicksCurrent}`);

    // Compare individual queries
    const comparisonTable = currentResults.map(curr => {
      const prev = previousResults.find(p => p.query === curr.query && p.page === curr.page);
      return {
        query: curr.query,
        impressions: curr.impressions,
        impsChange: prev ? curr.impressions - prev.impressions : curr.impressions,
        clicks: curr.clicks,
        position: curr.position,
        posChange: prev ? Math.round((prev.position - curr.position) * 10) / 10 : 'NEW',
        page: curr.page.replace('https://www.truckcoverageexperts.com', '').replace('https://truckcoverageexperts.com', '')
      };
    });

    const outputPath = path.join(projectDir, 'gsc_exports/04-29-2026/insurance_queries_audit.json');
    fs.writeFileSync(outputPath, JSON.stringify(currentResults, null, 2));

    // Generate Markdown Report
    let mdContent = `# GSC Search Audit & Comparison (April 29, 2026)\n\n`;
    mdContent += `## 📊 High-Level Metrics (Compared to March 16)\n`;
    mdContent += `* **Total Insurance-Intent Impressions:** ${totalImpsCurrent} (vs ${totalImpsPrev})\n`;
    mdContent += `* **Impression Growth:** ${impsGrowth > 0 ? '+' : ''}${impsGrowth}%\n`;
    mdContent += `* **Total Clicks:** ${totalClicksCurrent} (vs ${totalClicksPrev})\n\n`;

    mdContent += `## 🚀 Top Queries & Movement\n`;
    mdContent += `| Query | Impressions | Imp Change | Position | Pos Change | Page |\n`;
    mdContent += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
    
    comparisonTable.slice(0, 30).forEach(r => {
      const posChangeStr = r.posChange === 'NEW' ? '🆕 NEW' : (r.posChange > 0 ? `🟢 +${r.posChange}` : (r.posChange < 0 ? `🔴 ${r.posChange}` : '➖ 0'));
      const impChangeStr = r.impsChange > 0 ? `+${r.impsChange}` : r.impsChange;
      mdContent += `| ${r.query} | ${r.impressions} | ${impChangeStr} | ${r.position} | ${posChangeStr} | ${r.page} |\n`;
    });

    const reportPath = path.join(projectDir, 'gsc_exports/04-29-2026/comparison_report.md');

    fs.writeFileSync(reportPath, mdContent);

    console.log(`\nAudit saved to: ${outputPath}`);
    console.log(`Comparison Report saved to: ${reportPath}`);

  } catch (err) {
    console.error('API Error:', err.message);
  }
}

compareInsuranceAudit();
