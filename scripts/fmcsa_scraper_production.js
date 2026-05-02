const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// -------------------------------------------------------------------------
// STEP 1: The Data Extraction Engine
// -------------------------------------------------------------------------
async function scrapeCarrierProfile(browser, mcNumber) {
  const url = `https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=MC_MX&query_string=${mcNumber}`;
  const page = await browser.newPage();
  
  try {
    // Stealth mode User-Agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Extract all the juicy data Google loves
    const data = await page.evaluate(() => {
      // Helper function to find the data next to a specific label
      const extractField = (labelText) => {
        const elements = Array.from(document.querySelectorAll('th, td.field-label, font.field-label, a'));
        const labelEl = elements.find(el => el.textContent && el.textContent.includes(labelText));
        
        if (labelEl) {
          // Go up to the table row and find the next table cell
          const tr = labelEl.closest('tr');
          if (tr) {
            // Find the td that contains the actual value
            const tds = tr.querySelectorAll('td.field-data, td > font.field-data');
            // If the label is in a TH, the data is usually in the first TD
            if (labelEl.tagName.toLowerCase() === 'th') {
              const nextTd = labelEl.nextElementSibling;
              if (nextTd) return nextTd.textContent.replace(/\s\s+/g, ' ').trim();
            } else if (tds.length > 0) {
                // Heuristic: just grab the text of the row and remove the label
                return tr.textContent.replace(labelEl.textContent, '').replace(/\s\s+/g, ' ').trim();
            }
            
            // Fallback for old SAFER HTML:
            const nextNode = labelEl.parentElement.nextElementSibling;
            if (nextNode) return nextNode.textContent.replace(/\s\s+/g, ' ').trim();
          }
        }
        return "Not Available";
      };

      // SAFER specific extraction logic
      const getTextByLabelRegex = (regex) => {
          const ths = Array.from(document.querySelectorAll('th'));
          const th = ths.find(th => regex.test(th.textContent));
          if(th && th.nextElementSibling) {
              return th.nextElementSibling.textContent.replace(/\s\s+/g, ' ').trim();
          }
          return "Not Available";
      };

      return {
        legalName: getTextByLabelRegex(/Legal Name:/i),
        usdot: getTextByLabelRegex(/USDOT Number:/i),
        physicalAddress: getTextByLabelRegex(/Physical Address:/i),
        powerUnits: getTextByLabelRegex(/Power Units:/i),
        drivers: getTextByLabelRegex(/Drivers:/i),
        mcs150Date: getTextByLabelRegex(/MCS-150 Form Date:/i),
      };
    });

    await page.close();
    return data;

  } catch (error) {
    console.error(`❌ Failed to scrape MC-${mcNumber}:`, error.message);
    await page.close();
    return null;
  }
}

// -------------------------------------------------------------------------
// STEP 2: The Main Automation Loop
// -------------------------------------------------------------------------
async function runProductionScraper() {
  console.log("🚀 INITIALIZING PRODUCTION PUPPETEER ENGINE...\n");

  // In production, Step 0 would be scraping the L&I site for the "Daily Revocations List".
  // For this test run, we simulate finding 2 companies that were just revoked today.
  const targetRevocations = [
    { mc_number: '123456', violation_reason: 'Cancellation of BIPD / Form E' },
    { mc_number: '987654', violation_reason: 'Failure to Maintain BOC-3' }
  ];

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  let successCount = 0;

  for (const target of targetRevocations) {
    console.log(`📡 Ripping full FMCSA profile for MC-${target.mc_number}...`);
    
    // Execute the Two-Step Rip
    const profile = await scrapeCarrierProfile(browser, target.mc_number);
    
    if (profile && profile.legalName !== "Not Available") {
      console.log(`   ✅ Bypassed WAF. Data Extracted:`);
      console.log(`      🏢 ${profile.legalName}`);
      console.log(`      📍 ${profile.physicalAddress}`);
      console.log(`      🚛 ${profile.powerUnits} Trucks | ${profile.drivers} Drivers`);

      // Calculate the 14-day shutdown window
      const shutdownDate = new Date();
      shutdownDate.setDate(shutdownDate.getDate() + 14);

      // Clean up the city/state from the physical address string
      const addressParts = profile.physicalAddress.split(',');
      const city = addressParts[0] || 'Unknown';
      const stateZip = addressParts[1] ? addressParts[1].trim().split(' ')[0] : 'XX';

      // 💾 Save to Supabase (This triggers the Next.js site to build the page)
      console.log(`   💾 Injecting directly into Production Database...`);
      const { error } = await supabaseAdmin
        .from('fmcsa_revocations')
        .insert([
          {
            mc_number: target.mc_number,
            usdot_number: profile.usdot !== "Not Available" ? profile.usdot : null,
            company_name: profile.legalName,
            scheduled_revocation_date: shutdownDate.toISOString(),
            violation_reason: target.violation_reason,
            status: 'PENDING',
            address_city: city,
            address_state: stateZip,
            power_units: parseInt(profile.powerUnits) || 1,
            drivers: parseInt(profile.drivers) || 1,
            cargo_type: 'General Freight'
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          console.log(`   ⚠️ MC-${target.mc_number} is already active on the site.`);
        } else {
          console.error(`   ❌ Database Error:`, error.message);
        }
      } else {
        console.log(`   🌟 SUCCESS: Trap page for ${profile.legalName} is now LIVE on Google!\n`);
        successCount++;
      }
    } else {
       console.log(`   ⚠️ Could not extract data for MC-${target.mc_number}. They may not exist in SAFER.\n`);
    }

    // Pause for 2 seconds between scrapes to avoid triggering rate limits
    await new Promise(r => setTimeout(r, 2000));
  }

  await browser.close();
  console.log(`🏁 OPERATION COMPLETE. ${successCount} new high-intent SEO pages generated.`);
}

runProductionScraper();
