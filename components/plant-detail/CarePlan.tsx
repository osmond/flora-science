'use client'

import { useState } from 'react'
import { Sun, Droplet, Sprout, Wind, Scissors, Leaf } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface CarePlanProps {
  plan?: string | null
  nickname: string
}

interface Section {
  key: string
  icon: LucideIcon
  text: string
}

export default function CarePlan({ plan, nickname }: CarePlanProps) {
  const sectionsConfig: { key: string; icon: Section['icon'] }[] = [
    { key: 'Light', icon: Sun },
    { key: 'Water', icon: Droplet },
    { key: 'Feeding', icon: Sprout },
    { key: 'Humidity', icon: Wind },
    { key: 'Pruning', icon: Scissors },
  ]

  const sections: Section[] = sectionsConfig
    .map(({ key, icon }) => {
      const regex = new RegExp(`${key}:\s*(.*)`, 'i')
      const match = plan ? regex.exec(plan) : null
      return match ? { key, icon, text: match[1].trim() } : null
    })
    .filter((s): s is Section => s !== null)

  const hasPlan = plan && plan.trim()
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
        <p className="text-sm text-gray-600 dark:text-gray-400">No care plan available</p>
      ) : sections.length > 0 ? (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Overview</h3>
            <ul className="list-disc list-inside text-sm">
              {sections.map(({ key, text }) => {
                const summary = text.split('. ')[0]
                return (
                  <li key={key}>
                    <span className="font-medium">{key}:</span> {summary}
                  </li>
                )
              })}
            </ul>
          </div>
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
                  {isOpen && (
                    <div className="p-2 pt-0 text-sm">{text}</div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <pre className="whitespace-pre-line text-sm">{plan}</pre>
      )}
    </section>
  )
}

