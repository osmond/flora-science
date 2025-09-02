'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import EnvRow from '@/components/EnvRow'
import ChartCard from '@/components/ChartCard'

const TempHumidityChart = dynamic(
  () => import('@/components/Charts').then((m) => m.TempHumidityChart),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)
const VPDGauge = dynamic(
  () => import('@/components/Charts').then((m) => m.VPDGauge),
  { ssr: false, loading: () => <p>Loading chart...</p> }
)

interface EnvData {
  temperature: number
  humidity: number
  vpd: number
}
interface EnvChartPoint {
  day: string
  temp: number
  rh: number
}
interface EnvironmentBlockProps {
  env: EnvData
  envChartData: EnvChartPoint[]
}

export default function EnvironmentBlock({ env, envChartData }: EnvironmentBlockProps) {
  const [open, setOpen] = useState(false)
  return (
    <details id="environment" open={open} aria-label="Environment metrics" role="region">
      <summary
        className="flex items-center gap-1 text-lg font-semibold cursor-pointer py-2 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
        onClick={() => setOpen((o) => !o)}
        tabIndex={0}
        aria-label="Show environment metrics"
      >
        Environment
      </summary>
      <p className="text-sm text-gray-500 mb-4" aria-live="polite">
        <strong>Metrics:</strong> Temperature, humidity, and vapor pressure deficit (VPD) readings help assess plant comfort and stress. Hover charts for details.
      </p>
      <EnvRow temperature={env.temperature} humidity={env.humidity} vpd={env.vpd} tempUnit="C" />
      <div className="mt-4 flex gap-6 overflow-x-auto snap-x snap-mandatory md:flex-col md:overflow-visible">
        <ChartCard
          title="Temperature & Humidity"
          insight="Comfort zone"
          variant="secondary"
        >
          <div tabIndex={0} aria-label="Temperature and humidity chart. Shows daily readings." title="Temperature and humidity chart. Shows daily readings.">
            <TempHumidityChart tempUnit="C" data={envChartData} />
          </div>
        </ChartCard>
        <ChartCard title="VPD" insight="VPD gauge" variant="secondary">
          <div tabIndex={0} aria-label={`VPD gauge. Current value: ${env.vpd}`} title={`VPD gauge. Current value: ${env.vpd}`}>
            <VPDGauge value={env.vpd} />
          </div>
        </ChartCard>
      </div>
    </details>
  )
}

