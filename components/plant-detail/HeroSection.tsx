'use client'

import Image from 'next/image'
import { Droplet, Sprout, FileText } from 'lucide-react'
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

  return (
    <section className="space-y-4">
      <div className="relative rounded-xl overflow-hidden shadow">
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
          <h1 className="text-3xl font-bold text-white drop-shadow-md">
            {plant.nickname}
          </h1>
          <p className="italic text-gray-200">{plant.species}</p>
        </div>
      </div>

      <QuickStats plant={plant} weather={weather} />

      <div className="flex flex-wrap justify-center sm:justify-start gap-3">
        <button
          onClick={onWater}
          aria-label="Water plant"
          className="flex items-center gap-1 px-4 py-2 rounded-full bg-blue-600 text-white transition-transform duration-150 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <Droplet className="h-4 w-4" />
          Water
        </button>
        <button
          onClick={onFertilize}
          aria-label="Fertilize plant"
          className="flex items-center gap-1 px-4 py-2 rounded-full bg-green-600 text-white transition-transform duration-150 hover:scale-105 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:bg-green-500 dark:hover:bg-green-600"
        >
          <Sprout className="h-4 w-4" />
          Fertilize
        </button>
        <button
          onClick={onAddNote}
          aria-label="Add note to plant"
          className="flex items-center gap-1 px-4 py-2 rounded-full bg-purple-600 text-white transition-transform duration-150 hover:scale-105 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-500 dark:hover:bg-purple-600"
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
