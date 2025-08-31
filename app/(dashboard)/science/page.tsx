import { TempHumidityChart, VPDGauge } from "@/components/Charts"
import EnvRow from "@/components/EnvRow"
import Footer from "@/components/Footer"

export default function SciencePanel() {
  const readings = { temperature: 75, humidity: 52, vpd: 1.2 }
  return (
    <main className="flex-1 p-6">
      <header className="backdrop-blur bg-white/80 sticky top-0 z-10 p-4 flex items-center justify-between shadow-sm">
        <h2 className="font-semibold text-xl">Science Panel</h2>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">°F / °C</button>
      </header>

      <section className="mt-6">
        <h3 className="font-medium text-gray-800">Environment Data</h3>
        <EnvRow
          temperature={readings.temperature}
          humidity={readings.humidity}
          vpd={readings.vpd}
        />
        <TempHumidityChart />
      </section>

      <section className="mt-6">
        <h3 className="font-medium text-gray-800">VPD Gauge</h3>
        <VPDGauge />
      </section>

      <Footer />
    </main>
  )
}
