"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  ComposedChart,

} from "recharts"
import { aggregateCareByMonth, CareEvent } from "@/lib/seasonal-trends"
import { calculateNutrientAvailability } from "@/lib/plant-metrics"

// Dummy dataset for environment over 7 days
const envData = [
  { day: "Mon", temp: 74, rh: 55 },
  { day: "Tue", temp: 76, rh: 52 },
  { day: "Wed", temp: 78, rh: 50 },
  { day: "Thu", temp: 75, rh: 54 },
  { day: "Fri", temp: 77, rh: 53 },
  { day: "Sat", temp: 73, rh: 58 },
  { day: "Sun", temp: 75, rh: 56 },
]

export function TempHumidityChart({
  tempUnit = "F",
}: {
  tempUnit?: "F" | "C"
}) {
  const data =
    tempUnit === "F"
      ? envData
      : envData.map((d) => ({
          ...d,
          temp: ((d.temp - 32) * 5) / 9,
        }))

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="temp"
          stroke="#f87171"
          name={tempUnit === "F" ? "Temp (°F)" : "Temp (°C)"}
        />
        <Line type="monotone" dataKey="rh" stroke="#60a5fa" name="RH (%)" />
      </LineChart>
    </ResponsiveContainer>
  )
}

// Dummy VPD gauge (value out of 2.0 kPa)
const vpdData = [{ name: "VPD", value: 1.2, fill: "#4CAF50" }]

export function VPDGauge() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="80%"
        outerRadius="100%"
        barSize={20}
        data={vpdData}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar
          minAngle={15}
          background
          clockWise
          dataKey="value"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-lg fill-gray-700"
        >
          1.2 kPa
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

export function CareTrendsChart({ events }: { events: CareEvent[] }) {
  const data = aggregateCareByMonth(events)

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="water" fill="#3b82f6" name="Water" />
        <Bar dataKey="fertilize" fill="#22c55e" name="Fertilize" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export interface WaterBalanceDatum {
  date: string
  et0: number
  water: number
}

export function WaterBalanceChart({ data }: { data: WaterBalanceDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="water" fill="#3b82f6" name="Water (mm)" />
        <Line
          type="monotone"
          dataKey="et0"
          stroke="#f59e0b"
          name="ET₀ (mm)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export function NutrientLevelChart({
  lastFertilized,
  nutrientLevel = 100,
}: {
  lastFertilized: string
  nutrientLevel?: number
}) {
  const today = new Date()
  const data = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (6 - idx))
    const level = calculateNutrientAvailability(
      lastFertilized,
      nutrientLevel,
      d
    )
    return {
      day: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      level,
    }
  })

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="level" stroke="#16a34a" name="Nutrients (%)" />
      </LineChart>

    </ResponsiveContainer>
  )
}
