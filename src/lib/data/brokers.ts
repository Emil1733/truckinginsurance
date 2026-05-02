import { TQL_SECTIONS, AMAZON_SECTIONS, DMV_SECTIONS, CH_ROBINSON_SECTIONS, JB_HUNT_SECTIONS, LANDSTAR_SECTIONS, SCHNEIDER_SECTIONS, UIIA_SECTIONS, GEICO_SECTIONS, BrokerRequirement, ContentSection } from './broker-content/structured-data';

export { TQL_SECTIONS, AMAZON_SECTIONS, DMV_SECTIONS, CH_ROBINSON_SECTIONS, JB_HUNT_SECTIONS, LANDSTAR_SECTIONS, SCHNEIDER_SECTIONS, UIIA_SECTIONS, GEICO_SECTIONS };
export type { BrokerRequirement, ContentSection };

export const BROKERS_DATA: BrokerRequirement[] = [
  {
    id: 'tql',
    name: 'TQL (Total Quality Logistics)',
    slug: 'tql-approval',
    logo: '/images/brokers/tql.png',
    requirements: {
      autoLiability: '$1,000,000',
      cargoInsurance: '$100,000 (Minimum)',
      generalLiability: '$1,000,000',
      reeferBreakdown: 'Required for Reefer loads',
      specialNotes: 'TQL is extremely strict about "High Risk" flags on safety scores.'
    },
    rejectionTriggers: [
      'Cargo limit under $100k',
      'Safety score alerts (SMS)',
      'Scheduled revocation pending',
      'Less than 90 days of authority'
    ],
    sections: TQL_SECTIONS,
    coiRequirements: [
      'Certificate Holder: TQL, LLC - 4289 Ivy Pointe Blvd, Cincinnati, OH 45245',
      'Auto Liability: $1,000,000 Combined Single Limit',
      'Cargo Insurance: $100,000 minimum with NO Reefer Breakdown exclusions',
      'General Liability: $1,000,000 per occurrence / $2,000,000 aggregate'
    ],
    ctaText: 'Generate TQL-Ready Quote'
  },
  {
    id: 'ch-robinson',
    name: 'C.H. Robinson',
    slug: 'ch-robinson-approval',
    logo: '/images/brokers/chr.png',
    requirements: {
      autoLiability: '$1,000,000',
      cargoInsurance: '$100,000',
      generalLiability: '$1,000,000',
      specialNotes: 'CHR requires specific Additional Insured status for their Navisphere portal.'
    },
    rejectionTriggers: [
      'Conditional safety rating',
      'Missing Primary/Non-Contributory clause',
      'Insurance agent typo in Navisphere upload',
      'Theft exclusions for high-value cargo'
    ],
    sections: CH_ROBINSON_SECTIONS,
    coiRequirements: [
      'Certificate Holder: C.H. Robinson Worldwide, Inc. - 14701 Charlson Rd, Eden Prairie, MN 55347',
      'Navisphere Sync: Exact character match for MC# and DOT',
      'Auto Liability: $1,000,000 minimum',
      'Cargo: $100,000 minimum (Broad Form)'
    ],
    ctaText: 'Get Navisphere-Ready Quote'
  },
  {
    id: 'jb-hunt',
    name: 'J.B. Hunt',
    slug: 'jb-hunt-approval',
    logo: '/images/brokers/jbh.png',
    requirements: {
      autoLiability: '$1,000,000',
      cargoInsurance: '$100,000',
      trailerInterchange: '$25,000',
      specialNotes: 'JBH requires specific "Intermodal" endorsements for rail yard access.'
    },
    rejectionTriggers: [
      'Authority under 180 days',
      'Missing Workers Comp / Occ-Acc',
      'Incorrect PO Box for Lowell, AR headquarters',
      'Missing Trailer Interchange for JBH chassis'
    ],
    sections: JB_HUNT_SECTIONS,
    coiRequirements: [
      'Certificate Holder: J.B. Hunt Transport, Inc. - 615 J.B. Hunt Corp Dr, Lowell, AR 72745',
      'Trailer Interchange: Minimum $25,000',
      'Workers Comp: Certificate or approved Occ-Acc filing',
      'Cargo: $100,000 minimum (Intermodal Form)'
    ],
    ctaText: 'Get Carrier 360-Ready Quote'
  },
  {
    id: 'landstar',
    name: 'Landstar',
    slug: 'landstar-approval',
    logo: '/images/brokers/landstar.png',
    requirements: {
      autoLiability: '$1,000,000',
      cargoInsurance: '$100,000',
      generalLiability: '$1,000,000',
      specialNotes: 'Landstar requires extreme safety compliance and pristine SMS scores.'
    },
    rejectionTriggers: [
      'Unsafe driving percentile > 65%',
      'Missing Occ-Acc with $1M benefit',
      'ELD tracking opt-out history',
      'Missing UIIA filing for port loads'
    ],
    sections: LANDSTAR_SECTIONS,
    coiRequirements: [
      'Certificate Holder: Landstar System, Inc. - 13410 Sutton Park Dr S, Jacksonville, FL 32224',
      'Primary & Non-Contributory wording',
      'Waiver of Subrogation included',
      'UIIA Endorsement (for intermodal BCOs)'
    ],
    ctaText: 'Apply for Landstar BCO Quote'
  },
  {
    id: 'schneider',
    name: 'Schneider National',
    slug: 'schneider-approval',
    logo: '/images/brokers/schneider.png',
    requirements: {
      autoLiability: '$1,000,000',
      cargoInsurance: '$100,000',
      trailerInterchange: '$50,000',
      specialNotes: 'Schneider is the primary UIIA-intermodal broker for Amazon Relay loads.'
    },
    rejectionTriggers: [
      'Missing UIIA digital certification',
      'Trailer Interchange under $50k',
      'Low internal STARS safety score',
      'Incorrect AI language for Green Bay HQ'
    ],
    sections: SCHNEIDER_SECTIONS,
    coiRequirements: [
      'Certificate Holder: Schneider National, Inc. - 3101 S Packerland Dr, Green Bay, WI 54306',
      'Trailer Interchange: Minimum $50,000',
      'UIIA Standard Form Insurance Filing',
      'Additional Insured / Waiver of Subrogation'
    ],
    ctaText: 'Get Schneider-UIIA Quote'
  }
];
