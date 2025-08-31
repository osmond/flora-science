import { Thermometer, Droplets, Wind } from "lucide-react"
import { formatHumidity, formatTemperature, formatVpd } from "@/lib/utils"

type EnvRowProps = {
  temperature: number
  humidity: number
  vpd: number
  tempUnit?: 'F' | 'C'
}

export default function EnvRow({
  temperature,
  humidity,
  vpd,
  tempUnit = 'F',
}: EnvRowProps) {
  return (
    <div className="mt-4 flex gap-6 text-sm items-center">
      <span className="flex items-center gap-1">
        <Thermometer className="w-4 h-4 text-red-500" />
        {formatTemperature(temperature, tempUnit)}
      </span>
      <span className="flex items-center gap-1">
        <Droplets className="w-4 h-4 text-blue-500" />
        {formatHumidity(humidity)}
      </span>
      <span className="flex items-center gap-1">
        <Wind className="w-4 h-4 text-indigo-500" />
        {formatVpd(vpd)}
      </span>
    </div>
  )
}
