import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CarePlan from '../plant-detail/CarePlan'

describe('CarePlan', () => {
  it('shows placeholder when plan is empty', () => {
    render(<CarePlan plan={''} nickname="Delilah" />)
    expect(screen.getByText(/No care plan available/i)).toBeInTheDocument()
  })

  it('renders provided plan sections with collapsible details', async () => {
    render(
      <CarePlan
        plan={'Light: Bright, indirect light\nWater: Every 7–10 days'}
        nickname="Delilah"
      />
    )
    const user = userEvent.setup()

    expect(screen.getByText(/Care Plan for Delilah/i)).toBeInTheDocument()
    // Summary is shown
    expect(screen.getAllByText(/Bright, indirect light/i)).toHaveLength(1)
    // Expand details
    await user.click(screen.getByRole('button', { name: /Light/i }))
    expect(screen.getAllByText(/Bright, indirect light/i)).toHaveLength(2)
  })
})

