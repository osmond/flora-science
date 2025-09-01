'use client'

import { Activity, Battery, Calendar } from 'lucide-react'
import { calculateStressIndex } from '@/lib/plant-metrics'
import type { Plant } from './types'
import type { Weather } from '@/lib/weather'

interface VitalsStripProps {
  plant: Plant
  weather: Weather | null
}

export default function VitalsStrip({ plant, weather }: VitalsStripProps) {
  const stressValue = Math.round(
    calculateStressIndex({
      overdueDays: plant.status === 'Water overdue' ? 1 : 0,
      hydration: plant.hydration,
      temperature: weather?.temperature ?? 25,
      light: 50,
    }),
  )
  const stressLabel =
    stressValue < 30 ? 'Low' : stressValue <= 70 ? 'Moderate' : 'High'

  const vitals = [
    { label: 'Stress', value: stressLabel, icon: Activity },
    { label: 'Hydration', value: `${plant.hydration}%`, icon: Battery },
    {
      label: 'Next Water',
      value: `${plant.nextDue}${plant.recommendedWaterMl !== undefined ? ` · ${plant.recommendedWaterMl}ml` : ''}`,
      icon: Calendar,
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {vitals.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
        >
          <span className="text-sm text-gray-500">{label}</span>
          <span className="flex items-center gap-1 font-medium">
            <Icon className="h-4 w-4 text-gray-400" />
            {value}
          </span>
        </div>
      ))}
    </div>
  )
}

