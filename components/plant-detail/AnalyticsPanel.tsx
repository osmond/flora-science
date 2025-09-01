'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  calculateStressIndex,
  waterBalanceSeries,
  stressTrend,
  type WaterEvent,
  type WeatherDay,
} from '@/lib/plant-metrics'
import EnvRow from '@/components/EnvRow'
import ChartCard from '@/components/ChartCard'
import VitalsSummary from './VitalsSummary'
import type { Plant } from './types'
import type { Weather } from '@/lib/weather'

const ranges = { day: 1, week: 7, month: 30 } as const

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
const WaterBalanceChart = dynamic(
  () => import('@/components/Charts').then((m) => m.WaterBalanceChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)
const StressIndexChart = dynamic(
  () => import('@/components/Charts').then((m) => m.StressIndexChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)
const TempHumidityChart = dynamic(
  () => import('@/components/Charts').then((m) => m.TempHumidityChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)
const VPDGauge = dynamic(
  () => import('@/components/Charts').then((m) => m.VPDGauge),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)

interface AnalyticsPanelProps {
  plant: Plant
  weather: Weather | null
}

export default function AnalyticsPanel({ plant, weather }: AnalyticsPanelProps) {
  const [timeframe, setTimeframe] = useState<keyof typeof ranges>('week')
  const [showEt, setShowEt] = useState(true)
  const [showWater, setShowWater] = useState(true)

  const weatherHistory = useMemo<WeatherDay[]>(() => {
    const base = {
      temperature: weather?.temperature ?? 25,
      humidity: weather?.humidity ?? 50,
      solarRadiation: weather?.solarRadiation ?? 20,
      windSpeed: weather?.windSpeed ?? 2,
    }
    const all = Array.from({ length: ranges.month }).map((_, idx) => {
      const d = new Date()
      d.setDate(d.getDate() - (ranges.month - 1 - idx))
      return { date: d.toISOString().split('T')[0], ...base }
    })
    return all.slice(-ranges[timeframe])
  }, [weather, timeframe])

  const env = useMemo(() => {
    const temperature = weather?.temperature ?? 25
    const humidity = weather?.humidity ?? 50
    const es = 0.6108 * Math.exp((17.27 * temperature) / (temperature + 237.3))
    const ea = es * (humidity / 100)
    const vpd = Number((es - ea).toFixed(2))
    return { temperature, humidity, vpd }
  }, [weather])

  const envChartData = useMemo(
    () =>
      weatherHistory.map((w) => ({
        day: new Date(w.date).toLocaleDateString(undefined, { weekday: 'short' }),
        temp: w.temperature,
        rh: w.humidity,
      })),
    [weatherHistory],
  )

  const waterEvents = useMemo<WaterEvent[]>(
    () =>
      plant.events
        .filter((e) => e.type === 'water')
        .map((e) => {
          const d = new Date(`${e.date} ${new Date().getFullYear()}`)
          return { date: d.toISOString().split('T')[0], amount: 5 }
        }),
    [plant.events],
  )

  const filteredWaterEvents = useMemo(
    () => {
      const start = weatherHistory[0]?.date
      return start ? waterEvents.filter((e) => e.date >= start) : waterEvents
    },
    [waterEvents, weatherHistory],
  )

  const waterData = useMemo(
    () => waterBalanceSeries(weatherHistory, filteredWaterEvents),
    [weatherHistory, filteredWaterEvents],
  )

  const stressData = useMemo(() => {
    const wateringInterval = 7
    const eventDates = new Set(filteredWaterEvents.map((e) => e.date))
    let cumulativeHydration = 0
    let lastWateredIdx = -Infinity
    const readings = waterData.map((d, idx) => {
      if (eventDates.has(d.date)) lastWateredIdx = idx
      cumulativeHydration = Math.max(0, cumulativeHydration + d.water - d.et0)
      const hydration = Math.min(100, cumulativeHydration)
      const daysSinceWater = idx - lastWateredIdx
      const overdueDays = Math.max(0, daysSinceWater - wateringInterval)
      const w = weatherHistory[idx]
      return {
        date: d.date,
        overdueDays,
        hydration,
        temperature: w.temperature,
        light: w.solarRadiation,
      }
    })
    return stressTrend(readings)
  }, [waterData, weatherHistory, filteredWaterEvents])

  return (
    <>
      <VitalsSummary plant={plant} weather={weather} />
      <section className="rounded-xl p-6 shadow-sm bg-gray-50 dark:bg-gray-800 space-y-6">
        <details id="environment" open>
          <summary className="text-lg font-semibold cursor-pointer">Environment</summary>
          <p className="text-sm text-gray-500 mb-4">
            Temperature, humidity, and vapor pressure deficit readings.
          </p>
          <EnvRow
            temperature={env.temperature}
            humidity={env.humidity}
            vpd={env.vpd}
            tempUnit="C"
          />
          <div className="mt-4 flex gap-6 overflow-x-auto md:flex-col md:overflow-visible">
            <ChartCard
              title="Temperature & Humidity"
              insight="Daily temperature and humidity readings."
            >
              <TempHumidityChart tempUnit="C" data={envChartData} />
            </ChartCard>
            <ChartCard title="VPD" insight="Vapor pressure deficit">
              <VPDGauge value={env.vpd} />
            </ChartCard>
          </div>
        </details>

        <details id="plant-health" open>
          <summary className="text-lg font-semibold cursor-pointer">Plant Health</summary>
          <p className="text-sm text-gray-500 mb-4">
            Stress index overview and overall health radar.
          </p>
          <div className="flex gap-6 overflow-x-auto md:flex-col md:overflow-visible">
            <ChartCard
              title="Stress Index"
              insight="Current plant stress level"
            >
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
          <div className="mt-4 flex overflow-x-auto md:flex-col md:overflow-visible">
            <ChartCard title="Stress Trend" insight="Stress index over time">
              <StressIndexChart data={stressData} />
            </ChartCard>
          </div>
        </details>

        <details id="hydration" open>
          <summary className="text-lg font-semibold cursor-pointer">Hydration & Nutrients</summary>
          <p className="text-sm text-gray-500 mb-4">
            Hydration history and nutrient levels.
          </p>
          <div className="flex gap-6 overflow-x-auto md:flex-col md:overflow-visible">
            <ChartCard
              title="Nutrient Levels"
              insight="Nutrient availability over time"
            >
              <NutrientLevelChart
                lastFertilized={plant.lastFertilized}
                nutrientLevel={plant.nutrientLevel ?? 100}
              />
            </ChartCard>
            <ChartCard title="Hydration Trend" insight="Hydration history">
              <HydrationTrendChart log={plant.hydrationLog ?? []} />
            </ChartCard>
          </div>
          <div className="mt-4 flex overflow-x-auto md:flex-col md:overflow-visible">
            <ChartCard title="Water Balance" insight="Water balance with ET0">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex gap-1">
                  {(
                    ['day', 'week', 'month'] as (keyof typeof ranges)[]
                  ).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`rounded px-2 py-1 text-xs capitalize border ${
                        timeframe === tf
                          ? 'bg-gray-200 dark:bg-gray-700'
                          : 'bg-transparent'
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
                    <input
                      type="checkbox"
                      checked={showEt}
                      onChange={(e) => setShowEt(e.target.checked)}
                    />
                    ET₀
                  </label>
                </div>
              </div>
              <WaterBalanceChart
                data={waterData}
                showEt={showEt}
                showWater={showWater}
              />
            </ChartCard>
          </div>
        </details>
      </section>
    </>
  )
}
