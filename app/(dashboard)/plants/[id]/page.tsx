import Link from "next/link"
import { supabase, Plant, CareEvent } from "@/lib/supabase"

export default async function PlantDetailPage({ params }: { params: { id: string } }) {
  const { data: plant, error } = await supabase
    .from("plants")
    .select("*")
    .eq("id", params.id)
    .single()

  const { data: events, error: eventsError } = await supabase
    .from("care_events")
    .select("*")
    .eq("plant_id", params.id)

  if (error || eventsError) {
    return (
      <main className="flex-1 bg-white dark:bg-gray-900">
        <div className="p-6">
          <p className="text-red-500">Failed to load plant.</p>
        </div>
      </main>
    )
  }

  if (!plant) {
    return (
      <main className="flex-1 bg-white dark:bg-gray-900">
        <div className="p-6 space-y-6">
          <Link
            href="/"
            className="inline-block px-3 py-1 border rounded hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            ← Back to Today
          </Link>
          <div className="rounded-lg border p-6 dark:border-gray-700">
            <h2 className="text-xl font-bold">Plant not found</h2>
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
          href="/"
          className="inline-block px-3 py-1 border rounded hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          ← Back to Today
        </Link>

        <section className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {plant.photos && plant.photos.length > 0 && (
            <img
              src={plant.photos[0]}
              alt={plant.nickname}
              className="w-full md:w-1/2 rounded-xl border object-cover max-h-72"
            />
          )}
          <div className="space-y-2 md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{plant.nickname}</h1>
            <p className="italic text-gray-500">{plant.species}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 text-sm">
              {plant.status && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                  {plant.status}
                </span>
              )}
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                Hydration: {plant.hydration}%
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last watered: <strong>{plant.last_watered ?? "?"}</strong> · Next due: <strong>{plant.next_due ?? "?"}</strong>
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Status", value: plant.status },
            { label: "Hydration", value: `${plant.hydration}%` },
            { label: "Last Watered", value: plant.last_watered ?? "?" },
            { label: "Next Due", value: plant.next_due ?? "?" }
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
          <h2 className="text-lg font-semibold mb-3">Timeline</h2>
          <ul className="space-y-2">
            {events && events.length > 0 ? (
              events.map((e: CareEvent) => (
                <li
                  key={e.id}
                  className="flex items-start gap-3 rounded-lg border p-3 bg-white dark:bg-gray-900 dark:border-gray-700"
                >
                  <span className="w-16 text-xs font-medium text-gray-500">{e.date}</span>
                  <span className="text-sm">
                    {e.type === "note"
                      ? `📝 ${e.note ?? ""}`
                      : e.type === "water"
                      ? "💧 Watered"
                      : "🌿 Fertilized"}
                  </span>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No events recorded.</p>
            )}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {plant.photos && plant.photos.length > 0 ? (
              plant.photos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${plant.nickname} photo ${i + 1}`}
                  className="rounded-lg border object-cover aspect-square transition-transform duration-300 hover:scale-105 dark:border-gray-700"
                />
              ))
            ) : (
              <p className="text-sm text-gray-500">No photos.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
