'use client'

import { useEffect, useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { ToastProvider, useToast } from "@/components/Toast"
import PlantDetailSkeleton from "./PlantDetailSkeleton"
import HeroSection from "@/components/plant-detail/HeroSection"
import AnalyticsPanel from "@/components/plant-detail/AnalyticsPanel"
import Timeline from "@/components/plant-detail/Timeline"
import Gallery from "@/components/plant-detail/Gallery"
import CarePlan from "@/components/plant-detail/CarePlan"

const WaterModal = dynamic(() => import("@/components/WaterModal"), {
  ssr: false,
  loading: () => null,
})
const FertilizeModal = dynamic(() => import("@/components/FertilizeModal"), {
  ssr: false,
  loading: () => null,
})
const NoteModal = dynamic(() => import("@/components/NoteModal"), {
  ssr: false,
  loading: () => null,
})
const EditPlantModal = dynamic(() => import("@/components/EditPlantModal"), {
  ssr: false,
  loading: () => null,
})
import type { Plant, PlantEvent } from "@/components/plant-detail/types"
import { getWeatherForUser, type Weather } from "@/lib/weather"
import { samplePlants } from "@/lib/plants"
import { calculateEt0, calculateWaterRecommendation } from "@/lib/plant-metrics"


export function PlantDetailContent({ params }: { params: { id: string } }) {
  const [plant, setPlant] = useState<Plant | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [waterOpen, setWaterOpen] = useState(false)
  const [fertilizeOpen, setFertilizeOpen] = useState(false)
  const [noteOpen, setNoteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const toast = useToast()
  const [weather, setWeather] = useState<Weather | null>(null)
  const [offline, setOffline] = useState(false)
  const [carePlan, setCarePlan] = useState<Record<string, string> | null>(null)
  const [carePlanError, setCarePlanError] = useState<string | null>(null)
  const [carePlanLoading, setCarePlanLoading] = useState(false)

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

  function handleEdit() {
    setEditOpen(true)
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

  function handleEditSubmit({
    nickname,
    species,
    photo,
  }: {
    nickname: string
    species: string
    photo: string
  }) {
    setPlant((prev) =>
      prev
        ? {
            ...prev,
            nickname,
            species,
            photos: photo ? [photo, ...prev.photos.slice(1)] : prev.photos,
          }
        : prev,
    )

    fetch(`/api/plants/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname, species, photo }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed")
        return res.json()
      })
      .then((data) => setPlant(data))
      .then(() => toast("Plant updated"))
      .catch(() => toast("Failed to update plant"))
  }

  async function fetchWeatherForPlant(): Promise<Weather | null> {
    try {
      const w = await getWeatherForUser()
      setWeather(w)
      return w
    } catch {
      return null
    }
  }

  async function loadSamplePlant(): Promise<boolean> {
    const sample = samplePlants[params.id as keyof typeof samplePlants]
    if (!sample) return false

    const w = await fetchWeatherForPlant()
    const et0 =
      w &&
      calculateEt0({
        date: new Date().toISOString(),
        temperature: w.temperature,
        humidity: w.humidity,
        solarRadiation: w.solarRadiation,
        windSpeed: w.windSpeed,
      })
    const offlinePlant: Plant = {
      ...sample,
      events: (Array.isArray(sample.events) ? sample.events : []).filter(
        (e: PlantEvent | null): e is PlantEvent =>
          e !== null && e !== undefined && typeof e.id !== "undefined"
      ),
      nextDue: calculateNextDue(sample.lastWatered, w),
      recommendedWaterMl:
        w && typeof et0 === "number"
          ? calculateWaterRecommendation(sample.potSize, et0)
          : undefined,
    }
    setPlant(offlinePlant)
    setOffline(true)
    setError(null)
    return true
  }

  const loadPlant = useCallback(async () => {
    setLoading(true)
    setError(null)
    setOffline(false)
    try {
      const res = await fetch(`/api/plants/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        const w = await fetchWeatherForPlant()
        const et0 =
          w &&
          calculateEt0({
            date: new Date().toISOString(),
            temperature: w.temperature,
            humidity: w.humidity,
            solarRadiation: w.solarRadiation,
            windSpeed: w.windSpeed,
          })
        data.nextDue = calculateNextDue(data.lastWatered, w)
        data.events = (Array.isArray(data.events) ? data.events : []).filter(
          (e: PlantEvent | null): e is PlantEvent =>
            e !== null && e !== undefined && typeof e.id !== "undefined"
        )
        data.recommendedWaterMl =
          w && typeof et0 === "number"
            ? calculateWaterRecommendation(data.potSize, et0)
            : undefined
        setPlant(data)
      } else if (!(await loadSamplePlant())) {
        setPlant(null)
        setError(`Error ${res.status}`)
      }
    } catch (err) {
      if (!(await loadSamplePlant())) {
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

  useEffect(() => {
    let active = true
    setCarePlanLoading(true)
    setCarePlanError(null)
    fetch(`/api/plants/${params.id}/care-plan`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (active) setCarePlan(data.carePlan)
      })
      .catch((err) => {
        if (active)
          setCarePlanError(
            err instanceof Error ? err.message : String(err),
          )
      })
      .finally(() => {
        if (active) setCarePlanLoading(false)
      })
    return () => {
      active = false
    }
  }, [params.id])

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
                <h2 className="h2 font-bold">Failed to load plant</h2>
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
                <h2 className="h2 font-bold">Plant not found</h2>
                <p className="text-sm text-gray-500 mt-1">ID: {params.id}</p>
              </>
            )}
          </div>
        ) : (
          <>
            <HeroSection
              plant={plant}
              weather={weather}
              onWater={handleWater}
              onFertilize={handleFertilize}
              onAddNote={handleAddNote}
              onEdit={handleEdit}
            />
            <div className="mt-8">
              {carePlanLoading ? (
                <div className="rounded-xl p-6 bg-green-50 dark:bg-gray-800 text-center text-sm text-gray-500">
                  Loading care plan...
                </div>
              ) : carePlanError ? (
                <div className="rounded-xl p-6 bg-green-50 dark:bg-gray-800 text-sm text-red-500">
                  {carePlanError}
                </div>
              ) : (
                <CarePlan plan={carePlan} nickname={plant.nickname} />
              )}
            </div>
            <div className="mt-8">
              <AnalyticsPanel plant={plant} weather={weather} />
            </div>
            <div className="mt-8">
              <Timeline events={plant.events} />
            </div>
            <div className="mt-8">
              <Gallery photos={plant.photos} nickname={plant.nickname} />
            </div>
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
      {plant && (
        <EditPlantModal
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          plant={plant}
          onSubmit={handleEditSubmit}
        />
      )}
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
