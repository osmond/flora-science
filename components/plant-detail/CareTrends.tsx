'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { PlantEvent } from './types'

const CareTrendsChart = dynamic(
  () => import('@/components/Charts').then((m) => m.CareTrendsChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)

interface CareTrendsProps {
  events: PlantEvent[]
}

export default function CareTrends({ events }: CareTrendsProps) {
  const [view, setView] = useState<'monthly' | 'weekly' | 'yearly'>('monthly')

  return (
    <section className="rounded-xl border p-6 shadow-sm bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Care Trends</h2>
        <div className="flex gap-2 text-sm">
          {(['monthly', 'weekly', 'yearly'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 rounded-full capitalize transition-colors ${
                view === v
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-2">
        100% tasks completed on time this month
      </p>
      <CareTrendsChart events={events} view={view} />
    </section>
  )
}
