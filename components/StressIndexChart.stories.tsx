import React from "react"
import { StressIndexChart } from "./Charts"
import type { StressDatum } from "@/lib/plant-metrics"

const sampleData: StressDatum[] = [
  {
    date: "2024-01-01",
    stress: 20,
    factors: { overdue: 5, hydration: 5, temperature: 5, light: 5 },
  },
  {
    date: "2024-01-02",
    stress: 40,
    factors: { overdue: 10, hydration: 15, temperature: 5, light: 10 },
  },
  {
    date: "2024-01-03",
    stress: 60,
    factors: { overdue: 15, hydration: 20, temperature: 10, light: 15 },
  },
]

const meta = {
  title: "Charts/StressIndexChart",
  component: StressIndexChart,
}
export default meta

export const Default = () => <StressIndexChart data={sampleData} />

export const Empty = () => <StressIndexChart data={[]} />

