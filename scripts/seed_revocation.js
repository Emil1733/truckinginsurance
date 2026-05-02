const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedTestRevocation() {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 14); // 14 days from now

  const { data, error } = await supabase
    .from('fmcsa_revocations')
    .insert([
      {
        mc_number: '123456',
        usdot_number: '3456789',
        company_name: 'SMITH LOGISTICS LLC',
        scheduled_revocation_date: futureDate.toISOString(),
        violation_reason: 'Cancellation of BIPD / Form E',
        status: 'PENDING',
        address_city: 'Dallas',
        address_state: 'TX',
        power_units: 4,
        drivers: 4,
        cargo_type: 'General Freight, Fresh Produce'
      }
    ]);

  if (error) {
    console.error('Error inserting test data:', error);
  } else {
    console.log('✅ Successfully inserted test revocation for MC-123456');
  }
}

seedTestRevocation();
