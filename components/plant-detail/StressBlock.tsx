'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import ChartCard from '@/components/ChartCard'
import { type StressDatum } from '@/lib/plant-metrics'

const StressIndexChart = dynamic(
  () => import('@/components/Charts').then((m) => m.StressIndexChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)

interface StressBlockProps {
  stressData: StressDatum[]
}

export default function StressBlock({ stressData }: StressBlockProps) {
  const [open, setOpen] = useState(false)
  return (
    <details id="plant-health" open={open}>
      <summary
        className="flex items-center gap-1 text-lg font-semibold cursor-pointer py-2 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
        onClick={() => setOpen((o) => !o)}
      >
        Plant Health
      </summary>
      <p className="text-sm text-gray-500 mb-4">Stress index overview.</p>
      <ChartCard title="Stress Trend" insight="Stress trending down" variant="secondary">
        <StressIndexChart data={stressData} />
      </ChartCard>
    </details>
  )
}

