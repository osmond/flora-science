'use client'

import Sparkline from '@/components/Sparkline'
import { Droplet, Sprout, Calendar, Activity } from 'lucide-react'
import { calculateNutrientAvailability, calculateStressIndex } from '@/lib/plant-metrics'
import type { Plant } from './types'
import type { Weather } from '@/lib/weather'

interface QuickStatsProps {
  plant: Plant
  weather: Weather | null
}

function calculateNextFeedDate(lastFertilized: string, nutrientLevel: number) {
  const current = calculateNutrientAvailability(lastFertilized, nutrientLevel)
  const daysLeft = Math.max(0, Math.ceil((current - 30) / 2))
  const date = new Date()
  date.setDate(date.getDate() + daysLeft)
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function QuickStats({ plant, weather }: QuickStatsProps) {
  return (
    <section className="flex flex-wrap justify-between gap-4 md:gap-6">
      {[
        { label: 'Last Watered', value: plant.lastWatered, icon: Droplet },
        {
          label: 'Next Water Due',
          value: (
            <span className="flex items-center gap-1">
              {plant.nextDue}
              {plant.recommendedWaterMl !== undefined && (
                <>
                  <span>·</span>
                  <span className="flex items-center">
                    ~
                    <span className="relative inline-flex items-center justify-center mx-1">
                      <Droplet className="h-5 w-5 text-blue-500" />
                      <span className="absolute text-[8px] font-bold text-blue-900">
                        {plant.recommendedWaterMl}
                      </span>
                    </span>
                    ml
                  </span>
                </>
              )}
            </span>
          ),
          icon: Calendar,
        },
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
          value: Math.round(
            calculateStressIndex({
              overdueDays: plant.status === 'Water overdue' ? 1 : 0,
              hydration: plant.hydration,
              temperature: weather?.temperature ?? 25,
              light: 50,
            })
          ),
          icon: Activity,
          color: 'text-orange-600',
        },
      ].map(({ label, value, icon: Icon, spark, color }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center gap-1 p-4 rounded-md bg-gray-50 dark:bg-gray-800 flex-1 min-w-[150px]"
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
