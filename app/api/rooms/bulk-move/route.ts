import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { ids, destination } = await request.json()
  // In a real application this would move rooms to a new location
  return NextResponse.json({ success: true, moved: ids, destination })
}
