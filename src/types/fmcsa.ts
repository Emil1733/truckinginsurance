export interface FMCSABasicScore {
  basic: string; // e.g. "Unsafe Driving"
  basicPercentile: string; // e.g. "85" (It comes as string)
  basicStatus: string | null; // e.g. "Alert" or null
}

export interface FMCSAOverview {
  content: {
    carrier: {
      dotNumber: string;
      legalName: string;
      phyStreet: string;
      phyCity: string;
      phyState: string;
      allowedToOperate: string; // "Y" or "N"
      openFines: string;
      crashTotal: string;
      inspectionsTotal: string;
      safetyRating: string; // "Satisfactory", "Conditional", "Unsatisfactory", "None"
      ratingDate: string;
    };
    basics: {
        basic: FMCSABasicScore[];
    };
  };
}
