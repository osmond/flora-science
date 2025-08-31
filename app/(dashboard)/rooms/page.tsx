import Link from "next/link"
import { useState } from "react"
import RoomCard from "@/components/RoomCard"
import { getLastSync } from "@/lib/utils"

type Room = {
  id: string
  name: string
  avgHydration: number
  tasksDue: number
}

const rooms: Room[] = [
  { id: "living-room", name: "Living Room", avgHydration: 72, tasksDue: 2 },
  { id: "bedroom", name: "Bedroom", avgHydration: 65, tasksDue: 1 },
  { id: "office", name: "Office", avgHydration: 82, tasksDue: 0 },
]

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <main className="flex-1 p-6">
      <h2 className="text-xl font-bold mb-4">My Rooms</h2>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search rooms…"
        className="mb-4 p-2 border rounded w-full"
      />

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

      <footer className="text-xs text-gray-400 mt-6">Last sync: {getLastSync()}</footer>
    </main>
  )
}
