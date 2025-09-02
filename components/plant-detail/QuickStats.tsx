'use client'

import {
  Droplet,
  Sprout,
  Calendar,
  Activity,
  Battery,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import {
  calculateNutrientAvailability,
  calculateStressIndex,
} from '@/lib/plant-metrics'
import type { Plant } from './types'
import type { Weather } from '@/lib/weather'

interface QuickStatsProps {
  plant: Plant
  weather: Weather | null
}

export function calculateNextFeedDate(
  lastFertilized: string,
  nutrientLevel: number,
) {
  const current = calculateNutrientAvailability(lastFertilized, nutrientLevel)
  const daysLeft = Math.max(0, Math.ceil((current - 30) / 2))
  const date = new Date()
  date.setDate(date.getDate() + daysLeft)
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function QuickStats({ plant, weather }: QuickStatsProps) {
  const stressValue = Math.round(
    calculateStressIndex({
      overdueDays: plant.status === 'Water overdue' ? 1 : 0,
      hydration: plant.hydration,
      temperature: weather?.temperature ?? 25,
      light: 50,
    }),
  )

  const stressLabel =
    stressValue < 30
      ? 'Low'
      : stressValue <= 70
        ? 'Moderate'
        : 'High'

  const stats: { icon: LucideIcon; text: ReactNode }[] = [
    {
      icon: Droplet,
      text: `${plant.lastWatered} (Last watered)`,
    },
    {
      icon: Calendar,
      text: (
        <>
          {plant.nextDue}
          {plant.recommendedWaterMl !== undefined && (
            <>
              {' '}
              (<span className="data-metric">~{plant.recommendedWaterMl} ml</span>)
            </>
          )}
        </>
      ),
    },
    {
      icon: Sprout,
      text: `${calculateNextFeedDate(
        plant.lastFertilized,
        plant.nutrientLevel ?? 100,
      )} (Next feed)`,
    },
    {
      icon: Battery,
      text: (
        <>
          <span className="data-metric">{plant.hydration}%</span> Hydration
        </>
      ),
    },
    {
      icon: Activity,
      text: (
        <>
          <span className="data-metric">{stressValue}</span> Stress ({stressLabel})
        </>
      ),
    },
  ]

  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-700 dark:text-gray-200">
      {stats.map(({ icon: Icon, text }, i) => (
        <li
          key={i}
          className="flex items-center gap-1 after:content-['|'] last:after:content-[''] after:mx-2 after:text-gray-300"
        >
          <Icon className="h-4 w-4" />
          {text}
        </li>
      ))}
    </ul>
  )
}
