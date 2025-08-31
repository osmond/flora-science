import Link from "next/link"
import PlantCard from "@/components/PlantCard"
import { supabase, Plant } from "@/lib/supabase"

export default async function RoomDetailPage({ params }: { params: { id: string } }) {
  const { data: room, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", params.id)
    .single()

  const { data: plants, error: plantsError } = await supabase
    .from("plants")
    .select("*")
    .eq("room_id", params.id)

  if (error || plantsError) {
    return (
      <main className="flex-1 bg-white dark:bg-gray-900">
        <div className="p-6">
          <p className="text-red-500">Failed to load room.</p>
        </div>
      </main>
    )
  }

  if (!room) {
    return (
      <main className="flex-1 bg-white dark:bg-gray-900">
        <div className="p-6 space-y-6">
          <Link
            href="/rooms"
            className="inline-block px-3 py-1 border rounded hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            ← Back to Rooms
          </Link>
          <div className="rounded-lg border p-6 dark:border-gray-700">
            <h2 className="text-xl font-bold">Room not found</h2>
            <p className="text-sm text-gray-500 mt-1">ID: {params.id}</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 bg-white dark:bg-gray-900">
      <div className="p-6 space-y-6">
        <Link
          href="/rooms"
          className="inline-block px-3 py-1 border rounded hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          ← Back to Rooms
        </Link>

        <header>
          <h1 className="text-2xl font-bold">{room.name}</h1>
          <p className="text-gray-500">Avg Hydration: {room.avg_hydration ?? 0}%</p>
          <p className="text-gray-500">{room.tasks_due ?? 0} tasks due</p>
        </header>

        <section>
          <h2 className="font-semibold mb-2">Plants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plants && plants.length > 0 ? (
              plants.map((p: Plant) => (
                <Link key={p.id} href={`/plants/${p.id}`} className="block">
                  <PlantCard
                    nickname={p.nickname}
                    species={p.species}
                    status={p.status}
                    hydration={p.hydration}
                  />
                </Link>
              ))
            ) : (
              <p className="text-sm text-gray-500">No plants found.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
