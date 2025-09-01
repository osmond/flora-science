import { render } from '@testing-library/react'
import PlantList from '../PlantList'
import { samplePlants } from '@/lib/plants'

describe('PlantList', () => {
  it('renders all plants when not grouped', () => {
    const entries = Object.entries(samplePlants)
    const { container } = render(<PlantList plants={entries} groupBy="none" />)
    expect(container.querySelectorAll('a').length).toBe(entries.length)
  })
})
