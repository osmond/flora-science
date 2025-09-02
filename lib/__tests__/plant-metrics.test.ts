import {
  calculateEt0,
  waterBalanceSeries,
  WeatherDay,
  WaterEvent,
  calculateHydrationTrend,
  collectPlantMetrics,
  calculateStressIndex,
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

  it('calculates stress index with weighted factors', () => {
    const input = {
      overdueDays: 2,
      hydration: 50,
      temperature: 35,
      light: 70,
    }
    const stress = calculateStressIndex(input)
    expect(stress).toBe(61)
  })

  it('maps stress trend with edge cases', () => {
    const readings = [
      {
        date: '2024-08-01',
        overdueDays: -3,
        hydration: 100,
        temperature: 100,
        light: 50,
      },
      {
        date: '2024-08-02',
        overdueDays: 5,
        hydration: 0,
        temperature: -10,
        light: 0,
      },
    ]
    const trend = stressTrend(readings)
    expect(trend).toEqual([
      {
        date: '2024-08-01',
        stress: 15,
        factors: { overdue: 0, hydration: 0, temperature: 15, light: 0 },
      },
      {
        date: '2024-08-02',
        stress: 100,
        factors: { overdue: 30, hydration: 40, temperature: 15, light: 15 },
      },
    ])
  })
})
