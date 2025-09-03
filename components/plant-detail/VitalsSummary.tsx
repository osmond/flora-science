'use client'

import dynamic from 'next/dynamic'
import { calculateStressIndex } from '@/lib/plant-metrics'
import ChartCard from '@/components/ChartCard'
import { useState } from 'react'
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
  const [showStressInfo, setShowStressInfo] = useState(false)
  const [showHydrationInfo, setShowHydrationInfo] = useState(false)

  const stressValue = Math.round(
    calculateStressIndex({
      overdueDays: plant.status === 'Water overdue' ? 1 : 0,
      hydration: plant.hydration,
      temperature: weather?.temperature ?? 25,
      light: 50,
    })
  )
  const stressLabel =
    stressValue < 30 ? 'Low' : stressValue <= 70 ? 'Moderate' : 'High'

  return (
    <div className="grid gap-6 mb-6 md:grid-cols-2" role="region" aria-label="Plant vitals summary">
      {/* Metric explanations for scientific clarity */}
      <div className="col-span-2 text-xs text-gray-500 dark:text-gray-400 mb-2" aria-live="polite">
        <span><strong>Vitals:</strong> Stress is calculated from hydration, temperature, and overdue days. Hydration trend shows weekly changes.</span>
      </div>
      <ChartCard
        title="Stress"
        insight={stressLabel}
        variant="primary"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">Stress</span>
          <button
            type="button"
            aria-label="Show scientific explanation for Stress Index"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
            tabIndex={0}
            onClick={() => setShowStressInfo((v) => !v)}
            onBlur={() => setShowStressInfo(false)}
          >
            <span aria-hidden="true" className="w-4 h-4 inline-block text-blue-500">ℹ️</span>
          </button>
        </div>
        <div tabIndex={0} aria-label={`Stress Index: ${stressValue} (${stressLabel})`} title={`Stress Index: ${stressValue} (${stressLabel})`}>
          <StressIndexGauge value={stressValue} />
        </div>
        {showStressInfo && (
          <div
            role="tooltip"
            className="mt-2 p-2 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg max-w-xs z-10"
            aria-live="polite"
          >
            <strong>Stress Index:</strong> A composite score (0-100) estimating plant stress based on hydration, temperature, and overdue watering. Lower values indicate optimal conditions; higher values suggest the plant may be under environmental or care-related stress.
          </div>
        )}
      </ChartCard>
      <ChartCard
        title="Hydration"
        insight="Hydration stable this week"
        variant="primary"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">Hydration</span>
          <button
            type="button"
            aria-label="Show scientific explanation for Hydration metric"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
            tabIndex={0}
            onClick={() => setShowHydrationInfo((v) => !v)}
            onBlur={() => setShowHydrationInfo(false)}
          >
            <span aria-hidden="true" className="w-4 h-4 inline-block text-blue-500">ℹ️</span>
          </button>
        </div>
        <div tabIndex={0} aria-label="Hydration trend chart. Shows hydration log for this plant." title="Hydration trend chart. Shows hydration log for this plant.">
          <HydrationTrendChart log={plant.hydrationLog ?? []} />
        </div>
        {showHydrationInfo && (
          <div
            role="tooltip"
            className="mt-2 p-2 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg max-w-xs z-10"
            aria-live="polite"
          >
            <strong>Hydration:</strong> Reflects the plant&apos;s water status over time. The chart shows weekly hydration changes, helping you spot trends, droughts, or overwatering. Stable hydration supports healthy growth and stress resilience.
          </div>
        )}
      </ChartCard>
    </div>
  )
}
