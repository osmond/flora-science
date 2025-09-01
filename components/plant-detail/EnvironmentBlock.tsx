'use client'

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
  return (
    <details id="environment" open>
      <summary className="text-lg font-semibold cursor-pointer">Environment</summary>
      <p className="text-sm text-gray-500 mb-4">
        Temperature, humidity, and vapor pressure deficit readings.
      </p>
      <EnvRow temperature={env.temperature} humidity={env.humidity} vpd={env.vpd} tempUnit="C" />
      <div className="mt-4 flex gap-6 overflow-x-auto snap-x snap-mandatory md:flex-col md:overflow-visible">
        <ChartCard title="Temperature & Humidity" insight="Daily temperature and humidity readings.">
          <TempHumidityChart tempUnit="C" data={envChartData} />
        </ChartCard>
        <ChartCard title="VPD" insight="Vapor pressure deficit">
          <VPDGauge value={env.vpd} />
        </ChartCard>
      </div>
    </details>
  )
}

