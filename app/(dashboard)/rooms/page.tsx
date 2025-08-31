import Link from "next/link"
import RoomCard from "@/components/RoomCard"
import { supabase, Room } from "@/lib/supabase"

export default async function RoomsPage() {
  const { data: rooms, error } = await supabase.from("rooms").select("*")

  if (error) {
    return (
      <main className="flex-1 p-6">
        <p className="text-red-500">Failed to load rooms: {error.message}</p>
      </main>
    )
  }

  if (!rooms) {
    return (
      <main className="flex-1 p-6">
        <p>Loading...</p>
      </main>
    )
  }

  return (
    <main className="flex-1 p-6">
      <h2 className="text-xl font-bold mb-4">My Rooms</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rooms.map((r: Room) => (
          <Link key={r.id} href={`/rooms/${r.id}`} className="block">
            <RoomCard
              name={r.name}
              avgHydration={r.avg_hydration || 0}
              tasksDue={r.tasks_due || 0}
            />
          </Link>
        ))}
      </div>

      <footer className="text-xs text-gray-400 mt-6">Last sync: 10:32 AM CDT</footer>
    </main>
  )
}
