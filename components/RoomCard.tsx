type RoomCardProps = {
  name: string
  avgHydration: number
  tasksDue: number
  tags: string[]
}

export default function RoomCard({ name, avgHydration, tasksDue, tags }: RoomCardProps) {
  const pct = Math.max(0, Math.min(100, Math.round(avgHydration)))
  const barColor = pct < 30 ? 'bg-red-500' : pct < 60 ? 'bg-yellow-500' : 'bg-flora-leaf'
  const badgeColor = tasksDue > 0 ? 'bg-red-500 text-white' : 'bg-flora-leaf text-white'
  return (
    <div className="h-full flex flex-col justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800">
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
      {tags.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div
        className="w-full bg-gray-200 rounded-full h-2 mt-2"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-2 rounded-full ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm text-gray-700 dark:text-gray-300">Avg Hydration: {pct}%</p>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">Tasks</span>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}
            aria-label={`${tasksDue} tasks due`}
          >
            {tasksDue}
          </span>
        </div>
      </div>
    </div>
  )
}
