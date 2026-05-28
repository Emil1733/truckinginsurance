import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dot = searchParams.get('dot');

  if (!dot) {
    return NextResponse.json({ error: 'DOT number is required' }, { status: 400 });
  }

  try {
    // Demo Mock Data Engine (FMCSA/Scraper API integration paused)
    const carrier = {
      legalName: 'DEMO TRANSPORT LLC',
      dbaName: 'Demo Logistics',
      phyState: 'TX',
      vehicleOosRate: 24.5,
      fatalCrashes: 0,
      totalInspections: 12
    };

    // 2. Calculate Readiness Score
    let score = 100;
    const checklist: string[] = [];
    const impacts: any[] = [];

    // Basic scoring algorithm (Mocked parameters for MVP based on typical FMCSA data structure)
    const outOfServiceRate = carrier.vehicleOosRate || 0;
    const fatalCrashes = carrier.fatalCrashes || 0;
    const totalInspections = carrier.totalInspections || 0;

    if (outOfServiceRate > 20) {
      score -= 25;
      checklist.push('Reduce Vehicle Out-of-Service Rate (Currently > 20%)');
      impacts.push({ issue: 'High OOS Rate', cost: '+$2,500/yr' });
    }

    if (fatalCrashes > 0) {
      score -= 40;
      checklist.push('Severe Safety Alert: Fatal Crash on Record');
      impacts.push({ issue: 'Fatal Crash', cost: '+ High Premium Multiplier' });
    }

    if (totalInspections === 0) {
       score -= 10;
       checklist.push('No recent inspections (New Venture Risk)');
    }

    // Ensure score doesn't drop below 1
    score = Math.max(1, score);

    // 3. Mock L&I Expiration (since public L&I scraping requires complex proxying for MVP)
    const seed = parseInt(dot.slice(-3)) || 150;
    const renewalDays = (seed % 90) + 15; // Between 15 and 105 days
    const renewalDate = new Date();
    renewalDate.setDate(renewalDate.getDate() + renewalDays);

    return NextResponse.json({
      success: true,
      data: {
        dotNumber: dot,
        legalName: carrier.legalName || 'Unknown Carrier',
        dbaName: carrier.dbaName || '',
        physicalState: carrier.phyState || '',
        score,
        metrics: {
          oosRate: outOfServiceRate,
          inspections: totalInspections,
          crashes: fatalCrashes
        },
        checklist,
        impacts,
        simulatedRenewal: {
           days: renewalDays,
           date: renewalDate.toLocaleDateString(),
           carrier: 'Progressive (Estimated)'
        }
      }
    });

  } catch (error) {
    console.error('FMCSA API Error:', error);
    return NextResponse.json({ error: 'Failed to process DOT number. Please verify it is correct.' }, { status: 500 });
  }
}
