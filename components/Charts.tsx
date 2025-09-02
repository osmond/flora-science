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
  Bar,
  ComposedChart,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,

  ReferenceArea,

} from "recharts"
import {
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
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"


// Dummy dataset for environment over 7 days
const defaultEnvData = [
  { day: "Mon", temp: 74, rh: 55 },
  { day: "Tue", temp: 76, rh: 52 },
  { day: "Wed", temp: 78, rh: 50 },
  { day: "Thu", temp: 75, rh: 54 },
  { day: "Fri", temp: 77, rh: 53 },
  { day: "Sat", temp: 73, rh: 58 },
  { day: "Sun", temp: 75, rh: 56 },
]

export interface EnvDatum {
  day: string
  temp: number
  rh: number
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload?.length) {
    return (
      <div className="rounded border bg-white p-2 shadow text-xs">
        <p className="font-medium">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }}>
            {p.name ?? p.dataKey}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

interface StressTooltipProps {
  /** Whether the tooltip is active (provided by Recharts). */
  active?: boolean
  /** Data for the hovered point including factor scores. */
  payload?: { payload: StressDatum }[]
  /** Label for the hovered entry, typically the date. */
  label?: string
}

/**
 * Tooltip for stress charts that displays each factor's contribution to the
 * overall stress index.
 */
function StressTooltip({ active, payload, label }: StressTooltipProps) {
  if (active && payload?.length) {
    const datum = payload[0].payload
    const { overdue, hydration, temperature, light } = datum.factors
    return (
      <div className="rounded border bg-white p-2 shadow text-xs">
        <p className="font-medium">{label}</p>
        <p>Stress: {datum.stress}</p>
        <p className="mt-1">Factors</p>
        <p>Overdue: {overdue}</p>
        <p>Hydration: {hydration}</p>
        <p>Temperature: {temperature}</p>
        <p>Light: {light}</p>
      </div>
    )
  }
  return null
}

export function TempHumidityChart({
  tempUnit = "F",
  data = defaultEnvData,
}: {
  tempUnit?: "F" | "C"
  data?: EnvDatum[]
}) {
  const chartData =
    tempUnit === "F"
      ? data
      : data.map((d) => ({
          ...d,
          temp: ((d.temp - 32) * 5) / 9,
        }))

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <XAxis dataKey="day" tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceArea y1={20} y2={27} fill="#ecfdf5" fillOpacity={0.3} />
        <ReferenceArea y1={40} y2={60} fill="#dbeafe" fillOpacity={0.3} />
        <Line
          type="monotone"
          dataKey="temp"
          stroke="#BD1212"
          strokeWidth={3}
          name={tempUnit === 'F' ? 'Temp (°F)' : 'Temp (°C)'}
        />
        <Line
          type="monotone"
          dataKey="rh"
          stroke="#2262CA"
          strokeWidth={3}
          name="RH (%)"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function VPDGauge({ value = 1.2 }: { value?: number }) {
  const max = 3
  const data = [{ name: "VPD", value, fill: "#1A7D1E" }]
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
        <PolarAngleAxis
          type="number"
          domain={[0, max]}
          ticks={[0, 1.2, max]}
          tick={({ x, y, payload }: any) => (
            <text
              x={x}
              y={y}
              textAnchor="middle"
              fill="#6b7280"
              fontSize={10}
            >
              {payload.value}
            </text>
          )}
          tickLine={false}
        />
        <RadialBar
          minAngle={15}
          background
          clockWise
          dataKey="value"
          data-testid="vpd-bar"
          isAnimationActive={false}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-lg fill-gray-700"
        >
          {value.toFixed(1)} kPa
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
  const history = calculateHydrationTrend(log)
  const last = history[history.length - 1]?.avg ?? 50
  const forecast = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date()
    d.setDate(d.getDate() + idx + 1)
    return {
      date: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      forecast: last,
    }
  })
  const data = [
    ...history.map((h) => ({ date: h.date, actual: h.avg })),
    ...forecast,
  ]
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="date" tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
        <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceArea y1={0} y2={40} fill="#fee2e2" fillOpacity={0.5} />
        <ReferenceArea y1={40} y2={80} fill="#dcfce7" fillOpacity={0.5} />
        <ReferenceArea y1={80} y2={100} fill="#dbeafe" fillOpacity={0.5} />
        <Line
          type="monotone"
          dataKey="actual"
          stroke="#0950C4"
          strokeWidth={3}
          name="Hydration (%)"
        />
        <Line
          type="monotone"
          dataKey="forecast"
          stroke="#2E6ACD"
          strokeDasharray="4 4"
          strokeWidth={3}
          name="Forecast"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function ComparativeChart({
  plants,
  data,
}: {
  plants: (Plant & { id: string })[]
  data: ComparativeDatum[]
}) {
  const colors = [
    "#0950C4",
    "#BD1212",
    "#1A7D1E",
    "#8E6B00",
    "#7623C5",
    "#C61B6F",
    "#2E6ACD",
    "#258429",
  ]

  const searchParams = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())

  const renderLegend = ({ payload }: any) => (
    <ul className="flex flex-wrap gap-4">
      {payload?.map((entry: any) => {
        const plant = plants.find((p) => p.nickname === entry.value)
        if (!plant) return null
        return (
          <li key={plant.id} className="flex items-center">
            <span
              className="w-3 h-3 mr-1"
              style={{ backgroundColor: entry.color }}
            />
            <Link href={{ pathname: `/plants/${plant.id}`, query }}>
              {entry.value}
            </Link>
          </li>
        )
      })}
    </ul>
  )

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={renderLegend} />
        <ReferenceArea y1={40} y2={80} fill="#e0e7ff" fillOpacity={0.1} />
        {plants.map((p, idx) => (
          <Line
            key={p.nickname}
            type="monotone"
            dataKey={p.nickname}
            stroke={colors[idx % colors.length]}
            strokeWidth={2}
            name={p.nickname}
            data-testid={`comparative-line-${idx}`}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export function CareStreak({ events }: { events: CareEvent[] }) {
  const today = new Date()
  const days = Array.from({ length: 30 }).map((_, idx) => {
    const d = new Date()
    d.setDate(today.getDate() - (29 - idx))
    const key = d.toISOString().split("T")[0]
    const hasWater = events.some(
      (e) =>
        e.type === "water" && new Date(e.date).toISOString().split("T")[0] === key
    )
    const hasFeed = events.some(
      (e) =>
        e.type === "fertilize" &&
        new Date(e.date).toISOString().split("T")[0] === key
    )
    return { date: key, hasWater, hasFeed }
  })

  return (
    <div className="grid grid-cols-7 gap-1 w-max" data-testid="care-streak">
      {days.map((d) => (
        <div
          key={d.date}
          title={
            d.hasWater || d.hasFeed
              ? d.hasWater && d.hasFeed
                ? `${d.date}: water & feed`
                : `${d.date}: ${d.hasWater ? "water" : "feed"}`
              : `${d.date}: no care`
          }
          className={`w-3 h-3 rounded ${
            d.hasWater
              ? "bg-blue-400"
              : d.hasFeed
                ? "bg-green-400"
                : "bg-gray-200 dark:bg-gray-700"
          }`}
        />
      ))}
    </div>
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
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
        <XAxis dataKey="month" />
        <YAxis domain={[0, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <ReferenceArea y1={80} y2={100} fill="#dcfce7" fillOpacity={0.1} />
        <Line
          type="monotone"
          dataKey="completed"
          stroke="#1A7D1E"
          strokeWidth={2}
          name="Completed (%)"
        />
        <Line
          type="monotone"
          dataKey="missed"
          stroke="#BD1212"
          strokeWidth={2}
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

export function WaterBalanceChart({
  data,
  showEt = true,
  showWater = true,
}: {
  data: WaterBalanceDatum[]
  showEt?: boolean
  showWater?: boolean
}) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <ComposedChart data={data}>
        <XAxis dataKey="date" tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceArea y1={0} y2={5} fill="#e0f2fe" fillOpacity={0.3} />
        {showWater && <Bar dataKey="water" fill="#0950C4" name="Water (mm)" />}
        {showEt && (
          <Line
            type="monotone"
            dataKey="et0"
            stroke="#8E6B00"
            strokeWidth={3}
            name="ET₀ (mm)"
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  )
}

// Display a plant stress index as a radial gauge (0-100)
export function StressIndexGauge({ value }: { value: number }) {
  const data = [{ name: 'stress', value }]
  const { label, color } =
    value < 30
      ? { label: 'Low', color: '#1A7D1E' }
      : value <= 70
        ? { label: 'Moderate', color: '#8E6B00' }
        : { label: 'High', color: '#BD1212' }
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="70%"
        outerRadius="100%"
        barSize={14}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <defs>
          <linearGradient id="stressGradient" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#1A7D1E" />
            <stop offset="50%" stopColor="#8E6B00" />
            <stop offset="100%" stopColor="#BD1212" />
          </linearGradient>
        </defs>
        <RadialBar
          dataKey="value"
          cornerRadius={8}
          fill="url(#stressGradient)"
          background
          clockWise
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-lg fill-gray-700"
        >
          {value}
        </text>
        <text
          x="50%"
          y="65%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fill: color }}
          className="text-sm"
        >
          {label}
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

/**
 * Line chart for stress index trends. Utilises {@link StressTooltip} to show
 * each factor's contribution to the overall stress value.
 */
export interface StressIndexChartProps {
  /** Trend data with total stress and factor breakdowns. */
  data: StressDatum[]
  /**
   * When true, renders individual factor lines with controls to toggle their
   * visibility.
   */
  showFactors?: boolean
}

export function StressIndexChart({ data, showFactors = false }: StressIndexChartProps) {
  const [visible, setVisible] = useState({
    overdue: true,
    hydration: true,
    temperature: true,
    light: true,
  })

  const toggle = (key: keyof typeof visible) =>
    setVisible((v) => ({ ...v, [key]: !v[key] }))

  const factorColors = {
    overdue: "#BD1212",
    hydration: "#0950C4",
    temperature: "#8E6B00",
    light: "#EAB308",
  }
  const factorLabels = {
    overdue: "Overdue",
    hydration: "Hydration",
    temperature: "Temperature",
    light: "Light",
  }

  if (data.length === 0) {
    return (
      <div className="flex h-[250px] w-full items-center justify-center text-sm text-gray-500">
        No stress readings available
      </div>
    )
  }

  const stressTiers = [
    { id: "low", label: "Low (0-30)", range: [0, 30], color: "#dcfce7" },
    { id: "moderate", label: "Moderate (30-60)", range: [30, 60], color: "#fef9c3" },
    { id: "high", label: "High (60-100)", range: [60, 100], color: "#fee2e2" },
  ]

  const legendPayload = [
    { value: "Stress", type: "line", color: "#BD1212", id: "stress" },
    ...stressTiers.map((t) => ({
      value: t.label,
      type: "square",
      color: t.color,
      id: t.id,
    })),
  ]

  return (
    <div className="w-full">
      {showFactors && (
        <div className="mb-2 flex flex-wrap gap-4 text-xs">
          {(Object.keys(visible) as (keyof typeof visible)[]).map((key) => (
            <label key={key} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={visible[key]}
                onChange={() => toggle(key)}
              />
              <span style={{ color: factorColors[key] }}>
                {factorLabels[key]}
              </span>
            </label>
          ))}
        </div>
      )}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
            label={{ value: 'Date', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Stress Index', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<StressTooltip />} />
          <Legend payload={legendPayload} />
          {stressTiers.map(({ id, range: [y1, y2], color }) => (
            <ReferenceArea
              key={id}
              y1={y1}
              y2={y2}
              fill={color}
              fillOpacity={0.5}
            />
          ))}
          {showFactors && visible.overdue && (
            <Line
              type="monotone"
              dataKey="factors.overdue"
              stroke={factorColors.overdue}
              strokeWidth={2}
              name="Overdue"
            />
          )}
          {showFactors && visible.hydration && (
            <Line
              type="monotone"
              dataKey="factors.hydration"
              stroke={factorColors.hydration}
              strokeWidth={2}
              name="Hydration"
            />
          )}
          {showFactors && visible.temperature && (
            <Line
              type="monotone"
              dataKey="factors.temperature"
              stroke={factorColors.temperature}
              strokeWidth={2}
              name="Temperature"
            />
          )}
          {showFactors && visible.light && (
            <Line
              type="monotone"
              dataKey="factors.light"
              stroke={factorColors.light}
              strokeWidth={2}
              name="Light"
            />
          )}
          <Line
            type="monotone"
            dataKey="stress"
            stroke="#BD1212"
            strokeWidth={3}
            name="Stress"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
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
  const history = Array.from({ length: 7 }).map((_, idx) => {
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
  const last = history[history.length - 1]?.level ?? nutrientLevel
  const forecast = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date(today)
    d.setDate(d.getDate() + idx + 1)
    return {
      day: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      forecast: Math.max(0, last - (idx + 1) * 2),
    }
  })
  const data = [...history, ...forecast]

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="day" tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
        <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceArea y1={60} y2={100} fill="#dcfce7" fillOpacity={0.5} />
        <Line
          type="monotone"
          dataKey="level"
          stroke="#1A7D1E"
          strokeWidth={3}
          name="Nutrients (%)"
        />
        <Line
          type="monotone"
          dataKey="forecast"
          stroke="#258429"
          strokeDasharray="4 4"
          strokeWidth={3}
          name="Forecast"
        />
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
        <PolarGrid stroke="#e5e7eb" strokeOpacity={0.1} />
        <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
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
                        ? `rgba(26,125,30,${intensity})`
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
