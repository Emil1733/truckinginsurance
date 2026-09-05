'use server'

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function submitLead(formData: FormData) {
  const driver_name = formData.get('driver_name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const violation_code = formData.get('violation_code') as string;
  const cdl_years = parseInt(formData.get('cdl_years') as string);

  const { error } = await supabase.from('leads').insert({
    driver_name,
    phone,
    email,
    violation_code,
    cdl_years,
    status: 'new'
  });

  if (error) {
    console.error('Submission Error:', error);
    // In a real app we'd return state to show error, 
    // but for prototype we'll redirect to a generic error or stay put (handled by client status)
    throw new Error('Failed to submit');
  }

  const airtableToken = process.env.AIRTABLE_PAT;
  const airtableBase = process.env.AIRTABLE_BASE_ID;
  const airtableTable = process.env.AIRTABLE_TABLE_ID;
  if (airtableToken && airtableBase && airtableTable) {
    try {
      const airtableResponse = await fetch(`https://api.airtable.com/v0/${airtableBase}/${airtableTable}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${airtableToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ records: [{ fields: {
          'Lead Name': driver_name,
          Phone: phone,
          Email: email,
          Source: 'website:/quote',
          Status: 'New',
          Notes: `Quote request. CDL experience: ${Number.isNaN(cdl_years) ? 'Not provided' : `${cdl_years} years`}. Request type: ${violation_code}`,
        } }] }),
      });
      if (!airtableResponse.ok) console.error('Airtable quote sync error:', airtableResponse.status, await airtableResponse.text());
    } catch (airtableError) {
      console.error('Airtable quote sync failed:', airtableError);
    }
  } else {
    console.warn('Airtable quote sync skipped: missing Airtable environment variables');
  }

  redirect('/quote/success');
}
