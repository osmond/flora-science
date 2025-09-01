'use client'

import dynamic from 'next/dynamic'
import type { PlantEvent } from './types'

const CareStreak = dynamic(
  () => import('@/components/Charts').then((m) => m.CareStreak),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)

interface CareTrendsProps {
  events: PlantEvent[]
}

export default function CareTrends({ events }: CareTrendsProps) {
  return (
    <section className="rounded-xl border p-6 shadow-sm bg-white dark:bg-gray-900">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Care Trends</h2>
      </div>
      <p className="text-sm text-gray-500 mb-2">Recent care activity</p>
      <CareStreak events={events} />
    </section>
  )
}
