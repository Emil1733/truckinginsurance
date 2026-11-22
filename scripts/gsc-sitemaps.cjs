const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const SITE = 'sc-domain:truckcoverageexperts.com';

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

  const sites = await sc.sites.list({});
  console.log('properties:');
  for (const s of sites.data.siteEntry || []) console.log(`  ${s.permissionLevel.padEnd(18)} ${s.siteUrl}`);

  const list = await sc.sitemaps.list({ siteUrl: SITE });
  console.log('\nsitemaps:');
  for (const s of list.data.sitemap || []) {
    console.log(`  ${s.path}`);
    console.log(`     lastDownloaded: ${s.lastDownloaded || '-'}  errors: ${s.errors || 0}  warnings: ${s.warnings || 0}`);
    console.log(`     isPending: ${s.isPending}  isSitemapsIndex: ${s.isSitemapsIndex}`);
    if (s.contents) console.log(`     contents: ${JSON.stringify(s.contents)}`);
  }
})().catch((e) => { console.error('failed:', e.message); process.exit(1); });
