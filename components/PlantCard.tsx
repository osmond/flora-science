"use client"

type PlantCardProps = {
  nickname: string
  species: string
  status: string
  hydration: number
}

export default function PlantCard({
  nickname,
  species,
  status,
  hydration,
}: PlantCardProps) {
  // simple % formatting guard
  const pct = Math.max(0, Math.min(100, Math.round(hydration)))

  return (
    <div className="rounded-lg border p-4 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold">
        {nickname} <span className="italic text-gray-500">— {species}</span>
      </h3>
      <p className="text-sm text-gray-700">{status}</p>
      <p className="text-xs text-gray-500 mt-1">Hydration: {pct}%</p>
    </div>
  )
}
