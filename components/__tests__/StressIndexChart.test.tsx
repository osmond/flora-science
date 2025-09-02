import { render, screen } from '@testing-library/react'
import { StressIndexChart } from '../Charts'

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

describe('StressIndexChart', () => {
  it('renders fallback when data is empty', () => {
    render(<StressIndexChart data={[]} />)
    expect(
      screen.getByText('No stress readings available')
    ).toBeInTheDocument()
  })
})

