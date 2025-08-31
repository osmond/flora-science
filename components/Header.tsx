"use client"
import { PlusCircle, Sun, Moon } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"
import { format } from "date-fns"

interface HeaderProps {
  plantsCount: number
  avgHydration: number
  tasksDue: number
}

export default function Header({ plantsCount, avgHydration, tasksDue }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const currentDate = format(new Date(), "EEEE, MMM d")

  return (
    <header className="backdrop-blur bg-white/80 dark:bg-gray-900/80 sticky top-0 z-10 p-4 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{currentDate}</p>
        <p className="font-medium text-gray-800 dark:text-gray-100">
          {plantsCount} plants · Avg hydration <span className="font-semibold text-flora-leaf">{avgHydration}%</span> · {tasksDue} tasks due today
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          aria-label="Add plant"
          className="flex items-center gap-1 px-3 py-2 rounded-lg bg-flora-leaf text-white hover:bg-green-600 transition"
        >
          <PlusCircle className="w-4 h-4" aria-hidden="true" />
          <span aria-hidden="true">Add</span>
          <span className="sr-only">Add plant</span>
        </button>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
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
