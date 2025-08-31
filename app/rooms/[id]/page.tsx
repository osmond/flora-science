import Link from "next/link"
import SidebarNav from "@/components/SidebarNav"
import Header from "@/components/Header"
import PlantCard from "@/components/PlantCard"

const sampleRooms = {
  "living-room": {
    name: "Living Room",
    hydration: 72,
    tasks: 2,
    plants: [
      { id: "1", nickname: "Delilah", species: "Monstera deliciosa", status: "Water overdue", hydration: 72 },
      { id: "3", nickname: "Ivy", species: "Epipremnum aureum", status: "Due today", hydration: 70 }
    ]
  },
  "bedroom": {
    name: "Bedroom",
    hydration: 65,
    tasks: 1,
    plants: [
      { id: "2", nickname: "Sunny", species: "Sansevieria trifasciata", status: "Fine", hydration: 90 }
    ]
  },
  "office": {
    name: "Office",
    hydration: 82,
    tasks: 0,
    plants: [
      { id: "4", nickname: "Figgy", species: "Ficus lyrata", status: "Fertilize suggested", hydration: 75 }
    ]
  }
}

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const room = sampleRooms[params.id as keyof typeof sampleRooms]

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
        <SidebarNav />
      </aside>
      <main className="flex-1 bg-white dark:bg-gray-900">
        <Header />

        <div className="p-6 space-y-6">
          <Link href="/rooms" className="inline-block px-3 py-1 border rounded hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
            ← Back to Rooms
          </Link>

          {!room ? (
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
                  {room.plants.map((p) => (
                    <Link key={p.id} href={`/plants/${p.id}`} className="block">
                      <PlantCard nickname={p.nickname} species={p.species} status={p.status} hydration={p.hydration} />
                    </Link>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
