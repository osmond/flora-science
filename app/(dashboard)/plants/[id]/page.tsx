import Link from "next/link"

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
    <main className="flex-1 bg-white dark:bg-gray-900">
      <div className="p-13 space-y-13">
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
            <section className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <img
                src={plant.photos[0]}
                alt={plant.nickname}
                className="w-full md:w-1/2 rounded-xl border object-cover max-h-72"
              />
              <div className="space-y-2 md:w-1/2 text-center md:text-left">
                <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">{plant.nickname}</h1>
                <p className="italic text-gray-500">{plant.species}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 text-sm">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">{plant.status}</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">Hydration: {plant.hydration}%</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last watered: <strong>{plant.lastWatered}</strong> · Next due: <strong>{plant.nextDue}</strong>
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Status", value: plant.status },
                { label: "Hydration", value: `${plant.hydration}%` },
                { label: "Last Watered", value: plant.lastWatered },
                { label: "Next Due", value: plant.nextDue }
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">{value}</p>
                </div>
              ))}
            </section>

            <section>
              <h2 className="text-lg font-heading font-semibold mb-13">Timeline</h2>
              <ul className="space-y-2">
                {plant.events.map((e) => (
                  <li
                    key={e.id}
                    className="flex items-start gap-3 rounded-lg border p-3 bg-white dark:bg-gray-900 dark:border-gray-700"
                  >
                    <span className="w-16 text-xs font-medium text-gray-500">{e.date}</span>
                    <span className="text-sm">
                      {e.type === "note"
                        ? "📝 " + (e as any).note
                        : e.type === "water"
                        ? "💧 Watered"
                        : "🌿 Fertilized"}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-semibold mb-13">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {plant.photos.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${plant.nickname} photo ${i + 1}`}
                    className="rounded-lg border object-cover aspect-square transition-transform duration-300 hover:scale-105 dark:border-gray-700"
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  )
}
