"use client"

import { motion } from 'framer-motion'
import { cardVariants, hover, tap, defaultTransition } from '@/lib/motion'

type RoomCardProps = {
  id: string
  name: string
  status: 'healthy' | 'needs_water' | 'warning'
  avgHydration: number
  tasksDue: number
  tags: string[]
  onClick?: () => void
  selected?: boolean
  onSelect?: (id: string, selected: boolean) => void
}

export default function RoomCard({
  id,
  name,
  status,
  avgHydration,
  tasksDue,
  tags,
  onClick,
  selected,
  onSelect,
}: RoomCardProps) {
  const pct = Math.max(0, Math.min(100, Math.round(avgHydration)))
  const barColor = pct < 30 ? 'bg-red-500' : pct < 60 ? 'bg-yellow-500' : 'bg-flora-leaf'
  const badgeColor = tasksDue > 0 ? 'bg-red-500 text-white' : 'bg-flora-leaf text-white'
  const statusColor =
    status === 'healthy'
      ? 'bg-green-500 text-white'
      : status === 'needs_water'
      ? 'bg-yellow-500 text-gray-800'
      : 'bg-red-500 text-white'
  return (
    <motion.div
      tabIndex={0}
      className="relative h-full flex flex-col justify-between rounded-[var(--radius-lg)] border border-gray-200 dark:border-gray-700 p-[var(--space-lg)] shadow-sm hover:shadow-lg focus-within:shadow-xl transition bg-white dark:bg-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-flora-leaf focus:ring-offset-2"
      style={{ minWidth: 260, maxWidth: 400 }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick?.()
        }
      }}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={hover}
      whileTap={tap}
      transition={defaultTransition}
    >
      <input
        type="checkbox"
        className="absolute top-2 left-2 accent-flora-leaf focus:ring-2 focus:ring-flora-leaf rounded-[var(--radius-md)]"
        checked={selected}
        onChange={(e) => onSelect?.(id, e.target.checked)}
        onClick={(e) => e.stopPropagation()}
        aria-label="Select room"
      />
      <h3 className="h3 font-semibold text-gray-900 dark:text-gray-100 leading-tight mb-1">{name}</h3>
      <span
        className={`absolute top-2 right-2 px-2 py-0.5 text-xs rounded-full capitalize ${statusColor} shadow-sm`}
      >
        {status.replace('_', ' ')}
      </span>
      {tags.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div
        className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mt-2 border border-gray-100 dark:border-gray-700"
        role="progressbar"
        aria-label={`Avg Hydration: ${pct}%`}
      >
        <div
          className={`h-2 rounded-full ${barColor} transition-all duration-300`}
          style={{ width: `${pct}%` }}
          aria-label={`Hydration bar: ${pct}%`}
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-700 dark:text-gray-300 font-medium" aria-live="polite">
          <strong>Avg Hydration:</strong> {pct}% (progress bar above)
        </p>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">Tasks</span>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColor} shadow-sm`}
            aria-label={`${tasksDue} tasks due`}
            title={`${tasksDue} tasks due`}
          >
            {tasksDue}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
