export interface Weather {
  temperature: number
  humidity: number
  solarRadiation: number
  windSpeed: number
}

export async function fetchDailyWeather(lat: number, lon: number): Promise<Weather> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: 'temperature_2m,relative_humidity_2m',
    daily: 'temperature_2m_max,temperature_2m_min,relative_humidity_2m_mean,shortwave_radiation_sum,wind_speed_10m_max',
    timezone: 'auto',
    past_days: '1',
  })
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`)
  if (!res.ok) {
    throw new Error('Failed to fetch weather')
  }
  const data = await res.json()
  const tMax = data.daily.temperature_2m_max?.[0]
  const tMin = data.daily.temperature_2m_min?.[0]
  const temperature =
    typeof tMax === 'number' && typeof tMin === 'number'
      ? (tMax + tMin) / 2
      : data.current.temperature_2m
  return {
    temperature,
    humidity:
      data.daily.relative_humidity_2m_mean?.[0] ?? data.current.relative_humidity_2m,
    solarRadiation: data.daily.shortwave_radiation_sum?.[0] ?? 0,
    windSpeed: data.daily.wind_speed_10m_max?.[0] ?? 0,
  }
}

export async function getWeatherForUser(): Promise<Weather> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const weather = await fetchDailyWeather(
            position.coords.latitude,
            position.coords.longitude
          )
          resolve(weather)
        } catch (err) {
          reject(err)
        }
      },
      (err) => reject(err)
    )
  })
}
