export type Room = {
  id: string
  name: string
  avgHydration: number
  tasksDue: number
  tags: string[]
}

export async function getRooms(): Promise<Room[]> {
  const res = await fetch('/api/rooms')
  if (!res.ok) {
    throw new Error('Failed to fetch rooms')
  }
  return res.json()
}
