'use client'

import { motion } from 'framer-motion'
import { cardVariants, hover, tap, defaultTransition } from '@/lib/motion'
import Sparkline from './Sparkline'

type PlantCardProps = {
  nickname: string
  species: string
  status: string
  hydration: number
  tasksDue?: number
  note?: string
  hydrationHistory?: number[]
}

export function getHydrationProgress(hydration: number) {
  const pct = Math.max(0, Math.min(100, Math.round(hydration)))
  const barColor = pct < 30 ? 'bg-red-500' : pct < 60 ? 'bg-yellow-500' : 'bg-flora-leaf'
  return { pct, barColor }
}

export default function PlantCard({
  nickname,
  species,
  status,
  hydration,
  tasksDue = 0,
  note,
  hydrationHistory,
}: PlantCardProps) {
  const { pct, barColor } = getHydrationProgress(hydration)
  const badgeColor = tasksDue > 0 ? 'bg-red-500 text-white' : 'bg-flora-leaf text-white'

  return (
    <motion.div
      className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={hover}
      whileTap={tap}
      transition={defaultTransition}
    >
      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
        {nickname} <span className="italic text-gray-500 dark:text-gray-400">— {species}</span>
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300">{status}</p>
      {note && <p className="text-xs text-gray-600 dark:text-gray-400">{note}</p>}
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
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          Hydration: {pct}%
          {hydrationHistory && <Sparkline data={hydrationHistory} />}
        </div>
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
    </motion.div>
  )
}

