const { google } = require('googleapis');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const webDir = 'c:/Users/tevat/truckinsurancesite/web';
const projectDir = 'c:/Users/tevat/truckinsurancesite';

dotenv.config({ path: path.join(webDir, '.env.local') });

async function checkPageDrop() {
  console.log('--- PAGE DROP ANALYSIS ---');
  
  const siteUrl = 'sc-domain:truckcoverageexperts.com';
  const keyPath = path.join(projectDir, 'gsc_credentials.json');

  const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const gsc = google.webmasters({ version: 'v3', auth });

  try {
    // We want to compare the unique pages getting impressions in Feb/March vs April
    const getPages = async (startDate, endDate) => {
        const response = await gsc.searchanalytics.query({
            siteUrl,
            requestBody: {
              startDate,
              endDate,
              dimensions: ['page'],
              rowLimit: 5000,
            },
          });
          return response.data.rows || [];
    };

    const period1 = await getPages('2026-02-15', '2026-03-15');
    const period2 = await getPages('2026-03-16', '2026-04-29');

    console.log(`Unique pages with impressions (Feb 15 - Mar 15): ${period1.length}`);
    console.log(`Unique pages with impressions (Mar 16 - Apr 29): ${period2.length}`);

    // Let's also pull data grouped by date to see the daily page count
    const getDailyPages = async (startDate, endDate) => {
        const response = await gsc.searchanalytics.query({
            siteUrl,
            requestBody: {
              startDate,
              endDate,
              dimensions: ['date'],
              rowLimit: 5000,
            },
          });
          return response.data.rows || [];
    };
    
    // Actually, getting daily page count requires dimensions: ['date', 'page']
    console.log('\nFetching daily unique page counts...');
    const dailyData = await gsc.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate: '2026-03-01',
          endDate: '2026-04-29',
          dimensions: ['date', 'page'],
          rowLimit: 25000,
        },
    });

    const dailyRows = dailyData.data.rows || [];
    const pagesPerDay = {};
    dailyRows.forEach(r => {
        const date = r.keys[0];
        pagesPerDay[date] = (pagesPerDay[date] || 0) + 1;
    });

    console.log('Daily Pages with Impressions (Last 14 days of data):');
    Object.keys(pagesPerDay).sort().slice(-14).forEach(date => {
        console.log(`${date}: ${pagesPerDay[date]} pages`);
    });

  } catch (err) {
    console.error('API Error:', err.message);
  }
}

checkPageDrop();
