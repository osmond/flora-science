import { differenceInDays, addDays } from 'date-fns'
import { parsePlantDate } from '../date'

describe('parsePlantDate', () => {
  it('handles past dates across year boundaries', () => {
    const base = new Date('2025-01-01')
    const parsed = parsePlantDate('Dec 31', false, base)
    expect(parsed.getFullYear()).toBe(2024)
    expect(differenceInDays(base, parsed)).toBe(1)
  })

  it('handles future dates across year boundaries', () => {
    const base = new Date('2024-12-31')
    const parsed = parsePlantDate('Jan 1', true, base)
    expect(parsed.getFullYear()).toBe(2025)
    expect(parsed.getTime()).toBe(addDays(base, 1).getTime())
  })
})
