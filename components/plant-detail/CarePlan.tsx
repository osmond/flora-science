'use client'

import { useState } from 'react'
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
}

interface Section {
  key: string
  icon: LucideIcon
  text: string
}

export default function CarePlan({ plan, nickname }: CarePlanProps) {
  const planObj: Record<string, string> | null = plan
    ? typeof plan === 'string'
      ? JSON.parse(plan)
      : plan
    : null

  const sectionsConfig: { key: string; label: string; icon: LucideIcon }[] = [
    { key: 'overview', label: 'Overview', icon: BookOpen },
    { key: 'light', label: 'Light', icon: Sun },
    { key: 'water', label: 'Water', icon: Droplet },
    { key: 'humidity', label: 'Humidity', icon: Wind },
    { key: 'temperature', label: 'Temperature', icon: Thermometer },
    { key: 'soil', label: 'Soil', icon: LandPlot },
    { key: 'fertilization', label: 'Fertilization', icon: Sprout },
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
  const [openSections, setOpenSections] = useState<string[]>([])

  const toggleSection = (key: string) => {
    setOpenSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const allOpen = openSections.length === sections.length
  const toggleAll = () =>
    setOpenSections(allOpen ? [] : sections.map((s) => s.key))

  return (
    <section className="rounded-xl p-6 bg-green-50 dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Leaf className="w-6 h-6 mr-2" />
        Care Plan for {nickname}
      </h2>
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
          <div className="space-y-2">
            {sections.map(({ key, icon: Icon, text }) => {
              const isOpen = openSections.includes(key)
              return (
                <div key={key} className="border rounded-md">
                  <button
                    type="button"
                    className="w-full flex items-center p-2 text-left"
                    onClick={() => toggleSection(key)}
                  >
                    <Icon className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span className="font-medium">{key}</span>
                  </button>
                  {isOpen && <div className="p-2 pt-0 text-sm">{text}</div>}
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <pre className="whitespace-pre-line text-sm">
          {typeof plan === 'string' ? plan : JSON.stringify(plan, null, 2)}
        </pre>
      )}
    </section>
  )
}

