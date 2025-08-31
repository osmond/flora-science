export type Room = {
  id: string
  name: string
  status: 'healthy' | 'needs_water' | 'warning'
  avgHydration: number
  tasksDue: number
  tags: string[]
}

export async function getRooms(page = 1, limit = 10): Promise<Room[]> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })
  const res = await fetch(`/api/rooms?${params.toString()}`)
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
