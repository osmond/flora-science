import { render, screen, fireEvent } from '@testing-library/react'
import CarePlan from '../plant-detail/CarePlan'

describe('CarePlan', () => {
  it('shows placeholder when plan is empty', () => {
    render(<CarePlan plan={''} nickname="Delilah" />)
    expect(screen.getByText(/No care plan available/i)).toBeInTheDocument()
  })

  it('renders provided plan sections with icons', () => {
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
    render(<CarePlan plan={plan} nickname="Delilah" photo="/plant.jpg" />)
    expect(screen.getByText(/Care Plan for Delilah/i)).toBeInTheDocument()
    expect(screen.getByAltText('Delilah')).toBeInTheDocument()
    const iconMap: Record<string, string> = {
      overview: 'book-open',
      light: 'sun',
      water: 'droplet',
      humidity: 'wind',
      temperature: 'thermometer',
      soil: 'land-plot',
      fertilizer: 'sprout',
      pruning: 'scissors',
      pests: 'bug',
    }
    fireEvent.click(screen.getByText(/Additional care/i))

    for (const [key, text] of Object.entries(plan)) {
      const label = key.charAt(0).toUpperCase() + key.slice(1)
      const heading = screen.getByRole('heading', {
        name: new RegExp(label, 'i'),
      })
      const svg = heading.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveClass(`lucide-${iconMap[key]}`)
      expect(screen.getByText(text)).toBeInTheDocument()
    }
  })
})

