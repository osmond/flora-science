'use client'

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
          {sections.map(({ key, icon: Icon, text }) => (
            <li key={key} className="flex items-start">
              <Icon className="w-5 h-5 mr-2 flex-shrink-0" />
              <div>
                <span className="font-medium">{key}: </span>
                {text}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <pre className="whitespace-pre-line text-sm">{plan}</pre>
      )}
    </section>
  )
}

