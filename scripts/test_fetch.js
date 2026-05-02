const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetch() {
  console.log("Fetching with Anon Key...");
  const { data, error } = await supabase
    .from('fmcsa_revocations')
    .select('*');

  if (error) {
    console.error('Fetch Error:', error);
  } else {
    console.log('✅ Fetch Success:', data);
  }
}

testFetch();
