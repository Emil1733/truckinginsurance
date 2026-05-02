'use server'

import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function saveBrokerLead(formData: FormData) {
  const dotNumber = formData.get('dotNumber') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const sourceUrl = formData.get('sourceUrl') as string;
  const brokerInterest = formData.get('brokerInterest') as string;

  try {
    const { data, error } = await supabaseAdmin
      .from('broker_audits')
      .insert([
        {
          dot_number: dotNumber,
          carrier_name: name,
          email: email,
          phone: phone,
          source_url: sourceUrl,
          broker_interest: brokerInterest,
          audit_status: 'pending'
        }
      ]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error saving broker audit lead:', error);
    return { success: false, error: 'Failed to save lead' };
  }
}
