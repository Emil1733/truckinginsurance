import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  const { count: draft } = await supabase.from('routes').select('*', { count: 'exact', head: true }).eq('status', 'DRAFT');
  const { count: published } = await supabase.from('routes').select('*', { count: 'exact', head: true }).eq('status', 'PUBLISHED');
  
  console.log(`DRAFT: ${draft}`);
  console.log(`PUBLISHED: ${published}`);
  console.log(`TOTAL: ${draft + published}`);
  
  if (draft > 0) {
      console.log("❌ NOT FINISHED. You have remaining drafts.");
  } else {
      console.log("✅ FINISHED. All routes are published.");
  }
}

check();
