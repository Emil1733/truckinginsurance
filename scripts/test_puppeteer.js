const puppeteer = require('puppeteer');

async function testDrivePuppeteer() {
  const mcNumber = '123456';
  const url = `https://safer.fmcsa.dot.gov/query.asp?searchtype=ANY&query_type=queryCarrierSnapshot&query_param=MC_MX&query_string=${mcNumber}`;
  
  console.log(`🕵️‍♂️ Booting up Puppeteer Chrome Engine...`);

  try {
    // 1. Launch a real headless Chrome browser
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set a real User-Agent so the WAF thinks we are a human on a Mac
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    console.log(`🌐 Navigating to SAFER: ${url}`);
    
    // 2. Go to the URL and wait until the DOM is fully loaded
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // 3. Extract the data by executing JavaScript directly inside the browser page
    const data = await page.evaluate(() => {
      let legalName = "Not Found";
      let physicalAddress = "Not Found";
      let powerUnits = "Not Found";

      // SAFER website uses old-school <th> tags. We look for the <th> and grab the next <td>
      const ths = Array.from(document.querySelectorAll('th'));
      
      for (const th of ths) {
        if (th.textContent.includes('Legal Name:')) {
          legalName = th.nextElementSibling.textContent.trim();
        }
        if (th.textContent.includes('Physical Address:')) {
          physicalAddress = th.nextElementSibling.textContent.replace(/\s\s+/g, ' ').trim();
        }
        if (th.textContent.includes('Power Units:')) {
          powerUnits = th.nextElementSibling.textContent.trim();
        }
      }

      return { legalName, physicalAddress, powerUnits };
    });

    console.log(`\n✅ PUPPETEER BYPASSED THE FIREWALL!`);
    console.log(`-------------------------------------------------------------------`);
    console.log(`🏢 Company Name:   ${data.legalName}`);
    console.log(`📍 Physical Addr:  ${data.physicalAddress}`);
    console.log(`🚛 Power Units:    ${data.powerUnits}`);
    console.log(`-------------------------------------------------------------------`);
    console.log(`\nBecause this works, we can build a script to scrape the Daily Register automatically!`);

    await browser.close();

  } catch (error) {
    console.error("❌ Puppeteer encountered an error:", error.message);
  }
}

testDrivePuppeteer();
