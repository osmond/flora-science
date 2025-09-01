'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import PlantCard from '@/components/PlantCard'
import { samplePlants } from '@/lib/plants'
import { sampleRooms, type RoomDetail } from '@/lib/rooms'

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const [room, setRoom] = useState<RoomDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRoom() {
      try {
        const res = await fetch(`/api/rooms/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setRoom(data)
        } else {
          setRoom(sampleRooms[params.id as keyof typeof sampleRooms] ?? null)
        }
      } catch {
        setRoom(sampleRooms[params.id as keyof typeof sampleRooms] ?? null)
      } finally {
        setLoading(false)
      }
    }
    loadRoom()
  }, [params.id])

  return (
    <main className="flex-1 bg-white dark:bg-gray-900">
      <div className="p-6 space-y-6">
        <Link
          href="/rooms"
          className="inline-block px-3 py-1 border rounded hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          ← Back to Rooms
        </Link>

        {loading ? (
          <p>Loading...</p>
        ) : !room ? (
          <div className="rounded-lg border p-6 dark:border-gray-700">
            <h2 className="text-xl font-bold">Room not found</h2>
            <p className="text-sm text-gray-500 mt-1">ID: {params.id}</p>
          </div>
        ) : (
          <>
            <header>
              <h1 className="text-2xl font-bold">{room.name}</h1>
              <p className="text-gray-500">Avg Hydration: {room.hydration}%</p>
              <p className="text-gray-500">{room.tasks} tasks due</p>
            </header>

            <section>
              <h2 className="font-semibold mb-2">Plants</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {room.plants.map((p) => {
                  const sample = samplePlants[p.id as keyof typeof samplePlants]
                  return (
                    <Link key={p.id} href={`/plants/${p.id}`} className="block">
                      <PlantCard
                        nickname={p.nickname}
                        species={p.species}
                        status={p.status}
                        hydration={p.hydration}
                        photo={sample?.photos[0]}
                        hydrationHistory={sample?.hydrationLog.map((h) => h.value)}
                      />
                    </Link>
                  )
                })}
              </div>
            </section>

          </>
        )}
      </div>
    </main>
  )
}
