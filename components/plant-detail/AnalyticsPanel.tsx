'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import {
  calculateStressIndex,
  waterBalanceSeries,
  stressTrend,
  type WaterEvent,
  type WeatherDay,
} from '@/lib/plant-metrics'
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
const WaterBalanceChart = dynamic(
  () => import('@/components/Charts').then((m) => m.WaterBalanceChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)
const StressIndexChart = dynamic(
  () => import('@/components/Charts').then((m) => m.StressIndexChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)

interface AnalyticsPanelProps {
  plant: Plant
  weather: Weather | null
}

export default function AnalyticsPanel({ plant, weather }: AnalyticsPanelProps) {
  const weatherHistory = useMemo<WeatherDay[]>(() => {
    const base = {
      temperature: weather?.temperature ?? 25,
      humidity: weather?.humidity ?? 50,
      solarRadiation: weather?.solarRadiation ?? 20,
      windSpeed: weather?.windSpeed ?? 2,
    }
    return Array.from({ length: 7 }).map((_, idx) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - idx))
      return { date: d.toISOString().split('T')[0], ...base }
    })
  }, [weather])

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

  const waterData = useMemo(
    () => waterBalanceSeries(weatherHistory, waterEvents),
    [weatherHistory, waterEvents],
  )

  const stressData = useMemo(() => {
    const wateringInterval = 7
    const eventDates = new Set(waterEvents.map((e) => e.date))
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
  }, [waterData, weatherHistory, waterEvents])

  return (
    <section className="rounded-xl p-6 shadow-sm bg-gray-50 dark:bg-gray-800 space-y-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WaterBalanceChart data={waterData} />
        <StressIndexChart data={stressData} />
      </div>
    </section>
  )
}
