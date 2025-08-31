'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import RoomCard from "@/components/RoomCard"
import { getLastSync } from "@/lib/utils"
import { getRooms, type Room } from "@/lib/api"

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadRooms() {
      try {
        const data = await getRooms()
        setRooms(data)
      } catch (err) {
        setError("Failed to load rooms")
      } finally {
        setLoading(false)
      }
    }
    loadRooms()
  }, [])

  return (
    <main className="flex-1 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">My Rooms</h2>
        <Link href="/rooms/new" className="text-sm text-blue-500 hover:underline">
          Add Room
        </Link>
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search rooms…"
        className="mb-4 p-2 border rounded w-full"
      />

      {loading ? (
        <p>Loading rooms...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : rooms.length === 0 ? (
        <div className="mt-8 text-center">
          <p className="mb-4">No rooms yet</p>
          <Link href="/rooms/new" className="text-blue-500 underline">
            Create a room
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rooms
            .filter((r) => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((r) => (
              <Link key={r.id} href={`/rooms/${r.id}`} className="block">
                <RoomCard
                  name={r.name}
                  avgHydration={r.avgHydration}
                  tasksDue={r.tasksDue}
                />
              </Link>
            ))}
        </div>
      )}

      <footer className="text-xs text-gray-400 mt-6">Last sync: {getLastSync()}</footer>
    </main>
  )
}
