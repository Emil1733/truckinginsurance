"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { fetchCarrierSafety } from "./fmcsa";
import { revalidatePath } from "next/cache";

export async function claimDotNumber(dotNumber: string) {
  // 1. Auth Check
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  // 2. Verify with FMCSA
  const fmcsaResult = await fetchCarrierSafety(dotNumber);
  
  if (!fmcsaResult.success || !fmcsaResult.data) {
    return { success: false, error: fmcsaResult.error || "DOT Verification Failed" };
  }

  const carrier = fmcsaResult.data.content.carrier;
  
  // 3. Update Profile
  // We extract meaningful data to populate the profile
  const { error } = await supabase
    .from("carrier_profiles")
    .update({
      usdot_number: carrier.dotNumber,
      company_name: carrier.legalName,
      // FMCSA API doesn't always return MC in this endpoint, but if it does we'd map it.
      // We'll extract fleet size from inspectionsTotal as a proxy if needed, 
      // but for now let's just save the basics.
      onboarding_step: 2, // Move to next step
      updated_at: new Date().toISOString()
    })
    .eq("id", user.id);

  if (error) {
    console.error("Profile Update Error:", error);
    return { success: false, error: "Failed to link profile. DOT might be taken." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
