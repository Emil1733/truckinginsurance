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
        { 
            basic: {
                basicsType: { basicsShortDesc: "Unsafe Driving" },
                basicsPercentile: "88",
                basicsStatus: "Alert"
            }
        },
        { 
            basic: {
                basicsType: { basicsShortDesc: "Hours-of-Service Compliance" },
                basicsPercentile: "45",
                basicsStatus: null
            }
        },
        { 
            basic: {
                basicsType: { basicsShortDesc: "Driver Fitness" },
                basicsPercentile: "10",
                basicsStatus: null
            }
        },
        { 
            basic: {
                basicsType: { basicsShortDesc: "Controlled Substances and Alcohol" },
                basicsPercentile: "0",
                basicsStatus: null
            }
        },
        { 
            basic: {
                basicsType: { basicsShortDesc: "Vehicle Maintenance" },
                basicsPercentile: "92",
                basicsStatus: "Alert"
            }
        }
      ]
    }
  }
};

export async function fetchCarrierSafety(dotNumber: string): Promise<{ success: boolean; data?: FMCSAOverview; error?: string }> {
  // Simple console log wrapper for server-side debugging if needed
  const log = (msg: string) => console.log(`[FMCSA] ${msg}`);

  if (!dotNumber) return { success: false, error: "DOT Number Required" };

  // DEMO MODE: Force return mock data if user enters "DEMO" or specific test ID
  if (dotNumber === "DEMO" || dotNumber === "000000") {
      log("Using DEMO MODE Data");
      return { success: true, data: MOCK_DATA };
  }

  try {

    const url = `${BASE_URL}/${dotNumber}?webKey=${FMCSA_API_KEY}`;
    log(`Fetching Main URL: ${url.replace(FMCSA_API_KEY || '', 'HIDDEN')}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const res = await fetch(url, { next: { revalidate: 3600 }, signal: controller.signal });
        clearTimeout(timeoutId);

        if (!res.ok) {
            log(`Main Fetch Failed: ${res.status}`);
            if (res.status === 403) return { success: false, error: "Invalid API Key (403)" };
            if (res.status === 404) return { success: false, error: "DOT Not Found (404)" };
            return { success: false, error: `API Error: ${res.status}` };
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
                        
                        // CASE A: Content is the Array of Basics (Common in some endpoints)
                        if (Array.isArray(content)) {
                             data.content.basics = { basic: content };
                             log(`Merged Basics Array (Length: ${content.length})`);
                        }
                        // CASE B: Content has nested basics object (Original Assumption)
                        else if (content.basics) {
                             data.content.basics = content.basics;
                             log("Merged Basics Object");
                        } 
                    }
                }
             } catch (err) {
                 log(`Basics Fetch Error: ${err}`);
             }
        }

        return { success: true, data: data };

    } catch (fetchErr: any) {
        return { success: false, error: `Network Error: ${fetchErr.message}` };
    }

  } catch (err) {
    return { success: false, error: "System Error" };
  }
}
