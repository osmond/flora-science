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
