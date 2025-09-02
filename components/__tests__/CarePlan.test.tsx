import { render, screen } from '@testing-library/react'
import CarePlan from '../plant-detail/CarePlan'

describe('CarePlan', () => {
  it('shows placeholder when plan is empty', () => {
    render(<CarePlan plan={''} nickname="Delilah" />)
    expect(screen.getByText(/No care plan available/i)).toBeInTheDocument()
  })

  it('renders all care sections', () => {
    const plan = {
      overview: 'General care overview',
      light: 'Bright, indirect light',
      water: 'Every 7–10 days',
      humidity: 'Moderate humidity',
      temperature: '65-75°F',
      soil: 'Well-draining potting mix',
      fertilizer: 'Feed monthly',
      pruning: 'Trim as needed',
      pests: 'Watch for aphids',
    }
    render(<CarePlan plan={plan} nickname="Delilah" />)
    expect(screen.getByText(/Care Plan for Delilah/i)).toBeInTheDocument()

    expect(screen.getByText(/Light Needs/i)).toBeVisible()
    expect(screen.getByText(/Watering Frequency/i)).toBeVisible()
    expect(screen.getByText(/Pests/i)).toBeVisible()

    expect(screen.queryByText(/More care tips/i)).not.toBeInTheDocument()
  })
})

