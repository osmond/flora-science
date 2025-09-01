import { sanitizeEvents } from '@/lib/plants'

describe('sanitizeEvents', () => {
  it('filters out invalid events', () => {
    const events: any = [
      { id: 1, type: 'water', date: 'Aug 25' },
      null,
      undefined,
      { type: 'note', date: 'Aug 26' },
    ]
    expect(sanitizeEvents(events)).toEqual([
      { id: 1, type: 'water', date: 'Aug 25' },
    ])
  })
})
