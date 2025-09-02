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

  return (
    <section className="rounded-xl p-6 bg-green-50 dark:bg-gray-800">
      <h2 className="section-heading mb-6">Care Plan for {nickname}</h2>
      {!hasPlan ? (
        <p className="body-text text-gray-600 dark:text-gray-400">
          No care plan available
        </p>
      ) : sections.length > 0 ? (
        <div
          data-testid="care-tip-grid"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {sections.map(({ key, title, icon, text }) => (
            <CareTipCard
              key={key}
              icon={icon}
              title={title}
              description={text}
            />
          ))}
        </div>
      ) : (
        <pre className="whitespace-pre-line body-text">
          {typeof plan === 'string' ? plan : JSON.stringify(plan, null, 2)}
        </pre>
      )}
    </section>
  )
}

