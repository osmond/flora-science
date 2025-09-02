'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import ChartCard from '@/components/ChartCard'
import type { Plant } from './types'
import type { WaterBalanceDatum } from '@/lib/plant-metrics'

const NutrientLevelChart = dynamic(
  () => import('@/components/Charts').then((m) => m.NutrientLevelChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)
const WaterBalanceChart = dynamic(
  () => import('@/components/Charts').then((m) => m.WaterBalanceChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)

const ranges = { day: 1, week: 7, month: 30 } as const

interface HydrationBlockProps {
  plant: Plant
  waterData: WaterBalanceDatum[]
  timeframe: keyof typeof ranges
  setTimeframe: (tf: keyof typeof ranges) => void
  showEt: boolean
  setShowEt: (v: boolean) => void
  showWater: boolean
  setShowWater: (v: boolean) => void
}

export default function HydrationBlock({
  plant,
  waterData,
  timeframe,
  setTimeframe,
  showEt,
  setShowEt,
  showWater,
  setShowWater,
}: HydrationBlockProps) {
  const [open, setOpen] = useState(false)
  return (
    <details id="hydration" open={open} aria-label="Hydration and nutrients metrics" role="region">
      <summary
        className="flex items-center gap-1 text-lg font-semibold cursor-pointer py-2 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
        onClick={() => setOpen((o) => !o)}
        tabIndex={0}
        aria-label="Show hydration and nutrients metrics"
      >
        Hydration & Nutrients
      </summary>
      <p className="text-sm text-gray-500 mb-4" aria-live="polite">
        <strong>Metrics:</strong> Nutrient levels and water balance help track plant health. ET₀ is reference evapotranspiration. Hover charts for details.
      </p>
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory md:flex-col md:overflow-visible">
        <ChartCard
          title="Nutrient Levels"
          insight={`Next feed due ${(() => {
            const d = new Date(plant.lastFertilized)
            d.setMonth(d.getMonth() + 1)
            return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
          })()}`}
          variant="secondary"
        >
          <div tabIndex={0} aria-label="Nutrient level chart. Shows nutrient status for this plant." title="Nutrient level chart. Shows nutrient status for this plant.">
            <NutrientLevelChart
              lastFertilized={plant.lastFertilized}
              nutrientLevel={plant.nutrientLevel ?? 100}
            />
          </div>
        </ChartCard>
      </div>
      <div className="mt-4 flex overflow-x-auto snap-x snap-mandatory md:flex-col md:overflow-visible">
        <ChartCard title="Water Balance" insight="ET₀ vs water" variant="secondary">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex gap-1">
              {(['day', 'week', 'month'] as (keyof typeof ranges)[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`rounded px-2 py-1 text-xs capitalize border ${
                    timeframe === tf ? 'bg-gray-200 dark:bg-gray-700' : 'bg-transparent'
                  }`}
                  aria-label={`Show ${tf} water balance`}
                >
                  {tf}
                </button>
              ))}
            </div>
            <div className="ml-auto flex gap-2 text-xs">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={showWater}
                  onChange={(e) => setShowWater(e.target.checked)}
                  aria-label="Toggle water data"
                />
                Water
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={showEt} onChange={(e) => setShowEt(e.target.checked)} aria-label="Toggle ET₀ data" />
                ET₀
              </label>
            </div>
          </div>
          <div tabIndex={0} aria-label="Water balance chart. Shows ET₀ and water applied." title="Water balance chart. Shows ET₀ and water applied.">
            <WaterBalanceChart data={waterData} showEt={showEt} showWater={showWater} />
          </div>
        </ChartCard>
      </div>
    </details>
  )
}

