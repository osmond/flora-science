"use client"
import { PlusCircle, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"

export default function Header() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", dark)
  }, [dark])

  return (
    <header className="backdrop-blur bg-white/80 dark:bg-gray-900/80 sticky top-0 z-10 p-4 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Friday, Aug 29</p>
        <p className="font-medium text-gray-800 dark:text-gray-100">
          4 plants · Avg hydration <span className="font-semibold text-flora-leaf">72%</span> · 2 tasks due today
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1 px-3 py-2 rounded-lg bg-flora-leaf text-white hover:bg-green-600 transition">
          <PlusCircle className="w-4 h-4" /> Add
        </button>
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {dark ? <Moon className="w-5 h-5 text-gray-200" /> : <Sun className="w-5 h-5 text-yellow-500" />}
        </button>
      </div>
    </header>
  )
}
