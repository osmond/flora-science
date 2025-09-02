'use client'

import { useState } from 'react'
import { Droplet, Sprout, FileText, Edit, Plus } from 'lucide-react'

interface FloatingActionsProps {
  onWater: () => void
  onFertilize: () => void
  onAddNote: () => void
  onEdit: () => void
}

export default function FloatingActions({
  onWater,
  onFertilize,
  onAddNote,
  onEdit,
}: FloatingActionsProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="fixed z-50"
      style={{
        top: 'calc(env(safe-area-inset-top, 0px) + 1rem)',
        right: 'calc(env(safe-area-inset-right, 0px) + 1rem)',
      }}
    >
      <div className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle plant actions"
          aria-expanded={open}
          className={[
            'flex h-12 w-12 items-center justify-center rounded-full',
            'bg-teal-600 text-white shadow-lg transition-transform',
            'hover:rotate-90 focus:outline-none focus-visible:ring',
          ].join(' ')}
        >
          <Plus className="h-6 w-6" />
        </button>
        <div
          className={`absolute right-0 mt-3 flex flex-col items-end gap-2 transition-all duration-200 ${
            open ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-2'
          }`}
        >
          <button
            onClick={onWater}
            aria-label="Water plant"
            className={[
              'flex h-10 w-10 items-center justify-center rounded-full',
              'bg-blue-500 text-white shadow-md transition-transform',
              'hover:-translate-y-1 focus:outline-none focus-visible:ring',
            ].join(' ')}
          >
            <Droplet className="h-5 w-5" />
          </button>
          <button
            onClick={onFertilize}
            aria-label="Fertilize plant"
            className={[
              'flex h-10 w-10 items-center justify-center rounded-full',
              'bg-green-500 text-white shadow-md transition-transform',
              'hover:-translate-y-1 focus:outline-none focus-visible:ring',
            ].join(' ')}
          >
            <Sprout className="h-5 w-5" />
          </button>
          <button
            onClick={onAddNote}
            aria-label="Add note to plant"
            className={[
              'flex h-10 w-10 items-center justify-center rounded-full',
              'bg-purple-500 text-white shadow-md transition-transform',
              'hover:-translate-y-1 focus:outline-none focus-visible:ring',
            ].join(' ')}
          >
            <FileText className="h-5 w-5" />
          </button>
          <button
            onClick={onEdit}
            aria-label="Edit plant"
            className={[
              'flex h-10 w-10 items-center justify-center rounded-full',
              'bg-orange-500 text-white shadow-md transition-transform',
              'hover:-translate-y-1 focus:outline-none focus-visible:ring',
            ].join(' ')}
          >
            <Edit className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
