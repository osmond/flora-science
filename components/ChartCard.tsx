'use client'

import type { ReactNode } from 'react'
import { HelpCircle } from 'lucide-react'

interface ChartCardProps {
  title: string
  insight: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  onHelp?: () => void
  metricExplanation?: string
}

export default function ChartCard({
  title,
  insight,
  children,
  variant = 'secondary',
  onHelp,
  metricExplanation,
}: ChartCardProps) {
  const base = 'snap-start rounded-lg p-4 border shadow-sm'
  const variantClasses =
    variant === 'primary'
      ? 'min-w-full md:min-w-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
      : 'flex-shrink-0 min-w-[260px] md:min-w-0 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'

  return (
    <div className={`${base} ${variantClasses}`} role="region" aria-label={`Chart: ${title}`}> 
      <div className="mb-2 flex items-center gap-1">
        <h4 className="h4 font-semibold flex-1 text-gray-900 dark:text-gray-100" id={`chart-title-${title}`}>{title}</h4>
        {metricExplanation && (
          <button
            type="button"
            aria-label={`What does ${title} measure?`}
            title={`Metric explanation for ${title}`}
            className="text-blue-500 hover:underline focus:outline-none focus:ring ml-1"
            onClick={() => window.alert(metricExplanation)}
          >
            ℹ️
          </button>
        )}
        {onHelp && (
          <button
            type="button"
            onClick={onHelp}
            aria-label={`Help for ${title}`}
            className="text-gray-500 hover:text-gray-700"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4" aria-live="polite">{insight}</p>
      {children}
    </div>
  )
}

