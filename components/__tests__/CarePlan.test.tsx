import { render, screen, within } from '@testing-library/react'
import CarePlan from '../plant-detail/CarePlan'

describe('CarePlan', () => {
  it('shows placeholder when plan is empty', () => {
    render(<CarePlan plan={''} nickname="Delilah" />)
    expect(screen.getByText(/No care plan available/i)).toBeInTheDocument()
  })

  it('renders provided plan sections', () => {
    const plan = {
      light: 'Bright, indirect light',
      water: 'Every 7–10 days',
      humidity: 'Moderate humidity',
      temperature: '65-75°F',
      soil: 'Well-draining soil',
      fertilization: 'Monthly fertilizer',
      pruning: 'Trim yellow leaves',
      pests: 'Check for spider mites',
      overview: 'Keep soil moist but not soggy.',
    }

    render(<CarePlan plan={JSON.stringify(plan)} nickname="Delilah" />)

    const expected = {
      Light: plan.light,
      Water: plan.water,
      Humidity: plan.humidity,
      Temperature: plan.temperature,
      Soil: plan.soil,
      Fertilization: plan.fertilization,
      Pruning: plan.pruning,
      Pests: plan.pests,
      Overview: plan.overview,
    }

    Object.entries(expected).forEach(([label, text]) => {
      const item = screen.getByText(new RegExp(`${label}:`, 'i')).closest('li')
      expect(item).toBeInTheDocument()
      expect(within(item as HTMLElement).getByText(text)).toBeInTheDocument()
      expect(item?.querySelector('svg')).toBeInTheDocument()
    })
  })
})

