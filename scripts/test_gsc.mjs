import { getSearchPerformance } from '../src/lib/gsc.ts';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testGSC() {
  console.log('Testing GSC Connection...');
  try {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const startDate = sevenDaysAgo.toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];

    console.log(`Fetching data from ${startDate} to ${endDate}...`);
    const data = await getSearchPerformance(startDate, endDate).catch(err => {
      console.error('Inner catch during performance fetch:', err);
      throw err;
    });
    
    console.log('Successfully connected to GSC API!');
    console.log(`Retrieved ${data.length} rows of data.`);
    
    if (data.length > 0) {
      console.log('Top Query sample:', data[0].keys ? data[0].keys[0] : 'N/A');
    }
  } catch (error) {
    console.error('Error connecting to GSC:', error);
  }
}

testGSC();
