"use client"

type RoomCardProps = {
  name: string
  avgHydration: number
  tasksDue: number
}

export default function RoomCard({ name, avgHydration, tasksDue }: RoomCardProps) {
  const pct = Math.max(0, Math.min(100, Math.round(avgHydration)))
  return (
    <div className="rounded-lg border p-4 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-gray-700">Avg Hydration: {pct}%</p>
      <p className="text-sm text-gray-500">{tasksDue} tasks due</p>
    </div>
  )
}
