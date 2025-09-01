import { render, screen } from '@testing-library/react'
import RoomDetailPage from '../[id]/page'

describe('RoomDetailPage', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('displays room data from API', async () => {
    const room = {
      name: 'Test Room',
      hydration: 50,
      tasks: 1,
      status: 'healthy',
      tags: [],
      plants: [],
      events: [],
    }
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => room,
    }) as any

    render(<RoomDetailPage params={{ id: 'test' }} />)

    expect(await screen.findByText('Test Room')).toBeInTheDocument()
    expect(screen.getByText(/50%/)).toBeInTheDocument()
  })

  it('handles missing room', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 }) as any

    render(<RoomDetailPage params={{ id: 'missing' }} />)

    expect(await screen.findByText(/Room not found/)).toBeInTheDocument()
  })
})
