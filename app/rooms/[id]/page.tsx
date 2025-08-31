import Link from "next/link"
import SidebarNav from "@/components/SidebarNav"
import Header from "@/components/Header"

const sampleRooms = {
  "living-room": { name: "Living Room", hydration: 72, tasks: 2 },
  "bedroom": { name: "Bedroom", hydration: 65, tasks: 1 },
  "office": { name: "Office", hydration: 82, tasks: 0 },
}

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const room = sampleRooms[params.id as keyof typeof sampleRooms]

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r bg-gray-50">
        <SidebarNav />
      </aside>
      <main className="flex-1">
        <Header />

        <div className="p-6 space-y-4">
          <Link href="/rooms" className="inline-block px-3 py-1 border rounded hover:bg-gray-50">
            ← Back to Rooms
          </Link>

          {!room ? (
            <div className="rounded-lg border p-6">
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

              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <p className="font-medium">Recent Activity</p>
                  <p className="text-gray-700">Watered two plants yesterday</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="font-medium">Environment</p>
                  <p className="text-gray-700">North window · Bright indirect</p>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
