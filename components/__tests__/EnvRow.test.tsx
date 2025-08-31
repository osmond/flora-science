import { render, screen } from '@testing-library/react'
import EnvRow from '../EnvRow'

describe('EnvRow', () => {
  it('renders formatted environment readings', () => {
    render(<EnvRow temperature={75} humidity={52} vpd={1.2} />)
    expect(screen.getByText('75.0°F')).toBeInTheDocument()
    expect(screen.getByText('52% RH')).toBeInTheDocument()
    expect(screen.getByText('1.2 kPa')).toBeInTheDocument()
  })
})

