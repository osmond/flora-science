import Link from "next/link"
import PlantCard from "@/components/PlantCard"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import { samplePlants } from "@/lib/plants"

export default function TodayPage() {
  const plants = Object.entries(samplePlants)
  const plantsCount = plants.length
  const avgHydration = Math.round(
    plants.reduce((sum, [, p]) => sum + p.hydration, 0) / plantsCount
  )
  const tasksDue = plants.filter(([, p]) => p.status.toLowerCase().includes("due")).length

  return (
    <>
      <Header plantsCount={plantsCount} avgHydration={avgHydration} tasksDue={tasksDue} />
      <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto">
          <header className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-gray-900/70 p-2 flex items-center justify-between md:hidden">
            <span className="font-medium">Today</span>
            <button className="p-2 rounded-full bg-green-500 text-white">＋</button>
          </header>

          <header className="mt-4 mb-4 hidden md:block">
            <h2 className="text-xl font-bold">Today</h2>
            <p className="text-sm text-gray-500">
              {plantsCount} plants · Avg hydration {avgHydration}% · {tasksDue} tasks due today
            </p>
          </header>

          <section className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {plants.map(([id, p]) => (
              <Link key={id} href={`/plants/${id}`} className="block">
                <PlantCard
                  nickname={p.nickname}
                  species={p.species}
                  status={p.status}
                  hydration={p.hydration}
                />
              </Link>
            ))}
          </section>

          <Footer />
        </div>
      </main>
    </>
  )
}
