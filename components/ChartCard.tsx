'use client'

import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  insight: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export default function ChartCard({
  title,
  insight,
  children,
  variant = 'secondary',
}: ChartCardProps) {
  const base =
    'snap-start rounded-lg p-4 border border-transparent dark:border-transparent'
  const variantClasses =
    variant === 'primary'
      ? 'min-w-full md:min-w-0 bg-white dark:bg-gray-900'
      : 'flex-shrink-0 min-w-[260px] md:min-w-0 bg-gray-50 dark:bg-gray-800'

  return (
    <div className={`${base} ${variantClasses}`}>
      <h4 className="h4 font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{insight}</p>
      {children}
    </div>
  )
}

