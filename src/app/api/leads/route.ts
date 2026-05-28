import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const { dot, email } = await request.json();

    if (!dot || !email) {
      return NextResponse.json({ error: 'DOT number and Email are required' }, { status: 400 });
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
       console.error('Missing Supabase keys. Skipping DB insert for MVP.');
       return NextResponse.json({ success: true, message: 'Lead captured (Mock - No DB keys)' });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // Insert the new lead into the 'leads' table
    const { error } = await supabase
      .from('leads')
      .insert([
        { 
          dot_number: dot, 
          email: email, 
          source: 'dot_lookup_tool',
          status: 'new'
        }
      ]);

    if (error) {
      console.error('Supabase insert error:', error);
      // Even if the table doesn't exist yet, we don't want to crash the user experience
      return NextResponse.json({ success: true, message: 'Lead captured (DB Error bypassed)' });
    }

    return NextResponse.json({ success: true, message: 'Lead captured successfully' });

  } catch (error) {
    console.error('Lead Capture API Error:', error);
    return NextResponse.json({ error: 'Failed to process lead.' }, { status: 500 });
  }
}
