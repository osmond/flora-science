import { GroupBy, SortBy } from "@/lib/dashboardTypes"

interface ControlsBarProps {
  groupBy: GroupBy
  sortBy: SortBy
  onGroupChange: (g: GroupBy) => void
  onSortChange: (s: SortBy) => void
}

export default function ControlsBar({ groupBy, sortBy, onGroupChange, onSortChange }: ControlsBarProps) {
  return (
    <div className="flex gap-[var(--space-lg)] mb-[var(--space-md)] items-center">
      <select
        value={groupBy}
        onChange={(e) => onGroupChange(e.target.value as GroupBy)}
        className="border border-gray-200 dark:border-gray-700 rounded-[var(--radius-md)] p-[var(--space-sm)] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow focus:outline-none focus:ring-2 focus:ring-flora-leaf"
      >
        <option value="none">No grouping</option>
        <option value="status">Group by status</option>
        <option value="room">Group by room</option>
      </select>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortBy)}
        className="border border-gray-200 dark:border-gray-700 rounded-[var(--radius-md)] p-[var(--space-sm)] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow focus:outline-none focus:ring-2 focus:ring-flora-leaf"
      >
        <option value="alpha">Alphabetical</option>
        <option value="hydration">Hydration</option>
        <option value="lastWatered">Last watered</option>
      </select>
    </div>
  )
}
