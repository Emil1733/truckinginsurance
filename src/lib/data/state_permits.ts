export const STATE_PERMITS: Record<string, { name: string; threshold: string; penalty: string }> = {
  // The "Weight Distance" States (The Big 4)
  'KY': { 
    name: 'KYU Number (Kentucky Weight Distance Tax)', 
    threshold: '> 59,999 lbs GVW', 
    penalty: 'Immediate OOS (Out of Service) + Fine' 
  },
  'NY': { 
    name: 'NY HUT (Highway Use Tax)', 
    threshold: '> 18,000 lbs GVW', 
    penalty: '$500 - $2,000 Fine + Impoundment Risk' 
  },
  'NM': { 
    name: 'NM WDT (Weight Distance Tax)', 
    threshold: '> 26,000 lbs GVW', 
    penalty: 'Detention at Port of Entry until filed' 
  },
  'OR': { 
    name: 'Oregon Weight Receipt / Tax Bond', 
    threshold: '> 26,000 lbs GVW', 
    penalty: '$440 Fine (Class A Violation)' 
  },
  'CT': {
    name: 'CT HUT (Connecticut Highway Use Tax)',
    threshold: '> 26,000 lbs GVW',
    penalty: 'Audits & Suspended Authority'
  }
};

export function getReciprocityAlerts(dest: string): string | null {
  const permit = STATE_PERMITS[dest];
  if (!permit) return null;
  
  return `ALERT: Trips into ${dest} trigger the ${permit.name} requirement if you exceed ${permit.threshold}. Failure to file results in ${permit.penalty}. This is SEPARATE from IFTA.`;
}
