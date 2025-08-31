import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { ids } = await request.json()
  // In a real application this would delete rooms from a database
  return NextResponse.json({ success: true, deleted: ids })
}
