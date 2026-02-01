
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Setup Env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; 

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing .env credentials (URL or ANON KEY)");
  process.exit(1);
}

// 2. Initialize Client (As Anonymous User)
const supabase = createClient(supabaseUrl, supabaseKey);

// 3. Run Test
async function verifyAccess() {
  console.log("🔍 Verifying 'leads' table public access...");
  
  const testEmail = `verify_${Date.now()}@test.com`;
  
  const { data, error } = await supabase
    .from('leads')
    .insert({
        email: testEmail,
        source: 'verification_script'
    })
    .select()
    .single();

  if (error) {
    console.error("\n❌ VERIFICATION FAILED.");
    console.error(`   Error Code: ${error.code}`);
    console.error(`   Message: ${error.message}`);
    
    if (error.code === '42501') {
      console.log("\n👉 Diagnosis: PERMISSION_DENIED. RLS is blocking public inserts.");
    } else if (error.code === '23502') {
      console.log("\n👉 Diagnosis: NOT_NULL_VIOLATION. Schema requires a field matching the error.");
    } else {
      console.log("\n👉 Diagnosis: Unknown Database Error. See code above.");
    }
  } else {
    console.log("\n✅ VERIFICATION SUCCESS!");
    console.log("   Lead inserted successfully.");
    console.log("   New ID:", data.id);
    
    // Cleanup
    const { error: delError } = await supabase.from('leads').delete().eq('id', data.id);
    if (!delError) console.log("   (Test record cleaned up)");
  }
}

verifyAccess();
