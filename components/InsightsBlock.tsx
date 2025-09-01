interface InsightsBlockProps {
  overduePercent: number
  avgWateringInterval: number
  longestStreakPlant: string
  nextDayWaterTasks: number
  nextDayFertilizeTasks: number
  nextDayNoteTasks: number
}

export default function InsightsBlock({
  overduePercent,
  avgWateringInterval,
  longestStreakPlant,
  nextDayWaterTasks,
  nextDayFertilizeTasks,
  nextDayNoteTasks,
}: InsightsBlockProps) {
  return (
    <section className="mt-8">
      <h3 className="h3 font-semibold mb-2">Insights</h3>
      <ul className="list-disc pl-5 text-sm">
        <li>{overduePercent}% of plants are overdue</li>
        <li>Avg watering interval {avgWateringInterval} days</li>
        <li>Longest on-time streak: {longestStreakPlant || "N/A"}</li>
        <li>
          Tasks due tomorrow: {nextDayWaterTasks} water, {nextDayFertilizeTasks} fertilize, {nextDayNoteTasks} notes
        </li>
      </ul>
    </section>
  )
}
