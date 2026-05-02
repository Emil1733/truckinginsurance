const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function advancedStealthTest() {
  console.log("🚀 Initializing ADVANCED Stealth Mode...");

  // The L&I portal has a much stronger WAF (Akamai/Cloudflare) than the SAFER portal.
  // We must use puppeteer-extra-plugin-stealth to bypass it.
  
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--window-size=1920,1080'
    ]
  });

  const page = await browser.newPage();
  
  try {
    console.log("🌐 Attempting to breach L&I Firewall...");
    await page.goto('https://li-public.fmcsa.dot.gov/LIVIEW/pkg_menu.prc_menu', { waitUntil: 'networkidle2' });

    const html = await page.evaluate(() => document.body.innerHTML);
    
    if (html.includes('403 Forbidden')) {
      console.log("❌ Advanced Stealth FAILED. The L&I WAF is still blocking us.");
    } else {
      console.log("✅ Advanced Stealth SUCCESS! We bypassed the L&I Firewall.");
      
      if (html.includes('value="Continue"')) {
        console.log("✅ Found Disclaimer. Clicking Continue...");
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle2' }),
          page.click('input[value="Continue"]')
        ]);
        
        console.log("🌐 Navigating to Daily Register...");
        await page.goto('https://li-public.fmcsa.dot.gov/LIVIEW/pkg_registration.prc_option', { waitUntil: 'networkidle2' });
        
        const dates = await page.evaluate(() => {
          const select = document.querySelector('select[name="pv_date"]');
          if (!select) return [];
          return Array.from(select.options).map(opt => opt.value);
        });
        
        console.log("📅 SUCCESS! Extracted the following target dates from the government dropdown:");
        console.log(dates.slice(0, 5));
      }
    }

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await browser.close();
  }
}

advancedStealthTest();
