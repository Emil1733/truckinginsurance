const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const SITE = 'sc-domain:truckcoverageexperts.com';
const SITEMAP = 'https://www.truckcoverageexperts.com/sitemap.xml';

function loadEnv() {
  const file = path.resolve(__dirname, '..', '.env.local');
  const out = {};
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    out[m[1]] = m[2].trim().replace(/^"|"$/g, '');
  }
  return out;
}

function normaliseKey(raw) {
  let key = raw.replace(/\\n/g, '\n');
  if (!key.includes('BEGIN')) {
    // Some deployments store the PEM base64-encoded in one line.
    try {
      const decoded = Buffer.from(key, 'base64').toString('utf8');
      if (decoded.includes('BEGIN')) key = decoded;
    } catch { /* leave as-is */ }
  }
  return key;
}

(async () => {
  const env = loadEnv();
  const keyFile = process.env.GSC_KEY_FILE;
  if (keyFile) {
    console.log('using key file:', keyFile);
  } else {
    console.log('GSC_CLIENT_EMAIL:', env.GSC_CLIENT_EMAIL ? 'present' : 'MISSING');
    console.log('GSC_PRIVATE_KEY: length', (env.GSC_PRIVATE_KEY || '').length);
  }

  const auth = new google.auth.GoogleAuth({
    ...(keyFile
      ? { keyFile }
      : { credentials: { client_email: env.GSC_CLIENT_EMAIL, private_key: normaliseKey(env.GSC_PRIVATE_KEY || '') } }),
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });
  const sc = google.searchconsole({ version: 'v1', auth });

  const sites = await sc.sites.list({});
  const mine = (sites.data.siteEntry || []).find((s) => s.siteUrl === SITE);
  console.log('property access:', mine ? mine.permissionLevel : 'NOT FOUND');

  await sc.sitemaps.submit({ siteUrl: SITE, feedpath: SITEMAP });
  console.log('submitted:', SITEMAP);
})().catch((err) => {
  console.error('failed:', err.message);
  process.exit(1);
});
