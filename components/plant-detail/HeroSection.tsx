'use client'

import Image from 'next/image'
import { Droplet, Sprout, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { getHydrationProgress } from '@/components/PlantCard'
import QuickStats, { calculateNextFeedDate } from './QuickStats'
import type { Plant } from './types'
import type { Weather } from '@/lib/weather'

interface HeroSectionProps {
  plant: Plant
  weather: Weather | null
  onWater: () => void
  onFertilize: () => void
  onAddNote: () => void
}

export default function HeroSection({
  plant,
  weather,
  onWater,
  onFertilize,
  onAddNote,
}: HeroSectionProps) {
  const progress = getHydrationProgress(plant.hydration)
  const [nextWaterDue, setNextWaterDue] = useState(plant.nextDue)
  const [nextFeedDate, setNextFeedDate] = useState(
    calculateNextFeedDate(plant.lastFertilized, plant.nutrientLevel ?? 100)
  )

  useEffect(() => {
    setNextWaterDue(plant.nextDue)
  }, [plant.nextDue])

  useEffect(() => {
    setNextFeedDate(
      calculateNextFeedDate(plant.lastFertilized, plant.nutrientLevel ?? 100)
    )
  }, [plant.lastFertilized, plant.nutrientLevel])

  function isPast(dateStr: string) {
    const year = new Date().getFullYear()
    const date = new Date(`${dateStr} ${year}`)
    return date < new Date()
  }

  const waterOverdue = isPast(nextWaterDue)
  const feedOverdue = isPast(nextFeedDate)

  const nextWaterDate = new Date(`${nextWaterDue} ${new Date().getFullYear()}`)
  const nextTaskText = `Needs water ${formatDistanceToNow(nextWaterDate, {
    addSuffix: true,
  })}${
    plant.recommendedWaterMl !== undefined
      ? ` (~${plant.recommendedWaterMl} ml)`
      : ''
  }`

  return (
    <section className="space-y-4">
      <div className="relative rounded-xl overflow-hidden">
        {plant.photos && plant.photos.length > 0 ? (
          <Image
            src={plant.photos[0]}
            alt={plant.nickname}
            width={1200}
            height={800}
            sizes="100vw"
            className="w-full h-64 sm:h-80 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-64 sm:h-80 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <span className="text-gray-500 dark:text-gray-400">No photo</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4 sm:p-6">
          <h1 className="text-2xl font-semibold text-white">
            {plant.nickname} ·{' '}
            <span className="italic font-normal">{plant.species}</span>
          </h1>
          <p className="mt-1 text-lg font-medium text-white">{nextTaskText}</p>
        </div>
      </div>

      <QuickStats plant={plant} weather={weather} />

      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
        <button
          onClick={onWater}
          aria-label="Water plant"
          className={`flex items-center gap-1 px-3 py-1 rounded-full border text-sm ${
            waterOverdue
              ? 'bg-amber-50 text-blue-700 border-blue-300'
              : 'bg-blue-50 text-blue-700 border-blue-200'
          }`}
        >
          <Droplet className="h-4 w-4" />
          Water
        </button>
        <button
          onClick={onFertilize}
          aria-label="Fertilize plant"
          className={`flex items-center gap-1 px-3 py-1 rounded-full border text-sm ${
            feedOverdue
              ? 'bg-amber-50 text-green-700 border-green-300'
              : 'bg-green-50 text-green-700 border-green-200'
          }`}
        >
          <Sprout className="h-4 w-4" />
          Feed
        </button>
        <button
          onClick={onAddNote}
          aria-label="Add note to plant"
          className="flex items-center gap-1 px-3 py-1 rounded-full border bg-purple-50 text-purple-700 text-sm border-purple-200"
        >
          <FileText className="h-4 w-4" />
          Add Note
        </button>
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-sm">
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
          {plant.status}
        </span>
      </div>
      <div
        className="w-full bg-gray-200 rounded-full h-2"
        role="progressbar"
        aria-label="Hydration"
        aria-valuenow={progress.pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${progress.pct}% hydration`}
      >
        <div
          className={`h-2 rounded-full ${progress.barColor}`}
          style={{ width: `${progress.pct}%` }}
        />
        <span className="sr-only">{`${progress.pct}% hydration`}</span>
      </div>
    </section>
  )
}
