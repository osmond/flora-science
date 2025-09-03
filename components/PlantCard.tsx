'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
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
  if (pct < 30) {
    return { pct, colorClass: 'bg-alert-red', status: 'Low' }
  }
  if (pct <= 70) {
    return { pct, colorClass: 'bg-alert', status: 'Moderate' }
  }
  return { pct, colorClass: 'bg-water', status: 'High' }
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
  const { pct, colorClass, status: hydrationStatus } = getHydrationProgress(hydration)
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
      className="rounded-[var(--radius-lg)] border border-gray-200 dark:border-gray-700 p-[var(--space-lg)] shadow-sm hover:shadow-lg focus-within:shadow-xl transition bg-white dark:bg-gray-900"
      style={{ minWidth: 260, maxWidth: 400 }}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={hover}
      whileTap={tap}
      transition={defaultTransition}
      tabIndex={0}
    >
      {photo && (
        <Image
          src={photo}
          alt={nickname}
          width={400}
          height={128}
          className="w-full h-32 object-cover rounded-[var(--radius-md)] mb-[var(--space-sm)] border border-gray-100 dark:border-gray-800"
          priority
        />
      )}
      <div className="flex items-start justify-between mb-[var(--space-sm)]">
        <div>
          <h3 className="h3 font-bold text-gray-900 dark:text-gray-100 leading-tight mb-1">{nickname}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{species}</p>
        </div>
        <span className={`text-xs font-semibold px-[var(--space-sm)] py-[calc(var(--space-xs)/2)] rounded-full ${statusColor} shadow-sm`}>{status}</span>
      </div>
  {note && <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{note}</p>}
  <div className="flex items-center gap-[var(--space-sm)] mt-[var(--space-sm)]" aria-live="polite">
        <div
          className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden border border-gray-100 dark:border-gray-700"
          role="progressbar"
          aria-label={`${pct}% hydration`}
        >
          <div className={`h-2 ${colorClass} transition-all duration-300 hydration-bar`} style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold ml-2">{hydrationStatus}</span>
      </div>
  <div className="flex items-center justify-between mt-[var(--space-sm)]">
  <div className="text-xs text-gray-500 dark:text-gray-400 flex flex-col gap-[var(--space-xs)]">
          {hydrationHistory && <Sparkline data={hydrationHistory} />}
          <div className="flex gap-[var(--space-xs)] mt-1">
            {wateringStreak.map((w, i) => (
              <span
                key={i}
                data-testid="water-dot"
                className={`w-2 h-2 rounded-full border ${w ? 'bg-water border-water' : 'bg-gray-300 dark:bg-gray-700 border-gray-300 dark:border-gray-700'}`}
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
              className="text-xs px-[var(--space-sm)] py-[var(--space-xs)] rounded-[var(--radius-md)] bg-fertilize text-white shadow focus:outline-none focus:ring-2 focus:ring-fertilize focus:ring-offset-2 transition"
            >
              Mark done
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

