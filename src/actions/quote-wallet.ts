"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function saveQuoteToWallet(quoteData: any) {
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
    return { success: false, error: "Must be logged in to save quotes." };
  }

  // Generate a friendly reference ID
  const refId = `Q-${Math.floor(Math.random() * 10000)}`;

  const { error } = await supabase
    .from("saved_quotes")
    .insert({
      user_id: user.id,
      quote_reference: refId,
      carrier_name: quoteData.carrier_name || "Draft Quote",
      premium_estimate: quoteData.premium_estimate || 0,
      coverage_details: quoteData, // Store full JSON
      status: 'DRAFT'
    });

  if (error) {
    console.error("Save Quote Error:", error);
    return { success: false, error: "Failed to save quote." };
  }

  revalidatePath("/dashboard/quotes");
  return { success: true, reference: refId };
}
