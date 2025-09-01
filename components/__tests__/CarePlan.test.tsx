import { render, screen } from '@testing-library/react'
import CarePlan from '../plant-detail/CarePlan'

describe('CarePlan', () => {
  it('shows placeholder when plan is empty', () => {
    render(<CarePlan plan={''} nickname="Delilah" />)
    expect(screen.getByText(/No care plan available/i)).toBeInTheDocument()
  })

  it('renders provided plan sections', () => {
    render(
      <CarePlan
        plan={'Light: Bright, indirect light\nWater: Every 7–10 days'}
        nickname="Delilah"
      />
    )
    expect(screen.getByText(/Care Plan for Delilah/i)).toBeInTheDocument()
    expect(screen.getByText(/Bright, indirect light/i)).toBeInTheDocument()
    expect(screen.getByText(/Every 7–10 days/i)).toBeInTheDocument()
  })
})

