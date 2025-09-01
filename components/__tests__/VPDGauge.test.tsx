import { render } from '@testing-library/react'
import { VPDGauge } from '../Charts'

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

describe('VPDGauge', () => {
  it('changes arc length when value changes', () => {
    const { rerender, getByTestId } = render(<VPDGauge value={0.5} />)
    const d1 = getByTestId('vpd-bar').getAttribute('d')
    rerender(<VPDGauge value={2} />)
    const d2 = getByTestId('vpd-bar').getAttribute('d')
    expect(d1).not.toBe(d2)
  })
})
