import { NextResponse } from 'next/server'
import { sampleRooms } from '@/lib/rooms'

const roomList = Object.entries(sampleRooms).map(([id, room]) => ({
  id,
  name: room.name,
  status: room.status,
  avgHydration: room.hydration,
  tasksDue: room.tasks,
  tags: room.tags,
}))

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const limit = parseInt(searchParams.get('limit') ?? '10', 10)
  const start = (page - 1) * limit
  const data = roomList.slice(start, start + limit)
  return NextResponse.json(data)
}
