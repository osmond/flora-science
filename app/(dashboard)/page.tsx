"use client"

import Link from "next/link"
import { useState } from "react"
import PlantCard from "@/components/PlantCard"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { samplePlants } from "@/lib/plants"
import { parse, format, subDays, differenceInDays, addDays, isSameDay } from "date-fns"

type GroupBy = "status" | "room" | "none"
type SortBy = "hydration" | "alpha" | "lastWatered"

export default function TodayPage() {
  const [groupBy, setGroupBy] = useState<GroupBy>("none")
  const [sortBy, setSortBy] = useState<SortBy>("alpha")

  const plants = Object.entries(samplePlants)
  const plantsCount = plants.length
  const avgHydration = Math.round(
    plants.reduce((sum, [, p]) => sum + p.hydration, 0) / plantsCount
  )
  const tasksDue = plants.filter(([, p]) => p.status.toLowerCase().includes("due")).length
  const waterTasks = plants.filter(([, p]) => {
    const s = p.status.toLowerCase()
    return s.includes("water overdue") || (s.includes("due") && !s.includes("fertilize"))
  }).length
  const fertilizeTasks = plants.filter(([, p]) => p.status.toLowerCase().includes("fertilize")).length
  const noteTasks = plants.filter(([, p]) => p.status.toLowerCase().includes("note")).length
  const waterOverdue = plants.some(([, p]) => p.status.toLowerCase().includes("water overdue"))
  const fertilizeOverdue = plants.some(([, p]) => p.status.toLowerCase().includes("fertilize overdue"))
  const noteOverdue = plants.some(([, p]) => p.status.toLowerCase().includes("note overdue"))
  const overduePercent = Math.round(
    (plants.filter(([, p]) => p.status.toLowerCase().includes("overdue")).length / plantsCount) * 100
  )
  const avgWateringInterval = Math.round(
    plants.reduce((sum, [, p]) => {
      return sum + differenceInDays(new Date(), parse(`${p.lastWatered} 2024`, "MMM d yyyy", new Date()))
    }, 0) / plantsCount
  )
  const plantStreaks = plants.map(([, p]) => {
    const dates = p.events.map((e) => parse(`${e.date} 2024`, "MMM d yyyy", new Date()))
    const set = new Set(dates.map((d) => format(d, "yyyy-MM-dd")))
    let streak = 0
    if (set.size > 0) {
      let current = dates.reduce((a, b) => (a > b ? a : b))
      while (set.has(format(current, "yyyy-MM-dd"))) {
        streak++
        current = subDays(current, 1)
      }
    }
    return { plant: p.nickname, streak }
  })
  const longestStreakPlant = plantStreaks.reduce((max, p) => (p.streak > max.streak ? p : max), { plant: "", streak: 0 }).plant
  const tomorrow = addDays(new Date(), 1)
  const nextDayTasks = plants.filter(([, p]) =>
    isSameDay(parse(`${p.nextDue} 2024`, "MMM d yyyy", new Date()), tomorrow)
  )
  const nextDayWaterTasks = nextDayTasks.filter(([, p]) => {
    const s = p.status.toLowerCase()
    return s.includes("water") || (!s.includes("fertilize") && !s.includes("note"))
  }).length
  const nextDayFertilizeTasks = nextDayTasks.filter(([, p]) => p.status.toLowerCase().includes("fertilize")).length
  const nextDayNoteTasks = nextDayTasks.filter(([, p]) => p.status.toLowerCase().includes("note")).length
  const eventDates = plants.flatMap(([, p]) =>
    p.events.map((e) => parse(`${e.date} 2024`, "MMM d yyyy", new Date()))
  )
  const dateSet = new Set(eventDates.map((d) => format(d, "yyyy-MM-dd")))
  let taskStreak = 0
  if (dateSet.size > 0) {
    let current = eventDates.reduce((a, b) => (a > b ? a : b))
    while (dateSet.has(format(current, "yyyy-MM-dd"))) {
      taskStreak++
      current = subDays(current, 1)
    }
  }
  const avgHydrationHistory = [65, 70, 68, 72, 75]

  const sortedPlants = [...plants].sort((a, b) => {
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

  const grouped = groupBy === "none" ? { All: sortedPlants } : sortedPlants.reduce<Record<string, typeof sortedPlants>>((acc, plant) => {
    const key = groupBy === "status" ? plant[1].status : plant[1].room
    if (!acc[key]) acc[key] = []
    acc[key].push(plant)
    return acc
  }, {})

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
      <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto">
          <header className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-gray-900/70 p-2 flex items-center justify-between md:hidden">
            <span className="font-medium">Today</span>
            <button className="p-2 rounded-full bg-green-500 text-white">＋</button>
          </header>

          <header className="mt-4 mb-4 hidden md:block">
            <h2 className="text-xl font-bold">Today</h2>
            <p className="text-sm text-gray-500">
              {plantsCount} plants · Avg hydration {avgHydration}% · {tasksDue} tasks due today
            </p>
          </header>

          <div className="flex gap-4 mb-4 items-center">
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value as GroupBy)}
              className="border rounded p-2"
            >
              <option value="none">No grouping</option>
              <option value="status">Group by status</option>
              <option value="room">Group by room</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="border rounded p-2"
            >
              <option value="alpha">Alphabetical</option>
              <option value="hydration">Hydration</option>
              <option value="lastWatered">Last watered</option>
            </select>
          </div>

          {groupBy === "none" ? (
            <section className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedPlants.map(([id, p]) => {
                const s = p.status.toLowerCase()
                const tasks = {
                  water: s.includes("water overdue") || (s.includes("due") && !s.includes("fertilize")) ? 1 : 0,
                  fertilize: s.includes("fertilize") ? 1 : 0,
                  notes: s.includes("note") ? 1 : 0,
                }
                return (
                  <Link key={id} href={`/plants/${id}`} className="block">
                    <PlantCard
                      nickname={p.nickname}
                      species={p.species}
                      status={p.status}
                      hydration={p.hydration}
                      photo={p.photos[0]}
                      hydrationHistory={p.hydrationLog.map((h) => h.value)}
                      tasks={tasks}
                      onMarkDone={() => {}}
                    />
                  </Link>
                )
              })}
            </section>
          ) : (
            <div className="space-y-4">
              {Object.entries(grouped)
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([group, items]) => (
                  <details key={group} open>
                    <summary className="cursor-pointer font-semibold">
                      {group} ({items.length})
                    </summary>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {items.map(([id, p]) => {
                        const s = p.status.toLowerCase()
                        const tasks = {
                          water:
                            s.includes("water overdue") ||
                            (s.includes("due") && !s.includes("fertilize"))
                              ? 1
                              : 0,
                          fertilize: s.includes("fertilize") ? 1 : 0,
                          notes: s.includes("note") ? 1 : 0,
                        }
                        return (
                          <Link key={id} href={`/plants/${id}`} className="block">
                            <PlantCard
                              nickname={p.nickname}
                              species={p.species}
                              status={p.status}
                              hydration={p.hydration}
                              photo={p.photos[0]}
                              hydrationHistory={p.hydrationLog.map((h) => h.value)}
                              tasks={tasks}
                              onMarkDone={() => {}}
                            />
                          </Link>
                        )
                      })}
                    </div>
                  </details>
                ))}
            </div>
          )}


          <section className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Insights</h3>
            <ul className="list-disc pl-5 text-sm">
              <li>{overduePercent}% of plants are overdue</li>
              <li>Avg watering interval {avgWateringInterval} days</li>
              <li>Longest on-time streak: {longestStreakPlant || "N/A"}</li>
              <li>
                Tasks due tomorrow: {nextDayWaterTasks} water, {nextDayFertilizeTasks} fertilize, {nextDayNoteTasks} notes
              </li>
            </ul>
          </section>


          <Footer />
        </div>
      </main>
    </>
  )
}
