import { render, screen } from '@testing-library/react'
import PlantCard from '../PlantCard'

describe('PlantCard', () => {
  it('renders plant details with hydration progress and tasks badge', () => {
    render(
      <PlantCard
        nickname="Fern"
        species="Pteridophyta"
        status="Healthy"
        hydration={55.4}
        tasksDue={3}
        note="Needs sun"
      />
    )

    const progress = screen.getByRole('progressbar')
    expect(progress).toHaveAttribute('aria-valuenow', '55')
    expect(progress).toHaveAttribute('aria-valuemin', '0')
    expect(progress).toHaveAttribute('aria-valuemax', '100')

    expect(screen.getByText(/fern/i)).toBeInTheDocument()
    expect(screen.getByText(/pteridophyta/i)).toBeInTheDocument()
    expect(screen.getByText(/healthy/i)).toBeInTheDocument()
    expect(screen.getByText(/needs sun/i)).toBeInTheDocument()
    expect(screen.getByText(/Hydration: 55%/i)).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
