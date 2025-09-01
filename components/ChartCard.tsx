'use client'

import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  insight: string
  children: ReactNode
}

export default function ChartCard({ title, insight, children }: ChartCardProps) {
  return (
    <div className="flex-shrink-0 min-w-full md:min-w-0 rounded-lg bg-white dark:bg-gray-900 p-4 shadow-sm">
      <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{insight}</p>
      {children}
    </div>
  )
}

