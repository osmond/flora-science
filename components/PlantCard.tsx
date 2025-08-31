"use client"

type PlantCardProps = {
  nickname: string
  species: string
  status: string
  hydration: number
  note?: string
}

export default function PlantCard({
  nickname,
  species,
  status,
  hydration,
  note,
}: PlantCardProps) {
  // simple % formatting guard
  const pct = Math.max(0, Math.min(100, Math.round(hydration)))

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
        {nickname} <span className="italic text-gray-500 dark:text-gray-400">— {species}</span>
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">{status}</p>
      {note && <p className="text-xs text-gray-600 dark:text-gray-400">{note}</p>}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hydration: {pct}%</p>
    </div>
  )
}
