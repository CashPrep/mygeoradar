import { NextResponse } from 'next/server'
// Scheduled email sending removed.
export async function GET() {
  return NextResponse.json({ removed: true }, { status: 410 })
}
