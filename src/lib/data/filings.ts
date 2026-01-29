export interface Filing {
  form_id: string;
  state_code: string;
  slug: string;
  official_name: string;
  purpose: string;
  processing_days_manual: number;
  processing_days_electronic: number;
  penalty_per_day: number; // Estimated financial impact/risk
  filing_fee: number;
  instant_available: boolean;
}

export const FILINGS_DATA: Filing[] = [
  // --- CALIFORNIA INTRASTATE ---
  {
    form_id: "MCP-65",
    state_code: "CA",
    slug: "mcp65-california-dmv-filing",
    official_name: "DMV 65 MCP Certificate of Insurance",
    purpose: "Required for CA Motor Carrier Permit (Intrastate)",
    processing_days_manual: 21,
    processing_days_electronic: 0, // Instant
    penalty_per_day: 500, // Revenue loss per day down
    filing_fee: 35,
    instant_available: true
  },
  {
    form_id: "PL-914",
    state_code: "CA",
    slug: "pl914-california-commercial-liability",
    official_name: "Commercial Vehicle Liability Insurance",
    purpose: "Proof of Liability for CA # Holders",
    processing_days_manual: 14,
    processing_days_electronic: 0,
    penalty_per_day: 300,
    filing_fee: 25,
    instant_available: true
  },

  // --- TEXAS & FLORIDA (High Volume) ---
  {
    form_id: "Form E",
    state_code: "TX",
    slug: "form-e-texas-dmv-filing",
    official_name: "Uniform Motor Carrier Bodily Injury and Property Damage Liability Certificate",
    purpose: "Proof of Financial Responsibility (Intrastate)",
    processing_days_manual: 7,
    processing_days_electronic: 1,
    penalty_per_day: 250,
    filing_fee: 25,
    instant_available: true
  },
  {
    form_id: "SR-22",
    state_code: "TX",
    slug: "sr22-texas-trucking-insurance",
    official_name: "Texas Financial Responsibility Insurance Certificate",
    purpose: "License Reinstatement (DUI/Serious Violation)",
    processing_days_manual: 5,
    processing_days_electronic: 0,
    penalty_per_day: 0, // Personal license risk
    filing_fee: 50,
    instant_available: true
  },
  {
    form_id: "SR-22",
    state_code: "FL",
    slug: "sr22-florida-commercial-driver",
    official_name: "Florida Financial Responsibility Certificate",
    purpose: "CDL Reinstatement after Suspension",
    processing_days_manual: 10,
    processing_days_electronic: 0,
    penalty_per_day: 0,
    filing_fee: 45,
    instant_available: true
  },

  // --- FEDERAL / INTERSTATE ---
  {
    form_id: "BMC-91X",
    state_code: "US",
    slug: "bmc91x-federal-filing-fmsca",
    official_name: "Motor Carrier Automobile Bodily Injury and Property Damage Liability",
    purpose: "Federal Operating Authority (MC Number) Active Status",
    processing_days_manual: 14,
    processing_days_electronic: 0,
    penalty_per_day: 1200, // Cost of not hauling interstate
    filing_fee: 0,
    instant_available: true
  },
  {
    form_id: "BMC-34",
    state_code: "US",
    slug: "bmc34-cargo-insurance-filing",
    official_name: "Household Goods Motor Carrier Cargo Liability",
    purpose: "Cargo Authority (Movers)",
    processing_days_manual: 14,
    processing_days_electronic: 1,
    penalty_per_day: 800,
    filing_fee: 0,
    instant_available: true
  },

  // --- URGENT STATE SPECIFICS ---
  {
    form_id: "Form E",
    state_code: "OH",
    slug: "form-e-ohio-puco-filing",
    official_name: "Uniform Motor Carrier Bodily Injury Liability (Ohio)",
    purpose: "PUCO Operating Authority",
    processing_days_manual: 10,
    processing_days_electronic: 1,
    penalty_per_day: 200,
    filing_fee: 20,
    instant_available: true
  },
  {
    form_id: "Form H",
    state_code: "US",
    slug: "form-h-uniform-cargo-filing",
    official_name: "Uniform Motor Carrier Cargo Certificate of Insurance",
    purpose: "Intrastate Cargo Liability Proof",
    processing_days_manual: 7,
    processing_days_electronic: 1,
    penalty_per_day: 400,
    filing_fee: 25,
    instant_available: true
  }
];
