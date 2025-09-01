import { NextResponse } from 'next/server'
import { sampleRooms } from '@/lib/rooms'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const room = sampleRooms[params.id as keyof typeof sampleRooms]
  if (!room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 })
  }
  return NextResponse.json(room)
}
