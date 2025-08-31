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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const limit = parseInt(searchParams.get('limit') ?? '10', 10)
  const start = (page - 1) * limit
  const data = sampleRooms.slice(start, start + limit)
  return NextResponse.json(data)
}
