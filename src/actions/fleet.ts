"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type VehicleData = {
  unit_number: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  type: string;
};

export async function addVehicle(data: VehicleData) {
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

  // Get Profile ID (since fleet is linked to profile, which is same ID as user)
  const userId = user.id;

  const { error } = await supabase
    .from("carrier_fleet")
    .insert({
      user_id: userId,
      unit_number: data.unit_number,
      vin: data.vin,
      make: data.make,
      model: data.model,
      year: data.year,
      type: data.type,
      status: 'ACTIVE'
    });

  if (error) {
    console.error("Add Vehicle Error:", error);
    return { success: false, error: "Failed to add vehicle." };
  }

  revalidatePath("/dashboard/fleet");
  return { success: true };
}

export async function deleteVehicle(vehicleId: string) {
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

  const { error } = await supabase
    .from("carrier_fleet")
    .delete()
    .eq("id", vehicleId);

  if (error) {
    console.error("Delete Vehicle Error:", error);
    return { success: false, error: "Failed to delete vehicle." };
  }

  revalidatePath("/dashboard/fleet");
  return { success: true };
}
