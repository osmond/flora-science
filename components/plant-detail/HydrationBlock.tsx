'use client'

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
  return (
    <details id="hydration" open>
      <summary className="text-lg font-semibold cursor-pointer">Hydration & Nutrients</summary>
      <p className="text-sm text-gray-500 mb-4">
        Nutrient levels and water balance.
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
          <NutrientLevelChart
            lastFertilized={plant.lastFertilized}
            nutrientLevel={plant.nutrientLevel ?? 100}
          />
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
                />
                Water
              </label>
              <label className="flex items-center gap-1">
                <input type="checkbox" checked={showEt} onChange={(e) => setShowEt(e.target.checked)} />
                ET₀
              </label>
            </div>
          </div>
          <WaterBalanceChart data={waterData} showEt={showEt} showWater={showWater} />
        </ChartCard>
      </div>
    </details>
  )
}

