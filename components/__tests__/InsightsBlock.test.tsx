import { render, screen } from '@testing-library/react'
import InsightsBlock from '../InsightsBlock'

describe('InsightsBlock', () => {
  it('displays metrics', () => {
    render(
      <InsightsBlock
        overduePercent={10}
        avgWateringInterval={5}
        longestStreakPlant="Ivy"
        nextDayWaterTasks={1}
        nextDayFertilizeTasks={2}
        nextDayNoteTasks={3}
      />
    )
    expect(screen.getByText(/10% of plants are overdue/)).toBeInTheDocument()
    expect(screen.getByText(/Avg watering interval 5 days/)).toBeInTheDocument()
    expect(screen.getByText(/Longest on-time streak: Ivy/)).toBeInTheDocument()
    expect(
      screen.getByText(/Tasks due tomorrow: 1 water, 2 fertilize, 3 notes/)
    ).toBeInTheDocument()
  })
})
