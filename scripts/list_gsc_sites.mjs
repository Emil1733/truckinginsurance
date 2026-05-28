import { getGSCClient } from '../src/lib/gsc.ts';
import dotenv from 'dotenv';

dotenv.config({ path: 'c:/Users/tevat/truckinsurancesite/web/.env.local' });

async function listSites() {
  console.log('--- GSC Site Access Audit ---');
  try {
    const gsc = await getGSCClient();
    const response = await gsc.sites.list();
    console.log('Authorized Sites:');
    console.log(JSON.stringify(response.data.siteEntry, null, 2));
  } catch (error) {
    console.error('Failed to list sites:', error);
  }
}

listSites();
