const cheerio = require('cheerio');

async function testDriveScraper() {
  // Let's test the scraper on the FMCSA SAFER Company Snapshot page
  // We use MC 123456 as a test case.
  const mcNumber = '123456';
  const url = `https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=MC_MX&query_string=${mcNumber}`;
  
  console.log(`🕵️‍♂️ Booting up Stealth Scraper...`);
  console.log(`🌐 Target: ${url}\n`);

  try {
    // 1. Fetch the raw HTML from the government server (Bypassing their API entirely)
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const html = await response.text();
    
    // 2. Load the HTML into Cheerio (Our data extraction engine)
    const $ = cheerio.load(html);

    // 3. Rip the data from the HTML structure
    // SAFER puts the Legal Name in a specific font tag near "Legal Name:"
    let legalName = "Not Found";
    $('th:contains("Legal Name:")').next('td').find('font').each((i, el) => {
      legalName = $(el).text().trim();
    });

    let physicalAddress = "Not Found";
    $('th:contains("Physical Address:")').next('td').find('font').each((i, el) => {
      physicalAddress = $(el).text().replace(/\s\s+/g, ' ').trim();
    });

    let powerUnits = "Not Found";
    $('th:contains("Power Units:")').next('td').find('font').each((i, el) => {
      powerUnits = $(el).text().trim();
    });

    console.log(`✅ Scraping Successful! We bypassed the API and ripped the raw data:`);
    console.log(`-------------------------------------------------------------------`);
    console.log(`🏢 Company Name:   ${legalName}`);
    console.log(`📍 Physical Addr:  ${physicalAddress}`);
    console.log(`🚛 Power Units:    ${powerUnits}`);
    console.log(`-------------------------------------------------------------------`);
    console.log(`\nIf this works, we can build the same scraper for the 'Daily Revocations' list!`);

  } catch (error) {
    console.error("❌ Scraper encountered an error:", error.message);
  }
}

testDriveScraper();
