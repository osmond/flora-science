import { renderHook } from '@testing-library/react'
import { samplePlants } from '@/lib/plants'
import usePlantMetrics from '../usePlantMetrics'

describe('usePlantMetrics', () => {
  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2024-08-28'))
  })
  afterAll(() => {
    jest.useRealTimers()
  })

  it('computes plant metrics', () => {
    const { result } = renderHook(() =>
      usePlantMetrics(Object.entries(samplePlants))
    )
    expect(result.current.plantsCount).toBe(4)
    expect(result.current.overduePercent).toBe(25)
    expect(result.current.longestStreakPlant).toBe('Delilah')
    expect(result.current.taskStreak).toBe(2)
    expect(result.current.nextDayWaterTasks).toBe(1)
  })
})
