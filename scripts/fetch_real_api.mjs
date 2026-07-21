import fs from 'fs';
import path from 'path';

async function fetchRealBrokers() {
  console.log('Fetching data from FMCSA Socrata API...');
  try {
    // Socrata Query to get brokers where BROKER_STAT = 'A' (Active)
    const url = 'https://data.transportation.gov/resource/6eyk-hxee.json?$where=broker_stat=%27A%27&$limit=5000&$select=docket_number,legal_name';
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Successfully fetched ${data.length} brokers from API.`);

    const brokers = data.map(b => {
      // Clean up MC number (docket_number usually starts with MC)
      let rawMc = b.docket_number ? b.docket_number.replace(/[^0-9]/g, '') : '';
      let name = b.legal_name ? b.legal_name.trim() : '';

      if (!rawMc || !name) return null;

      return {
        mc: rawMc,
        name: name,
        status: 'Active',
        bondAmount: '$75,000'
      };
    }).filter(b => b !== null);

    const outputPath = path.join(process.cwd(), 'src', 'lib', 'data', 'top_brokers.json');
    fs.writeFileSync(outputPath, JSON.stringify(brokers, null, 2));

    console.log(`Successfully saved ${brokers.length} real brokers to ${outputPath}`);
  } catch (err) {
    console.error('Error fetching brokers:', err);
  }
}

fetchRealBrokers();
