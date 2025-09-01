import { render, screen } from '@testing-library/react'
import PlantCard from '../PlantCard'

describe('PlantCard', () => {
  it('renders plant details with sparkline and care streak', () => {
    render(
      <PlantCard
        nickname="Fern"
        species="Pteridophyta"
        status="Water overdue"
        hydration={55.4}
        tasksDue={3}
        note="Needs sun"
        photo="https://example.com/fern.jpg"
        hydrationHistory={[40, 45, 50, 55, 53, 60, 55]}
      />
    )

    const progress = screen.getByRole('progressbar')
    expect(progress).toHaveAttribute('aria-valuenow', '55')
    expect(progress).toHaveAttribute('aria-valuemin', '0')
    expect(progress).toHaveAttribute('aria-valuemax', '100')

    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/fern.jpg')
    expect(screen.getByText(/fern/i)).toBeInTheDocument()
    expect(screen.getByText(/pteridophyta/i)).toBeInTheDocument()
    expect(screen.getByText(/water overdue/i)).toBeInTheDocument()
    expect(screen.getByText(/needs sun/i)).toBeInTheDocument()
    expect(screen.getAllByTestId('water-dot')).toHaveLength(7)
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
