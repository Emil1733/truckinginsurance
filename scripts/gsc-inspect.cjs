const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const SITE = 'sc-domain:truckcoverageexperts.com';
const URLS = process.argv.slice(2);
if (!URLS.length) { console.error('pass urls'); process.exit(1); }

function loadEnv() {
  const file = path.resolve(__dirname, '..', '.env.local');
  const out = {};
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    out[m[1]] = m[2].trim().replace(/^"|"$/g, '').replace(/\\n/g, '\n');
  }
  return out;
}

(async () => {
  const env = loadEnv();
  const keyFile = process.env.GSC_KEY_FILE;
  const auth = new google.auth.GoogleAuth({
    ...(keyFile ? { keyFile } : { credentials: { client_email: env.GSC_CLIENT_EMAIL, private_key: env.GSC_PRIVATE_KEY } }),
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const sc = google.searchconsole({ version: 'v1', auth });
  for (const u of URLS) {
    const url = u.startsWith('http') ? u : `https://www.truckcoverageexperts.com${u}`;
    const res = await sc.urlInspection.index.inspect({ requestBody: { inspectionUrl: url, siteUrl: SITE } });
    const r = res.data.inspectionResult?.indexStatusResult || {};
    console.log(`${u}\n   verdict=${r.verdict} coverage=${r.coverageState} robots=${r.robotsTxtState} lastCrawl=${r.lastCrawlTime || '-'}`);
  }
})().catch((e) => { console.error('failed:', e.message); process.exit(1); });
