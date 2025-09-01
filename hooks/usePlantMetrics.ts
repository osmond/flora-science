import { useMemo } from "react"
import { parse, format, subDays, differenceInDays, addDays, isSameDay } from "date-fns"
import type { Plant } from "@/lib/plants"

export type PlantEntry = [string, Plant]

export interface PlantMetrics {
  plantsCount: number
  avgHydration: number
  tasksDue: number
  waterTasks: number
  fertilizeTasks: number
  noteTasks: number
  waterOverdue: boolean
  fertilizeOverdue: boolean
  noteOverdue: boolean
  overduePercent: number
  avgWateringInterval: number
  longestStreakPlant: string
  taskStreak: number
  nextDayWaterTasks: number
  nextDayFertilizeTasks: number
  nextDayNoteTasks: number
}

export function usePlantMetrics(plants: PlantEntry[]): PlantMetrics {
  return useMemo(() => {
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
    const longestStreakPlant = plantStreaks.reduce(
      (max, p) => (p.streak > max.streak ? p : max),
      { plant: "", streak: 0 }
    ).plant
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
    return {
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
    }
  }, [plants])
}

export default usePlantMetrics
