import { render, screen } from '@testing-library/react'
import HeroSection from '../plant-detail/HeroSection'
import type { Plant } from '../plant-detail/types'

const basePlant: Plant = {
  nickname: 'Fern',
  species: 'Pteridophyta',
  status: 'Healthy',
  hydration: 0,
  hydrationLog: [],
  lastWatered: 'Jan 1',
  nextDue: 'Jan 2',
  lastFertilized: 'Jan 1',
  potSize: 10,
  recommendedWaterMl: 100,
  nutrientLevel: 80,
  events: [],
  photos: [],
}

function renderHero(hydration: number) {
  render(
    <HeroSection
      plant={{ ...basePlant, hydration }}
      weather={null}
    />,
  )
}

describe('HeroSection hydration bar', () => {
  it('shows water color and High label when hydration is above 70', () => {
    renderHero(80)
    const progress = screen.getByRole('progressbar', { name: /hydration/i })
    const bar = progress.querySelector('div') as HTMLElement
    expect(bar).toHaveClass('bg-water')
    expect(progress).toHaveAttribute('aria-valuenow', '80')
    expect(progress).toHaveAttribute('aria-valuetext', '80% hydration')
    expect(screen.getByText(/high/i)).toBeInTheDocument()
  })

  it('shows alert-red color and Low label when hydration is below 30', () => {
    renderHero(20)
    const progress = screen.getByRole('progressbar', { name: /hydration/i })
    const bar = progress.querySelector('div') as HTMLElement
    expect(bar).toHaveClass('bg-alert-red')
    expect(screen.getByText(/low/i)).toBeInTheDocument()
  })

})
