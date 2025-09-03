'use client'

import {
  Droplet,
  Sprout,
  Calendar,
  Activity,
  Battery,
} from 'lucide-react'
import { useState } from 'react'
import {
  calculateNutrientAvailability,
  calculateStressIndex,
} from '@/lib/plant-metrics'
import type { Plant } from './types'
import type { Weather } from '@/lib/weather'

interface QuickStatsProps {
  plant: Plant
  weather: Weather | null
}

export function calculateNextFeedDate(
  lastFertilized: string,
  nutrientLevel: number,
) {
  const current = calculateNutrientAvailability(lastFertilized, nutrientLevel)
  const daysLeft = Math.max(0, Math.ceil((current - 30) / 2))
  const date = new Date()
  date.setDate(date.getDate() + daysLeft)
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function QuickStats({ plant, weather }: QuickStatsProps) {
  const stressValue = Math.round(
    calculateStressIndex({
      overdueDays: plant.status === 'Water overdue' ? 1 : 0,
      hydration: plant.hydration,
      temperature: weather?.temperature ?? 25,
      light: 50,
    }),
  )

  const metricExplanations = [
    "Last watered: The most recent date you logged watering for this plant.",
    "Next due: The recommended next watering date and amount based on plant needs.",
    "Next feed: When to fertilize next, calculated from last fertilization and nutrient level.",
    "Hydration: Current soil moisture percentage, estimated from logs and environment.",
    "Stress: Calculated index based on hydration, overdue care, and environment. Lower is better.",
  ];

  const [infoIdx, setInfoIdx] = useState<number | null>(null);

  const stats = [
    {
      icon: Droplet,
      text: `${plant.lastWatered} (Last watered)`,
    },
    {
      icon: Calendar,
      text: `${plant.nextDue}${
        plant.recommendedWaterMl !== undefined
          ? ` (~${plant.recommendedWaterMl} ml)`
          : ''
      }`,
    },
    {
      icon: Sprout,
      text: `${calculateNextFeedDate(
        plant.lastFertilized,
        plant.nutrientLevel ?? 100,
      )} (Next feed)`,
    },
    {
      icon: Battery,
      text: `${plant.hydration}% Hydration`,
    },
    {
      icon: Activity,
      text: `${stressLabel} Stress`,
    },
  ];

  return (
    <ul
      className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-700 dark:text-gray-200"
      role="list"
      aria-label="Quick plant statistics"
    >
      {/* Metric explanations for scientific clarity */}
      <li className="w-full text-xs text-gray-500 dark:text-gray-400 mb-1" aria-live="polite">
        <span><strong>Stats:</strong> Last watered, next feed, hydration, and stress are calculated from your plant’s data and environment. Click ℹ️ for more info.</span>
      </li>
      {stats.map(({ icon: Icon, text }, idx) => (
        <li
          key={text}
          className="flex items-center gap-1 after:content-['|'] last:after:content-[''] after:mx-2 after:text-gray-300"
          role="listitem"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          <span tabIndex={0} aria-label={text} title={text}>{text}</span>
          <button
            type="button"
            aria-label={`Explain ${text}`}
            title="Metric explanation"
            className="ml-1 text-blue-500 hover:underline focus:outline-none focus:ring"
            onClick={() => setInfoIdx(idx)}
          >
            ℹ️
          </button>
          {infoIdx === idx && (
            <span className="ml-2 text-xs text-gray-600 dark:text-gray-400" role="alert">
              {metricExplanations[idx]}
              <button className="ml-2 text-blue-500 underline" onClick={() => setInfoIdx(null)} aria-label="Close info">Close</button>
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
