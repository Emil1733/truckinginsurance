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

  redirect('/quote/success');
}
