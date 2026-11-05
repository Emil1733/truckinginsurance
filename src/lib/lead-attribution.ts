export const attributionKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'gclid'] as const;

export function readLeadAttribution(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem('tce_attribution') || '{}') || {};
  } catch {
    return {};
  }
}

export function renewalDate(value: unknown) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return '';
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value ? '' : value;
}
