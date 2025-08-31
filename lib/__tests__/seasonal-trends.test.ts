import {
  aggregateCareByMonth,
  aggregateTaskCompletion,
} from '../seasonal-trends'

describe('aggregateCareByMonth', () => {
  it('counts water and fertilizer events per month', () => {
    const events = [
      { type: 'water', date: '2024-01-15' },
      { type: 'water', date: '2024-01-20' },
      { type: 'fertilize', date: '2024-02-10' },
      { type: 'note', date: '2024-02-11' },
    ]
    const result = aggregateCareByMonth(events)
    expect(result[0]).toEqual({ month: 'Jan', water: 2, fertilize: 0 })
    expect(result[1]).toEqual({ month: 'Feb', water: 0, fertilize: 1 })
  })
})

describe('aggregateTaskCompletion', () => {
  it('counts completed and missed tasks per month', () => {
    const events = [
      { type: 'completed', date: '2024-01-15' },
      { type: 'missed', date: '2024-01-20' },
      { type: 'completed', date: '2024-02-10' },
      { type: 'note', date: '2024-02-11' },
    ]
    const result = aggregateTaskCompletion(events)
    expect(result[0]).toEqual({ month: 'Jan', completed: 1, missed: 1 })
    expect(result[1]).toEqual({ month: 'Feb', completed: 1, missed: 0 })
  })
})
