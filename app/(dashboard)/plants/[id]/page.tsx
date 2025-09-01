'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useCallback, useMemo } from "react"
import Lightbox from "@/components/Lightbox"
import Sparkline from "@/components/Sparkline"
import { Droplet, Sprout, FileText, Calendar, Activity } from "lucide-react"
import { getHydrationProgress } from "@/components/PlantCard"
import PlantDetailSkeleton from "./PlantDetailSkeleton"
import WaterModal from "@/components/WaterModal"
import FertilizeModal from "@/components/FertilizeModal"
import NoteModal from "@/components/NoteModal"
import { ToastProvider, useToast } from "@/components/Toast"
import {
  CareTrendsChart,
  HydrationTrendChart,
  NutrientLevelChart,
  StressIndexGauge,
  TimelineHeatmap,
  PlantHealthRadar,
} from "@/components/Charts"
import { calculateNutrientAvailability, calculateStressIndex } from "@/lib/plant-metrics"
import { generateDailyActivity } from "@/lib/seasonal-trends"

import { getWeatherForUser, type Weather } from "@/lib/weather"
import { samplePlants } from "@/lib/plants"


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
  hydrationLog?: { date: string; value: number }[]
  lastWatered: string
  nextDue: string
  lastFertilized: string
  nutrientLevel?: number
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
  const [trendView, setTrendView] = useState<"monthly" | "weekly" | "yearly">(
    "monthly",
  )
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const toast = useToast()
  const [weather, setWeather] = useState<Weather | null>(null)
  const [offline, setOffline] = useState(false)
  const dailyActivity = useMemo(
    () => generateDailyActivity(plant?.events || []),
    [plant?.events]
  )

  function calculateNextDue(lastWatered: string, w: Weather | null): string {
    const date = new Date(`${lastWatered} ${new Date().getFullYear()}`)
    if (isNaN(date.getTime())) {
      date.setTime(Date.now())
    }
    let days = 7
    if (w) {
      if (w.temperature > 85 && w.humidity < 50) {
        days -= 1
      } else if (w.temperature < 60 || w.humidity > 80) {
        days += 1
      }
    }
    date.setDate(date.getDate() + days)
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
  }

  function calculateNextFeedDate(lastFertilized: string, nutrientLevel: number) {
    const current = calculateNutrientAvailability(lastFertilized, nutrientLevel)
    const daysLeft = Math.max(0, Math.ceil((current - 30) / 2))
    const date = new Date()
    date.setDate(date.getDate() + daysLeft)
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
  }

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
            nextDue: calculateNextDue(date, weather),
            events: [...prev.events, { id: Date.now(), type: "water", date }],
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
            lastFertilized: date,
            nutrientLevel: 100,
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
    setOffline(false)
    try {
      const res = await fetch(`/api/plants/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        let w: Weather | null = null
        try {
          w = await getWeatherForUser()
          setWeather(w)
        } catch {
          // ignore weather errors
        }
        data.nextDue = calculateNextDue(data.lastWatered, w)
        data.events = (Array.isArray(data.events) ? data.events : []).filter(
          (e: PlantEvent | null): e is PlantEvent =>
            e !== null && e !== undefined && typeof e.id !== "undefined"
        )
        setPlant(data)
      } else {
        const sample = samplePlants[params.id as keyof typeof samplePlants]
        if (sample) {
          let w: Weather | null = null
          try {
            w = await getWeatherForUser()
            setWeather(w)
          } catch {
            // ignore weather errors
          }
          const offlinePlant: Plant = {
            ...sample,
            events: (Array.isArray(sample.events) ? sample.events : []).filter(
              (e: PlantEvent | null): e is PlantEvent =>
                e !== null && e !== undefined && typeof e.id !== "undefined"
            ),
            nextDue: calculateNextDue(sample.lastWatered, w),
          }
          setPlant(offlinePlant)
          setOffline(true)
          setError(null)
        } else {
          setPlant(null)
          setError(`Error ${res.status}`)
        }
      }
    } catch (err) {
      const sample = samplePlants[params.id as keyof typeof samplePlants]
      if (sample) {
        let w: Weather | null = null
        try {
          w = await getWeatherForUser()
          setWeather(w)
        } catch {
          // ignore weather errors
        }
        const offlinePlant: Plant = {
          ...sample,
          events: (Array.isArray(sample.events) ? sample.events : []).filter(
            (e: PlantEvent | null): e is PlantEvent =>
              e !== null && e !== undefined && typeof e.id !== "undefined"
          ),
          nextDue: calculateNextDue(sample.lastWatered, w),
        }
        setPlant(offlinePlant)
        setOffline(true)
        setError(null)
      } else {
        setPlant(null)
        setError(err instanceof Error ? err.message : String(err))
      }
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

        {offline && plant && (
          <div className="rounded border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
            Offline data. Changes may not be saved.
          </div>
        )}

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

            {/* Hero Section */}
            <section className="space-y-4">
              <div className="relative rounded-xl overflow-hidden shadow">
                {plant.photos && plant.photos.length > 0 ? (
                  <Image
                    src={plant.photos[0]}
                    alt={plant.nickname}
                    width={1200}
                    height={800}
                    sizes="100vw"
                    className="w-full h-64 sm:h-80 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-64 sm:h-80 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <span className="text-gray-500 dark:text-gray-400">No photo</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4 sm:p-6">
                  <h1 className="text-3xl font-bold text-white drop-shadow-md">
                    {plant.nickname}
                  </h1>
                  <p className="italic text-gray-200">{plant.species}</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <button
                  onClick={handleWater}
                  aria-label="Water plant"
                  className="flex items-center gap-1 px-4 py-2 rounded-full bg-blue-600 text-white transition-transform duration-150 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  <Droplet className="h-4 w-4" />
                  Water
                </button>
                <button
                  onClick={handleFertilize}
                  aria-label="Fertilize plant"
                  className="flex items-center gap-1 px-4 py-2 rounded-full bg-green-600 text-white transition-transform duration-150 hover:scale-105 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:bg-green-500 dark:hover:bg-green-600"
                >
                  <Sprout className="h-4 w-4" />
                  Fertilize
                </button>
                <button
                  onClick={handleAddNote}
                  aria-label="Add note to plant"
                  className="flex items-center gap-1 px-4 py-2 rounded-full bg-purple-600 text-white transition-transform duration-150 hover:scale-105 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-500 dark:hover:bg-purple-600"
                >
                  <FileText className="h-4 w-4" />
                  Add Note
                </button>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-sm">
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                  {plant.status}
                </span>
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
            </section>

            {/* Quick Stats */}
            <section className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { label: "Last Watered", value: plant.lastWatered, icon: Droplet },
                { label: "Next Water Due", value: plant.nextDue, icon: Calendar },
                { label: "Last Fertilized", value: plant.lastFertilized, icon: Sprout },
                {
                  label: "Next Feed",
                  value: calculateNextFeedDate(
                    plant.lastFertilized,
                    plant.nutrientLevel ?? 100,
                  ),
                  icon: Calendar,
                },
                {
                  label: "Hydration",
                  value: `${plant.hydration}%`,
                  icon: Droplet,
                  spark: plant.hydrationLog?.map((h) => h.value) ?? [],
                },
                {
                  label: "Stress Score",
                  value: Math.round(
                    calculateStressIndex({
                      overdueDays: plant.status === "Water overdue" ? 1 : 0,
                      hydration: plant.hydration,
                      temperature: weather?.temperature ?? 25,
                      light: 50,
                    }),
                  ),
                  icon: Activity,
                  color: "text-orange-600",
                },
              ].map(({ label, value, icon: Icon, spark, color }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center gap-1 rounded-lg border p-4 bg-white shadow-sm dark:bg-gray-900 dark:border-gray-700"
                >
                  <Icon className={`h-5 w-5 text-gray-500 dark:text-gray-400 ${color ?? ""}`} />
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {value}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
                  {spark && spark.length > 1 && <Sparkline data={spark} />}
                </div>
              ))}
            </section>

            {/* Analytics Panel */}
            <section className="rounded-xl border p-6 shadow-sm bg-white dark:bg-gray-900 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <StressIndexGauge
                  value={calculateStressIndex({
                    overdueDays: plant.status === "Water overdue" ? 1 : 0,
                    hydration: plant.hydration,
                    temperature: weather?.temperature ?? 25,
                    light: 50,
                  })}
                />
                <PlantHealthRadar
                  hydration={plant.hydration}
                  lastFertilized={plant.lastFertilized}
                  nutrientLevel={plant.nutrientLevel ?? 100}
                  events={plant.events}
                  status={plant.status}
                  weather={weather}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NutrientLevelChart
                  lastFertilized={plant.lastFertilized}
                  nutrientLevel={plant.nutrientLevel ?? 100}
                />
                <HydrationTrendChart log={plant.hydrationLog ?? []} />
              </div>
            </section>

            {/* Care Trends */}
            <section className="rounded-xl border p-6 shadow-sm bg-white dark:bg-gray-900">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Care Trends</h2>
                <div className="flex gap-2 text-sm">
                  {(["monthly", "weekly", "yearly"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setTrendView(v)}
                      className={`px-3 py-1 rounded-full capitalize transition-colors ${
                        trendView === v
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                100% tasks completed on time this month
              </p>
              <CareTrendsChart events={plant.events} view={trendView} />
            </section>

            {/* Timeline */}
            <section className="rounded-xl border p-6 shadow-sm bg-white dark:bg-gray-900 space-y-4">
              <h2 className="text-lg font-semibold">Timeline</h2>
              <TimelineHeatmap activity={dailyActivity} />
              {!plant.events || plant.events.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">No activity yet.</p>
              ) : (
                <ol className="relative border-l ml-4">
                  {plant.events
                    .filter((e): e is PlantEvent => e !== null && e !== undefined)
                    .map((e) => {
                      const type =
                        EVENT_TYPES[e.type as keyof typeof EVENT_TYPES] ?? EVENT_TYPES.note
                      const Icon = type.icon
                      const dot =
                        e.type === "water"
                          ? "bg-blue-500"
                          : e.type === "fertilize"
                          ? "bg-green-500"
                          : "bg-purple-500"
                      const open = expandedId === e.id
                      return (
                        <li key={e.id} className="mb-6 ml-6">
                          <span
                            className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full text-white ${dot} ring-2 ring-white transition-transform hover:scale-110`}
                          >
                            <Icon className="w-3 h-3" />
                          </span>
                          <button
                            onClick={() => setExpandedId(open ? null : e.id)}
                            className="text-left w-full"
                          >
                            <time className="block text-xs text-gray-500">{e.date}</time>
                            <span className="font-medium">{type.label}</span>
                          </button>
                          {open && (
                            <div className="mt-2 p-3 rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-700 text-sm">
                              {e.type === "note" && e.note}
                            </div>
                          )}
                        </li>
                      )
                    })}
                </ol>
              )}
            </section>

            {/* Gallery */}
            <section className="rounded-xl border p-6 shadow-sm bg-white dark:bg-gray-900">
              <h2 className="text-lg font-semibold mb-4">Gallery</h2>
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
