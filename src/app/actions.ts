'use server'

import { supabase } from "@/lib/supabase";
import { syncQuoteLead } from "@/lib/quote-lead-airtable";
import { renewalDate } from "@/lib/lead-attribution";
export async function submitLead(_previous: { error: string } | { saved: true } | null, formData: FormData) {
  const driver_name = String(formData.get('driver_name') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const violation_code = String(formData.get('violation_code') ?? '').trim();
  const cdlInput = String(formData.get('cdl_years') ?? '').trim();
  const cdl_years = Number(cdlInput);
  if (!driver_name || !phone || !email || !violation_code || !cdlInput || !Number.isSafeInteger(cdl_years) || cdl_years < 0) {
    return { error: 'Check your contact information, request type, and CDL experience before submitting.' };
  }

  const landingPage = String(formData.get('landingPage') ?? '').slice(0, 300);
  const sourcePage = landingPage.startsWith('/') && !landingPage.startsWith('//') ? landingPage : '/quote';
  const renewal = renewalDate(formData.get('renewalDate'));
  const campaign = ['utm_source', 'utm_medium', 'utm_campaign', 'gclid'].map(key => {
    const value = String(formData.get(key) ?? '').trim().slice(0, 200);
    return value ? `${key}: ${value}` : '';
  }).filter(Boolean);
  const notes = [
    `Quote request. CDL experience: ${cdl_years} years. Request type: ${violation_code}`,
    `Originating page: ${sourcePage}`,
    renewal && `Renewal date: ${renewal}`,
    ...campaign,
  ].filter(Boolean).join(' | ');

  const { error } = await supabase.from('leads').insert({
    driver_name,
    phone,
    email,
    violation_code,
    cdl_years,
    source: `website:${sourcePage}`,
    status: 'new'
  });

  if (error) {
    console.error('Submission Error:', error);
    return { error: 'We could not save your request. Please try again.' };
  }

  await syncQuoteLead({
    'Lead Name': driver_name,
    Phone: phone,
    Email: email,
    Source: `website:${sourcePage}`,
    'Landing Page': sourcePage,
    Status: 'New',
    Notes: notes,
  });

  return { saved: true } as const;
}
