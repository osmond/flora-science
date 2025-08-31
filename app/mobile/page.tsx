import PlantCard from "@/components/PlantCard"
import Footer from "@/components/Footer"

export default function MobileHome() {
  return (
    <div className="p-4">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 p-2 flex items-center justify-between">
        <span className="font-medium">Today</span>
        <button className="p-2 rounded-full bg-green-500 text-white">＋</button>
      </header>

      <div className="mt-4 space-y-4">
        <PlantCard nickname="Delilah" species="Monstera deliciosa" status="💧 Overdue" />
        <PlantCard nickname="Sunny" species="Sansevieria trifasciata" status="✓ Fine" />
      </div>

      <Footer />
    </div>
  )
}
