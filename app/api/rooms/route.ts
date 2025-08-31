import { NextResponse } from 'next/server'

const sampleRooms = [
  { id: 'living-room', name: 'Living Room', avgHydration: 72, tasksDue: 2 },
  { id: 'bedroom', name: 'Bedroom', avgHydration: 65, tasksDue: 1 },
  { id: 'office', name: 'Office', avgHydration: 82, tasksDue: 0 }
]

export async function GET() {
  return NextResponse.json(sampleRooms)
}
