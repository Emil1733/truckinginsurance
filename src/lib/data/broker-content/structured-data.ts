export interface ContentSection {
  type: 'text' | 'comparison' | 'checklist' | 'stepper' | 'callout';
  title: string;
  subtitle?: string;
  content?: string;
  items?: string[];
  comparisons?: { error: string; fix: string }[];
  steps?: { title: string; desc: string }[];
}

export interface BrokerRequirement {
  id: string;
  name: string;
  slug: string;
  logo: string;
  requirements: {
    autoLiability: string;
    cargoInsurance: string;
    generalLiability?: string;
    reeferBreakdown?: string;
    trailerInterchange?: string;
    specialNotes?: string;
  };
  rejectionTriggers: string[];
  sections: ContentSection[];
  coiRequirements: string[];
  ctaText: string;
}

export const TQL_SECTIONS: ContentSection[] = [
  {
    type: 'stepper',
    title: 'Your 4-Phase Roadmap to TQL Approval',
    subtitle: 'Following these steps exactly is the only way to bypass the TQL automated vetting firewall.',
    steps: [
      { title: 'The 90-Day Authority Audit', desc: 'Ensure your MC# has been active for at least 90 days. If not, we trigger the "Financial Stability" override with a $2M policy.' },
      { title: 'SMS Safety Scan', desc: 'We audit your BASIC scores. If your HOS or Unsafe Driving scores are over 25%, we provide the DataQ roadmap to lower them.' },
      { title: 'COI Forensic Review', desc: 'We generate a COI with the exact Cincinnati headquarters address and the specific "Primary and Non-Contributory" language.' },
      { title: 'Digital Submission', desc: 'Direct upload to the TQL Trax portal. Approval usually follows in 30 minutes.' }
    ]
  },
  {
    type: 'comparison',
    title: 'The "Invisible" Rejection Traps',
    subtitle: 'Why traditional insurance agents fail to get you loaded by TQL.',
    comparisons: [
      { error: 'Unattended Vehicle Exclusion', fix: 'All-Risk Cargo with Mysterious Disappearance' },
      { error: 'Specified Perils Form', fix: 'Broad Form Cargo (No Exclusions for Theft)' },
      { error: 'Incorrect Certificate Holder', fix: 'TQL, LLC (Cincinnati HQ) with precise PO Box' },
      { error: 'Standard GL Limits', fix: '$1M / $2M Aggregate with AI Endorsement' }
    ]
  },
  {
    type: 'text',
    title: 'Carrier411 & The FreightGuard Factor',
    content: 'Total Quality Logistics (TQL) is a primary user of monitoring services like Carrier411. A single report for "unprofessionalism" or "double brokering"—even if unfair—can cause a system-wide block. Our team helps you audit your Carrier411 profile and provide the forensic insurance data needed to prove you are a legitimate asset-based carrier with a dedicated fleet.'
  },
  {
    type: 'checklist',
    title: 'The TQL Vetting Checklist',
    items: [
      'Active MC Number for 90+ Days',
      'No Active "Alert" symbols in FMCSA SMS',
      'Certificate Holder: 4289 Ivy Pointe Blvd, Cincinnati, OH',
      'Minimum $100,000 Cargo Limit',
      'No Reefer Breakdown exclusions (for temperature freight)',
      'TQL Trax Mobile App Integrated'
    ]
  },
  {
    type: 'callout',
    title: 'Pro Tip: The TQL Technology Mandate',
    content: 'In 2026, TQL has moved toward a "Technology-First" model. Carriers who do not utilize TQL Trax or have ELD-integrated tracking are often excluded from high-paying loads. If your drivers frequently opt-out of tracking, your account will be flagged for manual review, which usually leads to a block on high-value cargo.'
  }
];

export const AMAZON_SECTIONS: ContentSection[] = [
  {
    type: 'stepper',
    title: 'The Amazon Relay Approval Roadmap',
    subtitle: 'Amazon Relay uses an automated "No-Human" vetting process. If these 4 steps aren\'t perfect, you are blocked for 14 days.',
    steps: [
      { title: 'Portal Integrity', desc: 'Ensuring your EIN, MC#, and DOT data matches your Secretary of State filings exactly.' },
      { title: 'Insurance OCR Sync', desc: 'We generate a COI that passes Amazon\'s Optical Character Recognition system on the first scan.' },
      { title: 'Asset VIN Verification', desc: 'Amazon cross-references your VIN list with the Insurance Schedule. We ensure 100% parity.' },
      { title: 'SPS Score Kickoff', desc: 'Activation of your Service Performance Score. We audit your existing SMS scores to ensure a high starting rank.' }
    ]
  },
  {
    type: 'comparison',
    title: 'The "Box Truck" Rejection Matrix',
    subtitle: 'Amazon is famous for rejecting box truck carriers for these specific insurance gaps.',
    comparisons: [
      { error: 'Standard $1M GL Aggregate', fix: '$2,000,000 GL Aggregate (Non-Negotiable)' },
      { error: 'Missing Trailer Interchange', fix: '$50,000 Minimum (Even for Box Trucks)' },
      { error: 'Incorrect Certificate Holder', fix: 'Amazon.com, Inc. - PO Box 81226, Seattle, WA' },
      { error: 'Missing Scheduled Autos', fix: 'Every VIN must be listed on the policy' }
    ]
  },
  {
    type: 'text',
    title: 'Middle-Mile vs. Last-Mile: The Vetting Difference',
    content: 'Many carriers confuse Amazon "Last-Mile" delivery (the blue vans delivering to houses) with "Relay Middle-Mile" freight (the 26ft box trucks and semi-trucks moving between warehouses). The vetting for Relay is significantly more rigorous. Amazon Relay requires a full Commercial Auto Liability policy with "Additional Insured" status for all entities. If your agent hasn\'t worked with Amazon Relay specifically, they likely missed the "Seattle PO Box" requirement, which leads to an instant digital rejection. Furthermore, Relay carriers are held to a higher safety standard, with Amazon pulling real-time CSA data from the FMCSA to determine your "Load Board Priority." If your vehicle maintenance scores rise above the national average, your access to "Early Access" loads is instantly throttled.'
  },
  {
    type: 'text',
    title: 'The Trailer Interchange Loophole for New Ventures',
    content: 'The most frequent reason for an Amazon Relay rejection is the Trailer Interchange requirement. Even if you are an owner-operator who only hauls your own trailer, Amazon requires a minimum of $50,000 in Trailer Interchange coverage. This is because Amazon utilizes "Drop and Hook" operations where you may be required to pull an Amazon-owned trailer. Many new carriers try to save money by opting for "Non-Owned Trailer" coverage instead, but Amazon\'s automated system is programmed specifically to look for the "Trailer Interchange" endorsement on the COI. If that specific box isn\'t checked, your application is rejected. Our Amazon-Ready policies include the exact Interchange language needed to satisfy their digital auditors and keep your trucks moving through the warehouse gates.'
  },
  {
    type: 'checklist',
    title: 'Amazon Relay Compliance Audit',
    items: [
      'Active MC# for 0+ Days (New Venture Factory)',
      'Minimum $50k Trailer Interchange Coverage',
      'General Liability with $2M Aggregate',
      'Workers Comp / Occ-Acc (Specific for NY/CA/FL)',
      'Reefer Breakdown (Broad Form for Amazon Fresh)',
      'Schedule of Vehicles with matching VINs'
    ]
  },
  {
    type: 'text',
    title: 'SPS Scores and the Safety-Revenue Link',
    content: 'Once you are approved for Amazon Relay, your performance is monitored by a metric called the Service Performance Score (SPS). This score is a combination of your On-Time Delivery record, your Acceptance Rate, and your FMCSA Safety Compliance. Amazon is particularly sensitive to "Vehicle Maintenance" violations. If your CSA scores for tires, brakes, or lights rise above the national average, Amazon’s system pulls that data and can automatically lower your SPS. A low SPS means you lose access to high-paying "linehaul" loads, leaving you with only the lowest-paying "short-haul" freight. We provide safety-compliant insurance that includes a "Safety Audit Guarantee," helping you keep your SPS high and your Amazon load access profitable.'
  },
  {
    type: 'text',
    title: 'Workers Comp: The State-by-State Minefield',
    content: 'For carriers operating in states like California, New York, or Florida, Amazon Relay often requires proof of Workers Compensation insurance—even for single-driver owner-operators. If you are a "Sole Proprietor" and attempt to use an "Exemption" form, Amazon may still reject your application depending on the specific lane you are applying for. This is because Amazon’s legal team views "Uninsured Drivers" as a massive liability risk. We provide Occupational Accident (Occ-Acc) policies that are designed to bridge the gap between Workers Comp and traditional health insurance, satisfying Amazon’s safety requirements for individual drivers while keeping your premiums low. Without this specific filing, you may be blocked from the most profitable freight lanes in the country.'
  },
  {
    type: 'text',
    title: 'The "Amazon Offset" & Claims Management',
    content: 'Amazon is both the broker and the shipper. When a cargo claim occurs—such as a damaged pallet or a late delivery fine—they do not wait for your insurance company to investigate. Instead, they "offset" the claim amount directly from your future settlements. This can kill a new carrier\'s cash flow in 24 hours. Our Amazon-Ready policies include Nil-Deductible cargo options and specialized claims support to manage the "Amazon Offset" process. We work with Amazon\'s claims adjusters to ensure that minor damages don\'t turn into a financial crisis for your business.'
  },
  {
    type: 'callout',
    title: 'Pro Tip: The Seasonal Surge Scaling',
    content: 'During Q4 Peak Season, Amazon expects you to scale your fleet in days to handle the massive surge in package volume. Our digital COI system allows you to add trucks and generate new certificates for the Relay portal instantly, 24/7, without waiting for an insurance agent to wake up. This "Always-On" support is the difference between making $50k in December and being stuck at home with an unapproved truck.'
  }
];

export const DMV_SECTIONS: ContentSection[] = [
  {
    type: 'stepper',
    title: 'The 24-Hour California MCP Rescue Roadmap',
    subtitle: 'If your California Motor Carrier Permit is suspended, every hour counts. We follow this exact protocol to restore your authority.',
    steps: [
      { title: 'CA# & DOT Audit', desc: 'We verify that your USDOT and CA numbers are perfectly synced in the DMV mainframe.' },
      { title: 'MCP-65 Digital Filing', desc: 'We skip the 10-day mail-in delay by using the DMV’s Direct EDI portal.' },
      { title: 'Compliance Certificate', desc: 'Generation of temporary operating documents so you can get back on the road today.' },
      { title: 'Final Permit Issuance', desc: 'Coordination with Sacramento DMV HQ to ensure your hard-copy permit is finalized.' }
    ]
  },
  {
    type: 'comparison',
    title: 'Why DMV Filings Get Rejected',
    subtitle: 'California is notorious for rejecting MCP-65 filings for minor administrative errors.',
    comparisons: [
      { error: 'Name/DBA Mismatch', fix: 'Exact character-match with DMV Master File' },
      { error: 'Standard Mail-In Filing', fix: 'Direct EDI Electronic Filing (24-Hour Turnaround)' },
      { error: 'Insufficient Liability Limits', fix: 'California-Specific $750k / $1M / $5M compliance' },
      { error: 'Incorrect CA# on COI', fix: 'Verified CA Number linked to DMV Registration' }
    ]
  },
  {
    type: 'text',
    title: 'The MCP-65 Crisis: Why Your Permit Was Suspended',
    content: 'The California DMV requires all "For-Hire" and certain "Private" motor carriers to maintain a valid Motor Carrier Permit (MCP). The most common reason for a sudden suspension is the expiration or rejection of your MCP-65 insurance filing. Most insurance agents simply "mail in" a paper certificate, which sits in a stack in Sacramento for up to 10 business days. If your filing isn\'t processed before your expiration date, your CA# is flagged as "Suspended," and your trucks are subject to immediate impoundment by the CHP. We solve this by using the DMV\'s Electronic Data Interchange (EDI), which allows us to upload your proof of insurance directly into their mainframe in seconds.'
  },
  {
    type: 'checklist',
    title: 'California Compliance Checklist',
    items: [
      'Active USDOT Number',
      'Valid CA Number (issued by CHP)',
      'MCP-65 Insurance Filing (Electronic Only)',
      'Workers Comp (if you have employees)',
      'EPN (Employer Pull Notice) Program enrollment',
      'BIT (Biennial Inspection of Terminals) compliance'
    ]
  },
  {
    type: 'text',
    title: 'The "Private Carrier" Trap: Do You Need an MCP?',
    content: 'Many California business owners (landscapers, contractors, and private fleets) believe they are exempt from the Motor Carrier Permit requirement. However, if your vehicle has a GVWR of 10,001 lbs or more, or if you are towing a trailer that puts your combined weight over the limit, California law requires an MCP. Operating without one is a misdemeanor and carries heavy fines. We specialize in "Private Carrier" compliance, ensuring that your business is shielded from CHP roadside enforcement and DMV audits.'
  },
  {
    type: 'text',
    title: 'BIT Inspections and EPN Compliance',
    content: 'California carriers are subject to the Biennial Inspection of Terminals (BIT) program. A "Failed" BIT inspection can lead to an immediate revocation of your MCP, regardless of your insurance status. Furthermore, California requires all carriers with CDL drivers to enroll in the Employer Pull Notice (EPN) program. We provide a "California-Standard" insurance policy that includes built-in compliance monitoring for both BIT and EPN, ensuring that a single driver violation doesn\'t shut down your entire California operation.'
  },
  {
    type: 'callout',
    title: 'Urgent: CHP Roadside Enforcement',
    content: 'The California Highway Patrol (CHP) uses real-time mobile scanners to check your MCP status. If your insurance filing is "Pending" or "Rejected," you will be pulled over and placed Out-of-Service (OOS) until the DMV clears your record. Do not risk your equipment—get a verified digital filing today.'
  }
];

export const CH_ROBINSON_SECTIONS: ContentSection[] = [
  {
    type: 'stepper',
    title: 'The 4-Phase Navisphere Approval Path',
    subtitle: 'Navisphere is the most advanced broker portal in the world. We ensure your digital profile is "Elite" from day one.',
    steps: [
      { title: 'Entity Verification', desc: 'Synchronizing your Navisphere login with your FMCSA census data to ensure zero "Data Mismatch" errors.' },
      { title: 'Global Insurance Sync', desc: 'We push your $1M Liability and $100k Cargo filings directly to the CHR compliance department.' },
      { title: 'Navisphere App Activation', desc: 'Integration with C.H. Robinson technology for real-time tracking and "QuickPay" eligibility.' },
      { title: 'First Load Board Access', desc: 'Audit of your lane preferences to ensure you are seeing high-paying "Navisphere Elite" freight.' }
    ]
  },
  {
    type: 'comparison',
    title: 'Why CHR Rejects Your COI',
    subtitle: 'The difference between a "Standard" policy and a "Navisphere-Compliant" one.',
    comparisons: [
      { error: 'Missing Additional Insured', fix: 'Global AI Endorsement (C.H. Robinson Worldwide, Inc.)' },
      { error: 'Reefer Breakdown Exclusion', fix: 'Broad Form Reefer with No Temperature Clause' },
      { error: 'Limited Cargo Forms', fix: 'CHR-Compliant All-Risk Cargo (Form A)' },
      { error: '90-Day Authority Waiting', fix: 'New Venture override via "Financial Strength" rating' }
    ]
  },
  {
    type: 'text',
    title: 'Navisphere: The Digital Gatekeeper',
    content: 'C.H. Robinson (CHR) utilizes a proprietary vetting system called Navisphere. This system is not just a load board; it is a real-time compliance engine that pulls data from the FMCSA, Carrier411, and SaferWatch every 15 minutes. If your insurance agent makes a single typo on your COI, Navisphere will automatically "Darken" your load access without notifying you. Our CHR-Ready policies are designed to sync perfectly with Navisphere’s digital auditors. We ensure your "Scheduled Autos" list matches your MC# perfectly, preventing the dreaded "Insurance Expired" alert that stops you from booking freight on Friday afternoons.'
  },
  {
    type: 'text',
    title: 'The "Conditional Rating" Death Sentence',
    content: 'C.H. Robinson is one of the strictest brokers regarding FMCSA safety ratings. If your fleet is assigned a "Conditional" rating after a DOT audit, CHR will immediately terminate your carrier agreement. This can wipe out 80% of a carrier’s revenue overnight. We provide forensic safety audits as part of our insurance package, helping you manage your BASIC scores and file "DataQ" challenges to remove unfair violations from your record. Our goal is to keep your rating "Satisfactory" so your Navisphere access remains uninterrupted.'
  },
  {
    type: 'checklist',
    title: 'CHR Master Compliance Checklist',
    items: [
      'Active MC# with "Satisfactory" Safety Rating',
      'Minimum $1,000,000 Auto Liability',
      'Minimum $100,000 Cargo Insurance (All-Risk)',
      'C.H. Robinson Worldwide, Inc. as Certificate Holder',
      'Additional Insured / Primary & Non-Contributory',
      'Active Navisphere Carrier Account'
    ]
  },
  {
    type: 'text',
    title: 'The "High-Value" Cargo Requirement',
    content: 'C.H. Robinson moves a significant amount of high-value electronics and pharmaceutical freight. For these loads, a standard $100,000 cargo policy is not enough. CHR often requires $250,000 or even $500,000 in specific coverage, along with "Mysterious Disappearance" endorsements. If your current policy has a "Theft from Unattended Vehicle" exclusion, you will be blocked from these high-paying lanes. We specialize in high-limit cargo filings that satisfy the most rigorous CHR customer requirements.'
  },
  {
    type: 'callout',
    title: 'Pro Tip: Navisphere "Elite" Status',
    content: 'Carriers who consistently use Navisphere tracking and have zero insurance lapses are eventually granted "Elite" status. This gives you early access to loads and priority bidding. Our automated COI renewal system ensures you never have a gap in coverage, protecting your Elite status and your profit margins.'
  }
];

export const JB_HUNT_SECTIONS: ContentSection[] = [
  {
    type: 'stepper',
    title: 'The Carrier 360 Approval Roadmap',
    subtitle: 'J.B. Hunt uses the Carrier 360 platform to manage one of the largest dedicated fleets in America.',
    steps: [
      { title: 'The 6-Month Authority Audit', desc: 'Verification that your MC# has been active for at least 180 days. We provide the "Exception Package" for high-performing newer fleets.' },
      { title: 'Intermodal Asset Sync', desc: 'Calibration of your Trailer Interchange and Chassis coverage for hauling JBH-owned equipment.' },
      { title: 'Carrier 360 Digital Link', desc: 'Secure upload of your certificate to the JBH portal with exact character matching for Additional Insured status.' },
      { title: 'Final Dispatch Activation', desc: 'Activation of your account for JBH dedicated lanes and rail-yard access.' }
    ]
  },
  {
    type: 'comparison',
    title: 'J.B. Hunt Rejection Factors',
    subtitle: 'Why traditional policies fail the Carrier 360 digital audit.',
    comparisons: [
      { error: 'Missing Trailer Interchange', fix: '$25,000 Minimum (Required for JBH Chassis)' },
      { error: 'Standard $1M GL Limit', fix: '$2,000,000 Aggregate (Required for Dedicated Lanes)' },
      { error: 'Missing Workers Comp', fix: 'Workers Comp or Occ-Acc required for all Power Units' },
      { error: 'Incorrect PO Box Holder', fix: 'J.B. Hunt Transport, Inc. - Lowell, AR (Headquarters)' }
    ]
  },
  {
    type: 'text',
    title: 'Carrier 360: The Intermodal Gatekeeper',
    content: 'J.B. Hunt (JBH) is a pioneer in intermodal transportation. To haul JBH freight, you must master the Carrier 360 platform. Unlike other brokers, JBH requires specific "Intermodal" endorsements on your cargo and liability policies. If you are picking up a JBH-owned chassis or trailer from a rail yard, your insurance must include a specialized "Trailer Interchange" agreement. Many agents provide a standard "Non-Owned Trailer" endorsement, but JBH’s automated system will reject this because it does not cover the specific contractual liability of the intermodal interchange agreement. Our JBH-Ready policies are built specifically for the rail yards, ensuring you never get turned away at the gate.'
  },
  {
    type: 'text',
    title: 'The 6-Month Authority Rule & How to Bypass It',
    content: 'J.B. Hunt officially requires carriers to have at least 6 months of active authority before joining Carrier 360. For many owner-operators, this is a massive barrier to revenue. However, JBH does grant exceptions for carriers who can demonstrate superior financial stability and safety compliance. We help you package your "Exception Filing" by providing higher-than-required liability limits and specialized safety audit data. By showing JBH that you are "over-insured" and professionally managed, we can often bypass the 6-month waiting period and get you hauling dedicated freight in weeks, not months.'
  },
  {
    type: 'checklist',
    title: 'JBH Master Compliance Checklist',
    items: [
      'Active MC# for 180+ Days (or approved Exception)',
      'Minimum $1,000,000 Auto Liability',
      'Minimum $100,000 Cargo Insurance (Intermodal Form)',
      'Minimum $25,000 Trailer Interchange',
      'J.B. Hunt Transport, Inc. as Certificate Holder',
      'Active Carrier 360 Portal Login'
    ]
  },
  {
    type: 'text',
    title: 'Dedicated Lanes & The Workers Comp Mandate',
    content: 'For J.B. Hunt’s most profitable dedicated contracts, Workers Compensation is non-negotiable. Even if you are a single-driver owner-operator, JBH requires proof of coverage to shield themselves from "Vicarious Liability" claims. If your agent hasn\'t set you up with a "Ghost Policy" or a specialized Occupational Accident (Occ-Acc) rider that JBH accepts, you will be permanently excluded from their dedicated contract network. We provide the specific Occ-Acc filings that JBH recognizes, giving you the same load access as the largest fleets in the country.'
  },
  {
    type: 'callout',
    title: 'Pro Tip: Rail Yard Chassis Coverage',
    content: 'Most JBH rejections happen at the rail yard, not in the office. If your policy doesn\'t specifically cover "Chassis Damage," the gate guard will block your pickup. We include specific Chassis endorsements in all our JBH packages to ensure your rail yard operations are 100% compliant.'
  }
];

export const LANDSTAR_SECTIONS: ContentSection[] = [
  {
    type: 'stepper',
    title: 'The Landstar BCO Approval Roadmap',
    steps: [
      { title: 'BCO Application Audit', desc: 'Detailed review of your safety history.' },
      { title: 'Qualcomm/ELD Sync', desc: 'Verification of tracking compatibility.' },
      { title: 'Policy Forensic Scan', desc: 'Pushing specialized Cargo endorsements.' },
      { title: 'Agent Network Access', desc: 'Activation for 1,200+ agent load boards.' }
    ]
  },
  {
    type: 'comparison',
    title: 'Landstar Rejection Factors',
    comparisons: [
      { error: 'High Unsafe Driving Percentile', fix: 'DataQ Challenge' },
      { error: 'Standard Cargo Exclusions', fix: 'All-Risk Cargo' },
      { error: 'Missing Occupational Accident', fix: 'Landstar-Compliant Occ-Acc' }
    ]
  },
  {
    type: 'text',
    title: 'The BCO Model: Why Safety is Your Revenue',
    content: 'Landstar operates as a "Business Capacity Owner" (BCO) model. Unlike standard brokers, Landstar views you as an extension of their corporate brand. This means their safety standards are the highest in the world. Our Landstar-Ready insurance includes a built-in safety audit service.'
  }
];

export const SCHNEIDER_SECTIONS: ContentSection[] = [
  {
    type: 'stepper',
    title: 'The Schneider Intermodal Approval Path',
    steps: [
      { title: 'Schneider Portal Registry', desc: 'Creation of carrier profile.' },
      { title: 'UIIA Gateway Sync', desc: 'Pushing filings to the UIIA database.' },
      { title: 'Amazon-UIIA Linkage', desc: 'Calibration for Amazon Relay intermodal.' }
    ]
  },
  {
    type: 'comparison',
    title: 'Why Schneider Rejects Your Fleet',
    comparisons: [
      { error: 'Missing UIIA Endorsement', fix: 'UIIA-Standard Form Filing' },
      { error: 'Insufficient Interchange Limits', fix: '$50,000 Trailer Interchange' }
    ]
  },
  {
    type: 'text',
    title: 'Schneider Intermodal: The UIIA Connection',
    content: 'Schneider National is one of the largest intermodal carriers. To pull a Schneider "Orange Box," you must be a member of the UIIA. We ensure your policy includes the specific UIIA-Standard endorsements that Schneider requires.'
  }
];

export const UIIA_SECTIONS: ContentSection[] = [
  {
    type: 'stepper',
    title: 'The 48-Hour UIIA Certification Roadmap',
    subtitle: 'The UIIA is the digital gateway to every major US port. We bypass the 10-day manual audit with direct EDI filings.',
    steps: [
      { title: 'UIIA Portal Enrollment', desc: 'We coordinate your registration with the IANA (Intermodal Association of North America) and synchronize your SCAC code.' },
      { title: 'Trailer Interchange Sync', desc: 'Calibration of your $25k - $100k Trailer Interchange limits to match the specific requirements of the steamship lines (Maersk, MSC, COSCO).' },
      { title: 'Direct EDI Filing', desc: 'We push your GL and Auto Liability filings directly into the UIIA mainframe via Electronic Data Interchange.' },
      { title: 'Port Gate Activation', desc: 'Verification that your insurance is "Active" in the gate systems of the Ports of LA, Long Beach, Savannah, and New York.' }
    ]
  },
  {
    type: 'comparison',
    title: 'UIIA Rejection Matrix',
    subtitle: 'Why 60% of UIIA applications are rejected on the first attempt.',
    comparisons: [
      { error: 'Missing "Additional Insured" on AL', fix: 'UIIA Standard Wording (Primary/Non-Contributory)' },
      { error: 'Incorrect Trailer Interchange Limit', fix: '$50,000 Broad Form (UIIA-Approved Clause)' },
      { error: 'Manual Certificate Upload', fix: 'Direct EDI Mainframe Filing (24-Hour Approval)' },
      { error: 'Missing SCAC Code Linkage', fix: 'Automated Sync with NMFTA Database' }
    ]
  },
  {
    type: 'text',
    title: 'UIIA: The Infrastructure Gateway',
    content: 'The Uniform Intermodal Interchange (UIIA) is a standard contract between motor carriers and equipment providers (steamship lines and railroads). Without a UIIA certification, your trucks cannot enter a US port or rail yard. Most insurance agents treat UIIA as a standard "Certificate of Insurance," but the UIIA database is a real-time compliance mainframe. If your filing doesn\'t use the exact UIIA-approved legal language, you are rejected. We are the only agency that specializes in UIIA "Rescue Filings." We fix the typos that block your port access and get your fleet back into the terminals in 48 hours.'
  },
  {
    type: 'text',
    title: 'The Amazon UIIA Connection',
    content: 'A massive hidden volume of freight exists for Amazon Relay carriers who are also UIIA-certified. Amazon utilizes "Intermodal" lanes where they require carriers to pick up Amazon-owned chassis from rail yards. These loads often pay 40% more than standard dry-van freight, but they are "Locked" behind the UIIA requirement. We specialize in the "Amazon-UIIA Linkage," providing a single insurance policy that satisfies Amazon’s OCR system and the UIIA’s port safety standards. This allows you to scale your business into the highest-paying intermodal lanes in the country.'
  },
  {
    type: 'checklist',
    title: 'UIIA Certification Checklist',
    items: [
      'Active SCAC Code (Standard Carrier Alpha Code)',
      'Minimum $1,000,000 Auto Liability',
      'Minimum $1,000,000 General Liability',
      'Trailer Interchange (Minimum $25k, $50k Recommended)',
      'Active MC# in Good Standing',
      'Workers Comp (Required for NY/CA/FL Port access)'
    ]
  },
  {
    type: 'text',
    title: 'Steamship Line Specifics (Maersk, MSC, Hapag-Lloyd)',
    content: 'Every steamship line has slightly different insurance requirements within the UIIA framework. For example, Maersk might require a higher Trailer Interchange limit than COSCO. Our UIIA-Master policies are designed to cover ALL major equipment providers simultaneously. We ensure your policy is "Globalized," so whether you are pulling a chassis from Savannah or LA, your insurance is instantly recognized and approved at the gate.'
  },
  {
    type: 'callout',
    title: 'Urgent: The "Port Gate" Shutdown',
    content: 'If your UIIA insurance expires for even one hour, your trucks are automatically blacklisted from every port gate in America. We provide "Forever-Active" UIIA monitoring, ensuring your renewals are pushed to the IANA database 30 days before expiration, protecting your port access and your revenue.'
  }
];

export const GEICO_SECTIONS: ContentSection[] = [
  {
    type: 'comparison',
    title: 'GEICO vs. Trucking Specialists',
    subtitle: 'Why a generalist car insurance company might be the most expensive mistake for your trucking business.',
    comparisons: [
      { error: 'Limited Radius (500 miles)', fix: 'Unlimited Long-Haul Radius (48 States)' },
      { error: 'Generic Claims Adjusters', fix: 'Specialist Trucking Claim Units' },
      { error: 'Missing Federal Filings', fix: 'Direct EDI Filings (MCS-90, MCP-65)' },
      { error: 'Restricted Cargo Forms', fix: 'All-Risk Broad Form Cargo' }
    ]
  },
  {
    type: 'text',
    title: 'The GEICO "Generalist" Trap',
    content: 'GEICO is a marketing powerhouse. They spend millions on commercials to convince you that "15 minutes could save you 15%." But in commercial trucking, saving 15% on your premium can cost you 100% of your business. GEICO is a generalist. They insure cars, motorcycles, and RVs. They do not specialize in the forensic compliance requirements of the FMCSA. When you bind a policy with a generalist, you often find out too late that they don\'t handle the MCP-65 filing for California, or they won\'t provide the "Primary and Non-Contributory" language required by brokers like TQL and Amazon. We don\'t just sell insurance; we manage your authority.'
  },
  {
    type: 'stepper',
    title: '5 Things GEICO Doesn\'t Tell Owner-Operators',
    subtitle: 'Before you sign that generalist policy, ask these 5 forensic questions.',
    steps: [
      { title: 'The Radius Restriction', desc: 'Generalist policies often have a "Hidden Radius" of 500 miles. If you take a high-paying load across state lines, you are operating uninsured.' },
      { title: 'The Filing Delay', desc: 'Specialists file your MCS-90 and BMC-32 in minutes. Generalists often take 7-10 business days, leaving your authority in "Pending" status.' },
      { title: 'Cargo Exclusions', desc: 'Does your policy exclude "Theft from Unattended Vehicles"? GEICO often does. We provide All-Risk coverage for high-value freight.' },
      { title: 'Broker Vetting', desc: 'Will GEICO\'s certificate pass the Amazon OCR system? Most don\'t because they lack the specific "Additional Insured" formatting.' },
      { title: 'Claim Forensic Units', desc: 'When you have a wreck, you need an adjuster who understands ELD data and HOS compliance. Generalists simply don\'t have these units.' }
    ]
  },
  {
    type: 'checklist',
    title: 'The "Specialist" Advantage Checklist',
    items: [
      'Unlimited Long-Haul Operating Radius',
      'Direct EDI Filing to FMCSA & DMV',
      'Broker-Ready COI Templates (TQL, Amazon, CHR)',
      'Trailer Interchange & Non-Owned Coverage',
      'Specialized Cargo (Reefer, Flatbed, Hazmat)',
      'Safety Audit & DataQ Support included'
    ]
  },
  {
    type: 'callout',
    title: 'The "Cheap Premium" Illusion',
    content: 'A low premium from a generalist like GEICO is often an illusion. Once you add the necessary endorsements for Trailer Interchange, General Liability, and Broad-Form Cargo, the price often exceeds a specialist policy. Don\'t buy a "Cheap" policy that gets you rejected by every high-paying broker.'
  }
];
