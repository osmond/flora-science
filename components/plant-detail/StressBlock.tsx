'use client'

import dynamic from 'next/dynamic'
import ChartCard from '@/components/ChartCard'
import { calculateStressIndex, type StressDatum } from '@/lib/plant-metrics'
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
const StressIndexChart = dynamic(
  () => import('@/components/Charts').then((m) => m.StressIndexChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)

interface StressBlockProps {
  plant: Plant
  weather: Weather | null
  stressData: StressDatum[]
}

export default function StressBlock({ plant, weather, stressData }: StressBlockProps) {
  return (
    <details id="plant-health" open>
      <summary className="text-lg font-semibold cursor-pointer"><span className="mr-1">⚡</span>Plant Health</summary>
      <p className="text-sm text-gray-500 mb-4">
        Stress index overview and overall health radar.
      </p>
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory md:flex-col md:overflow-visible">
        <ChartCard title="Stress Index" insight="Current plant stress level">
          <StressIndexGauge
            value={calculateStressIndex({
              overdueDays: plant.status === 'Water overdue' ? 1 : 0,
              hydration: plant.hydration,
              temperature: weather?.temperature ?? 25,
              light: 50,
            })}
          />
        </ChartCard>
        <ChartCard title="Plant Health" insight="Overall health radar">
          <PlantHealthRadar
            hydration={plant.hydration}
            lastFertilized={plant.lastFertilized}
            nutrientLevel={plant.nutrientLevel ?? 100}
            events={plant.events}
            status={plant.status}
            weather={weather}
          />
        </ChartCard>
      </div>
      <div className="mt-4 flex overflow-x-auto snap-x snap-mandatory md:flex-col md:overflow-visible">
        <ChartCard title="Stress Trend" insight="Stress index over time">
          <StressIndexChart data={stressData} />
        </ChartCard>
      </div>
    </details>
  )
}

