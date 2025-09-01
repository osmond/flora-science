'use client'

import { Droplet, Sprout, Calendar, Activity } from 'lucide-react'
import { calculateNutrientAvailability, calculateStressIndex } from '@/lib/plant-metrics'
import type { ReactNode } from 'react'
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

  const row1 = [
    { label: 'Last Watered', value: plant.lastWatered, icon: Droplet },
    {
      label: 'Next Water Due',
      value: plant.nextDue,
      icon: Calendar,
      valueClass: 'text-blue-600',
    },
    {
      label: 'Water Amount',
      value:
        plant.recommendedWaterMl !== undefined
          ? `~${plant.recommendedWaterMl} ml`
          : '—',
      icon: Droplet,
    },
  ]

  const row2 = [
    { label: 'Last Fertilized', value: plant.lastFertilized, icon: Sprout },
    {
      label: 'Next Feed',
      value: calculateNextFeedDate(
        plant.lastFertilized,
        plant.nutrientLevel ?? 100
      ),
      icon: Calendar,
      valueClass: 'text-green-600',
    },
    {
      label: 'Hydration / Stress',
      value: `${plant.hydration}% / ${stress}`,
      icon: Activity,
      color: 'text-orange-600',
    },
  ]

  function renderRow(
    items: {
      label: string
      value: ReactNode
      icon: any
      valueClass?: string
      color?: string
    }[],
  ) {
    return (
      <div className="flex divide-x divide-gray-200 dark:divide-gray-700 rounded-md overflow-hidden bg-gray-50 dark:bg-gray-800">
        {items.map(({ label, value, icon: Icon, valueClass, color }) => (
          <div key={label} className="flex-1 p-3 text-center">
            <Icon
              className={`mx-auto mb-1 h-4 w-4 text-gray-500 dark:text-gray-400 ${
                color ?? ''
              }`}
            />
            <div
              className={`text-sm font-semibold ${
                valueClass ?? 'text-gray-900 dark:text-white'
              }`}
            >
              {value}
            </div>
            <div className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              {label}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <section className="space-y-2 text-sm">
      {renderRow(row1)}
      {renderRow(row2)}
    </section>
  )
}
