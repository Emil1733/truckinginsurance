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

export async function fetchCarrierSafety(dotNumber: string): Promise<{ success: boolean; data?: FMCSAOverview; error?: string; debugLog?: string[] }> {
  const logs: string[] = [];
  const log = (msg: string) => { console.log(msg); logs.push(msg); };

  if (!dotNumber) return { success: false, error: "DOT Number Required" };

  try {
    // ... Mock Check ...

    const url = `${BASE_URL}/${dotNumber}?webKey=${FMCSA_API_KEY}`;
    log(`Fetching Main URL: ${url.replace(FMCSA_API_KEY || '', 'HIDDEN')}`);

    // ... Fetch Logic ...
    // Replace console.log/error with 'log' wrapper in the main block if possible, 
    // or just append to logs array manually.
    
    // ... (Inside the function body)
    
    // RE-WRITING THE KEY LOGIC BLOCK FOR CLARITY:
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const res = await fetch(url, { next: { revalidate: 3600 }, signal: controller.signal });
        clearTimeout(timeoutId);

        if (!res.ok) {
            log(`Main Fetch Failed: ${res.status}`);
            // ... Error handling ...
            if (res.status === 403) return { success: false, error: "Invalid API Key (403)", debugLog: logs };
            if (res.status === 404) return { success: false, error: "DOT Not Found (404)", debugLog: logs };
            return { success: false, error: `API Error: ${res.status}`, debugLog: logs };
        }

        let data = await res.json();
        log("Main Fetch Success");

        if (!data.content.basics) {
             const basicsUrl = `${BASE_URL}/${dotNumber}/basics?webKey=${FMCSA_API_KEY}`;
             log("Data missing basics. Fetching secondary endpoint...");
             try {
                const basicsRes = await fetch(basicsUrl, { next: { revalidate: 3600 } });
                log(`Basics Status: ${basicsRes.status}`);
                
                if (basicsRes.ok) {
                    const basicsData = await basicsRes.json();
                    
                    if (basicsData.content) {
                        const content = basicsData.content;
                        log(`Basics Content Type: ${Array.isArray(content) ? 'Array' : typeof content}`);
                        
                        // CASE A: Content is the Array of Basics (Common in some endpoints)
                        if (Array.isArray(content)) {
                             data.content.basics = { basic: content };
                             log(`Merged Basics Array (Length: ${content.length})`);
                             if (content.length > 0) {
                                log(`First Item Keys: ${Object.keys(content[0]).join(', ')}`);
                                log(`First Item Sample: ${JSON.stringify(content[0])}`);
                             }
                        }
                        // CASE B: Content has nested basics object (Original Assumption)
                        else if (content.basics) {
                             data.content.basics = content.basics;
                             log("Merged Basics Object");
                        } 
                        else {
                             log("Basics content structure unrecognized");
                        }
                    }
                }
             } catch (err) {
                 log(`Basics Fetch Error: ${err}`);
             }
        } else {
            log("Basics existed in main response");
        }

        return { success: true, data: data, debugLog: logs };

    } catch (fetchErr: any) {
        // ...
        return { success: false, error: `Network Error: ${fetchErr.message}`, debugLog: logs };
    }

  } catch (err) {
    return { success: false, error: "System Error", debugLog: logs };
  }
}
