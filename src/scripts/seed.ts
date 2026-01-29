
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { VIOLATIONS_DATA } from '../lib/data/violations';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log('🌱 Seeding Violations...');
  
  const { data, error } = await supabase
    .from('violations')
    .upsert(
      VIOLATIONS_DATA.map(v => ({
        code: v.code,
        slug: v.slug,
        official_name: v.official_name,
        layman_name: v.layman_name,
        fine_avg: v.fine_avg,
        severity_tier: v.severity_tier,
        rehab_steps: v.rehab_steps
      })),
      { onConflict: 'slug' }
    )
    .select();

  if (error) {
    console.error('❌ Error seeding violations:', error.message);
    if (error.code === '42P01') {
      console.error('👉 This means the "violations" table does not exist. Please run the SQL in the Dashboard!');
    }
  } else {
    console.log(`✅ Successfully seeded ${data.length} violations!`);
  }
}

seed();
