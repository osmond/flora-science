import { Thermometer, Droplets, Wind } from "lucide-react"

export default function EnvRow() {
  return (
    <div className="mt-4 flex gap-6 text-sm items-center">
      <span className="flex items-center gap-1">
        <Thermometer className="w-4 h-4 text-red-500" /> 75°F
      </span>
      <span className="flex items-center gap-1">
        <Droplets className="w-4 h-4 text-blue-500" /> 52% RH
      </span>
      <span className="flex items-center gap-1">
        <Wind className="w-4 h-4 text-indigo-500" /> 1.2 kPa
      </span>
    </div>
  )
}
