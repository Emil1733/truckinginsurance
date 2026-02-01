
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function verifyPaginationLogic() {
  console.log("🔄 Testing Sitemap Pagination Logic...");

  let allRoutes = [];
  let hasMore = true;
  let page = 0;
  const pageSize = 1000;

  console.log(`   Page Size: ${pageSize}`);

  while (hasMore) {
    process.stdout.write(`   Fetching Page ${page} (Rows ${page * pageSize} to ${(page + 1) * pageSize - 1})... `);
    
    // exact logic from sitemap.ts
    const { data: routes, error } = await supabase
        .from('routes')
        .select('slug')
        .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) {
        console.error("\n❌ Error:", error.message);
        return;
    }

    if (routes && routes.length > 0) {
        console.log(`Got ${routes.length} rows.`);
        allRoutes.push(...routes);

        if (routes.length < pageSize) {
            hasMore = false; // Last page was partial, so we are done
        }
        page++;
    } else {
        console.log("0 rows. Done.");
        hasMore = false;
    }
  }

  console.log("\n📊 RESULTS:");
  console.log(`   Total Fetched: ${allRoutes.length}`);
  
  if (allRoutes.length > 1000) {
      console.log("✅ SUCCESS: Pagination broke the 1000-row limit.");
  } else {
      console.log("❌ FAIL: Still capped at 1000.");
  }
}

verifyPaginationLogic();
