export interface WeatherDay {
  date: string
  temperature: number // °C
  humidity: number // %
  solarRadiation: number // MJ/m²
  windSpeed: number // m/s
}

export interface WaterEvent {
  date: string // ISO string YYYY-MM-DD
  amount: number // mm of water applied
}

// Calculate daily reference evapotranspiration (ET₀) using a simplified
// FAO-56 Penman-Monteith equation. Assumes near sea level pressure.
export function calculateEt0(day: WeatherDay): number {
  const t = day.temperature
  const rh = day.humidity
  const rs = day.solarRadiation
  const u2 = day.windSpeed

  // Saturation vapor pressure (kPa)
  const es = 0.6108 * Math.exp((17.27 * t) / (t + 237.3))
  // Actual vapor pressure (kPa)
  const ea = es * (rh / 100)
  // Slope vapor pressure curve (kPa/°C)
  const delta = (4098 * es) / Math.pow(t + 237.3, 2)
  // Psychrometric constant (kPa/°C) at sea level
  const gamma = 0.665e-3 * 101.3
  // Approximate net radiation assuming albedo 0.23
  const rn = 0.77 * rs

  const et0 =
    (0.408 * delta * rn +
      gamma * (900 / (t + 273)) * u2 * (es - ea)) /
    (delta + gamma * (1 + 0.34 * u2))

  return Number(et0.toFixed(2))
}

export interface WaterBalanceDatum {
  date: string
  et0: number
  water: number
}

// Combine weather data and watering events into a time series of water balance.
export function waterBalanceSeries(
  weather: WeatherDay[],
  events: WaterEvent[],
): WaterBalanceDatum[] {
  return weather.map((w) => {
    const et0 = calculateEt0(w)
    const water = events
      .filter((e) => e.date === w.date)
      .reduce((sum, e) => sum + e.amount, 0)
    return { date: w.date, et0, water }
  })
}

export const MS_PER_DAY = 1000 * 60 * 60 * 24

export function calculateNutrientAvailability(
  lastFertilized: string,
  nutrientLevel: number = 100,
  asOf: Date = new Date()
): number {
  const lastDate = new Date(`${lastFertilized} ${asOf.getFullYear()}`)
  if (isNaN(lastDate.getTime())) return nutrientLevel
  const diffDays = Math.floor((asOf.getTime() - lastDate.getTime()) / MS_PER_DAY)
  const decayed = Math.max(0, Math.min(100, nutrientLevel - diffDays * 2))
  return decayed

}

export interface StressInput {
  /** Number of days a task is overdue. Negative values are treated as 0. */
  overdueDays: number
  /** Current hydration level as a percent 0-100 */
  hydration: number
  /** Ambient temperature in °C */
  temperature: number
  /** Daily light reading (arbitrary units, 0-100 recommended) */
  light: number
}

export interface StressDatum {
  date: string
  stress: number
}

// Calculate a simple stress index on a 0-100 scale. Higher values indicate
// greater plant stress. The formula is intentionally lightweight – it simply
// normalises each factor to a 0-100 range and then combines them with weights.
export function calculateStressIndex({
  overdueDays,
  hydration,
  temperature,
  light,
}: StressInput): number {
  // Overdue watering contributes up to 30 points. Each overdue day adds 10.
  const overdueScore = Math.min(30, Math.max(0, overdueDays) * 10)

  // Hydration is inverted: 100% hydration => 0 stress, 0% => 40 stress.
  const hydrationScore = Math.min(40, Math.max(0, 40 * (1 - hydration / 100)))

  // Temperature – assume an optimal temperature of 25°C. Each degree away adds
  // 1.5 points up to a max of 15.
  const tempScore = Math.min(15, Math.abs(temperature - 25) * 1.5)

  // Light – assume an ideal reading of 50 (on a 0–100 scale). Each unit away
  // adds 0.3 points up to 15.
  const lightScore = Math.min(15, Math.abs(light - 50) * 0.3)

  const total = overdueScore + hydrationScore + tempScore + lightScore
  return Math.round(Math.max(0, Math.min(100, total)))
}

// Generate a series of stress index values for trend visualisation.
export function stressTrend(
  readings: (StressInput & { date: string })[],
): StressDatum[] {
  return readings.map((r) => ({
    date: r.date,
    stress: calculateStressIndex(r),
  }))
}

export interface HydrationLogEntry {
  date: string
  value: number
}

export interface HydrationTrendDatum {
  date: string
  value: number
  avg: number
  belowThreshold: boolean
}

/**
 * Calculate rolling averages for hydration readings and flag when the average
 * falls below a given threshold (default 40%).
 */
export function calculateHydrationTrend(
  log: HydrationLogEntry[],
  window: number = 3,
  threshold: number = 40,
): HydrationTrendDatum[] {
  const sorted = [...log].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )
  return sorted.map((entry, idx) => {
    const start = Math.max(0, idx - window + 1)
    const slice = sorted.slice(start, idx + 1)
    const avg =
      slice.reduce((sum, e) => sum + e.value, 0) / (slice.length || 1)
    const rounded = Number(avg.toFixed(2))
    return {
      date: entry.date,
      value: entry.value,
      avg: rounded,
      belowThreshold: rounded < threshold,
    }
  })
}
