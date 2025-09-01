'use client'

import {
  Droplet,
  Sprout,
  Calendar,
  Activity,
  Battery,
} from 'lucide-react'
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

  const stats = [
    {
      icon: Droplet,
      text: `Last watered: ${plant.lastWatered}`,
    },
    {
      icon: Calendar,
      text: `Next water: ${plant.nextDue}${
        plant.recommendedWaterMl !== undefined
          ? ` (~${plant.recommendedWaterMl} ml)`
          : ''
      }`,
    },
    {
      icon: Sprout,
      text: `Next feed: ${calculateNextFeedDate(
        plant.lastFertilized,
        plant.nutrientLevel ?? 100,
      )}`,
    },
    {
      icon: Battery,
      text: `Hydration: ${plant.hydration}%`,
    },
    {
      icon: Activity,
      text: `Stress: ${stressLabel} (${stressValue})`,
    },
  ]

  return (
    <ul className="flex flex-wrap gap-2 text-sm">
      {stats.map(({ icon: Icon, text }) => (
        <li
          key={text}
          className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800"
        >
          <Icon className="h-4 w-4" />
          {text}
        </li>
      ))}
    </ul>
  )
}
