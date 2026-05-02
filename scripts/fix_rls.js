const { Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function fixRLS() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    console.log("Connected to DB, fixing RLS...");
    
    await client.query(`
      -- Enable RLS just in case it's off and being blocked by default policies
      ALTER TABLE fmcsa_revocations ENABLE ROW LEVEL SECURITY;
      
      -- Drop the policy if it exists to avoid errors
      DROP POLICY IF EXISTS "Allow public read access" ON fmcsa_revocations;
      
      -- Create a policy that allows anyone to read the table
      CREATE POLICY "Allow public read access" ON fmcsa_revocations FOR SELECT USING (true);
    `);
    
    console.log("✅ RLS Policy added! Public can now read the table.");
  } catch (error) {
    console.error("Error fixing RLS:", error);
  } finally {
    await client.end();
  }
}

fixRLS();
