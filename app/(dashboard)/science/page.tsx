"use client"

import { useState } from "react"
import {
  TempHumidityChart,
  VPDGauge,
  WaterBalanceChart,
} from "@/components/Charts"
import { waterBalanceSeries, WeatherDay, WaterEvent } from "@/lib/plant-metrics"
import EnvRow from "@/components/EnvRow"
import Footer from "@/components/Footer"

export default function SciencePanel() {
  const readings = { temperature: 75, humidity: 52, vpd: 1.2 }
  const [tempUnit, setTempUnit] = useState<"F" | "C">("F")

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

  const events: WaterEvent[] = [
    { date: "2024-08-22", amount: 5 },
    { date: "2024-08-25", amount: 5 },
  ]

  const waterData = waterBalanceSeries(weather, events)

  const toggleUnit = () => setTempUnit((u) => (u === "F" ? "C" : "F"))

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
        <WaterBalanceChart data={waterData} />
      </section>

      <Footer />
    </main>
  )
}
