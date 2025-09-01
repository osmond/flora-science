import { render, screen } from '@testing-library/react'
import CarePlan from '../plant-detail/CarePlan'

describe('CarePlan', () => {
  it('shows placeholder when plan is empty', () => {
    render(<CarePlan plan={''} />)
    expect(screen.getByText(/No care plan available/i)).toBeInTheDocument()
  })

  it('renders provided plan text', () => {
    render(<CarePlan plan={'Water daily'} />)
    expect(screen.getByText(/Water daily/i)).toBeInTheDocument()
  })
})
