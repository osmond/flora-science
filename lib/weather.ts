export interface Weather {
  temperature: number
  humidity: number
}

export async function fetchDailyWeather(lat: number, lon: number): Promise<Weather> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: 'temperature_2m,relative_humidity_2m',
    timezone: 'auto',
  })
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`)
  if (!res.ok) {
    throw new Error('Failed to fetch weather')
  }
  const data = await res.json()
  return {
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
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
