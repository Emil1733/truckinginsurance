import { STATE_COORDINATES } from '@/lib/data/state_coordinates';

export function calculateHaversineDistance(originCode: string, destCode: string): number {
  const earthRadiusMiles = 3958.8;
  const start = STATE_COORDINATES[originCode];
  const end = STATE_COORDINATES[destCode];

  // Fallback if generic code or missing
  if (!start || !end) return 500; // Default generic distance

  const dLat = (end.lat - start.lat) * (Math.PI / 180);
  const dLon = (end.lon - start.lon) * (Math.PI / 180);
  const lat1 = start.lat * (Math.PI / 180);
  const lat2 = end.lat * (Math.PI / 180);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  // Straight line * 1.25 road factor
  return Math.round(earthRadiusMiles * c * 1.25);
}

export function calculateLogistics(miles: number) {
  const AVG_SPEED = 60; // mph (Trucks are often governed)
  const driveHours = Math.ceil(miles / AVG_SPEED);
  
  // FMCSA 395.3: 11 Hour Rule
  // 10 hour break required after 11 hours driving.
  const breaksRequired = Math.floor(driveHours / 11);
  const totalTripTimeHours = driveHours + (breaksRequired * 10);
  const days = Math.ceil(totalTripTimeHours / 24);

  return {
    driveHours,
    breaksRequired,
    totalTripTimeHours,
    days
  };
}
