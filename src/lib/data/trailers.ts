export interface TrailerProfile {
  slug: string;
  display_name: string;
  min_cargo_limit: number;
  common_exclusions: string[];
  premium_multiplier: number; // 1.0 = standard
  description: string;
}

export const TRAILERS_DATA: TrailerProfile[] = [
  // --- HAZMAT & TANKERS ---
  {
    slug: "hazmat-tanker-insurance",
    display_name: "Hazmat Tanker",
    min_cargo_limit: 1000000, // $1M minimum usually
    common_exclusions: ["Pollution Cleanup (Needs Endorsement)", "Wrongful Delivery"],
    premium_multiplier: 2.5,
    description: "Fuel, chemical, and crude haulers. The highest liability class on the road."
  },
  {
    slug: "pneumatic-dry-bulk-insurance",
    display_name: "Pneumatic / Dry Bulk",
    min_cargo_limit: 100000,
    common_exclusions: ["Contamination due to residue", "Loading/Unloading accidents"],
    premium_multiplier: 1.4,
    description: "Sand, cement, and plastic pellets. Pressurized vessel risks."
  },

  // --- HEAVY HAUL & CONSTRUCTION ---
  {
    slug: "bottom-dump-trailer-insurance",
    display_name: "Bottom Dump / Belly Dump",
    min_cargo_limit: 50000, // Often lower cargo value (dirt/agg)
    common_exclusions: ["Off-road operations (needs endorsement)", "Overturn/Rollover"],
    premium_multiplier: 1.8,
    description: "Aggregate and asphalt hauling. High frequency of rollover claims."
  },
  {
    slug: "end-dump-trailer-insurance",
    display_name: "End Dump",
    min_cargo_limit: 50000,
    common_exclusions: ["Tip-over during operation", "Hydraulic failure"],
    premium_multiplier: 1.9,
    description: "Stability risks during unloading are the #1 claim driver."
  },
  {
    slug: "lowboy-rgn-heavy-haul-insurance",
    display_name: "Lowboy / RGN (Heavy Haul)",
    min_cargo_limit: 250000, // High value equipment
    common_exclusions: ["Oversize/Overweight violations", "Loading accidents"],
    premium_multiplier: 2.2,
    description: "Transporting yellow iron and industrial machinery. High cargo value exposure."
  },

  // --- SPECIALIZED CARGO ---
  {
    slug: "auto-hauler-car-carrier-insurance",
    display_name: "Auto Hauler (7+ Car)",
    min_cargo_limit: 250000,
    common_exclusions: ["Diminished Value Claims", "Theft from unattended vehicle"],
    premium_multiplier: 2.0,
    description: "High frequency of minor damage claims (scratches/dents) drives premiums up."
  },
  {
    slug: "bull-hauler-livestock-insurance",
    display_name: "Livestock / Bull Hauler",
    min_cargo_limit: 100000, // Livestock Cargo is tricky
    common_exclusions: ["Death due to suffocating/freezing", "Escaped animals"],
    premium_multiplier: 2.3,
    description: "Shifting live loads create extreme rollover risk. Cargo claims are complex."
  },
  {
    slug: "intermodal-chassis-container-insurance",
    display_name: "Intermodal / UIIA Chassis",
    min_cargo_limit: 100000,
    common_exclusions: ["UIIA Non-Compliance", "Container damage"],
    premium_multiplier: 1.3,
    description: "Port work requires specific UIIA endorsements and high non-owned trailer limits."
  },
  {
    slug: "reefer-breakdown-insurance",
    display_name: "Reefer (Refrigerated)",
    min_cargo_limit: 100000,
    common_exclusions: ["Reefer Breakdown (unless added)", "Driver Error (Temp Setting)"],
    premium_multiplier: 1.2,
    description: "Temperature control failure is the single biggest risk factor."
  }
];
