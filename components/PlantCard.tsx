'use client'

import { motion } from 'framer-motion'
import { cardVariants, hover, tap, defaultTransition } from '@/lib/motion'
import Sparkline from './Sparkline'
import TaskIcons from './TaskIcons'

type TaskCounts = {
  water: number
  fertilize: number
  notes: number
}

type PlantCardProps = {
  nickname: string
  species: string
  status: string
  hydration: number
  tasks?: TaskCounts
  note?: string
  hydrationHistory?: number[]
  photo?: string
  onMarkDone?: () => void
}

export function getHydrationProgress(hydration: number) {
  const pct = Math.max(0, Math.min(100, Math.round(hydration)))
  const barClass =
    pct < 60
      ? 'bg-gradient-to-r from-alert to-alert-red'
      : 'bg-gradient-to-r from-fertilize to-water'
  return { pct, barClass }
}

export default function PlantCard({
  nickname,
  species,
  status,
  hydration,
  tasks = { water: 0, fertilize: 0, notes: 0 },
  note,
  hydrationHistory,
  photo,
  onMarkDone,
}: PlantCardProps) {
  const { pct, barClass } = getHydrationProgress(hydration)
  const statusColor =
    status === 'Water overdue'
      ? 'bg-alert-red text-white'
      : status === 'Due today'
      ? 'bg-alert text-gray-900'
      : status === 'Fertilize suggested'
      ? 'bg-fertilize text-white'
      : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'

  const history = hydrationHistory ?? []
  const padded = Array.from({ length: 7 }, (_, i) => history[history.length - 7 + i] ?? 0)
  const wateringStreak = padded.map((val, i) => (i > 0 ? val > padded[i - 1] : false))

  return (
    <motion.div
      className="rounded-lg border border-gray-200 dark:border-gray-700 p-[var(--space-lg)] shadow-md hover:shadow-lg transition bg-white/90 dark:bg-gray-800/90"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={hover}
      whileTap={tap}
      transition={defaultTransition}
    >
      {photo && (
        <img
          src={photo}
          alt={nickname}
          className="w-full h-32 object-cover rounded-md mb-[var(--space-sm)]"
        />
      )}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="h3 font-bold text-gray-900 dark:text-gray-100">{nickname}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{species}</p>
        </div>
        <span className={`text-xs font-semibold px-[var(--space-sm)] py-[calc(var(--space-xs)/2)] rounded-full ${statusColor}`}>{status}</span>
      </div>
      {note && <p className="text-xs text-gray-600 dark:text-gray-400">{note}</p>}
      <div
        className="w-full bg-gray-200 rounded-full h-2 mt-[var(--space-sm)] overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-2 ${barClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between mt-[var(--space-sm)]">
        <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-col gap-[var(--space-xs)]">
          {hydrationHistory && <Sparkline data={hydrationHistory} />}
          <div className="flex gap-[var(--space-xs)]">
            {wateringStreak.map((w, i) => (
              <span
                key={i}
                data-testid="water-dot"
                className={`w-2 h-2 rounded-full ${w ? 'bg-water' : 'bg-gray-300 dark:bg-gray-700'}`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-[var(--space-sm)]">
          <TaskIcons
            water={tasks.water}
            fertilize={tasks.fertilize}
            notes={tasks.notes}
          />
          {onMarkDone && (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onMarkDone()
              }}
              className="text-xs px-[var(--space-sm)] py-[var(--space-xs)] rounded bg-fertilize text-white"
            >
              Mark done
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

