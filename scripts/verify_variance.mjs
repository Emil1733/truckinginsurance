
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

async function checkVariance() {
  console.log("🧬 Verifying Content Variance...");

  // Get 3 random routes (using random sorting logic via limit)
  // Since we can't easily doing "order by random" in pure Supabase API efficiently without RPC,
  // we'll fetch a range.
  
  const { data: routes } = await supabase
    .from('routes')
    .select('origin_name, destination_name, content_markdown')
    .not('content_markdown', 'is', null)
    .limit(3);

  if (!routes || routes.length < 2) {
      console.log("❌ Not enough content generated to test.");
      return;
  }

  const [r1, r2, r3] = routes;

  console.log(`\nRoute A: ${r1.origin_name} -> ${r1.destination_name}`);
  console.log(`Route B: ${r2.origin_name} -> ${r2.destination_name}`);

  // Simple variance check: Are they identical?
  if (r1.content_markdown === r2.content_markdown) {
      console.log("\n❌ CRITICAL FAIL: Content is identical!");
      console.log("   The AI is outputting duplicate text.");
  } else {
      console.log("\n✅ PASS: Content is unique.");
      
      // Calculate variance score (simple/naive: diff length)
      const diff = Math.abs(r1.content_markdown.length - r2.content_markdown.length);
      console.log(`   Length Diff: ${diff} chars`);
      
      console.log("   Sample A Start:", r1.content_markdown.substring(0, 50).replace(/\n/g, ' '));
      console.log("   Sample B Start:", r2.content_markdown.substring(0, 50).replace(/\n/g, ' '));
  }
}

checkVariance();
