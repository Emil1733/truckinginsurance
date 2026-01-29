import postgres from 'postgres';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load env vars
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL missing in .env.local');
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
console.log('Trying to connect to:', process.env.DATABASE_URL.replace(/:[^:]*@/, ':****@'));

async function main() {
  try {
    console.log('🔌 Connecting to Supabase...');
    
    // Read SQL files
    const tableSql = fs.readFileSync(path.join(process.cwd(), 'brokers_table.sql'), 'utf-8');
    const seedSql = fs.readFileSync(path.join(process.cwd(), 'seed_brokers.sql'), 'utf-8');

    console.log('🚧 Creating "brokers" table...');
    // Execute table creation (unsafe simply executes the raw string)
    await sql.unsafe(tableSql);
    console.log('✅ Table created.');

    console.log('🌱 Seeding data...');
    // Execute seed
    await sql.unsafe(seedSql);
    console.log('✅ Seed complete.');

  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await sql.end();
  }
}

main();
