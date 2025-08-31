import { render, screen } from '@testing-library/react'
import PlantCard from '../PlantCard'

describe('PlantCard', () => {
  it('renders plant details', () => {
    render(
      <PlantCard
        nickname="Fern"
        species="Pteridophyta"
        status="Healthy"
        hydration={55.4}
        note="Needs sun"
      />
    )

    expect(screen.getByText(/fern/i)).toBeInTheDocument()
    expect(screen.getByText(/pteridophyta/i)).toBeInTheDocument()
    expect(screen.getByText(/healthy/i)).toBeInTheDocument()
    expect(screen.getByText(/needs sun/i)).toBeInTheDocument()
    expect(screen.getByText(/Hydration: 55%/i)).toBeInTheDocument()
  })
})
