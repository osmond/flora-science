'use client'

import { useState, useEffect } from 'react'
import { Droplet, Sprout, FileText } from 'lucide-react'
import { format, formatDistanceToNow, startOfWeek, parse } from 'date-fns'
import type { PlantEvent } from './types'

const EVENT_TYPES = {
  water: {
    icon: Droplet,
    label: 'Water',
    badge: 'bg-blue-100 text-blue-700',
  },
  fertilize: {
    icon: Sprout,
    label: 'Feed',
    badge: 'bg-green-100 text-green-700',
  },
  note: {
    icon: FileText,
    label: 'Note',
    badge: 'bg-yellow-100 text-yellow-700',
  },
} as const

type FilterType = 'all' | keyof typeof EVENT_TYPES

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'water', label: 'Water' },
  { key: 'fertilize', label: 'Feed' },
  { key: 'note', label: 'Notes' },
]

const eventDate = (s: string) => {
  const d = parse(s, 'MMM d', new Date())
  return isNaN(d.getTime()) ? new Date(s) : d
}

export default function Timeline({ events }: { events: PlantEvent[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => setExpandedId(null), [filter])

  const processed = events
    ?.filter((e): e is PlantEvent => e !== null && e !== undefined)
    .filter((e) => filter === 'all' || e.type === filter)
    .sort(
      (a, b) => eventDate(b.date).getTime() - eventDate(a.date).getTime(),
    )

  const grouped = processed?.reduce((acc, e) => {
    const weekStart = startOfWeek(eventDate(e.date))
    const key = format(weekStart, 'yyyy-MM-dd')
    acc[key] = acc[key] || []
    acc[key].push(e)
    return acc
  }, {} as Record<string, PlantEvent[]>)

  const weeks = grouped
    ? Object.keys(grouped).sort(
        (a, b) =>
          parse(b, 'yyyy-MM-dd', new Date()).getTime() -
          parse(a, 'yyyy-MM-dd', new Date()).getTime(),
      )
    : []

  return (
    <section className="rounded-xl p-6 bg-gray-50 dark:bg-gray-800 space-y-4">
      <h2 className="h2">Timeline</h2>
      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === f.key
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {!weeks.length ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No activity yet.
        </p>
      ) : (
        <div className="space-y-6">
          {weeks.map((week, index) => {
            const weekDate = parse(week, 'yyyy-MM-dd', new Date())
            const weekEvents = grouped[week]
            return (
              <div key={week}>
                <h3 className="h3 mb-2">
                  {
                    index === 0
                      ? 'This week'
                      : index === 1
                        ? 'Last week'
                        : `Week of ${format(weekDate, 'MMM d')}`
                  }
                </h3>
                <ol className="relative border-l ml-4">
                  {weekEvents.map((e) => {
                    const type =
                      EVENT_TYPES[e.type as keyof typeof EVENT_TYPES] ??
                      EVENT_TYPES.note
                    const Icon = type.icon
                    const open = expandedId === e.id
                    const preview =
                      e.note && e.note.length > 80
                        ? `${e.note.slice(0, 80)}…`
                        : e.note
                    return (
                      <li key={e.id} className="mb-6 ml-6">
                        <span
                          className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full ${type.badge}`}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <button
                          type="button"
                          onClick={
                            e.type === 'note'
                              ? () => setExpandedId(open ? null : e.id)
                              : undefined
                          }
                          className="text-left w-full"
                        >
                          <time className="text-sm text-gray-700 dark:text-gray-300">
                            {formatDistanceToNow(eventDate(e.date), {
                              addSuffix: true,
                            })}
                          </time>
                          <span
                            className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${type.badge}`}
                          >
                            {type.label}
                          </span>
                          {e.type === 'note' && (
                            <div
                              className="mt-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm overflow-hidden transition-all duration-300"
                              style={{ maxHeight: open ? '200px' : '48px' }}
                            >
                              {open ? e.note : preview}
                            </div>
                          )}
                        </button>
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

