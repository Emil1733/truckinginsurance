export interface TrailerProfile {
  slug: string;
  display_name: string;
  min_cargo_limit: number;
  common_exclusions: string[];
  premium_multiplier: number; // 1.0 = standard
  description: string;
  coverage_focus: string;
  requirements_note: string;
  cost_factors: string;
  faq: { question: string; answer: string }[];
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
    ,coverage_focus: "Review pollution liability, hazmat endorsements, cargo conditions, and loading or unloading exposures alongside primary auto liability."
    ,requirements_note: "Requirements can vary based on the material, quantities, vehicle configuration, routes, and federal or state hazmat rules."
    ,cost_factors: "Premiums may reflect hazardous-material class, radius, vehicle limits, driver history, pollution exposure, and prior losses."
    ,faq: [{ question: "What insurance does a hazmat tanker need?", answer: "A licensed professional should review primary liability, cargo, pollution, physical damage, and the requirements tied to the materials and routes hauled." }]
  },
  {
    slug: "pneumatic-dry-bulk-insurance",
    display_name: "Pneumatic / Dry Bulk",
    min_cargo_limit: 100000,
    common_exclusions: ["Contamination due to residue", "Loading/Unloading accidents"],
    premium_multiplier: 1.4,
    description: "Sand, cement, and plastic pellets. Pressurized vessel risks."
    ,coverage_focus: "Focus on contamination, residue, loading and unloading, equipment breakdown, and damage to the pneumatic system."
    ,requirements_note: "Underwriting may ask about the commodities hauled, cleaning procedures, vessel inspections, and operating radius."
    ,cost_factors: "Pricing can be affected by commodity type, contamination exposure, vessel value, radius, maintenance records, and cargo limits."
    ,faq: [{ question: "Is dry bulk insurance different from standard trucking insurance?", answer: "It can be. Pneumatic equipment, contamination, residue, and loading or unloading create exposures that should be reviewed specifically." }]
  },

  // --- HEAVY HAUL & CONSTRUCTION ---
  {
    slug: "bottom-dump-trailer-insurance",
    display_name: "Bottom Dump / Belly Dump",
    min_cargo_limit: 50000, // Often lower cargo value (dirt/agg)
    common_exclusions: ["Off-road operations (needs endorsement)", "Overturn/Rollover"],
    premium_multiplier: 1.8,
    description: "Aggregate and asphalt hauling. High frequency of rollover claims."
    ,coverage_focus: "Review rollover, overturn, off-road, attached equipment, and damage arising during loading or dumping operations."
    ,requirements_note: "The worksite, surface conditions, radius, dump sites, and whether the truck leaves public roads can affect the policy review."
    ,cost_factors: "Underwriters may consider rollover exposure, off-road work, dump-site frequency, equipment value, radius, and driver experience."
    ,faq: [{ question: "Does bottom-dump insurance cover off-road work?", answer: "Not automatically. Off-road and jobsite activities should be disclosed and confirmed with the licensed professional reviewing the policy." }]
  },
  {
    slug: "end-dump-trailer-insurance",
    display_name: "End Dump",
    min_cargo_limit: 50000,
    common_exclusions: ["Tip-over during operation", "Hydraulic failure"],
    premium_multiplier: 1.9,
    description: "Stability risks during unloading are the #1 claim driver."
    ,coverage_focus: "Pay particular attention to tip-over, hydraulic equipment, loading and unloading, physical damage, and jobsite liability."
    ,requirements_note: "Provide details about materials, dump locations, equipment maintenance, and any off-road or construction-site work."
    ,cost_factors: "Common pricing inputs include tip-over exposure, hydraulic equipment, worksite activity, cargo type, radius, and loss history."
    ,faq: [{ question: "What is important for end-dump insurance?", answer: "The review should address unloading operations, hydraulic systems, rollover exposure, physical damage, and any construction-site or off-road work." }]
  },
  {
    slug: "lowboy-rgn-heavy-haul-insurance",
    display_name: "Lowboy / RGN (Heavy Haul)",
    min_cargo_limit: 250000, // High value equipment
    common_exclusions: ["Oversize/Overweight violations", "Loading accidents"],
    premium_multiplier: 2.2,
    description: "Transporting yellow iron and industrial machinery. High cargo value exposure."
    ,coverage_focus: "Review motor truck cargo, physical damage, equipment loading, securement, oversize operations, and route-related exposures."
    ,requirements_note: "Permits, escorts, operating radius, cargo dimensions, securement practices, and driver experience are common review items."
    ,cost_factors: "Heavy-haul pricing may reflect cargo value, oversize dimensions, routes, escorts, permits, equipment value, and securement experience."
    ,faq: [{ question: "Does heavy-haul insurance cover oversize loads?", answer: "Coverage depends on the policy and disclosed operation. Oversize routes, permits, cargo dimensions, and securement should be reviewed before binding." }]
  },

  // --- SPECIALIZED CARGO ---
  {
    slug: "auto-hauler-car-carrier-insurance",
    display_name: "Auto Hauler (7+ Car)",
    min_cargo_limit: 250000,
    common_exclusions: ["Diminished Value Claims", "Theft from unattended vehicle"],
    premium_multiplier: 2.0,
    description: "High frequency of minor damage claims (scratches/dents) drives premiums up."
    ,coverage_focus: "Review vehicle-in-transit cargo, loading and unloading, diminished-value conditions, theft controls, physical damage, and broker limits."
    ,requirements_note: "Open versus enclosed equipment, vehicle values, new-authority status, routes, loss runs, and shipper contracts can affect requirements."
    ,cost_factors: "Auto-hauler premiums can vary with open or enclosed equipment, vehicle values, loading procedures, radius, driver history, loss runs, and cargo limits."
    ,faq: [{ question: "Why can car hauler insurance cost more than standard trucking insurance?", answer: "Transporting multiple customer vehicles creates specialized cargo, loading, unloading, theft, and damage exposures that standard cargo coverage may not address." }]
  },
  {
    slug: "bull-hauler-livestock-insurance",
    display_name: "Livestock / Bull Hauler",
    min_cargo_limit: 100000, // Livestock Cargo is tricky
    common_exclusions: ["Death due to suffocating/freezing", "Escaped animals"],
    premium_multiplier: 2.3,
    description: "Shifting live loads create extreme rollover risk. Cargo claims are complex."
    ,coverage_focus: "Discuss livestock cargo conditions, mortality exclusions, escaped-animal exposures, rollover, loading facilities, and physical damage."
    ,requirements_note: "The species, route, handling practices, animal welfare procedures, and hauling contracts may affect underwriting."
    ,cost_factors: "Pricing may reflect livestock type, animal values, route length, handling procedures, rollover exposure, equipment, and claims history."
    ,faq: [{ question: "What makes livestock hauler insurance complex?", answer: "Animal mortality, handling, escape, temperature, loading, and rollover exposures can require a more specific policy review than ordinary freight hauling." }]
  },
  {
    slug: "intermodal-chassis-container-insurance",
    display_name: "Intermodal / UIIA Chassis",
    min_cargo_limit: 100000,
    common_exclusions: ["UIIA Non-Compliance", "Container damage"],
    premium_multiplier: 1.3,
    description: "Port work requires specific UIIA endorsements and high non-owned trailer limits."
    ,coverage_focus: "Review interchange, non-owned trailer, container damage, terminal operations, UIIA contract terms, and cargo coverage."
    ,requirements_note: "Port access, interchange agreements, chassis ownership, terminal routes, and UIIA requirements should be confirmed before binding."
    ,cost_factors: "Intermodal pricing may depend on chassis and trailer ownership, port operations, interchange limits, terminal exposure, radius, and contracts."
    ,faq: [{ question: "Does intermodal insurance include UIIA requirements?", answer: "UIIA and interchange obligations should be compared directly with the proposed policy, limits, endorsements, and certificate requirements." }]
  },
  {
    slug: "reefer-breakdown-insurance",
    display_name: "Reefer (Refrigerated)",
    min_cargo_limit: 100000,
    common_exclusions: ["Reefer Breakdown (unless added)", "Driver Error (Temp Setting)"],
    premium_multiplier: 1.2,
    description: "Temperature control failure is the single biggest risk factor."
    ,coverage_focus: "Review reefer breakdown, temperature deviation, spoilage, cargo monitoring, maintenance, and loading or unloading conditions."
    ,requirements_note: "Commodity sensitivity, temperature records, backup procedures, equipment age, and shipper requirements are important review items."
    ,cost_factors: "Reefer premiums can reflect cargo sensitivity, temperature limits, equipment age, breakdown exposure, monitoring, radius, and loss history."
    ,faq: [{ question: "What is reefer breakdown coverage?", answer: "It is a coverage consideration for losses connected to refrigeration failure, but terms, exclusions, temperature requirements, and claims conditions must be confirmed." }]
  }
];
