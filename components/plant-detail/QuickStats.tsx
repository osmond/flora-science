'use client'

import { Droplet, Sprout, Calendar, Battery, Zap } from 'lucide-react'
import { calculateNutrientAvailability, calculateStressIndex } from '@/lib/plant-metrics'
import type { Plant } from './types'
import type { Weather } from '@/lib/weather'

interface QuickStatsProps {
  plant: Plant
  weather: Weather | null
}

export function calculateNextFeedDate(
  lastFertilized: string,
  nutrientLevel: number
) {
  const current = calculateNutrientAvailability(lastFertilized, nutrientLevel)
  const daysLeft = Math.max(0, Math.ceil((current - 30) / 2))
  const date = new Date()
  date.setDate(date.getDate() + daysLeft)
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function QuickStats({ plant, weather }: QuickStatsProps) {
  const stress = Math.round(
    calculateStressIndex({
      overdueDays: plant.status === 'Water overdue' ? 1 : 0,
      hydration: plant.hydration,
      temperature: weather?.temperature ?? 25,
      light: 50,
    })
  )
  const stressLabel =
    stress < 30 ? 'Low' : stress <= 70 ? 'Moderate' : 'High'

  const nextFeed = calculateNextFeedDate(
    plant.lastFertilized,
    plant.nutrientLevel ?? 100
  )

  const stats = [
    { icon: Droplet, label: 'Last watered', value: plant.lastWatered },
    {
      icon: Calendar,
      label: 'Next water',
      value:
        plant.recommendedWaterMl !== undefined
          ? `${plant.nextDue} · ~${plant.recommendedWaterMl} ml`
          : plant.nextDue,
      valueClass: 'text-blue-600',
    },
    {
      icon: Sprout,
      label: 'Next feed',
      value: nextFeed,
      valueClass: 'text-green-600',
    },
    { icon: Battery, label: 'Hydration', value: `${plant.hydration}%` },
    { icon: Zap, label: 'Stress', value: `${stressLabel} (${stress})` },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {stats.map(({ icon: Icon, label, value, valueClass }) => (
        <span
          key={label}
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200"
        >
          <Icon
            className={`w-4 h-4 ${valueClass ?? 'text-gray-600'}`}
          />
          <span className="font-medium">{label}:</span>
          <span className={valueClass}>{value}</span>
        </span>
      ))}
    </div>
  )
}
