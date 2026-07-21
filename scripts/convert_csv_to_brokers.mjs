import fs from 'fs';
import path from 'path';

// This script expects a CSV file named 'real_brokers.csv' in the scripts folder
// It should have two columns (no headers needed):
// Column 1: MC Number
// Column 2: Legal Name
// Example row: 123456,TQL Logistics LLC

const csvPath = path.join(process.cwd(), 'scripts', 'real_brokers.csv');
const outputPath = path.join(process.cwd(), 'src', 'lib', 'data', 'top_brokers.json');

if (!fs.existsSync(csvPath)) {
  console.error('ERROR: Could not find real_brokers.csv in the scripts folder.');
  console.error('Please create scripts/real_brokers.csv with MC Number and Name separated by a comma.');
  process.exit(1);
}

const csvData = fs.readFileSync(csvPath, 'utf8');
const lines = csvData.split('\n').filter(line => line.trim().length > 0);

const brokers = lines.map(line => {
  // Simple CSV parsing assuming no commas in names, or just splitting by first comma
  const firstCommaIdx = line.indexOf(',');
  if (firstCommaIdx === -1) return null;
  
  const rawMc = line.substring(0, firstCommaIdx).replace(/[^0-9]/g, '');
  const name = line.substring(firstCommaIdx + 1).replace(/["\r]/g, '').trim();

  if (!rawMc || !name) return null;

  return {
    mc: rawMc,
    name: name,
    status: 'Active',
    bondAmount: '$75,000'
  };
}).filter(b => b !== null);

fs.writeFileSync(outputPath, JSON.stringify(brokers, null, 2));

console.log(`Successfully converted ${brokers.length} real brokers from CSV into ${outputPath}`);
