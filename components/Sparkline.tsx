"use client"

import { LineChart, Line, XAxis, YAxis } from "recharts"

interface SparklineProps {
  data: number[]
}

export default function Sparkline({ data }: SparklineProps) {
  const chartData = data.map((value, index) => ({ index, value }))

  return (
    <LineChart
      width={60}
      height={20}
      data={chartData}
      margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
    >
      <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={2} dot={false} />
      <XAxis hide dataKey="index" />
      <YAxis hide domain={["dataMin", "dataMax"]} />
    </LineChart>
  )
}

