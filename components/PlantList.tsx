import { useMemo } from "react"
import Link from "next/link"
import PlantCard from "@/components/PlantCard"
import type { Plant } from "@/lib/plants"
import { GroupBy } from "@/lib/dashboardTypes"

interface PlantListProps {
  plants: [string, Plant][]
  groupBy: GroupBy
}

export default function PlantList({ plants, groupBy }: PlantListProps) {
  const grouped = useMemo(() => {
    if (groupBy === "none") return { All: plants }
    return plants.reduce<Record<string, [string, Plant][]>>((acc, plant) => {
      const key = groupBy === "status" ? plant[1].status : plant[1].room
      if (!acc[key]) acc[key] = []
      acc[key].push(plant)
      return acc
    }, {})
  }, [plants, groupBy])

  if (groupBy === "none") {
    return (
      <section className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" aria-label="Plant list">
        <div className="col-span-full mb-2 text-xs text-gray-500 dark:text-gray-400" aria-live="polite">
          <span><strong>Plants:</strong> Click a plant to view details. Tab to navigate. Status and hydration shown on each card.</span>
        </div>
        {plants.map(([id, p]) => {
          const s = p.status.toLowerCase()
          const tasks = {
            water: s.includes("water overdue") || (s.includes("due") && !s.includes("fertilize")) ? 1 : 0,
            fertilize: s.includes("fertilize") ? 1 : 0,
            notes: s.includes("note") ? 1 : 0,
          }
          return (
            <Link key={id} href={`/plants/${id}`} className="block" tabIndex={0} aria-label={`View details for ${p.nickname}, status: ${p.status}, hydration: ${p.hydration}%`} title={`View details for ${p.nickname}, status: ${p.status}, hydration: ${p.hydration}%`}>
              <PlantCard
                nickname={p.nickname}
                species={p.species}
                status={p.status}
                hydration={p.hydration}
                photo={p.photos[0]}
                hydrationHistory={p.hydrationLog.map((h) => h.value)}
                tasks={tasks}
                onMarkDone={() => {}}
              />
            </Link>
          )
        })}
      </section>
    )
  }

  return (
    <div className="space-y-4" aria-label="Grouped plant list">
      <div className="mb-2 text-xs text-gray-500 dark:text-gray-400" aria-live="polite">
        <span><strong>Plants:</strong> Grouped by {groupBy}. Click a plant to view details. Tab to navigate.</span>
      </div>
      {Object.entries(grouped)
        .filter(([group]) => group !== "All")
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([group, items]) => (
          <details key={group} open aria-label={`Group: ${group}`}> 
            <summary className="cursor-pointer font-semibold">
              {group} ({items.length})
            </summary>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {items.map(([id, p]) => {
                const s = p.status.toLowerCase()
                const tasks = {
                  water:
                    s.includes("water overdue") ||
                    (s.includes("due") && !s.includes("fertilize"))
                      ? 1
                      : 0,
                  fertilize: s.includes("fertilize") ? 1 : 0,
                  notes: s.includes("note") ? 1 : 0,
                }
                return (
                  <Link key={id} href={`/plants/${id}`} className="block" tabIndex={0} aria-label={`View details for ${p.nickname}, status: ${p.status}, hydration: ${p.hydration}%`} title={`View details for ${p.nickname}, status: ${p.status}, hydration: ${p.hydration}%`}>
                    <PlantCard
                      nickname={p.nickname}
                      species={p.species}
                      status={p.status}
                      hydration={p.hydration}
                      photo={p.photos[0]}
                      hydrationHistory={p.hydrationLog.map((h) => h.value)}
                      tasks={tasks}
                      onMarkDone={() => {}}
                    />
                  </Link>
                )
              })}
            </div>
          </details>
        ))}
    </div>
  )
}
