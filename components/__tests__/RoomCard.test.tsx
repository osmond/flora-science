import { render, screen } from '@testing-library/react'
import RoomCard from '../RoomCard'

describe('RoomCard', () => {
  it('renders room info with hydration progress and tasks badge', () => {
    render(
      <RoomCard
        id="living-room"
        name="Living Room"
        avgHydration={70.2}
        tasksDue={3}
        tags={['indoor', 'bright']}
      />
    )

    const progress = screen.getByRole('progressbar')
    expect(progress).toHaveAttribute('aria-valuenow', '70')
    expect(progress).toHaveAttribute('aria-valuemin', '0')
    expect(progress).toHaveAttribute('aria-valuemax', '100')

    expect(screen.getByText(/living room/i)).toBeInTheDocument()
    expect(screen.getByText(/Avg Hydration: 70%/i)).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('indoor')).toBeInTheDocument()
    expect(screen.getByText('bright')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })
})
