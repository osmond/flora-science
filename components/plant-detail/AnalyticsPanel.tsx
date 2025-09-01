'use client'

import dynamic from 'next/dynamic'
import { calculateStressIndex } from '@/lib/plant-metrics'
import type { Plant } from './types'
import type { Weather } from '@/lib/weather'

const StressIndexGauge = dynamic(
  () => import('@/components/Charts').then((m) => m.StressIndexGauge),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)
const PlantHealthRadar = dynamic(
  () => import('@/components/Charts').then((m) => m.PlantHealthRadar),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)
const NutrientLevelChart = dynamic(
  () => import('@/components/Charts').then((m) => m.NutrientLevelChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)
const HydrationTrendChart = dynamic(
  () => import('@/components/Charts').then((m) => m.HydrationTrendChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)

interface AnalyticsPanelProps {
  plant: Plant
  weather: Weather | null
}

export default function AnalyticsPanel({ plant, weather }: AnalyticsPanelProps) {
  return (
    <section className="rounded-xl p-6 bg-gray-50 dark:bg-gray-800 space-y-6">
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
