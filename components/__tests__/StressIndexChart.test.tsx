import { render, screen } from '@testing-library/react'
import { StressIndexChart } from '../Charts'
import { STRESS_LOW_MAX, STRESS_HIGH_MIN } from '@/lib/constants'

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

  it('optionally renders average line', () => {
    const data = [
      {
        date: '2024-01-01',
        stress: 20,
        avg: 20,
        factors: { overdue: 5, hydration: 5, temperature: 5, light: 5 },
      },
      {
        date: '2024-01-02',
        stress: 40,
        avg: 30,
        factors: { overdue: 10, hydration: 15, temperature: 5, light: 10 },
      },
    ]
    const { rerender } = render(
      <StressIndexChart data={data} showAverage={false} />,
    )
    expect(screen.queryByText('Avg')).not.toBeInTheDocument()
    rerender(<StressIndexChart data={data} showAverage />)
    expect(screen.getByText('Avg')).toBeInTheDocument()
  })

  it('shows legend entry for events', () => {
    const data = [
      {
        date: '2024-01-01',
        stress: 20,
        factors: { overdue: 5, hydration: 5, temperature: 5, light: 5 },
      },
      {
        date: '2024-01-02',
        stress: 40,
        factors: { overdue: 10, hydration: 15, temperature: 5, light: 10 },
      },
    ]
    const events = [{ date: '2024-01-02', type: 'Watered' }]
    render(<StressIndexChart data={data} events={events} />)
    expect(screen.getByText('Event')).toBeInTheDocument()
  })

  it('labels stress tiers for accessibility', () => {
    const data = [
      {
        date: '2024-01-01',
        stress: 20,
        factors: { overdue: 5, hydration: 5, temperature: 5, light: 5 },
      },
    ]
    render(<StressIndexChart data={data} />)
    expect(
      screen.getByLabelText(`Low (0-${STRESS_LOW_MAX})`)
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText(`Moderate (${STRESS_LOW_MAX}-${STRESS_HIGH_MIN})`)
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText(`High (${STRESS_HIGH_MIN}-100)`)
    ).toBeInTheDocument()
  })
})

