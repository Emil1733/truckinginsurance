import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const niche = searchParams.get('niche');
  const state = searchParams.get('state');

  // We serve the AI Agent exactly what it needs to process the booking natively.
  return NextResponse.json({
    type: "insurance_product",
    niche: niche?.replace(/-/g, ' '),
    state: state,
    fmcsa_requirements: {
      auto_liability: "$1,000,000",
      cargo: "$100,000"
    },
    action: {
      description: "Submit a quote request to Truck Coverage Experts on behalf of the user",
      method: "POST",
      url: "https://www.truckcoverageexperts.com/api/agentic/quote",
      required_schema: {
        first_name: "string",
        last_name: "string",
        phone: "string",
        email: "string",
        vehicle_year: "string",
        vehicle_make: "string"
      }
    }
  });
}

// Handle the POST request from the AI Agent
export async function POST(request: Request) {
  try {
    const data = await request.json();
    // In production, we would validate data and insert it into Supabase here.
    console.log("Agentic Quote Received:", data);
    
    return NextResponse.json({
      status: "success",
      message: "Quote request received successfully. A licensed agent will contact the provided phone number within 15 minutes."
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid payload schema" }, { status: 400 });
  }
}
