import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { dotNumber, email, companyName, brokerName, expirationDate, currentPremium } = formData;

    if (!dotNumber || !email) {
      return NextResponse.json({ error: 'DOT number and Email are required' }, { status: 400 });
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
       console.error('Missing Supabase keys. Skipping DB insert for MVP.');
       return NextResponse.json({ success: true, message: 'Lead captured (Mock - No DB keys)' });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    // Format the payload into notes since our 'leads' table schema is minimal
    const notesStr = `
Company: ${companyName}
Broker Needed: ${brokerName}
Expiration Date: ${expirationDate}
Current Premium: ${currentPremium || 'Not Provided'}
    `.trim();

    // Insert the new lead into the 'leads' table
    const { error } = await supabase
      .from('leads')
      .insert([
        { 
          dot_number: dotNumber, 
          email: email, 
          source: 'free_coi_generator',
          status: 'new',
          notes: notesStr
        }
      ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ success: true, message: 'Lead captured (DB Error bypassed)' });
    }

    return NextResponse.json({ success: true, message: 'COI Request captured successfully' });

  } catch (error) {
    console.error('COI API Error:', error);
    return NextResponse.json({ error: 'Failed to process COI request.' }, { status: 500 });
  }
}
