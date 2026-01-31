import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables (from root .env)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') }); 
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Fallback

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY || !OPENAI_KEY) {
  console.error("❌ Missing .env variables. Need: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (or ANON), OPENAI_API_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const openai = new OpenAI({ apiKey: OPENAI_KEY });

async function forgeRoute(route) {
    console.log(`\n🔨 Forging Route: ${route.origin_name} -> ${route.destination_name} (${route.slug})`);

    // STEP 1: RESEARCH (The Scout)
    console.log("   - Scouting (Researching Highways/Weigh Stations)...");
    const researchPrompt = `
    You are a Senior Logistics Analyst. Analyze the commercial trucking route from ${route.origin_name} to ${route.destination_name}.
    Return a valid JSON object with detailed facts. format:
    {
        "highways": ["I-10 W", "I-20 E"], 
        "weigh_stations": ["Name of major coop/scale", "Name 2"],
        "weather_risks": "Description of seasonal risks (Ice, Heat, Wind)",
        "terrain_challenges": "Description of grades, mountains, or flatlands",
        "mileage": "Approximate commercial mileage"
    }
    `;

    const researchCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Cost effective for basic facts
        messages: [{ role: "user", content: researchPrompt }],
        response_format: { type: "json_object" }
    });
    
    const facts = JSON.parse(researchCompletion.choices[0].message.content);
    console.log(`     -> Found: ${facts.highways.join(', ')} / ${facts.mileage}`);

    // STEP 2: WRITE (The Author)
    console.log("   - Writing (Generating Editorial Content)...");
    const writingPrompt = `
    You are a Veteran Trucking Dispatcher. Write a "Lanes Guide" for drivers running ${route.origin_name} to ${route.destination_name}.
    
    Use these FACTS absolutely:
    ${JSON.stringify(facts)}

    Tone: Professional, Direct, "Insider". No fluff.
    Structure: Markdown (H2, H3).
    
    Sections:
    1. **The Run**: Overview of the route, highways used, and difficulty.
    2. **Regulatory Checkpoints**: Mention the weigh stations and specific state permits needed (e.g. if entering CA, mention MCP-65. If entering NY, mention HUT).
    3. **Weather & Terrain**: Practical advice for the driver based on the researched risks.
    4. **Profitability**: Why drivers run this lane (e.g. Produce season, Industrial freight).

    Output ONLY the markdown body. Do not include title or "Here is the article".
    `;

    const writingCompletion = await openai.chat.completions.create({
        model: "gpt-4o", // Premium model for writing quality
        messages: [{ role: "user", content: writingPrompt }],
    });

    const markdown = writingCompletion.choices[0].message.content;

    // STEP 3: SAVE (The Database)
    console.log("   - Saving to Supabase...");
    const { error } = await supabase
        .from('routes')
        .update({
            content_markdown: markdown,
            ai_context: facts,
            status: 'PUBLISHED',
            updated_at: new Date()
        })
        .eq('id', route.id);

    if (error) {
        console.error("❌ DB Insert Failed:", error);
    } else {
        console.log("✅ Published!");
    }
}

async function main() {
    // 1. Get DRAFT routes
    // Limit to 1 for safety unless batch flag is passed (not implemented yet for safety)
    const LIMIT = 1; 
    console.log(`🔎 Finding up to ${LIMIT} 'DRAFT' route to forge...`);
    
    const { data: routes, error } = await supabase
        .from('routes')
        .select('*')
        .eq('status', 'DRAFT')
        .limit(LIMIT);

    if (error) {
        console.error("DB Error:", error);
        return;
    }

    if (!routes || routes.length === 0) {
        console.log("No DRAFT routes found. Run the seed script first?");
        return;
    }

    console.log(`Found ${routes.length} routes. Starting Forge.`);

    for (const route of routes) {
        await forgeRoute(route);
    }
}

main();
