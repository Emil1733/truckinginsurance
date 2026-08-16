import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLeads() {
  const { count, error } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true });
    
  if (error) { console.error('Error fetching leads:', error); return; }
  
  console.log('Total EXACT count of leads table: ' + count);
  
  // also let's just grab the last lead
  const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(1);
  if (data && data.length) console.log('Most recent lead date: ' + data[0].created_at);
}
checkLeads();
