"use server";

import { FMCSAOverview } from "@/types/fmcsa";

const FMCSA_API_KEY = process.env.FMCSA_API_KEY;
const BASE_URL = "https://mobile.fmcsa.dot.gov/qc/services/carriers";

// Mock data for testing/fallback if API fails or for demo purposes
// We use this if the API Key is invalid or rate limited during dev
const MOCK_DATA: FMCSAOverview = {
  content: {
    carrier: {
      dotNumber: "1234567",
      legalName: "BIG RIG BOB TRUCKING LLC",
      phyStreet: "123 DIESEL LN",
      phyCity: "ODESSA",
      phyState: "TX",
      allowedToOperate: "Y",
      openFines: "0",
      crashTotal: "1",
      inspectionsTotal: "12",
      safetyRating: "Conditional",
      ratingDate: "01/15/2026"
    },
    basics: {
      basic: [
        { basic: "Unsafe Driving", basicPercentile: "88", basicStatus: "Alert" },
        { basic: "Hours-of-Service Compliance", basicPercentile: "45", basicStatus: null },
        { basic: "Driver Fitness", basicPercentile: "10", basicStatus: null },
        { basic: "Controlled Substances and Alcohol", basicPercentile: "0", basicStatus: null },
        { basic: "Vehicle Maintenance", basicPercentile: "92", basicStatus: "Alert" }
      ]
    }
  }
};

export async function fetchCarrierSafety(dotNumber: string): Promise<{ success: boolean; data?: FMCSAOverview; error?: string }> {
  if (!dotNumber) return { success: false, error: "DOT Number Required" };

  try {
    // If no key (dev mode), return mock
    if (!FMCSA_API_KEY) {
        console.warn("No FMCSA_API_KEY found. Returning MOCK data.");
        return { success: true, data: MOCK_DATA };
    }

    const url = `${BASE_URL}/${dotNumber}/overview?webKey=${FMCSA_API_KEY}`;
    console.log(`Fetching FMCSA Data for DOT: ${dotNumber}`);

    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour

    if (!res.ok) {
        if (res.status === 403) return { success: false, error: "Invalid API Key or Access Denied" };
        if (res.status === 404) return { success: false, error: "DOT Number Not Found" };
        throw new Error(`API Error: ${res.status}`);
    }

    const data = await res.json();
    return { success: true, data: data };

  } catch (err) {
    console.error("FMCSA Fetch Error:", err);
    return { success: false, error: "Failed to connect to FMCSA Database." };
  }
}
