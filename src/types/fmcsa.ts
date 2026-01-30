export interface FMCSABasicScore {
  basic: {
    basicsPercentile: string; // e.g. "85" or "Not Public"
    basicsStatus: string | null; // e.g. "Alert"
    basicsType: {
        basicsShortDesc: string; // e.g. "Unsafe Driving"
    };
  };
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
    basics?: { 
        basic: FMCSABasicScore[];
    };
  };
}
