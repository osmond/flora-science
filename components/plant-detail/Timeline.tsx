'use client'

import { useState } from 'react'
import { Droplet, Sprout, FileText } from 'lucide-react'
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

  return (
    <section className="rounded-xl border p-6 shadow-sm bg-white dark:bg-gray-900 space-y-4">
      <h2 className="text-lg font-semibold">Timeline</h2>
      {!events || events.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No activity yet.</p>
      ) : (
        <ol className="relative border-l ml-4">
          {events
            .filter((e): e is PlantEvent => e !== null && e !== undefined)
            .map((e) => {
              const type =
                EVENT_TYPES[e.type as keyof typeof EVENT_TYPES] ?? EVENT_TYPES.note
              const Icon = type.icon
              const dot =
                e.type === 'water'
                  ? 'bg-blue-500'
                  : e.type === 'fertilize'
                  ? 'bg-green-500'
                  : 'bg-purple-500'
              const open = expandedId === e.id
              return (
                <li key={e.id} className="mb-6 ml-6">
                  <span
                    className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full text-white ${dot} ring-2 ring-white transition-transform hover:scale-110`}
                  >
                    <Icon className="w-3 h-3" />
                  </span>
                  <button
                    onClick={() => setExpandedId(open ? null : e.id)}
                    className="text-left w-full"
                  >
                    <time className="block text-xs text-gray-500">{e.date}</time>
                    <span className="font-medium">{type.label}</span>
                  </button>
                  {open && (
                    <div className="mt-2 p-3 rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-700 text-sm">
                      {e.type === 'note' && e.note}
                    </div>
                  )}
                </li>
              )
            })}
        </ol>
      )}
    </section>
  )
}
