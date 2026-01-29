export interface Violation {
  code: string;
  slug: string;
  official_name: string;
  layman_name: string;
  fine_avg: number;
  severity_tier: number; // 1-10
  rejection_rate: string;
  survival_prob: string;
  rehab_steps: string[];
}

export const VIOLATIONS_DATA: Violation[] = [
  // --- TIER 10: THE KILL CODES (Immediate Cancellation) ---
  {
    code: "395.8(e)",
    slug: "395-8e-false-report-of-record-of-duty-status",
    official_name: "False Report of Record of Duty Status",
    layman_name: "Logbook Falsification",
    fine_avg: 2860,
    severity_tier: 10,
    rejection_rate: "92%",
    survival_prob: "MEDIUM",
    rehab_steps: ["Logbook Remedial Course", "DataQ Challenge (if clerical)", "Surplus Lines Application"]
  },
  {
    code: "382.215",
    slug: "382-215-controlled-substances",
    official_name: "Using Driver Known to Have Tested Positive for Controlled Substances",
    layman_name: "Failed Drug Test (Driver)",
    fine_avg: 5890,
    severity_tier: 10,
    rejection_rate: "99%",
    survival_prob: "ZERO (Standard market)",
    rehab_steps: ["SAP Program Completion (Return-to-Duty)", "Follow-up Testing Schedule", "High-Risk Pool Only"]
  },
  {
    code: "383.51",
    slug: "383-51-driver-disqualification",
    official_name: "Driving While Disqualified",
    layman_name: "Suspended CDL Operation",
    fine_avg: 3500,
    severity_tier: 10,
    rejection_rate: "95%",
    survival_prob: "LOW",
    rehab_steps: ["License Reinstatement", "SR-22 Filing", "Driver Training Refresher"]
  },
  {
    code: "392.2S",
    slug: "392-2s-speeding-15-mph-over-limit",
    official_name: "Operating a CMV at a Speed 15+ MPH Above Limit",
    layman_name: "Reckless Speeding (15+ over)",
    fine_avg: 1250,
    severity_tier: 9,
    rejection_rate: "88%",
    survival_prob: "LOW",
    rehab_steps: ["Driver Safety Plan Implementation", "Speed Limiter Installation Proof", "6-Month Clean Monitoring"]
  },
  {
    code: "395.8(a)",
    slug: "395-8a-no-record-of-duty-status",
    official_name: "No Record of Duty Status (No Logs)",
    layman_name: "Driving Without Logs",
    fine_avg: 2200,
    severity_tier: 9,
    rejection_rate: "85%",
    survival_prob: "MEDIUM",
    rehab_steps: ["ELD Implementation Proof", "30-Day Log Audit", "Safety Director Review"]
  },
  
  // --- TIER 7-9: THE "RED FLAG" CODES (Non-Renewal Risks) ---
  {
    code: "396.9(c)(2)",
    slug: "396-9c2-out-of-service-vehicle",
    official_name: "Operating an Out-of-Service Vehicle",
    layman_name: "Running an OOS Tag",
    fine_avg: 4500,
    severity_tier: 9,
    rejection_rate: "90%",
    survival_prob: "LOW",
    rehab_steps: ["Termination of Responsible Driver", "Maintenance Protocol Overhaul", "DOT Audit Prep"]
  },
  {
    code: "391.15",
    slug: "391-15-disqualified-driver",
    official_name: "Driving a CMV While Disqualified",
    layman_name: "Driving on Suspended License",
    fine_avg: 2750,
    severity_tier: 9,
    rejection_rate: "92%",
    survival_prob: "LOW",
    rehab_steps: ["Reinstatement Hearing", "Proof of Hardship License", "High-Risk Policy"]
  },
  {
    code: "392.4(a)",
    slug: "392-4a-drugs-possession",
    official_name: "Driver on Duty and in Possession of Drugs",
    layman_name: "Drug Possession in Cab",
    fine_avg: 3100,
    severity_tier: 10,
    rejection_rate: "98%",
    survival_prob: "VERY LOW",
    rehab_steps: ["Criminal Record Expungement", "SAP Program", "Driver Termination (Usually Required)"]
  },
  {
    code: "396.3(a)(1)",
    slug: "396-3a1-brake-system-inspection",
    official_name: "Inspection, Repair, and Maintenance of Parts and Accessories (Brakes)",
    layman_name: "Brake Maintenance Negligence",
    fine_avg: 950,
    severity_tier: 7,
    rejection_rate: "65%",
    survival_prob: "HIGH",
    rehab_steps: ["Maintenance Record Audit", "DVIR Process Update", "Mechanic Certification Proof"]
  },
  {
    code: "392.5(a)",
    slug: "392-5a-alcohol-possession",
    official_name: "Possession/Use of Alcohol Within 4 Hours of Duty",
    layman_name: "Alcohol in Cab / Pre-Duty Use",
    fine_avg: 1800,
    severity_tier: 8,
    rejection_rate: "75%",
    survival_prob: "MEDIUM",
    rehab_steps: ["Zero Tolerance Policy Update", "Random Testing Increase", "Driver Suspension"]
  },

  // --- TIER 4-6: THE "NUISANCE" CODES (Rate Hikers) ---
  {
    code: "395.3(a)(1)",
    slug: "395-3a1-11-hour-rule",
    official_name: "Driving More than 11 Hours",
    layman_name: "11-Hour Rule Violation",
    fine_avg: 1100,
    severity_tier: 6,
    rejection_rate: "55%",
    survival_prob: "HIGH",
    rehab_steps: ["HOS Training", "ELD Audit", "Dispatch Scheduling Review"]
  },
  {
    code: "395.3(a)(2)",
    slug: "395-3a2-14-hour-rule",
    official_name: "Driving After 14 Hours On Duty",
    layman_name: "14-Hour Rule Violation",
    fine_avg: 1100,
    severity_tier: 6,
    rejection_rate: "55%",
    survival_prob: "HIGH",
    rehab_steps: ["HOS Training", "Load Planning Adjustment"]
  },
  {
    code: "391.11(b)(4)",
    slug: "391-11b4-driver-physically-qualified",
    official_name: "Driver Not Physically Qualified",
    layman_name: "Medical Card Expired/Invalid",
    fine_avg: 850,
    severity_tier: 5,
    rejection_rate: "40%",
    survival_prob: "HIGH",
    rehab_steps: ["Recertification (ME Certificate)", "Upload to DMV", "Update MCS-150"]
  },
  {
    code: "392.16",
    slug: "392-16-seat-belt",
    official_name: "Failing to Use Seat Belt",
    layman_name: "No Seatbelt",
    fine_avg: 250,
    severity_tier: 3,
    rejection_rate: "15%",
    survival_prob: "VERY HIGH",
    rehab_steps: ["Safety Meeting Memo", "Driver Warning Letter"]
  },
  {
    code: "393.9",
    slug: "393-9-lighting-devices",
    official_name: "Inoperable Required Lamps",
    layman_name: "Broken Taillight / Headlight",
    fine_avg: 150,
    severity_tier: 2,
    rejection_rate: "5%",
    survival_prob: "VERY HIGH",
    rehab_steps: ["Pre-Trip Inspection Training", "Bulb Replacement Kit in Cab"]
  },
  {
    code: "393.75(c)",
    slug: "393-75c-tires-tread-depth",
    official_name: "Tire Tread Depth Less Than 2/32 of Inch",
    layman_name: "Bald Tires",
    fine_avg: 600,
    severity_tier: 5,
    rejection_rate: "30%",
    survival_prob: "HIGH",
    rehab_steps: ["Tire Maintenance Program", "Purchase Order Verification"]
  },
  {
    code: "393.45",
    slug: "393-45-brake-tubing",
    official_name: "Brake Tubing and Hose Adequacy",
    layman_name: "Chafing Brake Lines",
    fine_avg: 550,
    severity_tier: 5,
    rejection_rate: "35%",
    survival_prob: "HIGH",
    rehab_steps: ["Maintenance Check", "Securement Training"]
  },
  
  // --- TIER 8-10: ADMINISTRATIVE EXECUTIONS ---
  {
    code: "385.13",
    slug: "385-13-unsatisfactory-rating",
    official_name: "Operating with Unsatisfactory Safety Rating",
    layman_name: "Unstatisfactory Rating (Shutdown)",
    fine_avg: 11000,
    severity_tier: 10,
    rejection_rate: "100%",
    survival_prob: "ZERO (Until Rating Upgraded)",
    rehab_steps: ["Corrective Action Plan (CAP)", "Safety Rating Upgrade Request", "Consultant Intervention"]
  },
  {
    code: "387.7",
    slug: "387-7-financial-responsibility",
    official_name: "Financial Responsibility Violation",
    layman_name: "No Insurance / MCS-90 Missing",
    fine_avg: 4200,
    severity_tier: 9,
    rejection_rate: "95%",
    survival_prob: "LOW",
    rehab_steps: ["Proof of Continuous Coverage", "MCS-90 Filing via Broker", "Fine Payment"]
  },
  {
    code: "390.15(b)(2)",
    slug: "390-15b2-accident-register",
    official_name: "Failing to Maintain Accident Register",
    layman_name: "Missing Accident Files",
    fine_avg: 1200,
    severity_tier: 6,
    rejection_rate: "45%",
    survival_prob: "HIGH",
    rehab_steps: ["Create Accident Register (Past 3 Years)", "File Retroactive Reports"]
  }
];
