import { render, screen } from '@testing-library/react'
import { ComparativeChart } from '../Charts'
import { collectPlantMetrics } from '@/lib/plant-metrics'
import { samplePlants } from '@/lib/plants'

jest.mock('recharts', () => {
  const original = jest.requireActual('recharts')
  const React = require('react')
  return {
    ...original,
    ResponsiveContainer: ({ children }: any) => (
      <div style={{ width: 400, height: 300 }}>
        {React.cloneElement(children, { width: 400, height: 300 })}
      </div>
    ),
  }
})

describe('ComparativeChart', () => {
  it('renders a line for each plant', () => {
    const plants = [samplePlants['1'], samplePlants['2']]
    const data = collectPlantMetrics(plants)
    render(<ComparativeChart plants={plants} data={data} />)
    const lines = screen.getAllByTestId(/comparative-line-/)
    expect(lines).toHaveLength(plants.length)
    const strokes = lines.map((l) => l.getAttribute('stroke'))
    expect(new Set(strokes).size).toBe(plants.length)
  })
})
