'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { getHydrationProgress } from '@/components/PlantCard'
import QuickStats from './QuickStats'
import type { Plant } from './types'
import type { Weather } from '@/lib/weather'

interface HeroSectionProps {
  plant: Plant
  weather: Weather | null
}

export default function HeroSection({ plant, weather }: HeroSectionProps) {
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

  const microDetails = `Last watered ${plant.lastWatered} • Pot ${plant.potSize}cm • ${plant.status}`

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/0" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/0 p-4 sm:p-6">
          <h1 className="h1 font-serif text-white">{plant.nickname}</h1>
          <p className="text-lg italic text-white/80">{plant.species}</p>
          <p className="mt-1 text-sm text-white/70">{microDetails}</p>
        </div>
      </div>

      <p className="text-xl font-semibold" aria-live="polite">
        {nextTaskText}
      </p>
      <div className="flex items-center gap-2" aria-live="polite">
        <div
          className="w-full bg-gray-200 rounded-full h-2"
          role="progressbar"
          aria-label="Hydration"
          aria-valuenow={progress.pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`${progress.pct}% hydration`}
        >
          <motion.div
            className={`h-2 rounded-full ${progress.colorClass}`}
            animate={{ width: `${progress.pct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
        <span className="text-sm text-gray-700 dark:text-gray-300">{progress.status}</span>
      </div>

      <QuickStats plant={plant} weather={weather} />
    </section>
  )
}

