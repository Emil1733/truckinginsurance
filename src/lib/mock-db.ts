import { VIOLATIONS_DATA } from './data/violations';

export const mockDb = {
  getViolationBySlug: async (slug: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Normalize slug search (handling both exact slug or code search if needed)
    // For now, we search by code prefix or exact slug match for robustness in prototype
    const violation = VIOLATIONS_DATA.find(v => 
      v.slug === slug || 
      v.code === slug || 
      v.code === slug.replace('395.8e', '395.8(e)') // specific fix for the prototype link
    );

    return violation || null;
  },

  getAllViolations: async () => {
    return VIOLATIONS_DATA;
  }
};
