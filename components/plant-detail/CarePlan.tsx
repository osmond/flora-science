'use client'

// The CarePlan component presents plant care guidance grouped by importance.
// Primary care details (light, water, fertilizer) are surfaced directly while
// secondary tips like pests and pruning appear afterward in subtle bordered cards
// for clear separation.
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

  const overviewSection = sections.find((s) => s.key === 'Overview')

  const primarySections = sections.filter((s) =>
    ['Light Needs', 'Watering Frequency', 'Fertilizer'].includes(s.key)
  )

  const secondarySections = sections.filter((s) =>
    ['Pests', 'Pruning'].includes(s.key)
  )

  const otherSections = sections.filter((s) =>
    ![...primarySections, ...secondarySections].includes(s) && s.key !== 'Overview'
  )

  const renderSection = ({ key, icon: Icon, text }: Section) => (
    <section key={key} className="space-y-1">
      <h3 className="flex items-center h3">
        <Icon className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
        {key}
      </h3>
      <p className="body-text">{text}</p>
    </section>
  )

  return (
    <section className="rounded-xl p-6 bg-green-50 dark:bg-gray-800">
      <h2 className="h2 mb-4">Care Plan for {nickname}</h2>
      {!hasPlan ? (
        <p className="body-text text-gray-600 dark:text-gray-400">
          No care plan available
        </p>
      ) : sections.length > 0 ? (
        <>
          {overviewSection && (
            <div className="mb-4">{renderSection(overviewSection)}</div>
          )}
          {primarySections.length > 0 && (
            <div className="space-y-4">{primarySections.map(renderSection)}</div>
          )}
          {otherSections.length > 0 && (
            <div className="mt-4 space-y-4">{otherSections.map(renderSection)}</div>
          )}
          {secondarySections.length > 0 && (
            <div className="mt-4 space-y-4">
              {secondarySections.map((section) => (
                <div
                  key={section.key}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  {renderSection(section)}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <pre className="whitespace-pre-line body-text">
          {typeof plan === 'string' ? plan : JSON.stringify(plan, null, 2)}
        </pre>
      )}
    </section>
  )
}

