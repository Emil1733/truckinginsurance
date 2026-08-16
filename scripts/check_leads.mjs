import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) { console.error('Missing Supabase credentials'); process.exit(1); }

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLeads() {
  const { data, error, count } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: false })
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) { console.error('Error fetching leads:', error); return; }
  
  console.log('Total Leads in Database: ' + count);
  if (data && data.length > 0) {
    console.log('\nLast 5 Leads:');
    data.forEach(lead => {
      console.log('- ' + lead.created_at + ' | Name: ' + lead.name + ' | Phone: ' + lead.phone + ' | Source: ' + lead.source);
    });
  } else {
    console.log('No leads found.');
  }
}

checkLeads();
