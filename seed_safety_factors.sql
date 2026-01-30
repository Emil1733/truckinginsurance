-- Seed Data for Vector 6: Safety Factors

insert into safety_factors (slug, factor_number, name, violation_examples, recovery_steps) values
(
  'factor-1-general',
  1,
  'General (Financial Responsibility)',
  ARRAY[
    'No Proof of Insurance on File (BFS-50)',
    'Failure to maintain Accident Register',
    'False statements in application'
  ],
  ARRAY[
    'File Form MCS-90 immediately',
    'Re-submit Accident Register for trailing 12 months',
    'Request 385.17 Safety Rating Upgrade'
  ]
),
(
  'factor-2-driver',
  2,
  'Driver Qualifications',
  ARRAY[
    'Driver operating with Suspended CDL',
    'No Medical Card in driver file',
    'Drug & Alcohol Testing program Violation'
  ],
  ARRAY[
    'Enroll in Drug & Alcohol Clearinghouse',
    'Terminate disqualified drivers',
    'Rebuild Driver Qualification (DQ) Files'
  ]
),
(
  'factor-3-operational',
  3,
  'Operational (Hours of Service)',
  ARRAY[
    '11-Hour or 14-Hour Rule Violations',
    'Falsified Logs (Critical Violation)',
    'ELD Data Transfer Failure'
  ],
  ARRAY[
    'Switch to AI-audited ELD provider',
    'Submit Corrective Action Plan (CAP) for Dispatch',
    'Show 30 days of 100% compliant logs'
  ]
),
(
  'factor-4-vehicle-maintenance',
  4,
  'Vehicle Maintenance',
  ARRAY[
    'Vehicle Out-of-Service Rate > 20.7%',
    'Using vehicle declared Out-of-Service',
    'No Annual Inspections on file'
  ],
  ARRAY[
    'Complete Level 1 DOT Inspections (Clean)',
    'Implement DVIR (Pre-trip) documentation',
    'Submit maintenance records for entire fleet'
  ]
),
(
  'factor-5-hazmat',
  5,
  'Hazardous Materials',
  ARRAY[
    'Leaking Hazmat Containers',
    'Improper Placarding',
    'No Security Plan (49 CFR 172.800)'
  ],
  ARRAY[
    'Retrain drivers (Hazmat Awareness)',
    'Update Security Plan',
    'File for Rating Upgrade with PHMSA evidence'
  ]
),
(
  'factor-6-crash-rate',
  6,
  'Accident Factor (Crash Rate)',
  ARRAY[
    'Recordable Accident Rate > 1.5 accidents/million miles',
    'Preventable DOT-recordable crashes'
  ],
  ARRAY[
    'Submit DataQ Challenges (Non-Preventable)',
    'Implement Crash Countermeasures Program',
    'Wait 12 months for rate to improve'
  ]
);
