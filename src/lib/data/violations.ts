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
    code: "396.3(a)(1)",
    slug: "396-3a1-brake-system-inspection",
    official_name: "Inspection, Repair, and Maintenance of Parts and Accessories",
    layman_name: "Brake/Maintenance Negligence",
    fine_avg: 950,
    severity_tier: 7,
    rejection_rate: "65%",
    survival_prob: "HIGH",
    rehab_steps: ["Maintenance Record Audit", "DVIR Process Update", "Mechanic Certification Proof"]
  },
  {
    code: "383.51",
    slug: "383-51-driver-disqualification",
    official_name: "Disqualification of Drivers",
    layman_name: "Suspended CDL Operation",
    fine_avg: 3500,
    severity_tier: 10,
    rejection_rate: "95%",
    survival_prob: "LOW",
    rehab_steps: ["License Reinstatement", "SR-22 Filing", "Driver Training Refresher"]
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
    code: "392.16",
    slug: "392-16-seat-belt",
    official_name: "Failing to Use Seat Belt",
    layman_name: "No Seatbelt",
    fine_avg: 250,
    severity_tier: 3,
    rejection_rate: "15%",
    survival_prob: "VERY HIGH",
    rehab_steps: ["Safety Meeting Memo", "Driver Warning Letter"]
  }
  // ... (We can expand this to 50+)
];
