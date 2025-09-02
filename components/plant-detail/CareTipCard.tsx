'use client'

import type { LucideIcon } from 'lucide-react'

interface CareTipCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function CareTipCard({ icon: Icon, title, description }: CareTipCardProps) {
  return (
    <section className="p-6 md:p-8 rounded-lg bg-white dark:bg-gray-800 space-y-2">
      <h3 className="h3 flex items-center gap-2">
        <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        {title}
      </h3>
      <p className="text-sm leading-relaxed md:leading-loose">{description}</p>
    </section>
  )
}

