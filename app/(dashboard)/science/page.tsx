"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { useRouter, useSearchParams } from "next/navigation"

const TempHumidityChart = dynamic(
  () => import("@/components/Charts").then((m) => m.TempHumidityChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)
const VPDGauge = dynamic(
  () => import("@/components/Charts").then((m) => m.VPDGauge),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)
const WaterBalanceChart = dynamic(
  () => import("@/components/Charts").then((m) => m.WaterBalanceChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)
const StressIndexGauge = dynamic(
  () => import("@/components/Charts").then((m) => m.StressIndexGauge),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)
const StressIndexChart = dynamic(
  () => import("@/components/Charts").then((m) => m.StressIndexChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)
const TaskCompletionChart = dynamic(
  () => import("@/components/Charts").then((m) => m.TaskCompletionChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)
const ComparativeChart = dynamic(
  () => import("@/components/Charts").then((m) => m.ComparativeChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)
import {
  waterBalanceSeries,
  WeatherDay,
  WaterEvent,
  stressTrend,
  collectPlantMetrics,
} from "@/lib/plant-metrics"
import { CareEvent } from "@/lib/seasonal-trends"
import EnvRow from "@/components/EnvRow"
import Footer from "@/components/Footer"
import { samplePlants } from "@/lib/plants"

export default function SciencePanel() {
  const readings = { temperature: 75, humidity: 52, vpd: 1.2 }
  const [tempUnit, setTempUnit] = useState<"F" | "C">("F")
  const [wateringInterval, setWateringInterval] = useState(7)

  const weather: WeatherDay[] = [
    {
      date: "2024-08-21",
      temperature: 24,
      humidity: 55,
      solarRadiation: 18,
      windSpeed: 2,
    },
    {
      date: "2024-08-22",
      temperature: 25,
      humidity: 50,
      solarRadiation: 20,
      windSpeed: 1.8,
    },
    {
      date: "2024-08-23",
      temperature: 26,
      humidity: 48,
      solarRadiation: 19,
      windSpeed: 2.1,
    },
    {
      date: "2024-08-24",
      temperature: 27,
      humidity: 45,
      solarRadiation: 21,
      windSpeed: 2.4,
    },
    {
      date: "2024-08-25",
      temperature: 25,
      humidity: 50,
      solarRadiation: 17,
      windSpeed: 1.9,
    },
    {
      date: "2024-08-26",
      temperature: 24,
      humidity: 52,
      solarRadiation: 16,
      windSpeed: 1.5,
    },
    {
      date: "2024-08-27",
      temperature: 23,
      humidity: 55,
      solarRadiation: 15,
      windSpeed: 1.7,
    },
  ]
  const simulatedEvents: WaterEvent[] = weather
    .filter((_, idx) => idx % wateringInterval === 0)
    .map((day) => ({ date: day.date, amount: 5 }))

  const waterData = waterBalanceSeries(weather, simulatedEvents)

  const eventDates = new Set(simulatedEvents.map((e) => e.date))
  let cumulativeHydration = 0
  let lastWateredIndex = 0
  const stressReadings = waterData.map((d, idx) => {
    if (eventDates.has(d.date)) lastWateredIndex = idx
    cumulativeHydration = Math.max(0, cumulativeHydration + d.water - d.et0)
    const hydration = Math.min(100, cumulativeHydration)
    const daysSinceWater = idx - lastWateredIndex
    const overdueDays = Math.max(0, daysSinceWater - wateringInterval)
    const dayWeather = weather[idx]
    return {
      date: d.date,
      overdueDays,
      hydration,
      temperature: dayWeather.temperature,
      light: dayWeather.solarRadiation,
    }
  })
  const stressData = stressTrend(stressReadings)
  const currentStress = stressData[stressData.length - 1]?.stress ?? 0

  const router = useRouter()
  const searchParams = useSearchParams()
  const plants = Object.entries(samplePlants).map(([id, plant]) => ({
    id,
    ...plant,
  }))
  const comparisonData = collectPlantMetrics(plants)

  const taskEvents: CareEvent[] = [
    { date: "2024-01-05", type: "completed" },
    { date: "2024-01-12", type: "missed" },
    { date: "2024-02-03", type: "completed" },
    { date: "2024-02-20", type: "completed" },
    { date: "2024-03-15", type: "missed" },
    { date: "2024-03-22", type: "completed" },
  ]

  const toggleUnit = () => setTempUnit((u) => (u === "F" ? "C" : "F"))

  const handleSelect = (id: string) => {
    const query = searchParams.toString()
    router.push(`/plants/${id}${query ? `?${query}` : ""}`)
  }

  return (
    <main className="flex-1 p-4 md:p-6">
      <header className="backdrop-blur bg-white/80 sticky top-0 z-10 p-4 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-sm">
        <h2 className="font-semibold text-xl">Science Panel</h2>
        <button
          onClick={toggleUnit}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          {tempUnit === "F" ? "°F / °C" : "°C / °F"}
        </button>
      </header>

      <section className="mt-4 md:mt-6">
        <h3 className="font-medium text-gray-800">Environment Data</h3>
        <EnvRow
          temperature={readings.temperature}
          humidity={readings.humidity}
          vpd={readings.vpd}
          tempUnit={tempUnit}
        />
        <TempHumidityChart tempUnit={tempUnit} />
      </section>

      <section className="mt-4 md:mt-6">
        <h3 className="font-medium text-gray-800">VPD Gauge</h3>
        <VPDGauge />
      </section>

      <section className="mt-4 md:mt-6">
        <h3 className="font-medium text-gray-800">Water Balance</h3>
        <div className="flex items-center gap-2 mb-2">
          <label
            htmlFor="watering-interval"
            className="text-sm text-gray-700"
          >
            Watering Interval: {wateringInterval} days
          </label>
          <input
            id="watering-interval"
            type="range"
            min={1}
            max={14}
            value={wateringInterval}
            onChange={(e) => setWateringInterval(parseInt(e.target.value))}
            className="flex-1"
          />
        </div>
        <WaterBalanceChart data={waterData} />
      </section>

      <section className="mt-4 md:mt-6">
        <h3 className="font-medium text-gray-800">Plant Stress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StressIndexGauge value={currentStress} />
          <StressIndexChart data={stressData} />
        </div>
      </section>

      <section className="mt-4 md:mt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-800">Plant Comparison</h3>
          <select
            onChange={(e) => handleSelect(e.target.value)}
            className="border rounded px-2 py-1"
            defaultValue=""
          >
            <option value="" disabled>
              View plant...
            </option>
            {plants.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nickname}
              </option>
            ))}
          </select>
        </div>
        <ComparativeChart plants={plants} data={comparisonData} />
      </section>

      <section className="mt-4 md:mt-6">
        <h3 className="font-medium text-gray-800">Task Completion</h3>
        <TaskCompletionChart events={taskEvents} />
      </section>

      <Footer />
    </main>
  )
}
