'use client'

// The CarePlan component presents plant care guidance as a concise checklist.
// Each care item is displayed with a small icon and description for clear,
// scientific-style instructions.
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
  title: string
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
      return text ? { key, title: label, icon, text } : null
    })
    .filter((s): s is Section => s !== null)

  const hasPlan = !!planObj
  return (
    <section className="rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="h2 mb-6">Care Plan for {nickname}</h2>
      {!hasPlan ? (
        <p className="body-text text-gray-600 dark:text-gray-400">
          No care plan available
        </p>
      ) : sections.length > 0 ? (
        <ul
          data-testid="care-checklist"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {sections.map(({ key, title, icon: Icon, text }) => (
            <li
              key={key}
              className="flex gap-3 p-4 border border-gray-100 dark:border-gray-800 rounded-lg"
            >
              <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1" />
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <pre className="whitespace-pre-line body-text">
          {typeof plan === 'string' ? plan : JSON.stringify(plan, null, 2)}
        </pre>
      )}
    </section>
  )
}

