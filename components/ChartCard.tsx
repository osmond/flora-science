'use client'

import type { ReactNode } from 'react'
import { HelpCircle } from 'lucide-react'

interface ChartCardProps {
  title: string
  insight: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  onHelp?: () => void
}

export default function ChartCard({
  title,
  insight,
  children,
  variant = 'secondary',
  onHelp,
}: ChartCardProps) {
  const base = 'snap-start rounded-lg p-4 border shadow-sm'
  const variantClasses =
    variant === 'primary'
      ? 'min-w-full md:min-w-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
      : 'flex-shrink-0 min-w-[260px] md:min-w-0 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'

  return (
    <div className={`${base} ${variantClasses}`}>
      <div className="mb-2 flex items-center gap-1">
        <h4 className="h4 font-semibold flex-1 text-gray-900 dark:text-gray-100">{title}</h4>
        {onHelp && (
          <button
            type="button"
            onClick={onHelp}
            aria-label="Help"
            className="text-gray-500 hover:text-gray-700"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{insight}</p>
      {children}
    </div>
  )
}

