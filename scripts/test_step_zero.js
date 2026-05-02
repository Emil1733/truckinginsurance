const puppeteer = require('puppeteer');

async function testStepZero() {
  console.log("🚀 Starting Step Zero: L&I Daily Register Scraper...");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  try {
    // Navigate to the FMCSA Daily Register Search Page
    console.log("🌐 Navigating to L&I Daily Register...");
    await page.goto('https://li-public.fmcsa.dot.gov/LIVIEW/pkg_menu.prc_menu', { waitUntil: 'networkidle2' });

    // Since L&I relies on frames or specific URLs, let's directly hit the option page
    await page.goto('https://li-public.fmcsa.dot.gov/LIVIEW/pkg_registration.prc_option', { waitUntil: 'networkidle2' });

    // Let's grab the HTML to see what the form looks like
    const html = await page.content();
    if (html.includes('Daily Register')) {
        console.log("✅ Reached the Daily Register Page!");
        
        // Let's get the options in the date dropdown
        const availableDates = await page.evaluate(() => {
            const select = document.querySelector('select[name="pv_date"]');
            if (!select) return [];
            return Array.from(select.options).map(opt => opt.value);
        });

        console.log("📅 Available Dates in Dropdown:", availableDates.slice(0, 5)); // Print top 5 dates
    } else {
        console.log("⚠️ Could not find the Daily Register form. The site might be down or require a session.");
        // Sometimes you need to accept a disclaimer first on L&I
        if (html.includes('continue')) {
            console.log("⚠️ Wait, we hit a disclaimer. Trying to click continue...");
            const form = await page.$('form');
            if (form) {
                await Promise.all([
                    page.waitForNavigation({ waitUntil: 'networkidle2' }),
                    form.evaluate(form => form.submit())
                ]);
                console.log("✅ Passed the disclaimer!");
                
                // Now navigate to registration option
                await page.goto('https://li-public.fmcsa.dot.gov/LIVIEW/pkg_registration.prc_option', { waitUntil: 'networkidle2' });
                const dates = await page.evaluate(() => {
                    const select = document.querySelector('select[name="pv_date"]');
                    if (!select) return [];
                    return Array.from(select.options).map(opt => opt.value);
                });
                console.log("📅 Available Dates after disclaimer:", dates.slice(0, 5));
            }
        }
    }

  } catch (error) {
    console.error("❌ Step Zero Error:", error.message);
  } finally {
    await browser.close();
  }
}

testStepZero();
