
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

if (!process.env.DATABASE_URL) {
  console.error("❌ No DATABASE_URL found in .env.local");
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for Supabase
});

const query = `
SELECT 
    t.table_name, 
    c.column_name, 
    c.data_type, 
    c.is_nullable,
    (
        SELECT CASE WHEN relrowsecurity THEN 'ENABLED' ELSE 'DISABLED' END
        FROM pg_class pc
        JOIN pg_namespace pn ON pc.relnamespace = pn.oid
        WHERE pc.relname = t.table_name AND pn.nspname = 'public'
    ) AS rls_status
FROM 
    information_schema.tables t
JOIN 
    information_schema.columns c ON t.table_name = c.table_name
WHERE 
    t.table_schema = 'public' 
    AND t.table_type = 'BASE TABLE'
ORDER BY 
    t.table_name, 
    c.ordinal_position;
`;

async function inspect() {
  try {
    const res = await pool.query(query);
    
    console.log("| Table | Column | Type | Nullable | RLS Status |");
    console.log("|---|---|---|---|---|");
    
    res.rows.forEach(row => {
      console.log(`| **${row.table_name}** | ${row.column_name} | ${row.data_type} | ${row.is_nullable} | ${row.rls_status} |`);
    });

  } catch (err) {
    console.error("Query Error:", err);
  } finally {
    await pool.end();
  }
}

inspect();
