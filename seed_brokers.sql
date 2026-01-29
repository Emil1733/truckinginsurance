-- Seed Data for Vector 5 Brokers

insert into brokers (slug, name, min_auto_liability, min_cargo_limit, min_trailer_interchange, denial_reasons, compliance_checklist) values
(
  'amazon-relay',
  'Amazon Relay',
  1000000,
  100000,
  50000,
  ARRAY[
    'Rejected: Insurance policy limits too low',
    'Rejected: "Certificate Holder" does not match Amazon address',
    'Rejected: Typo in Company Name (Must match FMCSA exactly)',
    'Rejected: Policy active for less than 30 days'
  ],
  ARRAY[
    'Increase Auto Liability to $1,000,000',
    'Add Trailer Interchange ($50,000)',
    'List "Amazon.com Services LLC" as Certificate Holder',
    'Ensure Cargo coverage is Broad Form (No exclusions)'
  ]
),
(
  'ch-robinson',
  'C.H. Robinson',
  1000000,
  100000,
  0,
  ARRAY[
    'Denied: Carrier "Risk Rating" too high',
    'Denied: Conditional Safety Rating',
    'Denied: New Authority (Less than 90 days active)'
  ],
  ARRAY[
    'Request a "Risk Assessment Review"',
    'Bind "High Risk" General Liability policy',
    'Provide 3 references from other brokers'
  ]
),
(
  'tql',
  'TQL (Total Quality Logistics)',
  1000000,
  100000,
  0,
  ARRAY[
    'Denied: Missing "Reefer Breakdown" endorsement',
    'Denied: Safety Rating is not "Satisfactory"',
    'Denied: Auto policy has "Scheduled Autos" only (Needs "Any Auto")'
  ],
  ARRAY[
    'Add "Reefer Breakdown" Endorsement',
    'Upgrade Auto Policy to "Any Auto" symbol',
    'Submit proof of 6 months clean inspections'
  ]
),
(
  'coyote-logistics',
  'Coyote Logistics',
  1000000,
  100000,
  0,
  ARRAY[
    'Denied: Authority age < 30 days',
    'Denied: Cargo policy excludes "Electronics" or "High Value"',
    'Denied: Double Brokering suspicion'
  ],
  ARRAY[
    'Wait 30 days or provide "New Authority" override letter',
    'Remove Cargo Exclusions for Electronics',
    'Verify direct carrier status (No dispatch services)'
  ]
),
(
  'landstar',
  'Landstar',
  1000000,
  100000,
  0,
  ARRAY[
    'Denied: Inspection failure rate > 20%',
    'Denied: Any gap in insurance coverage last 12 months',
    'Denied: Conditional Safety Rating'
  ],
  ARRAY[
    'Fix Safety Rating (Request DataQ)',
    'Bind Continuous Coverage policy (No gaps)',
    'Submit to 3rd party vetting (RMIS)'
  ]
);
