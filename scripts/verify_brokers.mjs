import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: '.env.local' });

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('❌ Supabase Keys missing in .env.local');
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function main() {
  try {
    console.log('📡 Fetching Brokers from Supabase API...');
    
    const { data, error } = await supabase
      .from('brokers')
      .select('name, slug');

    if (error) {
      console.error('❌ API Error:', error.message);
      return;
    }

    if (data && data.length > 0) {
      console.log('✅ Success! Found brokers:');
      data.forEach(b => console.log(`   - ${b.name} (${b.slug})`));
    } else {
      console.log('⚠️ Table exists but is empty.');
    }

  } catch (err) {
    console.error('❌ Runtime Error:', err);
  }
}

main();
