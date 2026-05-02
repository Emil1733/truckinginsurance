const puppeteer = require('puppeteer');

async function debugLiSite() {
  console.log("🚀 Debugging L&I Site Structure...");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  try {
    console.log("🌐 Hitting the main L&I page...");
    await page.goto('https://li-public.fmcsa.dot.gov/LIVIEW/pkg_menu.prc_menu', { waitUntil: 'networkidle2' });

    // Look for the "Continue" button form that accepts the terms of service
    // FMCSA L&I ALWAYS forces you to click "Continue" on a disclaimer page before starting a session.
    const formHtml = await page.evaluate(() => document.body.innerHTML);
    
    if (formHtml.includes('value="Continue"')) {
       console.log("✅ Disclaimer found! Submitting session agreement...");
       await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle2' }),
          page.click('input[value="Continue"]') // Click the actual continue button
       ]);
       console.log("✅ Passed disclaimer.");

       // Now navigate to the Daily Register
       console.log("🌐 Navigating to Daily Register options...");
       await page.goto('https://li-public.fmcsa.dot.gov/LIVIEW/pkg_registration.prc_option', { waitUntil: 'networkidle2' });
       
       const pageContent = await page.evaluate(() => document.body.innerText);
       console.log("📄 Page Text:", pageContent.substring(0, 200) + '...');

       const dates = await page.evaluate(() => {
          const select = document.querySelector('select[name="pv_date"]');
          if (!select) return [];
          return Array.from(select.options).map(opt => opt.value);
       });
       console.log("📅 Available Dates extracted:", dates);
    } else {
       console.log("⚠️ No disclaimer found. Are we blocked? First 500 chars of HTML:");
       console.log(formHtml.substring(0, 500));
    }

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await browser.close();
  }
}

debugLiSite();
