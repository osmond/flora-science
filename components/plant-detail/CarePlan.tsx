'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Sun,
  Droplet,
  Wind,
  Thermometer,
  LandPlot,
  Sprout,
  Scissors,
  Bug,
  BookOpen,
  Leaf,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface CarePlanProps {
  plan?: string | Record<string, string> | null
  nickname: string
  photo?: string
}

interface Section {
  key: string
  icon: LucideIcon
  text: string
}

export default function CarePlan({ plan, nickname, photo }: CarePlanProps) {
  const planObj: Record<string, string> | null = plan
    ? typeof plan === 'string'
      ? JSON.parse(plan)
      : plan
    : null

  const sectionsConfig: { key: string; label: string; icon: LucideIcon }[] = [
    { key: 'overview', label: 'Overview', icon: BookOpen },
    { key: 'light', label: 'Light Needs', icon: Sun },
    { key: 'water', label: 'Watering Frequency', icon: Droplet },
    { key: 'humidity', label: 'Humidity', icon: Wind },
    { key: 'temperature', label: 'Temperature', icon: Thermometer },
    { key: 'soil', label: 'Soil', icon: LandPlot },
    { key: 'fertilizer', label: 'Fertilizer', icon: Sprout },
    { key: 'pruning', label: 'Pruning', icon: Scissors },
    { key: 'pests', label: 'Pests', icon: Bug },
  ]

  const sections: Section[] = sectionsConfig
    .map(({ key, label, icon }) => {
      const text = planObj?.[key]
      return text ? { key: label, icon, text } : null
    })
    .filter((s): s is Section => s !== null)

  const hasPlan = !!planObj
  const [openSections, setOpenSections] = useState<string[]>(
    sections.map((s) => s.key)
  )

  const overviewSection = sections.find((s) => s.key === 'Overview')
  const leftSections = sections.filter((s) =>
    ['Light Needs', 'Watering Frequency', 'Humidity', 'Temperature'].includes(s.key)
  )
  const rightSections = sections.filter((s) =>
    ['Soil', 'Fertilizer', 'Pruning', 'Pests'].includes(s.key)
  )

  const toggleSection = (key: string) => {
    setOpenSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const allOpen = openSections.length === sections.length
  const toggleAll = () =>
    setOpenSections(allOpen ? [] : sections.map((s) => s.key))

  const renderSection = ({ key, icon: Icon, text }: Section) => {
    const isOpen = openSections.includes(key)
    const guidance =
      key === 'Light Needs'
        ? 'Prefers bright, indirect sunlight.'
        : key === 'Watering Frequency'
          ? 'Water when the top inch of soil is dry.'
          : null
    return (
      <div key={key} className="border rounded-md">
        <button
          type="button"
          className="w-full flex items-center p-2 text-left"
          onClick={() => toggleSection(key)}
          title={guidance ?? undefined}
        >
          <Icon className="w-5 h-5 mr-2 flex-shrink-0" />
          <span className="font-medium">
            {key}
            {guidance && (
              <small aria-hidden="true" className="block ml-2 text-gray-500">
                {guidance}
              </small>
            )}
          </span>
        </button>
        {isOpen && <div className="p-2 pt-0 text-sm">{text}</div>}
      </div>
    )
  }

  return (
    <section className="rounded-xl overflow-hidden bg-green-50 dark:bg-gray-800">
      <div className="relative h-48 sm:h-64">
        {photo ? (
          <Image
            src={photo}
            alt={nickname}
            fill
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <span className="text-gray-500 dark:text-gray-400">No photo</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-black/40 p-4">
          <h2 className="h2 flex items-center text-white">
            <Leaf className="w-6 h-6 mr-2" />
            Care Plan for {nickname}
          </h2>
        </div>
      </div>
      <div className="p-6">
        {!hasPlan ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No care plan available
          </p>
        ) : sections.length > 0 ? (
          <>
            <div className="flex justify-end mb-2">
              <button
                type="button"
                className="text-xs text-blue-600 dark:text-blue-400"
                onClick={toggleAll}
              >
                {allOpen ? 'Collapse all' : 'Show all'}
              </button>
            </div>
            {overviewSection && (
              <div className="mb-2">{renderSection(overviewSection)}</div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
              <div className="space-y-2">{leftSections.map(renderSection)}</div>
              <div className="space-y-2">{rightSections.map(renderSection)}</div>
            </div>
          </>
        ) : (
          <pre className="whitespace-pre-line text-sm">
            {typeof plan === 'string' ? plan : JSON.stringify(plan, null, 2)}
          </pre>
        )}
      </div>
    </section>
  )
}

