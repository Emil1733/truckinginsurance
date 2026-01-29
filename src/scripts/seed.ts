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

  // 2. STATE FILINGS (THE MATRIX)
  console.log('...Seeding Filings (Vector 2)');
  
  const US_STATES = [
    { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' }, 
    { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }
  ];

  // Generate Programmatic Filings
  const generatedFilings = US_STATES.flatMap(state => [
    {
      form_id: "Form E",
      state_code: state.code,
      slug: `form-e-${state.name.toLowerCase().replace(/\s+/g, '-')}-filing`,
      official_name: `Uniform Motor Carrier Bodily Injury Liability (${state.name})`,
      purpose: `${state.name} Intrastate Operating Authority`,
      processing_days_manual: 14,
      processing_days_electronic: 1,
      penalty_per_day: 200
    },
    {
      form_id: "SR-22",
      state_code: state.code,
      slug: `sr22-${state.name.toLowerCase().replace(/\s+/g, '-')}-insurance`,
      official_name: `${state.name} Financial Responsibility Certificate`,
      purpose: "License Reinstatement (DUI/Suspension)",
      processing_days_manual: 7,
      processing_days_electronic: 0,
      penalty_per_day: 0
    }
  ]);

  // Merge: Manual overrides take precedence (by filtering generated ones that match manual slugs)
  const manualSlugs = new Set(FILINGS_DATA.map(f => f.slug));
  const finalFilings = [
    ...FILINGS_DATA, 
    ...generatedFilings.filter(f => !manualSlugs.has(f.slug))
  ];

  const { error: filingError } = await supabase
    .from('state_filings')
    .upsert(
      finalFilings.map(f => ({
        form_id: f.form_id,
        state_code: f.state_code,
        slug: f.slug,
        official_name: f.official_name,
        purpose: f.purpose,
        processing_days_manual: f.processing_days_manual,
        processing_days_electronic: f.processing_days_electronic,
        penalty_per_day: f.penalty_per_day
      })),
      { onConflict: 'slug' }
    );

  if (filingError) {
    console.error('❌ Error seeding filings:', filingError.message);
    if (filingError.code === '42P01') {
      console.error('👉 "state_filings" table missing. Run SQL!');
    }
  } else {
    console.log(`✅ Seeded ${finalFilings.length} Filings (merged).`);
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
      })),
      { onConflict: 'slug' }
    );

  if (trailerError) {
    console.error('❌ Error seeding trailers:', trailerError.message);
  } else {
    console.log(`✅ Seeded ${TRAILERS_DATA.length} Trailers.`);
  }

  // 4. ROUTES (VECTOR 4: THE MATRIX RELOADED)
  console.log('...Seeding Routes (Vector 4)');
  
  const routes = [];
  for (const origin of US_STATES) {
    for (const dest of US_STATES) {
      if (origin.code === dest.code) continue; // Skip same-state

      const isCaliforniaDest = dest.code === 'CA';
      const requirements = ['BMC-91X (Federal Authority)']; // Always needed for interstate
      
      if (isCaliforniaDest) requirements.push('MCP-65 (CA Permit)');
      if (dest.code === 'NY') requirements.push('HUT (NY Tax)');
      if (dest.code === 'KY') requirements.push('KYU (KY Weight Tax)');

      routes.push({
        slug: `${origin.name.toLowerCase().replace(/\s+/g, '-')}-to-${dest.name.toLowerCase().replace(/\s+/g, '-')}-trucking`,
        origin_code: origin.code,
        destination_code: dest.code,
        origin_name: origin.name,
        destination_name: dest.name,
        requirements: requirements,
        distance_tier: 'LONG_HAUL' 
      });
    }
  }

  // Batch Upsert (Supabase limit is usually higher, but let's do 1000s if needed, or just one go for 2.5k)
  const { error: routeError } = await supabase
    .from('routes')
    .upsert(routes, { onConflict: 'slug' });

  if (routeError) {
    console.error('❌ Error seeding routes:', routeError.message);
    if (routeError.code === '42P01') {
      console.error('👉 "routes" table missing. Run SQL!');
    }
  } else {
    console.log(`✅ Seeded ${routes.length} Routes.`);
  }
}

seed();
