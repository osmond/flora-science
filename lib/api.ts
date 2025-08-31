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

export async function deleteRooms(ids: string[]) {
  const res = await fetch('/api/rooms/bulk-delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  })
  if (!res.ok) {
    throw new Error('Failed to delete rooms')
  }
  return res.json()
}

export async function moveRooms(ids: string[]) {
  const res = await fetch('/api/rooms/bulk-move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  })
  if (!res.ok) {
    throw new Error('Failed to move rooms')
  }
  return res.json()
}
