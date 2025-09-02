'use client'

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

  const overviewSection = sections.find((s) => s.key === 'Overview')
  const primaryOrder = ['Light Needs', 'Watering Frequency', 'Fertilizer']
  const primarySections: Section[] = primaryOrder
    .map((k) => sections.find((s) => s.key === k)!)
    .filter((s): s is Section => Boolean(s))
  const remainingPrimary = sections.filter(
    (s) => !['Overview', 'Pests', 'Pruning', ...primaryOrder].includes(s.key)
  )
  primarySections.push(...remainingPrimary)
  const secondarySections = sections.filter((s) =>
    ['Pests', 'Pruning'].includes(s.key)
  )

  const renderSection = ({ key, icon: Icon, text }: Section) => (
    <section key={key} className="space-y-1">
      <h3 className="flex items-center font-medium">
        <Icon className="w-5 h-5 mr-2" />
        {key}
      </h3>
      <p className="text-sm">{text}</p>
    </section>
  )

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
            {overviewSection && (
              <div className="mb-4">{renderSection(overviewSection)}</div>
            )}
            <div className="space-y-4">
              <div className="space-y-4">
                {primarySections.map(renderSection)}
              </div>
              {secondarySections.length > 0 && (
                <details className="pt-4 border-t">
                  <summary className="cursor-pointer text-sm font-medium">
                    Additional care
                  </summary>
                  <div className="mt-2 space-y-4">
                    {secondarySections.map(renderSection)}
                  </div>
                </details>
              )}
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

