import {
  calculateEt0,
  waterBalanceSeries,
  WeatherDay,
  WaterEvent,
  calculateHydrationTrend,
  collectPlantMetrics,
  stressTrend,
} from '../plant-metrics'
import { samplePlants } from '../plants'

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

  it('collects hydration metrics across plants', () => {
    const plants = [samplePlants['1'], samplePlants['2']]
    const metrics = collectPlantMetrics(plants)
    expect(metrics[0]).toMatchObject({ date: '2024-08-21', Delilah: 80 })
    expect(metrics.some((m) => m.Sunny === 92)).toBe(true)
  })

  it('computes stress trend with moving average', () => {
    const readings = [
      {
        date: '2024-01-01',
        overdueDays: 0,
        hydration: 100,
        temperature: 25,
        light: 50,
      },
      {
        date: '2024-01-02',
        overdueDays: 1,
        hydration: 80,
        temperature: 25,
        light: 50,
      },
      {
        date: '2024-01-03',
        overdueDays: 2,
        hydration: 60,
        temperature: 25,
        light: 50,
      },
    ]
    const trend = stressTrend(readings, 2)
    expect(trend[1].avg).toBeCloseTo((trend[0].stress + trend[1].stress) / 2)
    expect(trend[2].avg).toBeGreaterThan(0)
  })
})
