'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import ChartCard from '@/components/ChartCard'
import Modal from '@/components/Modal'
import { StressHelpContent } from '@/components/Charts'
import { type StressDatum } from '@/lib/plant-metrics'

const StressIndexChart = dynamic(
  () => import('@/components/Charts').then((m) => m.StressIndexChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)

interface StressBlockProps {
  stressData: StressDatum[]
}

export default function StressBlock({ stressData }: StressBlockProps) {
  const [open, setOpen] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  return (
    <>
      <details id="plant-health" open={open} aria-label="Plant health metrics" role="region">
        <summary
          className="flex items-center gap-1 text-lg font-semibold cursor-pointer py-2 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
          onClick={() => setOpen((o) => !o)}
          tabIndex={0}
          aria-label="Show plant health metrics"
        >
          Plant Health
        </summary>
        <p className="text-sm text-gray-500 mb-4" aria-live="polite">
          <strong>Metrics:</strong> Stress index tracks plant health over time. Click help for calculation details. Hover chart for values.
        </p>
        <ChartCard
          title="Stress Trend"
          insight="Stress trending down"
          variant="secondary"
          onHelp={() => setShowHelp(true)}
        >
          <div tabIndex={0} aria-label="Stress index chart. Shows stress trend for this plant." title="Stress index chart. Shows stress trend for this plant.">
            <StressIndexChart data={stressData} />
          </div>
        </ChartCard>
      </details>
      <Modal isOpen={showHelp} onClose={() => setShowHelp(false)}>
        <StressHelpContent />
      </Modal>
    </>
  )
}

