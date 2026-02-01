
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // Try .env.local first

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('Missing Credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProgress() {
  const { count, error } = await supabase
    .from('routes')
    .select('*', { count: 'exact', head: true })
    .not('content_markdown', 'is', null);

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log(`Routes Completed: ${count}`);
    
    // Get total too
    const { count: total } = await supabase
        .from('routes')
        .select('*', { count: 'exact', head: true });
        
    console.log(`Total Routes: ${total}`);
    console.log(`Progress: ${Math.round((count / total) * 100)}%`);
  }
}

checkProgress();
