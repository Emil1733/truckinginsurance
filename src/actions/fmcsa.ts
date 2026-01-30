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

    const url = `${BASE_URL}/${dotNumber}?webKey=${FMCSA_API_KEY}`;
    console.log(`Fetching FMCSA Data for DOT: ${dotNumber} (Timeout 8s)`);

    // Add 8 second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const res = await fetch(url, { 
            next: { revalidate: 3600 },
            signal: controller.signal 
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
            console.error("FMCSA API Error Status:", res.status);
            if (res.status === 403) return { success: false, error: "Invalid API Key or Access Denied (403)" };
            if (res.status === 404) return { success: false, error: "DOT Number Not Found (404)" };
            const text = await res.text();
            console.error("FMCSA Error Body:", text);
            return { success: false, error: `API Error: ${res.status}` };
        }

        let data = await res.json();

        // 2. Fetch BASICs (Safety Scores) if missing
        // The root endpoint often excludes them, requiring a second call.
        if (!data.content.basics) {
             console.log("Fetching BASICs separately...");
             const basicsUrl = `${BASE_URL}/${dotNumber}/basics?webKey=${FMCSA_API_KEY}`;
             try {
                const basicsRes = await fetch(basicsUrl, { next: { revalidate: 3600 } });
                if (basicsRes.ok) {
                    const basicsData = await basicsRes.json();
                    // Merge it into the main object
                    // API usually returns { content: { basics: { basic: [...] } } }
                    if (basicsData.content && basicsData.content.basics) {
                        data.content.basics = basicsData.content.basics;
                    }
                } else {
                    console.warn("Failed to fetch BASICs:", basicsRes.status);
                }
             } catch (err) {
                 console.error("Error fetching BASICs:", err);
             }
        }

        return { success: true, data: data };

    } catch (fetchErr: any) {
        clearTimeout(timeoutId);
        console.error("FMCSA Fetch Exception:", fetchErr);
        if (fetchErr.name === 'AbortError') {
            return { success: false, error: "Connection Timeout (8s). FMCSA API is slow or blocked." };
        }
        return { success: false, error: `Network Error: ${fetchErr.message}` };
    }

  } catch (err) {
    console.error("FMCSA Fetch Error:", err);
    return { success: false, error: "Failed to connect to FMCSA Database." };
  }
}
