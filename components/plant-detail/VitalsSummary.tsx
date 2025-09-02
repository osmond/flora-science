'use client'

import dynamic from 'next/dynamic'
import { calculateStressIndex } from '@/lib/plant-metrics'
import ChartCard from '@/components/ChartCard'
import type { Plant } from './types'
import type { Weather } from '@/lib/weather'

const StressIndexGauge = dynamic(
  () => import('@/components/Charts').then((m) => m.StressIndexGauge),
  { ssr: false, loading: () => <p>Loading chart...</p> },
)
const HydrationTrendChart = dynamic(
  () => import('@/components/Charts').then((m) => m.HydrationTrendChart),
  { ssr: false, loading: () => <p>Loading chart...</p> },
)

interface VitalsSummaryProps {
  plant: Plant
  weather: Weather | null
}

export default function VitalsSummary({ plant, weather }: VitalsSummaryProps) {
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

  return (
    <div className="grid gap-6 mb-6 md:grid-cols-2" role="region" aria-label="Plant vitals summary">
      {/* Metric explanations for scientific clarity */}
      <div className="col-span-2 text-xs text-gray-500 dark:text-gray-400 mb-2" aria-live="polite">
        <span><strong>Vitals:</strong> Stress is calculated from hydration, temperature, and overdue days. Hydration trend shows weekly changes.</span>
      </div>
      <ChartCard title="Stress" insight={stressLabel} variant="primary">
        <div tabIndex={0} aria-label={`Stress Index: ${stressValue} (${stressLabel})`} title={`Stress Index: ${stressValue} (${stressLabel})`}>
          <StressIndexGauge value={stressValue} />
        </div>
      </ChartCard>
      <ChartCard title="Hydration" insight="Hydration stable this week" variant="primary">
        <div tabIndex={0} aria-label="Hydration trend chart. Shows hydration log for this plant." title="Hydration trend chart. Shows hydration log for this plant.">
          <HydrationTrendChart log={plant.hydrationLog ?? []} />
        </div>
      </ChartCard>
    </div>
  )
}
