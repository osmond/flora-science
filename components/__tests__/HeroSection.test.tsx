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
      onWater={() => {}}
      onFertilize={() => {}}
      onAddNote={() => {}}
      onEdit={() => {}}
    />,
  )
}

describe('HeroSection hydration bar', () => {
  it('uses fertilize to water gradient when hydration is at least 60', () => {
    renderHero(60)
    const progress = screen.getByRole('progressbar', { name: /hydration/i })
    const bar = progress.querySelector('div') as HTMLElement
    expect(bar).toHaveClass('from-fertilize')
    expect(bar).toHaveClass('to-water')
    expect(progress).toHaveAttribute('aria-valuenow', '60')
    expect(progress).toHaveAttribute('aria-valuetext', '60% hydration')
  })

  it('uses alert gradient when hydration is below 60', () => {
    renderHero(59)
    const progress = screen.getByRole('progressbar', { name: /hydration/i })
    const bar = progress.querySelector('div') as HTMLElement
    expect(bar).toHaveClass('from-alert')
    expect(bar).toHaveClass('to-alert-red')
  })

  it('renders an Edit button', () => {
    renderHero(80)
    expect(screen.getByRole('button', { name: /edit plant/i })).toBeInTheDocument()
  })
})
