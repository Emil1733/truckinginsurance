
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testLimits() {
  console.log("⚡ Testing API Limits...");
  
  // Try to fetch 1500 rows (we know we have >2000)
  const { data, error, count } = await supabase
    .from('routes')
    .select('slug', { count: 'exact' })
    .limit(1500);

  if (error) {
    console.error("❌ Error:", error.message);
    return;
  }

  console.log(`Requested: 1500`);
  console.log(`Returned:  ${data.length}`);
  console.log(`Total DB:  ${count}`);

  if (data.length === 1000) {
    console.log("\n⚠️ CRITICAL FINDING: API is capped at 1000 rows.");
    console.log("   The sitemap.ts .limit(5000) fix IS NOT WORKING.");
    console.log("   We must implement pagination.");
  } else if (data.length > 1000) {
    console.log("\n✅ SUCCESS: API allowed >1000 rows.");
    console.log("   The sitemap fix is valid.");
  }
}

testLimits();
