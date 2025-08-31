import { render, screen } from '@testing-library/react'
import { PlantDetailContent } from '../[id]/page'
import { ToastProvider } from '@/components/Toast'

describe('PlantDetailPage', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('shows placeholder when plant has no photos', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        nickname: 'Test',
        species: 'Species',
        status: 'Fine',
        hydration: 50,
        lastWatered: 'Aug 1',
        nextDue: 'Aug 5',
        events: [],
        // no photos
      }),
    }) as any

    render(
      <ToastProvider>
        <PlantDetailContent params={{ id: '1' }} />
      </ToastProvider>
    )

    expect(await screen.findByText(/No photos available/i)).toBeInTheDocument()
  })

  it('handles null events without crashing', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        nickname: 'Test',
        species: 'Species',
        status: 'Fine',
        hydration: 50,
        lastWatered: 'Aug 1',
        nextDue: 'Aug 5',
        events: [null, { id: 1, type: 'water', date: 'Aug 1' }],
        photos: [],
      }),
    }) as any

    render(
      <ToastProvider>
        <PlantDetailContent params={{ id: '1' }} />
      </ToastProvider>
    )

    expect(await screen.findByText(/Timeline/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Watered/i).length).toBeGreaterThan(0)
  })
})
