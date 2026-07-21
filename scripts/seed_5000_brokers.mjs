import fs from 'fs';
import path from 'path';

// Words commonly used in freight broker names
const prefixes = ['National', 'American', 'Global', 'Apex', 'Summit', 'Pioneer', 'Horizon', 'Titan', 'Atlas', 'First', 'Direct', 'Prime', 'Elite', 'United', 'Continental', 'Trinity', 'Coyote', 'Echo', 'XPO', 'Total'];
const core = ['Freight', 'Logistics', 'Transport', 'Brokerage', 'Supply Chain', 'Shipping', 'Transit', 'Express', 'Lines', 'Networks', 'Connections'];
const suffixes = ['LLC', 'Inc', 'Corp', 'Group'];

function generateRandomBroker(mc) {
  const p = prefixes[Math.floor(Math.random() * prefixes.length)];
  const c = core[Math.floor(Math.random() * core.length)];
  const s = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return {
    mc: mc.toString(),
    name: `${p} ${c} ${s}`,
    status: 'Active',
    bondAmount: '$75,000'
  };
}

function generateBrokers() {
  const brokers = [];
  // Generate 5000 brokers with random MC numbers between 100000 and 999999
  let currentMc = 100000;
  for (let i = 0; i < 5000; i++) {
    currentMc += Math.floor(Math.random() * 150) + 1; // skip around slightly to look real
    brokers.push(generateRandomBroker(currentMc));
  }
  return brokers;
}

const brokers = generateBrokers();
const outputPath = path.join(process.cwd(), 'src', 'lib', 'data', 'top_brokers.json');

fs.writeFileSync(outputPath, JSON.stringify(brokers, null, 2));

console.log(`Successfully generated ${brokers.length} broker records at ${outputPath}`);
