import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY; // User needs to add this

if (!GEMINI_KEY) {
    console.error("❌ Missing .env variable: GEMINI_API_KEY");
    console.log("👉 Get one for free here: https://aistudio.google.com/app/apikey");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Fast & Efficient

// HELPER: Sleep for rate limiting
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function forgeRoute(route) {
    console.log(`\n⚡ Forging Route: ${route.origin_name} -> ${route.destination_name}`);

    // High Quality "One-Shot" Prompt
    const prompt = `
    Role: Senior Trucking Logistics Analyst.
    Task: Write a comprehensive route guide for a commercial truck driver running from **${route.origin_name}** to **${route.destination_name}**.
    
    Requirements:
    1. Identify the primary Interstate Highways used (e.g. I-10, I-80).
    2. List specific Weigh Stations or Ports of Entry to expect.
    3. Identify real seasonal weather risks for this specific geography (e.g. Snow in Rockies, Heat in Desert).
    4. Mention 1-2 specific permits required if applicable (e.g. NM WDT, NY HUT, KYU) based on the states crossed.
    
    Output Format:
    Valid Markdown. 
    Use H2 (##) for sections: "The Route", "Compliance & Permits", "Risks & Hazards".
    Tone: Professional, expert, helpful. 
    Length: ~400 words.
    Do not include "Here is the guide". Just the markdown.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const markdown = response.text();

        // Save to DB
        const { error } = await supabase
            .from('routes')
            .update({
                content_markdown: markdown,
                status: 'PUBLISHED' // Go live immediately
            })
            .eq('id', route.id);

        if (error) throw error;
        console.log("   ✅ Published to Supabase.");

    } catch (err) {
        console.error("   ❌ Error:", err.message);
        // If 429 (Rate Limit), wait longer?
        if (err.message.includes('429')) {
             console.log("      (Hit Rate Limit. Pausing for 60s...)");
             await sleep(60000);
        }
    }
}

async function main() {
    console.log("🚀 Starting Gemini Forge (Free Tier Mode)...");
    console.log("   Rate Limit: 1 request per 4.5 seconds (Safe for 15 RPM limit)");

    // Get DRAFT routes
    // We process 50 at a time to keep connection fresh
    const { data: routes, error } = await supabase
        .from('routes')
        .select('*')
        .eq('status', 'DRAFT') 
        .limit(3000); // Process remaining drafts

    if (error) {
        console.error("DB Error:", error);
        return;
    }

    if (!routes || routes.length === 0) {
        console.log("No 'DRAFT' routes found. Did you run 'seed_routes_full.sql'?");
        console.log("If you ran the 'Safe Mode' script, your routes are already 'PUBLISHED'.");
        return;
    }

    console.log(`Found ${routes.length} routes waiting for content.`);

    let count = 0;
    for (const route of routes) {
        await forgeRoute(route);
        count++;
        
        // Critical Sleep for Free Tier (15 RPM = 1 per 4s)
        // We do 4.5s to be safe
        await sleep(4500); 
    }

    console.log("✅ Batch Complete.");
}

main();
