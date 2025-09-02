"use client"

import { useState, useMemo } from "react"
import { parse } from "date-fns"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import ControlsBar from "@/components/ControlsBar"
import PlantList from "@/components/PlantList"
import InsightsBlock from "@/components/InsightsBlock"
import EmptyState from "@/components/EmptyState"
import ErrorState from "@/components/ErrorState"
import { samplePlants } from "@/lib/plants"
import { GroupBy, SortBy } from "@/lib/dashboardTypes"
import usePlantMetrics from "@/hooks/usePlantMetrics"

export default function TodayPage() {
  const [groupBy, setGroupBy] = useState<GroupBy>("none")
  const [sortBy, setSortBy] = useState<SortBy>("alpha")

  const plants = useMemo(
    () =>
      Object.entries(samplePlants).filter(([, p]) =>
        p.status.toLowerCase().includes("due")
      ),
    []
  )
  const {
    plantsCount,
    avgHydration,
    tasksDue,
    waterTasks,
    fertilizeTasks,
    noteTasks,
    waterOverdue,
    fertilizeOverdue,
    noteOverdue,
    overduePercent,
    avgWateringInterval,
    longestStreakPlant,
    taskStreak,
    nextDayWaterTasks,
    nextDayFertilizeTasks,
    nextDayNoteTasks,
  } = usePlantMetrics(plants)
  const avgHydrationHistory = [65, 70, 68, 72, 75]

  const sortedPlants = useMemo(() => {
    return [...plants].sort((a, b) => {
      const [, pa] = a
      const [, pb] = b
      switch (sortBy) {
        case "hydration":
          return pb.hydration - pa.hydration
        case "lastWatered":
          return (
            parse(`${pb.lastWatered} 2024`, "MMM d yyyy", new Date()).getTime() -
            parse(`${pa.lastWatered} 2024`, "MMM d yyyy", new Date()).getTime()
          )
        default:
          return pa.nickname.localeCompare(pb.nickname)
      }
    })
  }, [plants, sortBy])

  // Simulate error state for demonstration (replace with real error logic)
  const [hasError, setHasError] = useState(false);

  return (
    <>
      <Header
        plantsCount={plantsCount}
        avgHydration={avgHydration}
        tasksDue={tasksDue}
        avgHydrationHistory={avgHydrationHistory}
        taskStreak={taskStreak}
        waterTasks={waterTasks}
        fertilizeTasks={fertilizeTasks}
        noteTasks={noteTasks}
        waterOverdue={waterOverdue}
        fertilizeOverdue={fertilizeOverdue}
        noteOverdue={noteOverdue}
      />
      <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6" role="main" aria-label="Dashboard main content">
        <div className="max-w-7xl mx-auto">
          <header className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-gray-900/70 p-2 flex items-center justify-between md:hidden">
            <span className="font-medium">Today</span>
            <button className="p-2 rounded-full bg-green-500 text-white" aria-label="Add new plant">＋</button>
          </header>

          <header className="mt-4 mb-4 hidden md:block">
            <h2 className="h2 font-bold">Today</h2>
            <p className="text-sm text-gray-500">
              {plantsCount} plants · Avg hydration {avgHydration}% · {tasksDue} tasks due today
            </p>
          </header>
          <ControlsBar
            groupBy={groupBy}
            sortBy={sortBy}
            onGroupChange={setGroupBy}
            onSortChange={setSortBy}
          />

          {hasError ? (
            <ErrorState message="Unable to load plant data." onRetry={() => setHasError(false)} />
          ) : sortedPlants.length === 0 ? (
            <EmptyState title="No plants due today" description="Add a plant or check back later." actionLabel="Add Plant" onAction={() => {}} />
          ) : (
            <PlantList plants={sortedPlants} groupBy={groupBy} />
          )}

          <InsightsBlock
            overduePercent={overduePercent}
            avgWateringInterval={avgWateringInterval}
            longestStreakPlant={longestStreakPlant}
            nextDayWaterTasks={nextDayWaterTasks}
            nextDayFertilizeTasks={nextDayFertilizeTasks}
            nextDayNoteTasks={nextDayNoteTasks}
          />

          <Footer />
        </div>
      </main>
    </>
  )
}
