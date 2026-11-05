import { NextResponse } from 'next/server';

export function POST() {
  return NextResponse.json(
    { error: 'Ask the agent or insurer that services your policy for an updated certificate.', guide: '/free-coi-generator' },
    { status: 410 },
  );
}
