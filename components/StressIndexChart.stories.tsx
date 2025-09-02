import type { Meta, StoryObj } from "@storybook/react"
import { StressIndexChart } from "./Charts"
import type { StressDatum } from "@/lib/plant-metrics"

const sampleData: StressDatum[] = [
  {
    date: "2024-01-01",
    stress: 20,
    avg: 20,
    factors: { overdue: 5, hydration: 5, temperature: 5, light: 5 },
  },
  {
    date: "2024-01-02",
    stress: 40,
    avg: 30,
    factors: { overdue: 10, hydration: 15, temperature: 5, light: 10 },
  },
  {
    date: "2024-01-03",
    stress: 60,
    avg: 40,
    factors: { overdue: 15, hydration: 20, temperature: 10, light: 15 },
  },
]

const sampleEvents = [
  { date: "2024-01-02", type: "Watered" },
  { date: "2024-01-03", type: "Fertilized" },
]

const meta: Meta<typeof StressIndexChart> = {
  title: "Charts/StressIndexChart",
  component: StressIndexChart,
}
export default meta
type Story = StoryObj<typeof StressIndexChart>

export const Default: Story = {
  args: {
    data: sampleData,
    showFactors: true,
    showAverage: true,
    events: sampleEvents,
  },
}

export const Empty: Story = {
  args: {
    data: [],
  },
}

