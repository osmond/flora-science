"use client"
import { PlusCircle, Sun, Moon } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"
import { format } from "date-fns"
import Sparkline from "./Sparkline"

interface HeaderProps {
  plantsCount: number
  avgHydration: number
  tasksDue: number
  avgHydrationHistory: number[]
  taskStreak: number
  waterTasks: number
  fertilizeTasks: number
  noteTasks: number
  waterOverdue: boolean
  fertilizeOverdue: boolean
  noteOverdue: boolean
}

export default function Header({
  plantsCount,
  avgHydration,
  tasksDue,
  avgHydrationHistory,
  taskStreak,
  waterTasks,
  fertilizeTasks,
  noteTasks,
  waterOverdue,
  fertilizeOverdue,
  noteOverdue,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const currentDate = format(new Date(), "EEEE, MMM d")

  const getBadgeClass = (overdue: boolean, count: number) =>
    overdue ? "text-red-600" : count > 0 ? "text-yellow-600" : "text-green-600"

  return (
    <header className="backdrop-blur bg-white/80 dark:bg-gray-900/80 sticky top-0 z-10 p-[var(--space-lg)] flex items-center justify-between shadow-sm">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{currentDate}</p>
        <div className="font-medium text-gray-800 dark:text-gray-100 flex items-center gap-[var(--space-xs)]">
          <span>
            {plantsCount} plants · Avg hydration
          </span>
          <span className="font-semibold text-flora-leaf">{avgHydration}%</span>
          <Sparkline data={avgHydrationHistory} />
          <span>· {tasksDue} tasks due today</span>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-[var(--space-sm)] mt-[var(--space-xs)]">
          <span>{taskStreak}-day completion streak</span>
          <span className={getBadgeClass(waterOverdue, waterTasks)}>💧 {waterTasks}</span>
          <span className={getBadgeClass(fertilizeOverdue, fertilizeTasks)}>🌱 {fertilizeTasks}</span>
          <span className={getBadgeClass(noteOverdue, noteTasks)}>📝 {noteTasks}</span>
        </div>
      </div>
      <div className="flex items-center gap-[var(--space-md)]">
        <button
          aria-label="Add plant"
          className="flex items-center gap-[var(--space-xs)] px-[var(--space-md)] py-[var(--space-sm)] rounded-lg bg-flora-leaf text-white hover:bg-green-600 transition"
        >
          <PlusCircle className="w-4 h-4" aria-hidden="true" />
          <span aria-hidden="true">Add</span>
          <span className="sr-only">Add plant</span>
        </button>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-[var(--space-sm)] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          {theme === "dark" ? (
            <Moon className="w-5 h-5 text-gray-200" aria-hidden="true" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-500" aria-hidden="true" />
          )}
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
    </header>
  )
}
