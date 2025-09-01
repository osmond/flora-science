import {
  calculateEt0,
  waterBalanceSeries,
  WeatherDay,
  WaterEvent,
  calculateHydrationTrend,
} from '../plant-metrics'

describe('plant metrics', () => {
  it('calculates et0 and water balance', () => {
    const weather: WeatherDay[] = [
      { date: '2024-08-21', temperature: 25, humidity: 50, solarRadiation: 20, windSpeed: 2 },
    ]
    const events: WaterEvent[] = [{ date: '2024-08-21', amount: 5 }]
    const et0 = calculateEt0(weather[0])
    expect(typeof et0).toBe('number')
    const series = waterBalanceSeries(weather, events)
    expect(series).toEqual([{ date: '2024-08-21', et0, water: 5 }])
  })

  it('computes hydration trend with threshold detection', () => {
    const log = [
      { date: '2024-08-01', value: 80 },
      { date: '2024-08-02', value: 60 },
      { date: '2024-08-03', value: 40 },
      { date: '2024-08-04', value: 20 },
    ]
    const trend = calculateHydrationTrend(log, 3, 50)
    expect(trend[2]).toMatchObject({ avg: 60, belowThreshold: false })
    expect(trend[3].belowThreshold).toBe(true)
  })
})
