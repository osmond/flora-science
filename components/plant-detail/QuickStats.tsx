'use client'

import Sparkline from '@/components/Sparkline'
import { Droplet, Sprout, Calendar, Activity } from 'lucide-react'
import { calculateNutrientAvailability } from '@/lib/plant-metrics'
import type { Plant } from './types'

interface QuickStatsProps {
  plant: Plant
  stressIndex: number
}

function calculateNextFeedDate(lastFertilized: string, nutrientLevel: number) {
  const current = calculateNutrientAvailability(lastFertilized, nutrientLevel)
  const daysLeft = Math.max(0, Math.ceil((current - 30) / 2))
  const date = new Date()
  date.setDate(date.getDate() + daysLeft)
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function QuickStats({ plant, stressIndex }: QuickStatsProps) {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {[
        { label: 'Last Watered', value: plant.lastWatered, icon: Droplet },
        { label: 'Next Water Due', value: plant.nextDue, icon: Calendar },
        { label: 'Last Fertilized', value: plant.lastFertilized, icon: Sprout },
        {
          label: 'Next Feed',
          value: calculateNextFeedDate(
            plant.lastFertilized,
            plant.nutrientLevel ?? 100
          ),
          icon: Calendar,
        },
        {
          label: 'Hydration',
          value: `${plant.hydration}%`,
          icon: Droplet,
          spark: plant.hydrationLog?.map((h) => h.value) ?? [],
        },
        {
          label: 'Stress Score',
          value: stressIndex,
          icon: Activity,
          color: 'text-orange-600',
        },
      ].map(({ label, value, icon: Icon, spark, color }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center gap-1 rounded-lg border p-4 bg-white shadow-sm dark:bg-gray-900 dark:border-gray-700"
        >
          <Icon className={`h-5 w-5 text-gray-500 dark:text-gray-400 ${color ?? ''}`} />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {value}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
          {spark && spark.length > 1 && <Sparkline data={spark} />}
        </div>
      ))}
    </section>
  )
}
