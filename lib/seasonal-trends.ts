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

