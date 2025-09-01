'use client'

import { useState } from 'react'
import { Droplet, Sprout, FileText } from 'lucide-react'
import { format, formatDistanceToNow, startOfWeek } from 'date-fns'
import type { PlantEvent } from './types'

const EVENT_TYPES = {
  water: {
    label: 'Watered',
    color: 'bg-blue-100 text-blue-700',
    icon: Droplet,
  },
  fertilize: {
    label: 'Fertilized',
    color: 'bg-green-100 text-green-700',
    icon: Sprout,
  },
  note: {
    label: 'Note',
    color: 'bg-purple-100 text-purple-700',
    icon: FileText,
  },
} as const

export default function Timeline({ events }: { events: PlantEvent[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const processed = events
    ?.filter((e): e is PlantEvent => e !== null && e !== undefined)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const grouped = processed?.reduce((acc, e) => {
    const weekStart = startOfWeek(new Date(e.date))
    const key = format(weekStart, 'yyyy-MM-dd')
    acc[key] = acc[key] || []
    acc[key].push(e)
    return acc
  }, {} as Record<string, PlantEvent[]>)

  const weeks = grouped
    ? Object.keys(grouped).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime(),
      )
    : []

  return (
    <section className="rounded-xl p-6 shadow-sm bg-gray-50 dark:bg-gray-800 space-y-4">
      <h2 className="text-lg font-semibold">Timeline</h2>
      {!weeks.length ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No activity yet.
        </p>
      ) : (
        <div className="space-y-6">
          {weeks.map((week, index) => {
            const weekDate = new Date(week)
            const weekEvents = grouped[week]
            return (
              <div key={week}>
                <h3 className="text-sm font-semibold mb-2">
                  Week of {format(weekDate, 'MMM d')}
                </h3>
                <ol className="relative border-l ml-4">
                  {weekEvents.map((e) => {
                    const type =
                      EVENT_TYPES[e.type as keyof typeof EVENT_TYPES] ??
                      EVENT_TYPES.note
                    const Icon = type.icon
                    const open = expandedId === e.id
                    return (
                      <li key={e.id} className="mb-6 ml-6">
                        <span className="absolute -left-3 flex items-center justify-center w-6 h-6 text-gray-400">
                          <Icon className="w-4 h-4" />
                        </span>
                        <button
                          onClick={() => setExpandedId(open ? null : e.id)}
                          className="text-left w-full"
                        >
                          <time className="block text-xs text-gray-500">
                            {formatDistanceToNow(new Date(e.date), {
                              addSuffix: true,
                            })}
                          </time>
                          <span className="font-medium">{type.label}</span>
                        </button>
                        {open && (
                          <div className="mt-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm">
                            {e.type === 'note' && e.note}
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ol>
                {index < weeks.length - 1 && (
                  <hr className="my-4 border-gray-200 dark:border-gray-700" />
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

