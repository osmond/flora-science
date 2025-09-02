'use client'

import { Droplet, Sprout, FileText, Edit } from 'lucide-react'

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
  return (
    <div
      className="fixed z-50 flex flex-col gap-3"
      style={{
        top: 'calc(env(safe-area-inset-top, 0px) + 1rem)',
        right: 'calc(env(safe-area-inset-right, 0px) + 1rem)',
      }}
    >
      <button
        onClick={onWater}
        aria-label="Water plant"
        className="relative group flex items-center gap-1 px-4 py-1 rounded-full border border-blue-300 text-sm text-blue-700 bg-white/90 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:bg-gray-800/90 transition-colors"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-blue-200/60 opacity-0 group-hover:opacity-40 group-hover:animate-[ping_0.6s_ease-out] group-focus:opacity-40 group-focus:animate-[ping_0.6s_ease-out]" />
        <Droplet className="h-4 w-4" />
        Water
      </button>
      <button
        onClick={onFertilize}
        aria-label="Fertilize plant"
        className="relative group flex items-center gap-1 px-4 py-1 rounded-full border border-green-300 text-sm text-green-700 bg-white/90 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:bg-gray-800/90 transition-colors"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-green-200/60 opacity-0 group-hover:opacity-40 group-hover:animate-[ping_0.6s_ease-out] group-focus:opacity-40 group-focus:animate-[ping_0.6s_ease-out]" />
        <Sprout className="h-4 w-4" />
        Feed
      </button>
      <button
        onClick={onAddNote}
        aria-label="Add note to plant"
        className="relative group flex items-center gap-1 px-4 py-1 rounded-full border border-purple-300 text-sm text-purple-700 bg-white/90 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:bg-gray-800/90 transition-colors"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-purple-200/60 opacity-0 group-hover:opacity-40 group-hover:animate-[ping_0.6s_ease-out] group-focus:opacity-40 group-focus:animate-[ping_0.6s_ease-out]" />
        <FileText className="h-4 w-4" />
        Add Note
      </button>
      <button
        onClick={onEdit}
        aria-label="Edit plant"
        className="relative group flex items-center gap-1 px-4 py-1 rounded-full border border-orange-300 text-sm text-orange-700 bg-white/90 hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:bg-gray-800/90 transition-colors"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-orange-200/60 opacity-0 group-hover:opacity-40 group-hover:animate-[ping_0.6s_ease-out] group-focus:opacity-40 group-focus:animate-[ping_0.6s_ease-out]" />
        <Edit className="h-4 w-4" />
        Edit
      </button>
    </div>
  )
}

