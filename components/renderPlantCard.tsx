'use client'

import Link from 'next/link'
import PlantCard from './PlantCard'
import type { Plant } from '@/lib/plants'

export type PlantEntry = [string, Plant]

export function renderPlantCard([id, p]: PlantEntry) {
  const s = p.status.toLowerCase()
  const tasks = {
    water:
      s.includes('water overdue') ||
      (s.includes('due') && !s.includes('fertilize'))
        ? 1
        : 0,
    fertilize: s.includes('fertilize') ? 1 : 0,
    notes: s.includes('note') ? 1 : 0,
  }

  return (
    <Link key={id} href={`/plants/${id}`} className="block">
      <PlantCard
        nickname={p.nickname}
        species={p.species}
        status={p.status}
        hydration={p.hydration}
        photo={p.photos[0]}
        hydrationHistory={p.hydrationLog.map((h) => h.value)}
        tasks={tasks}
        onMarkDone={() => {}}
      />
    </Link>
  )
}

export default renderPlantCard
