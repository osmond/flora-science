'use client'

import { StressIndexGauge, PlantHealthRadar, NutrientLevelChart, HydrationTrendChart } from '@/components/Charts'
import { calculateStressIndex } from '@/lib/plant-metrics'
import type { Plant } from './types'
import type { Weather } from '@/lib/weather'

interface AnalyticsPanelProps {
  plant: Plant
  weather: Weather | null
}

export default function AnalyticsPanel({ plant, weather }: AnalyticsPanelProps) {
  return (
    <section className="rounded-xl border p-6 shadow-sm bg-white dark:bg-gray-900 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StressIndexGauge
          value={calculateStressIndex({
            overdueDays: plant.status === 'Water overdue' ? 1 : 0,
            hydration: plant.hydration,
            temperature: weather?.temperature ?? 25,
            light: 50,
          })}
        />
        <PlantHealthRadar
          hydration={plant.hydration}
          lastFertilized={plant.lastFertilized}
          nutrientLevel={plant.nutrientLevel ?? 100}
          events={plant.events}
          status={plant.status}
          weather={weather}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NutrientLevelChart
          lastFertilized={plant.lastFertilized}
          nutrientLevel={plant.nutrientLevel ?? 100}
        />
        <HydrationTrendChart log={plant.hydrationLog ?? []} />
      </div>
    </section>
  )
}
