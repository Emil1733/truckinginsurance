export type RiskZone = 'MOUNTAIN' | 'HURRICANE' | 'RUST_BELT' | 'NORTHEAST' | 'DESERT';

export const STATE_RISKS: Record<string, { zone: RiskZone; advice: string }> = {
  // Mountain West
  'CO': { zone: 'MOUNTAIN', advice: 'Chain Laws in effect Sept-May (I-70 Corridor). 6% Grades.' },
  'UT': { zone: 'MOUNTAIN', advice: 'Steep grades parleying Canyon. Watch brake temps.' },
  'WY': { zone: 'MOUNTAIN', advice: 'Extreme wind gusts (60+ mph) on I-80. Light loads risk tipping.' },
  'MT': { zone: 'MOUNTAIN', advice: 'Black ice common on mountain passes.' },
  
  // Hurricane / South
  'FL': { zone: 'HURRICANE', advice: 'Hurricane season (Jun-Nov). High humidity affects reefer units.' },
  'LA': { zone: 'HURRICANE', advice: 'frequent flooding in low-lying parishes.' },
  'TX': { zone: 'HURRICANE', advice: 'Severe weather/Hail risks in North Texas.' },
  
  // Northeast
  'NY': { zone: 'NORTHEAST', advice: 'Low Bridges (Parkways) strictly prohibited. High Tolls.' },
  'NJ': { zone: 'NORTHEAST', advice: 'Extreme congestion I-95. No idling laws enforced.' },
  'MA': { zone: 'NORTHEAST', advice: 'Older infrastructure. routing restrictions in downtown Boston.' },

  // Desert
  'AZ': { zone: 'DESERT', advice: 'Extreme heat (110°F+) causes tire blowouts. Check pressure daily.' },
  'NV': { zone: 'DESERT', advice: 'Long stretches without fuel. Carry auxiliary water.' },
};

export function getRouteHazards(origin: string, dest: string): string[] {
  const hazards: string[] = [];
  
  if (STATE_RISKS[origin]) hazards.push(`${origin}: ${STATE_RISKS[origin].advice}`);
  if (STATE_RISKS[dest]) hazards.push(`${dest}: ${STATE_RISKS[dest].advice}`);
  
  return hazards;
}
