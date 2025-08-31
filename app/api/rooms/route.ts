import { NextResponse } from 'next/server'

const sampleRooms = [
  {
    id: 'living-room',
    name: 'Living Room',
    status: 'healthy',
    avgHydration: 72,
    tasksDue: 2,
    tags: ['indoor', 'bright']
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    status: 'needs_water',
    avgHydration: 65,
    tasksDue: 1,
    tags: ['indoor', 'low-light']
  },
  {
    id: 'office',
    name: 'Office',
    status: 'warning',
    avgHydration: 82,
    tasksDue: 0,
    tags: ['indoor', 'workspace']
  }
]

export async function GET() {
  return NextResponse.json(sampleRooms)
}
