import Link from "next/link"
import SidebarNav from "@/components/SidebarNav"
import Header from "@/components/Header"

const samplePlants = {
  "1": {
    nickname: "Delilah",
    species: "Monstera deliciosa",
    status: "Water overdue",
    hydration: 72,
    lastWatered: "Aug 25",
    nextDue: "Aug 30",
    events: [
      { id: 1, type: "water", date: "Aug 25" },
      { id: 2, type: "note", date: "Aug 20", note: "New leaf unfurling" }
    ],
    photos: [
      "https://placehold.co/800x400?text=Delilah",
      "https://placehold.co/300x300?text=Delilah"
    ]
  },
  "2": {
    nickname: "Sunny",
    species: "Sansevieria trifasciata",
    status: "Fine",
    hydration: 90,
    lastWatered: "Aug 27",
    nextDue: "Sep 5",
    events: [{ id: 1, type: "water", date: "Aug 27" }],
    photos: ["https://placehold.co/800x400?text=Sunny"]
  },
  "3": {
    nickname: "Ivy",
    species: "Epipremnum aureum",
    status: "Due today",
    hydration: 70,
    lastWatered: "Aug 28",
    nextDue: "Aug 29",
    events: [{ id: 1, type: "water", date: "Aug 28" }],
    photos: ["https://placehold.co/800x400?text=Ivy"]
  },
  "4": {
    nickname: "Figgy",
    species: "Ficus lyrata",
    status: "Fertilize suggested",
    hydration: 75,
    lastWatered: "Aug 23",
    nextDue: "Sep 2",
    events: [
      { id: 1, type: "fertilize", date: "Aug 15" },
      { id: 2, type: "water", date: "Aug 23" }
    ],
    photos: ["https://placehold.co/800x400?text=Figgy"]
  }
}

export default function PlantDetailPage({ params }: { params: { id: string } }) {
  const plant = samplePlants[params.id as keyof typeof samplePlants]

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
        <SidebarNav />
      </aside>
      <main className="flex-1 bg-white dark:bg-gray-900">
        <Header />

        <div className="p-6 space-y-6">
          <Link href="/" className="inline-block px-3 py-1 border rounded hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
            ← Back to Today
          </Link>

          {!plant ? (
            <div className="rounded-lg border p-6 dark:border-gray-700">
              <h2 className="text-xl font-bold">Plant not found</h2>
              <p className="text-sm text-gray-500 mt-1">ID: {params.id}</p>
            </div>
          ) : (
            <>
              <img
                src={plant.photos[0]}
                alt={plant.nickname}
                className="w-full max-h-64 object-cover rounded-lg border dark:border-gray-700"
              />
              <header>
                <h1 className="text-2xl font-bold">{plant.nickname}</h1>
                <p className="italic text-gray-500">{plant.species}</p>
              </header>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg border p-4 dark:border-gray-700">
                  <p className="font-medium">Status</p>
                  <p className="text-gray-700 dark:text-gray-300">{plant.status}</p>
                </div>
                <div className="rounded-lg border p-4 dark:border-gray-700">
                  <p className="font-medium">Hydration</p>
                  <p className="text-gray-700 dark:text-gray-300">{plant.hydration}%</p>
                </div>
                <div className="rounded-lg border p-4 dark:border-gray-700">
                  <p className="font-medium">Last Watered</p>
                  <p className="text-gray-700 dark:text-gray-300">{plant.lastWatered}</p>
                </div>
                <div className="rounded-lg border p-4 dark:border-gray-700">
                  <p className="font-medium">Next Due</p>
                  <p className="text-gray-700 dark:text-gray-300">{plant.nextDue}</p>
                </div>
              </section>

              <section>
                <h2 className="font-semibold mb-2">Timeline</h2>
                <ul className="space-y-2 text-sm">
                  {plant.events.map((e) => (
                    <li key={e.id} className="rounded border p-2 dark:border-gray-700">
                      {e.date}: {e.type === "note" ? e.note : e.type === "water" ? "Watered" : "Fertilized"}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-semibold mb-2">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {plant.photos.map((src, i) => (
                    <img key={i} src={src} alt={`${plant.nickname} photo ${i + 1}`} className="rounded-lg border dark:border-gray-700" />
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
