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
import CareTipCard from './CareTipCard'

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

  const colorMap: Record<string, { card: string; icon: string }> = {
    water: {
      card: 'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950',
      icon: 'text-blue-600',
    },
    light: {
      card: 'border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950',
      icon: 'text-yellow-600',
    },
    humidity: {
      card: 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950',
      icon: 'text-green-600',
    },
    soil: {
      card: 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950',
      icon: 'text-emerald-600',
    },
  }

  const primaryKeys = ['light', 'water', 'soil']
  const primary = sections.filter((s) => primaryKeys.includes(s.key))
  const secondary = sections.filter((s) => !primaryKeys.includes(s.key))

  return (
    <section className="rounded-xl p-6 bg-green-50 dark:bg-gray-800">
      <h2 className="h2 mb-6">Care Plan for {nickname}</h2>
      {!hasPlan ? (
        <p className="body-text text-gray-600 dark:text-gray-400">
          No care plan available
        </p>
      ) : sections.length > 0 ? (
        <>
          <div
            data-testid="care-tip-grid"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {primary.map(({ key, title, icon, text }) => (
              <CareTipCard
                key={key}
                icon={icon}
                title={title}
                description={text}
                className={colorMap[key]?.card}
                iconClass={colorMap[key]?.icon}
              />
            ))}
          </div>
          {secondary.length > 0 && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-gray-600 dark:text-gray-300">
                More care tips
              </summary>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {secondary.map(({ key, title, icon, text }) => (
                  <CareTipCard
                    key={key}
                    icon={icon}
                    title={title}
                    description={text}
                    className={colorMap[key]?.card}
                    iconClass={colorMap[key]?.icon}
                  />
                ))}
              </div>
            </details>
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

