const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const FMCSA_API_KEY = process.env.FMCSA_API_KEY;

// Mock list of MC numbers that were flagged for revocation today
// In production, this array would be parsed from the FMCSA Daily Register CSV or DOT-Leads
const dailyRevocationList = [
  { mc_number: '123456', usdot: '3456789', reason: 'Cancellation of BIPD / Form E' },
  { mc_number: '987654', usdot: '1234567', reason: 'Failed New Entrant Safety Audit' }
];

async function pullFmcsaData(dotNumber) {
  try {
    // Ping the FMCSA QCMobile API for the carrier profile
    const response = await fetch(`https://mobile.fmcsa.dot.gov/qc/services/carriers/${dotNumber}?webKey=${FMCSA_API_KEY}`);
    const data = await response.json();
    
    if (data && data.content && data.content.length > 0) {
      return data.content[0].carrier; // Returns company name, physical address, power units, etc.
    }
    return null;
  } catch (error) {
    console.error(`FMCSA API failed for DOT ${dotNumber}`, error.message);
    return null;
  }
}

async function runNightlySync() {
  console.log("🚀 Starting 2:00 AM FMCSA Sync Protocol...\n");
  
  let successCount = 0;

  for (const carrier of dailyRevocationList) {
    console.log(`📡 Fetching live FMCSA profile for MC-${carrier.mc_number} (DOT ${carrier.usdot})...`);
    
    // Call the Official FMCSA Developer API
    const profile = await pullFmcsaData(carrier.usdot);
    
    // Determine target shutdown date (14 days from today)
    const shutdownDate = new Date();
    shutdownDate.setDate(shutdownDate.getDate() + 14);

    // If the API fails or doesn't have data, we use fallback data
    const companyName = profile?.legalName || `Carrier MC-${carrier.mc_number}`;
    const city = profile?.phyCity || 'Unknown City';
    const state = profile?.phyState || 'XX';
    const powerUnits = profile?.totalPowerUnits || 1;
    const drivers = profile?.totalDrivers || 1;
    
    console.log(`   Found: ${companyName} in ${city}, ${state}`);
    console.log(`   💾 Injecting into Supabase Database...`);

    const { error } = await supabaseAdmin
      .from('fmcsa_revocations')
      .insert([
        {
          mc_number: carrier.mc_number,
          usdot_number: carrier.usdot,
          company_name: companyName,
          scheduled_revocation_date: shutdownDate.toISOString(),
          violation_reason: carrier.reason,
          status: 'PENDING',
          address_city: city,
          address_state: state,
          power_units: powerUnits,
          drivers: drivers,
          cargo_type: 'General Freight' // Cargo requires a second endpoint ping, mocking for speed
        }
      ]);

    if (error) {
      if (error.code === '23505') { // Unique violation, we already have them
        console.log(`   ⚠️ MC-${carrier.mc_number} is already in the database. Skipping.`);
      } else {
        console.error(`   ❌ DB Error:`, error.message);
      }
    } else {
      console.log(`   ✅ Successfully added trap page for ${companyName}\n`);
      successCount++;
    }
  }

  console.log(`\n🏁 Sync Complete. ${successCount} new pages have been programmatically generated and added to the Sitemap.`);
}

runNightlySync();
