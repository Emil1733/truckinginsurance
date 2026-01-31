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
  content_markdown?: string; // Optional rich content for "Head" pages
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
    rehab_steps: ["Logbook Remedial Course", "DataQ Challenge (if clerical)", "Surplus Lines Application"],
    content_markdown: `
## The "Death Sentence" of Trucking
A 395.8(e) violation is not a speeding ticket. In the eyes of an insurance underwriter, it is **proof of fraud**. Standard carriers like Progressive, Northland, and Great West essentially have a "kill switch" in their algorithms for this specific code. If they see it on your SMS scores, the quote is often auto-declined before a human even looks at it.

### Why It Happens
Most 395.8(e) violations today are not malicious. They are often:
1.  **ELD Disconnects:** Driving while unassigned driving time accumulates.
2.  **Personal Conveyance Misuse:** Using PC to advance a load (even 1 mile).
3.  **Clerical Errors:** Forgetting to change duty status.

### How We Fix It
We do not use standard markets for this. We go to the **Surplus Lines** market (Lloyd's of London, Warren, etc.) who manually underwrite files.
1.  **The Narrative:** We write a cover letter explaining *exactly* why the error happened and why it won't happen again.
2.  **The Quill:** We show proof of a new ELD system or a "Safety Director" service hire.
3.  **The Bind:** We secure a 6-month policy to keep your MC active while the violation ages off your 24-month rolling window.
`
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
  },

  // --- TIER 3-5: MOVING VIOLATIONS (High Frequency) ---
  {
    code: "392.2LC",
    slug: "392-2lc-improper-lane-change",
    official_name: "Improper Lane Change",
    layman_name: "Unsafe Lane Change",
    fine_avg: 450,
    severity_tier: 5,
    rejection_rate: "35%",
    survival_prob: "HIGH",
    rehab_steps: ["Defensive Driving Course", "Camera Monitoring System", "3-Month Probation"]
  },
  {
    code: "392.2FC",
    slug: "392-2fc-following-too-closely",
    official_name: "Following Too Closely",
    layman_name: "Tailgating",
    fine_avg: 500,
    severity_tier: 6,
    rejection_rate: "45%",
    survival_prob: "MEDIUM",
    rehab_steps: ["Space Management Training", "Safety Meeting Review", "Ride-along Evaluation"]
  },
  {
    code: "392.2IT",
    slug: "392-2it-improper-turns",
    official_name: "Improper Turns",
    layman_name: "Prohibited Turn / Wide Turn",
    fine_avg: 350,
    severity_tier: 4,
    rejection_rate: "25%",
    survival_prob: "HIGH",
    rehab_steps: ["Route Planning Training", "Intersection Safety Review"]
  },
  {
    code: "392.2FY",
    slug: "392-2fy-failure-to-yield",
    official_name: "Failure to Yield Right of Way",
    layman_name: "Failure to Yield",
    fine_avg: 400,
    severity_tier: 5,
    rejection_rate: "30%",
    survival_prob: "HIGH",
    rehab_steps: ["Defensive Driving", "Accident Prevention Course"]
  },
  {
    code: "392.80",
    slug: "392-80-texting-while-driving",
    official_name: "Driving a CMV While Texting",
    layman_name: "Texting While Driving",
    fine_avg: 2750,
    severity_tier: 10,
    rejection_rate: "95%",
    survival_prob: "LOW",
    rehab_steps: ["Zero Tolerance Policy", "Phone Lockbox Policy", "Driver Termination Risk"]
  },
  {
    code: "392.82",
    slug: "392-82-mobile-phone-usage",
    official_name: "Using a Hand-Held Mobile Telephone",
    layman_name: "Handheld Phone Use",
    fine_avg: 2750,
    severity_tier: 10,
    rejection_rate: "95%",
    survival_prob: "LOW",
    rehab_steps: ["Bluetooth Headset Mandate", "Driver retraining", "Strict Enforcement"]
  },
  {
    code: "392.22(a)",
    slug: "392-22a-stopped-vehicle-hazard",
    official_name: "Failing to Use Hazard Warning Flashers",
    layman_name: "No Hazards on Shoulder",
    fine_avg: 200,
    severity_tier: 3,
    rejection_rate: "10%",
    survival_prob: "VERY HIGH",
    rehab_steps: ["Breakdown Procedure Review", "Safety Kit auditing"]
  },
  
  // --- TIER 2-4: EQUIPMENT & MAINTENANCE (The Nuisance List) ---
  {
    code: "393.95(a)",
    slug: "393-95a-fire-extinguisher",
    official_name: "No / Discharged / Unsecured Fire Extinguisher",
    layman_name: "Missing Fire Extinguisher",
    fine_avg: 150,
    severity_tier: 2,
    rejection_rate: "5%",
    survival_prob: "VERY HIGH",
    rehab_steps: ["Pre-trip Inspection Checklist", "Equipment Purchase"]
  },
  {
    code: "393.95(f)",
    slug: "393-95f-warning-devices",
    official_name: "Insufficient Warning Devices (Triangles)",
    layman_name: "Missing Triangles",
    fine_avg: 150,
    severity_tier: 2,
    rejection_rate: "5%",
    survival_prob: "VERY HIGH",
    rehab_steps: ["Cab Inventory Check", "Safety Kit Restock"]
  },
  {
    code: "393.25(f)",
    slug: "393-25f-stop-lamp-violations",
    official_name: "Stop Lamp Violations",
    layman_name: "Brake Lights Out",
    fine_avg: 150,
    severity_tier: 3,
    rejection_rate: "10%",
    survival_prob: "VERY HIGH",
    rehab_steps: ["Pre-Trip Discipline", "Bulb Replacement Protocol"]
  },
  {
    code: "396.17(c)",
    slug: "396-17c-annual-inspection",
    official_name: "Operating CMV Without Periodic Inspection",
    layman_name: "Expired Annual Inspection",
    fine_avg: 800,
    severity_tier: 6,
    rejection_rate: "40%",
    survival_prob: "high",
    rehab_steps: ["Immediate Inspection", "Scheduling Software Implementation"]
  },
  {
    code: "393.11",
    slug: "393-11-lighting-devices-color",
    official_name: "Lamps and Reflective Devices - Color/Position",
    layman_name: "Wrong Color Lights",
    fine_avg: 100,
    severity_tier: 2,
    rejection_rate: "5%",
    survival_prob: "VERY HIGH",
    rehab_steps: ["Remove custom lighting", "OEM part restoration"]
  },
  {
    code: "393.47",
    slug: "393-47-brake-actuators",
    official_name: "Brake Actuators, Slack Adjusters, Linings/Pads",
    layman_name: "Brakes Out of Adjustment",
    fine_avg: 850,
    severity_tier: 7,
    rejection_rate: "60%",
    survival_prob: "MEDIUM",
    rehab_steps: ["Mechanic Training", "Digital Brake Stroke Indicators"]
  },
  {
    code: "393.60(c)",
    slug: "393-60c-windshield-condition",
    official_name: "Windshield Condition",
    layman_name: "Cracked Windshield",
    fine_avg: 150,
    severity_tier: 1,
    rejection_rate: "0%",
    survival_prob: "VERY HIGH",
    rehab_steps: ["Glass Replacement", "Road Debris Policy"]
  },
   {
    code: "393.100",
    slug: "393-100-cargo-securement",
    official_name: "Protection Against Shifting and Falling Cargo",
    layman_name: "Improper Load Securement",
    fine_avg: 1200,
    severity_tier: 8,
    rejection_rate: "70%",
    survival_prob: "MEDIUM",
    rehab_steps: ["Securement Training (Strap/Chain)", "Load Check Policy (Every 150 miles)"]
  },
  {
    code: "392.9(a)(1)",
    slug: "392-9a1-unsecure-load",
    official_name: "Load Not Properly Secured",
    layman_name: "Loose Cargo",
    fine_avg: 1200,
    severity_tier: 8,
    rejection_rate: "70%",
    survival_prob: "MEDIUM",
    rehab_steps: ["Driver Securement Certification", "Pre-departure photographs"]
  },
  
  // --- TIER 6-8: DRIVER FITNESS ---
  {
    code: "391.11(b)(2)",
    slug: "391-11b2-english-proficiency",
    official_name: "Driver Cannot Read/Speak English Sufficiently",
    layman_name: "English Proficiency Violation",
    fine_avg: 500,
    severity_tier: 6,
    rejection_rate: "50%",
    survival_prob: "MEDIUM",
    rehab_steps: ["ESL Classes", "Bilingual Dispatcher Support"]
  },
  {
    code: "391.41(a)",
    slug: "391-41a-medical-certificate",
    official_name: "Driver No Medical Certificate in Possession",
    layman_name: "No Med Card",
    fine_avg: 400,
    severity_tier: 5,
    rejection_rate: "25%",
    survival_prob: "HIGH",
    rehab_steps: ["Digital Wallet Copy", "Upload to ELD Tablet"]
  },
  {
    code: "392.3",
    slug: "392-3-ill-fatigued-driver",
    official_name: "Operating CMV While Ill or Fatigued",
    layman_name: "Driving Sick / Tired",
    fine_avg: 1500,
    severity_tier: 9,
    rejection_rate: "80%",
    survival_prob: "LOW",
    rehab_steps: ["Sick Leave Policy", "Fatigue Management Program"]
  }
];
