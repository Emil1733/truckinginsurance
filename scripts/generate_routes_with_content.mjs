/**
 * THE TRUCKING LOGIC ENGINE (Safe-Mode)
 * Generates 2,500 Route Guides using Polymorphic Logic (Variance + Data Tables).
 * Usage: node scripts/generate_routes_with_content.mjs > seed_routes_rich.sql
 */

const STATES = {
    AL: { name: 'Alabama', region: 'South', highways: ['I-65', 'I-20', 'I-10'], permits: [] },
    AZ: { name: 'Arizona', region: 'West', highways: ['I-10', 'I-40'], permits: [], terrain: 'Desert' },
    CA: { name: 'California', region: 'West', highways: ['I-5', 'I-10', 'I-80'], permits: ['MCP-65', 'CARB'], terrain: 'Varied' },
    CO: { name: 'Colorado', region: 'West', highways: ['I-70', 'I-25'], permits: ['Port of Entry'], terrain: 'Mountain' },
    FL: { name: 'Florida', region: 'South', highways: ['I-95', 'I-75', 'I-10'], permits: ['Ag Pass'], terrain: 'Tropical' },
    GA: { name: 'Georgia', region: 'South', highways: ['I-75', 'I-85', 'I-20'], permits: ['GPC'] },
    IL: { name: 'Illinois', region: 'Midwest', highways: ['I-55', 'I-80', 'I-90', 'I-57'], permits: [] },
    IN: { name: 'Indiana', region: 'Midwest', highways: ['I-65', 'I-70', 'I-80'], permits: [] },
    KY: { name: 'Kentucky', region: 'South', highways: ['I-75', 'I-65'], permits: ['KYU'] },
    NJ: { name: 'New Jersey', region: 'East', highways: ['I-95', 'I-80'], permits: ['ERC'] },
    NM: { name: 'New Mexico', region: 'West', highways: ['I-40', 'I-10'], permits: ['WDT'] },
    NY: { name: 'New York', region: 'East', highways: ['I-90', 'I-87'], permits: ['HUT'] },
    OH: { name: 'Ohio', region: 'Midwest', highways: ['I-70', 'I-80', 'I-75'], permits: ['PUCO'] },
    OR: { name: 'Oregon', region: 'West', highways: ['I-5', 'I-84'], permits: ['Weight Receipt'] },
    TX: { name: 'Texas', region: 'South', highways: ['I-10', 'I-20', 'I-35', 'I-45'], permits: ['TxDMV'] },
    // ... (Full state list would go here, simplified for this snippet to the major ones)
    // For production, ensure ALL 50 states are in the map to avoid crashes.
    PA: { name: 'Pennsylvania', region: 'East', highways: ['I-80', 'I-76'], permits: [] },
    MI: { name: 'Michigan', region: 'Midwest', highways: ['I-75', 'I-94'], permits: [] },
    NC: { name: 'North Carolina', region: 'South', highways: ['I-95', 'I-85'], permits: [] },
    VA: { name: 'Virginia', region: 'South', highways: ['I-81', 'I-95'], permits: [] },
    WA: { name: 'Washington', region: 'West', highways: ['I-5', 'I-90'], permits: [] },
    UT: { name: 'Utah', region: 'West', highways: ['I-15', 'I-80'], permits: [] },
    NV: { name: 'Nevada', region: 'West', highways: ['I-80', 'I-15'], permits: [] },
    MO: { name: 'Missouri', region: 'Midwest', highways: ['I-70', 'I-44'], permits: [] },
    TN: { name: 'Tennessee', region: 'South', highways: ['I-40', 'I-65'], permits: [] },
    SC: { name: 'South Carolina', region: 'South', highways: ['I-95', 'I-26'], permits: [] },
    LA: { name: 'Louisiana', region: 'South', highways: ['I-10', 'I-20'], permits: [] },
    OK: { name: 'Oklahoma', region: 'South', highways: ['I-40', 'I-35'], permits: [] },
    AR: { name: 'Arkansas', region: 'South', highways: ['I-40', 'I-30'], permits: [] },
    MS: { name: 'Mississippi', region: 'South', highways: ['I-55', 'I-20'], permits: [] },
    AL: { name: 'Alabama', region: 'South', highways: ['I-65', 'I-20'], permits: [] },
    WI: { name: 'Wisconsin', region: 'Midwest', highways: ['I-90', 'I-94'], permits: [] },
    MN: { name: 'Minnesota', region: 'Midwest', highways: ['I-35', 'I-94'], permits: [] },
    IA: { name: 'Iowa', region: 'Midwest', highways: ['I-80', 'I-35'], permits: [] },
    NE: { name: 'Nebraska', region: 'Midwest', highways: ['I-80'], permits: [] },
    KS: { name: 'Kansas', region: 'Midwest', highways: ['I-70', 'I-35'], permits: [] },
    ID: { name: 'Idaho', region: 'West', highways: ['I-84', 'I-15'], permits: [] },
    MT: { name: 'Montana', region: 'West', highways: ['I-90', 'I-15'], permits: [] },
    WY: { name: 'Wyoming', region: 'West', highways: ['I-80', 'I-25'], permits: [] },
    SD: { name: 'South Dakota', region: 'Midwest', highways: ['I-90', 'I-29'], permits: [] },
    ND: { name: 'North Dakota', region: 'Midwest', highways: ['I-94', 'I-29'], permits: [] }
    // Add rest as needed to prevent lookup errors.
};

// Fill in missing states with generic defaults to allow full 50x50 run
['AK','HI','CT','DE','ME','MD','MA','NH','RI','VT','WV'].forEach(code => {
    if (!STATES[code]) STATES[code] = { name: code, region: 'East', highways: ['Interstate'], permits: [] };
});

const escapeSql = (str) => str.replace(/'/g, "''");

// HELPER: Polymorphic Template Choose
const pick = (options) => options[Math.floor(Math.random() * options.length)];

function getLogicContent(originCode, destCode) {
    const oData = STATES[originCode];
    const dData = STATES[destCode];
    
    // --- VARIANCE GENERATOR ------------------
    // Intro Templates
    const t_intro = pick([
        `Whether you are running a reefer, flatbed, or dry van, the lane from **${oData.name}** to **${dData.name}** is a critical artery.`,
        `Operating between **${oData.name}** and **${dData.name}** offers consistent freight volume but requires specific compliance awareness.`,
        `Dispatching loads from **${oData.name}** into **${dData.name}**? You need to know the regulatory checkpoints before you turn the key.`,
        `For carriers hauling the **${oData.name}** to **${dData.name}** route, knowing the permit traps can save you thousands in fines.`,
        `This guide breaks down the insurance and permit requirements for the **${oData.name}** to **${dData.name}** lane.`
    ]);

    // Data Logic
    const permits = [...oData.permits, ...dData.permits];
    // Add logic for intermediates
    if ((originCode === 'TX' && destCode === 'CA') || (originCode === 'CA' && destCode === 'TX')) permits.push('New Mexico WDT');
    if ((originCode === 'IL' && destCode === 'NY') || (originCode === 'NY' && destCode === 'IL')) permits.push('Ohio PUCO', 'PA HUT');

    const permitList = [...new Set(permits)];
    const permitRow = permitList.length > 0 ? permitList.join(', ') : 'Standard IFTA';
    const costEstimate = permitList.length * 50 + 100; // Fake logic for "Cost"

    // --- SECTIONS ----------------------------
    
    // 1. DATA TABLE (Safe "Utility" Content)
    const table = `
### Route Profile
| Metric | Detail |
| :--- | :--- |
| **Origin** | ${oData.name} (${oData.region}) |
| **Destination** | ${dData.name} (${dData.region}) |
| **Primary Highways** | ${oData.highways[0]} -> ${dData.highways[0]} |
| **Key Permits** | ${permitRow} |
| **Est. Compliance Factors** | ${permitList.length + 1} Checkpoints |
    `;

    // 2. INSURANCE (Polymorphic)
    const t_insurance = pick([
        `Crossing state lines triggers federal oversight. You must have your **BMC-91X** (Public Liability) active.`,
        `As an interstate haul, this lane requires an active **MC Number** and a filed **BMC-91X**.`,
        `Brokers on this lane will check your SAFER profile for the **BMC-91X** filing before issuing a rate confirmation.`,
    ]);

    // 3. REGIONAL RISK (Polymorphic)
    let risk = "";
    if (dData.region === 'West') {
        risk = pick([
            `Be prepared for **Mountain Grades**. Ensure your brakes are adjusted.`,
            `The West Coast puts heavy emphasis on **CARB Compliance**. Check your DPF filters.`,
            `Expect strict scales at the Port of Entry.`,
        ]);
    } else if (dData.region === 'East') {
        risk = pick([
            `Toll roads are the primary profit killer here. Plan your EZ-Pass routing.`,
            `Traffic congestion in metro areas can kill your Hours of Service.`,
            `Vertical clearance issues are real in older cities. Watch your height.`,
        ]);
    } else {
        risk = pick([
            `Generally a flat run, but watch for high cross-winds.`,
            `Weather systems can move fast in this region.`,
            `Keep an eye on regional diesel spreads to optimize fueling.`,
        ]);
    }

    return `${t_intro}\n\n${table}\n\n### Insurance & Compliance\n${t_insurance}\n\n### Operational Notes\n${risk}\n\n_Note: Always verify current road conditions._`;
}

// MAIN EXECUTION
console.log(`-- SEED DATA: Polymorphic Routes`);
console.log(`\nINSERT INTO routes (slug, origin_code, destination_code, origin_name, destination_name, meta_title, status, content_markdown) VALUES`);

let output = [];
const keyList = Object.keys(STATES);

// Limit to first 100 for safety demonstration? Or Full 2500?
// User wants scale. We'll do a subset to avoid huge file overflow in testing, 
// but the script structure supports full.
// Let's output ALL for the user to pipe to file.

keyList.forEach(originCode => {
    keyList.forEach(destCode => {
        if (originCode === destCode) return;
        
        const origin = STATES[originCode];
        const dest = STATES[destCode];
        
        const slug = `${origin.name.toLowerCase().replace(/ /g, '-')}-to-${dest.name.toLowerCase().replace(/ /g, '-')}-truck-insurance`;
        const title = `${origin.name} to ${dest.name} Truck Insurance Requirements`;
        
        const markdown = getLogicContent(originCode, destCode);
        
        output.push(`(
  '${slug}', 
  '${originCode}', 
  '${destCode}', 
  '${escapeSql(origin.name)}', 
  '${escapeSql(dest.name)}', 
  '${escapeSql(title)}',
  'PUBLISHED',
  '${escapeSql(markdown)}'
)`);
    });
});

console.log(output.join(',\n') + ';');
