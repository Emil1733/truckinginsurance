import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

async function saveToAirtable(fields: Record<string, string>) {
  const token = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID;
  if (!token || !baseId || !tableId) {
    console.warn('Airtable sync skipped: missing AIRTABLE_PAT, AIRTABLE_BASE_ID, or AIRTABLE_TABLE_ID');
    return;
  }
  const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ records: [{ fields }] }),
  });
  if (!response.ok) console.error('Airtable sync error:', response.status, await response.text());
}

async function airtableLeadExists(email?: string, phone?: string) {
  const token = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID;
  if (!token || !baseId || !tableId || (!email && !phone)) return false;
  const escapeFormulaValue = (value: string) => value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const conditions = [email && `{Email}="${escapeFormulaValue(email)}"`, phone && `{Phone}="${escapeFormulaValue(phone)}"`].filter(Boolean);
  try {
    const formula = `OR(${conditions.join(',')})`;
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}?maxRecords=1&filterByFormula=${encodeURIComponent(formula)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      console.error('Airtable duplicate check error:', response.status, await response.text());
      return false;
    }
    const data = await response.json() as { records?: Array<{ id: string }> };
    return Boolean(data.records?.length);
  } catch (error) {
    console.error('Airtable duplicate check failed:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { name, phone, email, businessType, state, authorityStatus, landingPage, utmSource, dot, readinessReport } = await request.json();

    if (dot && email) {
      const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!SUPABASE_URL || !SUPABASE_KEY) return NextResponse.json({ success: true, message: 'Lead captured' });
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
      const { error } = await supabase.from('leads').insert({ driver_name: `DOT lookup: ${dot}`, phone: 'Not provided', email, violation_code: 'DOT lookup', source: 'website:/dot-insurance-lookup', status: 'new' });
      if (error) return NextResponse.json({ error: 'Lead could not be saved' }, { status: 500 });
      await saveToAirtable({ 'Lead Name': `DOT lookup: ${dot}`, Email: email, 'DOT Number': dot, Source: 'website:/dot-insurance-lookup', Status: 'New' });
      return NextResponse.json({ success: true, message: 'Lead captured successfully' });
    }

    if (!name || !phone || !email || !businessType || !state || !authorityStatus) {
      if (readinessReport && name && email && businessType && state) {
        const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (SUPABASE_URL && SUPABASE_KEY) {
          const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
          const { error } = await supabase.from('leads').insert({ driver_name: name, phone: phone || 'Not provided', email, violation_code: `Readiness report | ${businessType} | ${state}`, source: `website${landingPage ? `:${landingPage}` : ''}`, status: 'new' });
          if (error) return NextResponse.json({ error: 'Readiness request could not be saved' }, { status: 500 });
        }
        await saveToAirtable({ 'Lead Name': name, Phone: phone || '', Email: email, 'Business Type': businessType, State: state, Source: `website${landingPage ? `:${landingPage}` : ''}`, Status: 'New', Notes: 'Readiness report request' });
        return NextResponse.json({ success: true, message: 'Readiness report requested' });
      }
      return NextResponse.json({ error: 'Required lead details are missing' }, { status: 400 });
    }

    if (await airtableLeadExists(email, phone)) {
      return NextResponse.json({ success: true, duplicate: true, message: 'Lead already received' });
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
          driver_name: name,
          phone,
          email,
          violation_code: `${businessType} | ${state} | ${authorityStatus}`,
          source: `website${landingPage ? `:${landingPage}` : ''}${utmSource ? `:${utmSource}` : ''}`,
          status: 'new'
        }
      ]);

    if (error) {
      console.error('Supabase insert error:', error);
      // Even if the table doesn't exist yet, we don't want to crash the user experience
      return NextResponse.json({ error: 'Lead could not be saved' }, { status: 500 });
    }

    await saveToAirtable({
      'Lead Name': name,
      Phone: phone,
      Email: email,
      'Business Type': businessType,
      State: state,
      'Authority Status': authorityStatus,
      'Landing Page': landingPage || '',
      Source: `website${landingPage ? `:${landingPage}` : ''}${utmSource ? `:${utmSource}` : ''}`,
      Status: 'New',
    });

    return NextResponse.json({ success: true, message: 'Lead captured successfully' });

  } catch (error) {
    console.error('Lead Capture API Error:', error);
    return NextResponse.json({ error: 'Failed to process lead.' }, { status: 500 });
  }
}
