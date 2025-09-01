'use client'

import Link from 'next/link'
import { Activity, Droplet, Calendar } from 'lucide-react'
import { calculateStressIndex } from '@/lib/plant-metrics'
import type { Plant } from './types'
import type { Weather } from '@/lib/weather'

interface VitalsSummaryProps {
  plant: Plant
  weather: Weather | null
}

export default function VitalsSummary({ plant, weather }: VitalsSummaryProps) {
  const stressValue = Math.round(
    calculateStressIndex({
      overdueDays: plant.status === 'Water overdue' ? 1 : 0,
      hydration: plant.hydration,
      temperature: weather?.temperature ?? 25,
      light: 50,
    }),
  )

  const stressLabel =
    stressValue < 30 ? 'Low' : stressValue <= 70 ? 'Moderate' : 'High'

  return (
    <div className="flex justify-around mb-6">
      <Link href="#plant-health" className="flex flex-col items-center gap-2">
        <Activity className="h-8 w-8" strokeWidth={3} />
        <span className="text-2xl font-bold">{stressLabel} Stress</span>
      </Link>
      <Link href="#hydration" className="flex flex-col items-center gap-2">
        <Droplet className="h-8 w-8" strokeWidth={3} />
        <span className="text-2xl font-bold">{plant.hydration}% Hydration</span>
      </Link>
      <Link href="#hydration" className="flex flex-col items-center gap-2">
        <Calendar className="h-8 w-8" strokeWidth={3} />
        <span className="text-2xl font-bold">Next water {plant.nextDue}</span>
      </Link>
    </div>
  )
}

