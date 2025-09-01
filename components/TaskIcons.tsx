'use client'

type TaskIconsProps = {
  water: number
  fertilize: number
  notes: number
}

export default function TaskIcons({ water, fertilize, notes }: TaskIconsProps) {
  const items = [
    { emoji: '💧', count: water, label: 'water' },
    { emoji: '🌱', count: fertilize, label: 'fertilize' },
    { emoji: '📝', count: notes, label: 'notes' },
  ]
  return (
    <div className="flex items-center gap-2">
      {items.map(({ emoji, count, label }) => (
        <div key={label} className="relative" aria-label={`${count} ${label} tasks`}>
          <span className="text-lg" aria-hidden="true">{emoji}</span>
          <span
            className={`absolute -top-1 -right-1 rounded-full px-1 text-[10px] font-semibold ${count > 0 ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}
          >
            {count}
          </span>
        </div>
      ))}
    </div>
  )
}

