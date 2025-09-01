import { GroupBy, SortBy } from "@/lib/dashboardTypes"

interface ControlsBarProps {
  groupBy: GroupBy
  sortBy: SortBy
  onGroupChange: (g: GroupBy) => void
  onSortChange: (s: SortBy) => void
}

export default function ControlsBar({ groupBy, sortBy, onGroupChange, onSortChange }: ControlsBarProps) {
  return (
    <div className="flex gap-4 mb-4 items-center">
      <select
        value={groupBy}
        onChange={(e) => onGroupChange(e.target.value as GroupBy)}
        className="border rounded p-2"
      >
        <option value="none">No grouping</option>
        <option value="status">Group by status</option>
        <option value="room">Group by room</option>
      </select>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortBy)}
        className="border rounded p-2"
      >
        <option value="alpha">Alphabetical</option>
        <option value="hydration">Hydration</option>
        <option value="lastWatered">Last watered</option>
      </select>
    </div>
  )
}
