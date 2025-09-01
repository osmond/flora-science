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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,

  ReferenceLine,

} from "recharts"
import {
  aggregateCareByMonth,
  aggregateTaskCompletion,
  CareEvent,
  type DailyActivity,
} from "@/lib/seasonal-trends"
import {
  calculateHydrationTrend,
  calculateNutrientAvailability,
  calculateStressIndex,

  type StressDatum,
  type HydrationLogEntry,
  type ComparativeDatum,
} from "@/lib/plant-metrics"
import type { Plant } from "@/lib/plants"
import type { Weather } from "@/lib/weather"

const axisTickStyle = {
  fill: "#374151",
  fontSize: 12,
  fontFamily: "Helvetica Neue, Arial, sans-serif",
}

const legendStyle = {
  fontSize: 12,
  color: "#374151",
  fontFamily: "Helvetica Neue, Arial, sans-serif",
}

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
        <XAxis dataKey="day" tick={axisTickStyle} />
        <YAxis tick={axisTickStyle} />
        <Tooltip />
        <Legend wrapperStyle={legendStyle} />
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
          className="text-lg font-sans fill-gray-700"
        >
          1.2 kPa
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

export function HydrationTrendChart({
  log,
}: {
  log: HydrationLogEntry[]
}) {
  const data = calculateHydrationTrend(log)
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={axisTickStyle} />
        <YAxis domain={[0, 100]} tick={axisTickStyle} />
        <Tooltip />
        <Legend wrapperStyle={legendStyle} />
        <Line
          type="monotone"
          dataKey="avg"
          stroke="#3b82f6"
          name="Hydration (%)"
        />
        <ReferenceLine
          y={40}
          stroke="#ef4444"
          strokeDasharray="3 3"
          label="Low"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function ComparativeChart({
  plants,
  data,
}: {
  plants: Plant[]
  data: ComparativeDatum[]
}) {
  const colors = [
    "#3b82f6",
    "#ef4444",
    "#16a34a",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#0ea5e9",
    "#fde047",
  ]

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={axisTickStyle} />
        <YAxis domain={[0, 100]} tick={axisTickStyle} />
        <Tooltip />
        <Legend wrapperStyle={legendStyle} />
        {plants.map((p, idx) => (
          <Line
            key={p.nickname}
            type="monotone"
            dataKey={p.nickname}
            stroke={colors[idx % colors.length]}
            name={p.nickname}
            data-testid={`comparative-line-${idx}`}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export function CareTrendsChart({ events }: { events: CareEvent[] }) {
  const data = aggregateCareByMonth(events)

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tick={axisTickStyle} />
        <YAxis allowDecimals={false} tick={axisTickStyle} />
        <Tooltip />
        <Legend wrapperStyle={legendStyle} />
        <Bar dataKey="water" fill="#3b82f6" name="Water" />
        <Bar dataKey="fertilize" fill="#22c55e" name="Fertilize" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function TaskCompletionChart({ events }: { events: CareEvent[] }) {
  const data = aggregateTaskCompletion(events).map((t) => {
    const total = t.completed + t.missed
    return {
      month: t.month,
      completed: total ? (t.completed / total) * 100 : 0,
      missed: total ? (t.missed / total) * 100 : 0,
    }
  })

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tick={axisTickStyle} />
        <YAxis domain={[0, 100]} tick={axisTickStyle} />
        <Tooltip />
        <Legend wrapperStyle={legendStyle} />
        <Line
          type="monotone"
          dataKey="completed"
          stroke="#22c55e"
          name="Completed (%)"
        />
        <Line
          type="monotone"
          dataKey="missed"
          stroke="#ef4444"
          name="Missed (%)"
        />
      </LineChart>
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
        <XAxis dataKey="date" tick={axisTickStyle} />
        <YAxis tick={axisTickStyle} />
        <Tooltip />
        <Legend wrapperStyle={legendStyle} />
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

// Display a plant stress index as a radial gauge (0-100)
export function StressIndexGauge({ value }: { value: number }) {
  const data = [{ name: "Stress", value, fill: "#ef4444" }]
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="80%"
        outerRadius="100%"
        barSize={20}
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar minAngle={15} background clockWise dataKey="value" />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-lg font-sans fill-gray-700"
        >
          {value}
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

// Line chart for stress index trends
export function StressIndexChart({ data }: { data: StressDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={axisTickStyle} />
        <YAxis domain={[0, 100]} tick={axisTickStyle} />
        <Tooltip />
        <Legend wrapperStyle={legendStyle} />
        <Line type="monotone" dataKey="stress" stroke="#ef4444" name="Stress" />
      </LineChart>
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
        <XAxis dataKey="day" tick={axisTickStyle} />
        <YAxis domain={[0, 100]} tick={axisTickStyle} />
        <Tooltip />
        <Legend wrapperStyle={legendStyle} />
        <Line type="monotone" dataKey="level" stroke="#16a34a" name="Nutrients (%)" />
      </LineChart>

    </ResponsiveContainer>
  )
}

export function PlantHealthRadar({
  hydration,
  lastFertilized,
  nutrientLevel = 100,
  events,
  status,
  weather,
}: {
  hydration: number
  lastFertilized: string
  nutrientLevel?: number
  events: CareEvent[]
  status: string
  weather: Weather | null
}) {
  const nutrients = calculateNutrientAvailability(lastFertilized, nutrientLevel)
  const light = Math.min(100, (weather?.solarRadiation ?? 50) * 4)
  const stress = calculateStressIndex({
    overdueDays: status === "Water overdue" ? 1 : 0,
    hydration,
    temperature: weather?.temperature ?? 25,
    light,
  })
  const totals = aggregateTaskCompletion(events)
  const completed = totals.reduce((sum, t) => sum + t.completed, 0)
  const missed = totals.reduce((sum, t) => sum + t.missed, 0)
  const consistency = completed + missed ? (completed / (completed + missed)) * 100 : 0
  const data = [
    { metric: "Hydration", value: hydration },
    { metric: "Nutrients", value: nutrients },
    { metric: "Light", value: light },
    { metric: "Stress", value: stress },
    { metric: "Consistency", value: consistency },
  ]

  return (
    <ResponsiveContainer width={180} height={140}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis
          dataKey="metric"
          stroke="#6b7280"
          tick={{ ...axisTickStyle }}
        />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
        <Radar dataKey="value" stroke="#64748b" fill="#94a3b8" fillOpacity={0.3} />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export function TimelineHeatmap({ activity }: { activity: DailyActivity }) {
  const dates = Object.keys(activity).sort()
  const types = Array.from(
    new Set(dates.flatMap((d) => Object.keys(activity[d])))
  )
  const counts = dates.flatMap((d) => Object.values(activity[d]))
  const max = Math.max(1, ...counts, 1)

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="p-1 text-xs"></th>
            {dates.map((date) => (
              <th key={date} className="p-1 text-xs">
                {new Date(date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {types.map((type) => (
            <tr key={type}>
              <td className="p-1 text-xs">{type}</td>
              {dates.map((date) => {
                const count = activity[date]?.[type] ?? 0
                const intensity = count / max
                return (
                  <td
                    key={date}
                    data-testid="heatmap-cell"
                    data-count={count}
                    title={`${type} on ${date}: ${count}`}
                    style={{
                      backgroundColor: count
                        ? `rgba(34,197,94,${intensity})`
                        : "#e5e7eb",
                      width: "1rem",
                      height: "1rem",
                    }}
                  />
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
