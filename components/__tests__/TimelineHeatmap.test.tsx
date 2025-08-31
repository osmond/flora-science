import { render, screen } from '@testing-library/react'
import { TimelineHeatmap } from '../Charts'

describe('TimelineHeatmap', () => {
  it('renders cells for each date and type', () => {
    const activity = {
      '2024-01-01': { water: 1 },
      '2024-01-02': { water: 2, fertilize: 1 },
    }
    render(<TimelineHeatmap activity={activity} />)
    expect(screen.getAllByTestId('heatmap-cell')).toHaveLength(4)
    expect(screen.getByTitle('water on 2024-01-02: 2')).toBeInTheDocument()
  })
})
