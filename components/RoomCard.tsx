type RoomCardProps = {
  name: string
  avgHydration: number
  tasksDue: number
}

export default function RoomCard({ name, avgHydration, tasksDue }: RoomCardProps) {
  const pct = Math.max(0, Math.min(100, Math.round(avgHydration)))
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">Avg Hydration: {pct}%</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{tasksDue} tasks due</p>
    </div>
  )
}
