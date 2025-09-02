import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PlantCard from '../PlantCard'

describe('PlantCard', () => {
  it('renders plant details with sparkline and care streak', () => {
    render(
      <PlantCard
        nickname="Fern"
        species="Pteridophyta"
        status="Water overdue"
        hydration={55.4}
        tasks={{ water: 1, fertilize: 0, notes: 2 }}
        note="Needs sun"
        photo="https://example.com/fern.jpg"
        hydrationHistory={[40, 45, 50, 55, 53, 60, 55]}
        onMarkDone={() => {}}
      />
    )

    const progress = screen.getByRole('progressbar')
    expect(progress).toHaveAttribute('aria-valuenow', '55')
    expect(progress).toHaveAttribute('aria-valuemin', '0')
    expect(progress).toHaveAttribute('aria-valuemax', '100')
    expect(screen.getByText(/moderate/i)).toBeInTheDocument()

    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/fern.jpg')
    expect(screen.getByText(/fern/i)).toBeInTheDocument()
    expect(screen.getByText(/pteridophyta/i)).toBeInTheDocument()
    expect(screen.getByText(/water overdue/i)).toBeInTheDocument()
    expect(screen.getByText(/needs sun/i)).toBeInTheDocument()
    expect(screen.getAllByTestId('water-dot')).toHaveLength(7)
    expect(screen.getByLabelText('1 water tasks')).toBeInTheDocument()
    expect(screen.getByLabelText('2 notes tasks')).toBeInTheDocument()
  })

  it('calls onMarkDone when button clicked', async () => {
    const fn = jest.fn()
    render(
      <PlantCard
        nickname="Fern"
        species="Pteridophyta"
        status="Water overdue"
        hydration={55.4}
        tasks={{ water: 1, fertilize: 0, notes: 0 }}
        onMarkDone={fn}
      />
    )
    const btn = screen.getByRole('button', { name: /mark done/i })
    await userEvent.click(btn)
    expect(fn).toHaveBeenCalled()
  })
})
