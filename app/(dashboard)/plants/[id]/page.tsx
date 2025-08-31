'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useCallback } from "react"
import Lightbox from "@/components/Lightbox"
import { Droplet, Sprout, FileText } from "lucide-react"
import { getHydrationProgress } from "@/components/PlantCard"
import PlantDetailSkeleton from "./PlantDetailSkeleton"
import WaterModal from "@/components/WaterModal"
import FertilizeModal from "@/components/FertilizeModal"
import NoteModal from "@/components/NoteModal"
import { ToastProvider, useToast } from "@/components/Toast"

interface PlantEvent {
  id: number
  type: string
  date: string
  note?: string
}

interface Plant {
  nickname: string
  species: string
  status: string
  hydration: number
  lastWatered: string
  nextDue: string
  events: PlantEvent[]
  photos: string[]
}

const EVENT_TYPES = {
  water: {
    label: "Watered",
    color: "bg-blue-100 text-blue-700",
    icon: Droplet,
  },
  fertilize: {
    label: "Fertilized",
    color: "bg-green-100 text-green-700",
    icon: Sprout,
  },
  note: {
    label: "Note",
    color: "bg-purple-100 text-purple-700",
    icon: FileText,
  },
} as const

export function PlantDetailContent({ params }: { params: { id: string } }) {
  const [plant, setPlant] = useState<Plant | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const progress = getHydrationProgress(plant?.hydration ?? 0)
  const [waterOpen, setWaterOpen] = useState(false)
  const [fertilizeOpen, setFertilizeOpen] = useState(false)
  const [noteOpen, setNoteOpen] = useState(false)
  const toast = useToast()

  function handleWater() {
    setWaterOpen(true)
  }

  function handleFertilize() {
    setFertilizeOpen(true)
  }

  function handleAddNote() {
    setNoteOpen(true)
  }

  function handleWaterSubmit(amount: string) {
    const date = new Date().toLocaleDateString()
    const amt = Number(amount)
    setPlant((prev) =>
      prev
        ? {
            ...prev,
            hydration: Math.min(100, prev.hydration + (isNaN(amt) ? 0 : amt)),
            lastWatered: date,
            events: [
              ...prev.events,
              { id: Date.now(), type: "water", date },
            ],
          }
        : prev
    )
    toast("Water added")
  }

  function handleFertilizeSubmit(type: string) {
    const date = new Date().toLocaleDateString()
    setPlant((prev) =>
      prev
        ? {
            ...prev,
            events: [
              ...prev.events,
              { id: Date.now(), type: "fertilize", date },
            ],
          }
        : prev
    )
    toast("Fertilizer added")
  }

  function handleNoteSubmit(note: string) {
    const date = new Date().toLocaleDateString()
    setPlant((prev) =>
      prev
        ? {
            ...prev,
            events: [
              ...prev.events,
              { id: Date.now(), type: "note", date, note },
            ],
          }
        : prev
    )
    toast("Note added")
  }

  const loadPlant = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/plants/${params.id}`)
      if (res.ok) {
        setPlant(await res.json())
      } else {
        setPlant(null)
        setError(`Error ${res.status}`)
      }
    } catch (err) {
      setPlant(null)
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    loadPlant()
  }, [loadPlant])

  return (
    <main className="flex-1 bg-white dark:bg-gray-900">
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <Link href="/" className="inline-block px-3 py-1 border rounded hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
          ← Back to Today
        </Link>

        {loading ? (
          <PlantDetailSkeleton />
        ) : !plant ? (
          <div className="rounded-lg border p-6 dark:border-gray-700">
            {error ? (
              <>
                <h2 className="text-xl font-bold">Failed to load plant</h2>
                <p className="text-sm text-gray-500 mt-1">{error}</p>
                <button
                  onClick={loadPlant}
                  className="mt-4 inline-block px-3 py-1 border rounded hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  Retry
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold">Plant not found</h2>
                <p className="text-sm text-gray-500 mt-1">ID: {params.id}</p>
              </>
            )}
          </div>
        ) : (
          <>

            <section className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {plant.photos && plant.photos.length > 0 ? (
                <Image
                  src={plant.photos[0]}
                  alt={plant.nickname}
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full md:w-1/2 rounded-xl border object-cover max-h-72"
                  loading="lazy"
                />
              ) : (
                <div className="w-full md:w-1/2 rounded-xl border flex items-center justify-center bg-gray-100 dark:bg-gray-800 max-h-72">
                  <span className="text-gray-500 dark:text-gray-400">No photo</span>
                </div>
              )}

              <div className="space-y-2 md:w-1/2 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{plant.nickname}</h1>
                <p className="italic text-gray-500">{plant.species}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                  <button
                    onClick={handleWater}
                    aria-label="Water plant"
                    className="flex items-center px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    <Droplet className="h-4 w-4 mr-1" />
                    Water
                  </button>
                  <button
                    onClick={handleFertilize}
                    aria-label="Fertilize plant"
                    className="flex items-center px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:bg-green-500 dark:hover:bg-green-600"
                  >
                    <Sprout className="h-4 w-4 mr-1" />
                    Fertilize
                  </button>
                  <button
                    onClick={handleAddNote}
                    aria-label="Add note to plant"
                    className="flex items-center px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-500 dark:hover:bg-purple-600"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Add Note
                  </button>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 text-sm">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">{plant.status}</span>
                </div>
                <div
                  className="w-full bg-gray-200 rounded-full h-2"
                  role="progressbar"
                  aria-label="Hydration"
                  aria-valuenow={progress.pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuetext={`${progress.pct}% hydration`}
                >
                  <div
                    className={`h-2 rounded-full ${progress.barColor}`}
                    style={{ width: `${progress.pct}%` }}
                  />
                  <span className="sr-only">{`${progress.pct}% hydration`}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last watered: <strong>{plant.lastWatered}</strong> · Next due: <strong>{plant.nextDue}</strong>
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: "Status", value: plant.status },
                { label: "Hydration", value: `${plant.hydration}%` },
                { label: "Last Watered", value: plant.lastWatered },
                { label: "Next Due", value: plant.nextDue }
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">{value}</p>
                </div>
              ))}
            </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">Timeline</h2>
                {!plant.events || plant.events.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No activity yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {plant.events.map((e) => {
                      const type =
                        EVENT_TYPES[e.type as keyof typeof EVENT_TYPES] ?? EVENT_TYPES.note
                      const Icon = type.icon
                      return (
                        <li
                          key={e.id}
                          className="flex items-start gap-3 rounded-lg border p-3 bg-white dark:bg-gray-900 dark:border-gray-700"
                        >
                          <span className="w-16 text-xs font-medium text-gray-500">{e.date}</span>
                          <span className="text-sm flex items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${type.color}`}
                            >
                              <span aria-hidden="true">
                                <Icon className="h-3 w-3" />
                              </span>
                              <span aria-hidden="true">{type.label}</span>
                              <span className="sr-only">{type.label}</span>
                            </span>
                            {e.type === "note" && e.note}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </section>

            <section>
              <h2 className="text-lg font-semibold mb-3">Gallery</h2>
              {plant.photos && plant.photos.length > 0 ? (
                <Lightbox
                  images={plant.photos.map((src, i) => ({
                    src,
                    alt: `${plant.nickname} photo ${i + 1}`,
                  }))}
                />
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No photos available.</p>
              )}
            </section>
          </>
        )}
      </div>
      <WaterModal
        isOpen={waterOpen}
        onClose={() => setWaterOpen(false)}
        onSubmit={handleWaterSubmit}
      />
      <FertilizeModal
        isOpen={fertilizeOpen}
        onClose={() => setFertilizeOpen(false)}
        onSubmit={handleFertilizeSubmit}
      />
      <NoteModal
        isOpen={noteOpen}
        onClose={() => setNoteOpen(false)}
        onSubmit={handleNoteSubmit}
      />
    </main>
  )
}

export default function PlantDetailPage({ params }: { params: { id: string } }) {
  return (
    <ToastProvider>
      <PlantDetailContent params={params} />
    </ToastProvider>
  )
}
