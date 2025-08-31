'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { LayoutGrid, List } from "lucide-react"
import RoomCard from "@/components/RoomCard"
import RoomSkeleton from "@/components/RoomSkeleton"
import { getLastSync } from "@/lib/utils"
import { getRooms, type Room } from "@/lib/api"

export default function RoomsPage() {
  type SortBy = "name" | "hydration" | "tasks"

  const [rooms, setRooms] = useState<Room[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortBy>("name")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    async function loadRooms() {
      setIsLoading(true)
      try {
        const data = await getRooms()
        setRooms(data)
      } catch (err) {
        setError("Failed to load rooms")
      } finally {
        setIsLoading(false)
      }
    }
    loadRooms()
  }, [])

  const sortedRooms = [...rooms].sort((a, b) => {
    switch (sortBy) {
      case "hydration":
        return b.avgHydration - a.avgHydration
      case "tasks":
        return b.tasksDue - a.tasksDue
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const filteredRooms = sortedRooms.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTags.length === 0 ||
        selectedTags.every((tag) => r.tags.includes(tag)))
  )

  const allTags = Array.from(new Set(rooms.flatMap((r) => r.tags))).sort()

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <main className="flex-1 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">My Rooms</h2>
        <Link href="/rooms/new" className="text-sm text-blue-500 hover:underline">
          Add Room
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search rooms…"
          className="p-2 border rounded flex-1"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="p-2 border rounded"
        >
          <option value="name">Name</option>
          <option value="hydration">Hydration</option>
          <option value="tasks">Tasks</option>
        </select>
        <div className="flex border rounded overflow-hidden">
          <button
            onClick={() => setView("grid")}
            className={`p-2 ${view === "grid" ? "bg-gray-200 dark:bg-gray-700 text-flora-leaf" : "text-gray-500"}`}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 border-l ${view === "list" ? "bg-gray-200 dark:bg-gray-700 text-flora-leaf" : "text-gray-500"}`}
            aria-label="List view"
          >
            <List className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {allTags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-2 py-1 rounded-full text-xs border ${selectedTags.includes(tag) ? 'bg-flora-leaf text-white border-flora-leaf' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <RoomSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : rooms.length === 0 ? (
        <div className="mt-8 text-center">
          <p className="mb-4">No rooms yet</p>
          <Link href="/rooms/new" className="text-blue-500 underline">
            Create a room
          </Link>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((r) => (
            <Link key={r.id} href={`/rooms/${r.id}`} className="block">
              <RoomCard
                name={r.name}
                avgHydration={r.avgHydration}
                tasksDue={r.tasksDue}
                tags={r.tags}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-sm font-semibold">Room</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Hydration</th>
                <th className="px-3 py-2 text-left text-sm font-semibold">Tasks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRooms.map((r) => (
                <tr key={r.id}>
                  <td className="px-3 py-2">
                    <Link
                      href={`/rooms/${r.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {r.name}
                    </Link>
                  </td>
                  <td className="px-3 py-2">{Math.round(r.avgHydration)}%</td>
                  <td className="px-3 py-2">{r.tasksDue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <footer className="text-xs text-gray-400 mt-6">Last sync: {getLastSync()}</footer>
    </main>
  )
}
