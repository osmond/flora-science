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
import EnvRow from '@/components/EnvRow'
import ChartCard from '@/components/ChartCard'
import VitalsSummary from './VitalsSummary'
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
              <WaterBalanceChart data={waterData} />
            </ChartCard>
          </div>
        </details>
      </section>
    </>
  )
}
