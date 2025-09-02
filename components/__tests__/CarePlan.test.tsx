import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CarePlan from '../plant-detail/CarePlan'

describe('CarePlan', () => {
  it('shows placeholder when plan is empty', () => {
    render(<CarePlan plan={''} nickname="Delilah" />)
    expect(screen.getByText(/No care plan available/i)).toBeInTheDocument()
  })

  it('renders primary sections and toggles secondary tips', async () => {
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

    // primary sections visible
    expect(screen.getByText(/Light Needs/i)).toBeInTheDocument()
    expect(screen.getByText(/Watering Frequency/i)).toBeInTheDocument()
    expect(screen.getByText(/Pests/i)).not.toBeVisible()

    const toggle = screen.getByText(/More care tips/i)
    await userEvent.click(toggle)

    expect(screen.getByText(/Pests/i)).toBeVisible()
  })
})

