import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PlantDetailContent } from '../[id]/page'
import { ToastProvider } from '@/components/Toast'

jest.mock('@/components/Modal', () => ({
  __esModule: true,
  default: ({ isOpen, children }: any) => (isOpen ? <div>{children}</div> : null),
}))
jest.mock('@/components/plant-detail/AnalyticsPanel', () => ({
  __esModule: true,
  default: () => <div>AnalyticsPanel</div>,
}))
jest.mock('@/components/plant-detail/CareTrends', () => ({
  __esModule: true,
  default: () => <div>CareTrends</div>,
}))
jest.mock('@/components/plant-detail/QuickStats', () => ({
  __esModule: true,
  default: () => <div>QuickStats</div>,
  calculateNextFeedDate: () => 'Aug 5',
}))

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
    expect(screen.getAllByText(/ago/i).length).toBeGreaterThan(0)
  })

  it('falls back to sample data when offline', async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error('Network error')) as any

    render(
      <ToastProvider>
        <PlantDetailContent params={{ id: '1' }} />
      </ToastProvider>
    )

    expect(
      await screen.findByText(/Offline data\. Changes may not be saved\./i)
    ).toBeInTheDocument()
    expect(await screen.findByText(/Delilah/i)).toBeInTheDocument()
  })

  it('retries loading on error when Retry is clicked', async () => {
    const plant = {
      nickname: 'Test',
      species: 'Species',
      status: 'Fine',
      hydration: 50,
      lastWatered: 'Aug 1',
      nextDue: 'Aug 5',
      lastFertilized: 'Aug 1',
      nutrientLevel: 50,
      events: [],
      photos: [],
    }

    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 500 })
      .mockResolvedValueOnce({ ok: true, json: async () => plant })
    global.fetch = mockFetch as any
    const user = userEvent.setup()

    render(
      <ToastProvider>
        <PlantDetailContent params={{ id: '999' }} />
      </ToastProvider>
    )

    expect(await screen.findByText(/Failed to load plant/i)).toBeInTheDocument()
    await user.click(screen.getByText(/Retry/i))
    expect(await screen.findByText(/Timeline/i)).toBeInTheDocument()
  })

  it('submits water form and adds event', async () => {
    const plant = {
      nickname: 'Test',
      species: 'Species',
      status: 'Fine',
      hydration: 50,
      lastWatered: 'Aug 1',
      nextDue: 'Aug 5',
      lastFertilized: 'Aug 1',
      nutrientLevel: 50,
      events: [],
      photos: [],
    }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => plant,
    }) as any

    const user = userEvent.setup()

    render(
      <ToastProvider>
        <PlantDetailContent params={{ id: '1' }} />
      </ToastProvider>
    )

    await screen.findByRole('button', { name: /Water plant/i })
    await user.click(
      screen.getByRole('button', { name: /Water plant/i })
    )
    await user.type(screen.getByLabelText(/Amount/i), '10')
    await user.click(screen.getByRole('button', { name: /Confirm/i }))
    expect(await screen.findByText(/Water added/i)).toBeInTheDocument()
  })

  it('submits fertilize form and adds event', async () => {
    const plant = {
      nickname: 'Test',
      species: 'Species',
      status: 'Fine',
      hydration: 50,
      lastWatered: 'Aug 1',
      nextDue: 'Aug 5',
      lastFertilized: 'Aug 1',
      nutrientLevel: 50,
      events: [],
      photos: [],
    }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => plant,
    }) as any

    const user = userEvent.setup()

    render(
      <ToastProvider>
        <PlantDetailContent params={{ id: '1' }} />
      </ToastProvider>
    )

    await screen.findByRole('button', { name: /Water plant/i })
    await user.click(
      screen.getByRole('button', { name: /Fertilize plant/i })
    )
    await user.type(screen.getByLabelText(/Fertilizer/i), 'NPK')
    await user.click(screen.getByRole('button', { name: /Confirm/i }))
    expect(await screen.findByText(/Fertilizer added/i)).toBeInTheDocument()
  })

  it('submits note form and displays note', async () => {
    const plant = {
      nickname: 'Test',
      species: 'Species',
      status: 'Fine',
      hydration: 50,
      lastWatered: 'Aug 1',
      nextDue: 'Aug 5',
      lastFertilized: 'Aug 1',
      nutrientLevel: 50,
      events: [],
      photos: [],
    }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => plant,
    }) as any

    const user = userEvent.setup()

    render(
      <ToastProvider>
        <PlantDetailContent params={{ id: '1' }} />
      </ToastProvider>
    )

    await screen.findByRole('button', { name: /Water plant/i })
    await user.click(screen.getByRole('button', { name: /Add note/i }))
    await user.type(screen.getByLabelText(/^Note$/i), 'My note')
    await user.click(screen.getByRole('button', { name: /Confirm/i }))
    expect(await screen.findByText(/Note added/i)).toBeInTheDocument()
  })
})
