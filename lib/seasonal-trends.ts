import type { PlantEvent } from "./plants"

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export interface CareEvent {
  date: string
  type: string
}

export interface MonthlyCareTotals {
  month: string
  water: number
  fertilize: number
}

export interface TaskCompletionTotals {
  month: string
  completed: number
  missed: number
}

export function aggregateCareByMonth(events: CareEvent[]): MonthlyCareTotals[] {
  const totals = months.map((m) => ({ month: m, water: 0, fertilize: 0 }))

  for (const e of events) {
    if (e.type !== "water" && e.type !== "fertilize") continue
    const d = new Date(e.date)
    if (isNaN(d.getTime())) continue
    const m = d.getMonth()
    if (totals[m]) totals[m][e.type as "water" | "fertilize"] += 1
  }

  return totals
}

export function aggregateTaskCompletion(
  events: CareEvent[]
): TaskCompletionTotals[] {
  const totals = months.map((m) => ({ month: m, completed: 0, missed: 0 }))

  for (const e of events) {
    if (e.type !== "completed" && e.type !== "missed") continue
    const d = new Date(e.date)
    if (isNaN(d.getTime())) continue
    const m = d.getMonth()
    if (totals[m]) totals[m][e.type as "completed" | "missed"] += 1
  }

  return totals
}

export type DailyActivity = Record<string, Record<string, number>>

export function generateDailyActivity(events: PlantEvent[]): DailyActivity {
  const activity: DailyActivity = {}
  for (const e of events) {
    const d = new Date(e.date)
    if (isNaN(d.getTime())) continue
    const dateKey = d.toISOString().split("T")[0]
    if (!activity[dateKey]) activity[dateKey] = {}
    activity[dateKey][e.type] = (activity[dateKey][e.type] || 0) + 1
  }
  return activity
}

