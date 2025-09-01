import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CarePlan from '../plant-detail/CarePlan'

describe('CarePlan', () => {
  it('shows placeholder when plan is empty', () => {
    render(<CarePlan plan={''} nickname="Delilah" />)
    expect(screen.getByText(/No care plan available/i)).toBeInTheDocument()
  })

  it('renders provided plan sections with icons and collapsible details', async () => {
    const plan = {
      overview: 'General care overview',
      light: 'Bright, indirect light',
      water: 'Every 7–10 days',
      humidity: 'Moderate humidity',
      temperature: '65-75°F',
      soil: 'Well-draining potting mix',
      fertilization: 'Feed monthly',
      pruning: 'Trim as needed',
      pests: 'Watch for aphids',
    }

    render(<CarePlan plan={plan} nickname="Delilah" />)
    const user = userEvent.setup()

    expect(screen.getByText(/Care Plan for Delilah/i)).toBeInTheDocument()

    for (const [key, text] of Object.entries(plan)) {
      const label = key.charAt(0).toUpperCase() + key.slice(1)
      const button = screen.getByRole('button', { name: new RegExp(label, 'i') })
      expect(button.querySelector('svg')).toBeInTheDocument()
      await user.click(button)
      expect(screen.getByText(text)).toBeInTheDocument()
    }
  })
})

