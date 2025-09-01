'use client'

import Image from 'next/image'
import { Droplet, Sprout, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { getHydrationProgress } from '@/components/PlantCard'
import QuickStats from './QuickStats'
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

  useEffect(() => {
    setNextWaterDue(plant.nextDue)
  }, [plant.nextDue])


  const nextWaterDate = new Date(`${nextWaterDue} ${new Date().getFullYear()}`)
  const nextTaskText = `Needs water ${formatDistanceToNow(nextWaterDate, {
    addSuffix: true,
  })}${
    plant.recommendedWaterMl !== undefined
      ? ` (~${plant.recommendedWaterMl} ml)`
      : ''
  }`

  return (
    <section className="space-y-6">
      <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
        {plant.photos && plant.photos.length > 0 ? (
          <Image
            src={plant.photos[0]}
            alt={plant.nickname}
            fill
            sizes="100vw"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <span className="text-gray-500 dark:text-gray-400">No photo</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/0 p-4 sm:p-6">
          <h1 className="text-3xl font-serif text-white">{plant.nickname}</h1>
          <p className="text-lg italic text-white/80">{plant.species}</p>
          <p className="mt-2 text-base text-white/90">{nextTaskText}</p>
        </div>
      </div>

      <QuickStats plant={plant} weather={weather} />

      <div className="flex flex-wrap justify-center sm:justify-start gap-3">
        <button
          onClick={onWater}
          aria-label="Water plant"
          className="relative group flex items-center gap-1 px-4 py-1 rounded-full border border-blue-300 text-sm text-blue-700 bg-white/30 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 transition-colors"
        >
          <span className="pointer-events-none absolute inset-0 rounded-full bg-blue-200/60 opacity-0 group-hover:opacity-40 group-hover:animate-[ping_0.6s_ease-out] group-focus:opacity-40 group-focus:animate-[ping_0.6s_ease-out]" />
          <Droplet className="h-4 w-4" />
          Water
        </button>
        <button
          onClick={onFertilize}
          aria-label="Fertilize plant"
          className="relative group flex items-center gap-1 px-4 py-1 rounded-full border border-green-300 text-sm text-green-700 bg-white/30 hover:bg-green-50 dark:border-green-400 dark:text-green-400 transition-colors"
        >
          <span className="pointer-events-none absolute inset-0 rounded-full bg-green-200/60 opacity-0 group-hover:opacity-40 group-hover:animate-[ping_0.6s_ease-out] group-focus:opacity-40 group-focus:animate-[ping_0.6s_ease-out]" />
          <Sprout className="h-4 w-4" />
          Feed
        </button>
        <button
          onClick={onAddNote}
          aria-label="Add note to plant"
          className="relative group flex items-center gap-1 px-4 py-1 rounded-full border border-purple-300 text-sm text-purple-700 bg-white/30 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 transition-colors"
        >
          <span className="pointer-events-none absolute inset-0 rounded-full bg-purple-200/60 opacity-0 group-hover:opacity-40 group-hover:animate-[ping_0.6s_ease-out] group-focus:opacity-40 group-focus:animate-[ping_0.6s_ease-out]" />
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
          className={`h-2 rounded-full ${progress.barClass}`}
          style={{ width: `${progress.pct}%` }}
        />
        <span className="sr-only">{`${progress.pct}% hydration`}</span>
      </div>
    </section>
  )
}
