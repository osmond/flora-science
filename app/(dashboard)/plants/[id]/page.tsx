'use client'

import { useEffect, useState, useCallback } from "react"
import { ToastProvider, useToast } from "@/components/Toast"
import PlantDetailSkeleton from "./PlantDetailSkeleton"
import WaterModal from "@/components/WaterModal"
import FertilizeModal from "@/components/FertilizeModal"
import NoteModal from "@/components/NoteModal"
import HeroSection from "@/components/plant-detail/HeroSection"
import QuickStats from "@/components/plant-detail/QuickStats"
import AnalyticsPanel from "@/components/plant-detail/AnalyticsPanel"
import CareTrends from "@/components/plant-detail/CareTrends"
import Timeline from "@/components/plant-detail/Timeline"
import Gallery from "@/components/plant-detail/Gallery"
import type { Plant } from "@/components/plant-detail/types"
import { getWeatherForUser, type Weather } from "@/lib/weather"
import { samplePlants, sanitizeEvents } from "@/lib/plants"


export function PlantDetailContent({ params }: { params: { id: string } }) {
  const [plant, setPlant] = useState<Plant | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [waterOpen, setWaterOpen] = useState(false)
  const [fertilizeOpen, setFertilizeOpen] = useState(false)
  const [noteOpen, setNoteOpen] = useState(false)
  const toast = useToast()
  const [weather, setWeather] = useState<Weather | null>(null)
  const [offline, setOffline] = useState(false)

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
        data.events = sanitizeEvents(data.events)
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
            events: sanitizeEvents(sample.events),
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
          events: sanitizeEvents(sample.events),
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

            <HeroSection
              plant={plant}
              onWater={handleWater}
              onFertilize={handleFertilize}
              onAddNote={handleAddNote}
            />
            <QuickStats plant={plant} weather={weather} />
            <AnalyticsPanel plant={plant} weather={weather} />
            <CareTrends events={plant.events} />
            <Timeline events={plant.events} />
            <Gallery photos={plant.photos} nickname={plant.nickname} />
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
