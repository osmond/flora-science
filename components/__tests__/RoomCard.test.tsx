import { render, screen } from '@testing-library/react'
import RoomCard from '../RoomCard'

describe('RoomCard', () => {
  it('renders room info', () => {
    render(<RoomCard name="Living Room" avgHydration={70.2} tasksDue={3} />)

    expect(screen.getByText(/living room/i)).toBeInTheDocument()
    expect(screen.getByText(/Avg Hydration: 70%/i)).toBeInTheDocument()
    expect(screen.getByText(/3 tasks due/i)).toBeInTheDocument()
  })
})
