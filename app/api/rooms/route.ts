import { NextResponse } from 'next/server'

const sampleRooms = [
  {
    id: 'living-room',
    name: 'Living Room',
    avgHydration: 72,
    tasksDue: 2,
    tags: ['indoor', 'bright']
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    avgHydration: 65,
    tasksDue: 1,
    tags: ['indoor', 'low-light']
  },
  {
    id: 'office',
    name: 'Office',
    avgHydration: 82,
    tasksDue: 0,
    tags: ['indoor', 'workspace']
  }
]

export async function GET() {
  return NextResponse.json(sampleRooms)
}
