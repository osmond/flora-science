'use client'

import {
  Sun,
  Droplet,
  Droplets,
  Thermometer,
  Sprout,
  FlaskConical,
  Scissors,
  Bug,
  BookOpen,
  Leaf,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface CarePlanData {
  light?: string
  water?: string
  humidity?: string
  temperature?: string
  soil?: string
  fertilization?: string
  pruning?: string
  pests?: string
  overview?: string
}

interface CarePlanProps {
  plan?: string | CarePlanData | null
  nickname: string
}

interface Section {
  label: string
  icon: LucideIcon
  text: string
}

export default function CarePlan({ plan, nickname }: CarePlanProps) {
  let planObj: CarePlanData | null = null
  if (plan) {
    try {
      planObj = typeof plan === 'string' ? JSON.parse(plan) : plan
    } catch {
      planObj = null
    }
  }

  const sectionsConfig: { key: keyof CarePlanData; label: string; icon: Section['icon'] }[] = [
    { key: 'light', label: 'Light', icon: Sun },
    { key: 'water', label: 'Water', icon: Droplet },
    { key: 'humidity', label: 'Humidity', icon: Droplets },
    { key: 'temperature', label: 'Temperature', icon: Thermometer },
    { key: 'soil', label: 'Soil', icon: Sprout },
    { key: 'fertilization', label: 'Fertilization', icon: FlaskConical },
    { key: 'pruning', label: 'Pruning', icon: Scissors },
    { key: 'pests', label: 'Pests', icon: Bug },
    { key: 'overview', label: 'Overview', icon: BookOpen },
  ]

  const sections: Section[] = planObj
    ? sectionsConfig
        .filter(({ key }) => planObj && planObj[key])
        .map(({ key, label, icon }) => ({
          label,
          icon,
          text: planObj![key] as string,
        }))
    : []

  const hasPlan = !!plan

  return (
    <section className="rounded-xl p-6 bg-green-50 dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Leaf className="w-6 h-6 mr-2" />
        Care Plan for {nickname}
      </h2>
      {!hasPlan ? (
        <p className="text-sm text-gray-600 dark:text-gray-400">No care plan available</p>
      ) : sections.length > 0 ? (
        <ul className="space-y-3 text-sm">
          {sections.map(({ label, icon: Icon, text }) => (
            <li key={label} className="flex items-start">
              <Icon className="w-5 h-5 mr-2 flex-shrink-0" />
              <div>
                <span className="font-medium">{label}: </span>
                {text}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <pre className="whitespace-pre-line text-sm">
          {typeof plan === 'string' ? plan : JSON.stringify(plan, null, 2)}
        </pre>
      )}
    </section>
  )
}

