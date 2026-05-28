import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];

export async function getGSCClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'c:/Users/tevat/truckinsurancesite/gsc_credentials.json',
    scopes: SCOPES,
  });

  return google.webmasters({ version: 'v3', auth });
}

export async function getSearchPerformance(startDate: string, endDate: string) {
  const gsc = await getGSCClient();
  const siteUrl = process.env.SITE_URL || 'sc-domain:truckcoverageexperts.com';

  const response = await gsc.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions: ['query', 'page'],
      rowLimit: 100,
    },
  });

  return response.data.rows || [];
}
