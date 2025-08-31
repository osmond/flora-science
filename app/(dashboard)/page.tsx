import Link from "next/link"
import PlantCard from "@/components/PlantCard"
import Footer from "@/components/Footer"

type Plant = {
  id: string
  nickname: string
  species: string
  status: string
  hydration: number
  note?: string
}

const plants: Plant[] = [
  { id: "1", nickname: "Delilah", species: "Monstera deliciosa", status: "Water overdue", hydration: 72, note: "Needs water" },
  { id: "2", nickname: "Sunny", species: "Sansevieria trifasciata", status: "Fine", hydration: 90, note: "Loves bright light" },
  { id: "3", nickname: "Ivy", species: "Epipremnum aureum", status: "Due today", hydration: 70, note: "Trailing nicely" },
  { id: "4", nickname: "Figgy", species: "Ficus lyrata", status: "Fertilize suggested", hydration: 75, note: "New growth" },
]

export default function TodayPage() {
  return (
    <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-gray-900/70 p-2 flex items-center justify-between md:hidden">
        <span className="font-medium">Today</span>
        <button className="p-2 rounded-full bg-green-500 text-white">＋</button>
      </header>

      <header className="mt-4 mb-4 hidden md:block">
        <h2 className="text-xl font-bold">Today</h2>
        <p className="text-sm text-gray-500">4 plants · Avg hydration 72% · 2 tasks due today</p>
      </header>

      <section className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {plants.map((p) => (
          <Link key={p.id} href={`/plants/${p.id}`} className="block">
            <PlantCard
              nickname={p.nickname}
              species={p.species}
              status={p.status}
              hydration={p.hydration}
              note={p.note}
            />
          </Link>
        ))}
      </section>

      <Footer />
    </main>
  )
}
