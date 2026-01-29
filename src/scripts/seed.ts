import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { VIOLATIONS_DATA } from '../lib/data/violations';
import { FILINGS_DATA } from '../lib/data/filings';
import { TRAILERS_DATA } from '../lib/data/trailers';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log('🌱 Seeding Database...');
  
  // 1. VIOLATIONS
  console.log('...Seeding Violations (Vector 1)');
  const { error: matchError } = await supabase
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
    );

  if (matchError) console.error('❌ Error seeding violations:', matchError.message);
  else console.log(`✅ Seeded ${VIOLATIONS_DATA.length} Violations.`);

  // 2. STATE FILINGS
  console.log('...Seeding Filings (Vector 2)');
  const { error: filingError } = await supabase
    .from('state_filings')
    .upsert(
      FILINGS_DATA.map(f => ({
        form_id: f.form_id,
        state_code: f.state_code,
        slug: f.slug,
        official_name: f.official_name,
        purpose: f.purpose,
        processing_days_manual: f.processing_days_manual,
        processing_days_electronic: f.processing_days_electronic,
        penalty_per_day: f.penalty_per_day
        // filing_fee: f.filing_fee (Not in original schema, skipping or need migration)
      })),
      { onConflict: 'slug' }
    );

  if (filingError) {
    console.error('❌ Error seeding filings:', filingError.message);
    if (filingError.code === '42P01') {
      console.error('👉 "state_filings" table missing. Run SQL!');
    }
  } else {
    console.log(`✅ Seeded ${FILINGS_DATA.length} Filings.`);
  }

  // 3. TRAILERS
  console.log('...Seeding Trailers (Vector 3)');
  const { error: trailerError } = await supabase
    .from('trailer_risk_profiles')
    .upsert(
      TRAILERS_DATA.map(t => ({
        slug: t.slug,
        display_name: t.display_name,
        min_cargo_limit: t.min_cargo_limit,
        common_exclusions: t.common_exclusions,
        premium_multiplier: t.premium_multiplier
        // description: t.description (Need to check if schema has this, if not, skip)
      })),
      { onConflict: 'slug' }
    );

  if (trailerError) {
    console.error('❌ Error seeding trailers:', trailerError.message);
  } else {
    console.log(`✅ Seeded ${TRAILERS_DATA.length} Trailers.`);
  }
}

seed();
