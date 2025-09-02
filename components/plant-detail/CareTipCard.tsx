'use client'

import type { LucideIcon } from 'lucide-react'

interface CareTipCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function CareTipCard({
  icon: Icon,
  title,
  description,
}: CareTipCardProps) {
  return (
    <div className="p-4 sm:p-6 space-y-2 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="h3 flex items-center gap-2">
        <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        {title}
      </h3>
      <p className="body-text leading-relaxed md:leading-loose">{description}</p>
    </div>
  )
}

