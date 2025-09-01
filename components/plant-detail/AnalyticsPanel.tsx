'use client'

import { useMemo, useState } from 'react'
import {
  waterBalanceSeries,
  stressTrend,
  type WaterEvent,
  type WeatherDay,
} from '@/lib/plant-metrics'
import VitalsSummary from './VitalsSummary'
import type { Plant } from './types'
import type { Weather } from '@/lib/weather'
import EnvironmentBlock from './EnvironmentBlock'
import StressBlock from './StressBlock'
import HydrationBlock from './HydrationBlock'

const ranges = { day: 1, week: 7, month: 30 } as const


interface AnalyticsPanelProps {
  plant: Plant
  weather: Weather | null
}

export default function AnalyticsPanel({ plant, weather }: AnalyticsPanelProps) {
  const [timeframe, setTimeframe] = useState<keyof typeof ranges>('week')
  const [showEt, setShowEt] = useState(true)
  const [showWater, setShowWater] = useState(true)
  const [tab, setTab] = useState<'plant' | 'environment' | 'hydration'>('plant')

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

  const sections = [
    {
      key: 'plant' as const,
      label: 'Plant Health',
      content: (
        <StressBlock plant={plant} weather={weather} stressData={stressData} />
      ),
    },
    {
      key: 'environment' as const,
      label: 'Environment',
      content: <EnvironmentBlock env={env} envChartData={envChartData} />,
    },
    {
      key: 'hydration' as const,
      label: 'Hydration & Nutrients',
      content: (
        <HydrationBlock
          plant={plant}
          waterData={waterData}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          showEt={showEt}
          setShowEt={setShowEt}
          showWater={showWater}
          setShowWater={setShowWater}
        />
      ),
    },
  ]

  return (
    <>
      <VitalsSummary plant={plant} weather={weather} />
      <div className="mb-4 flex gap-2 md:hidden">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setTab(s.key)}
            className={`px-3 py-1 text-sm rounded ${
              tab === s.key
                ? 'bg-gray-200 dark:bg-gray-700'
                : 'bg-transparent'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <section className="rounded-xl p-6 shadow-sm bg-gray-50 dark:bg-gray-800 space-y-6">
        {sections.map((s) => (
          <div
            key={s.key}
            className={`${tab === s.key ? 'block' : 'hidden'} md:block`}
          >
            {s.content}
          </div>
        ))}
      </section>
    </>
  )
}
