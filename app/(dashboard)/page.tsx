import Link from "next/link"
import PlantCard from "@/components/PlantCard"
import Footer from "@/components/Footer"
import { supabase, Plant } from "@/lib/supabase"

export default async function TodayPage() {
  const { data: plants, error } = await supabase.from("plants").select("*")

  if (error) {
    return (
      <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
        <p className="text-red-500">Failed to load plants: {error.message}</p>
      </main>
    )
  }

  if (!plants) {
    return (
      <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
        <p>Loading...</p>
      </main>
    )
  }

  const avg =
    plants.length > 0
      ? Math.round(
          plants.reduce((sum, p) => sum + (p.hydration ?? 0), 0) / plants.length
        )
      : 0
  const tasksDue = plants.filter((p) => p.status?.toLowerCase().includes("due")).length

  return (
    <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 dark:bg-gray-900/70 p-2 flex items-center justify-between md:hidden">
        <span className="font-medium">Today</span>
        <button className="p-2 rounded-full bg-green-500 text-white">＋</button>
      </header>

      <header className="mt-4 mb-4 hidden md:block">
        <h2 className="text-xl font-bold">Today</h2>
        <p className="text-sm text-gray-500">{plants.length} plants · Avg hydration {avg}% · {tasksDue} tasks due today</p>
      </header>

      <section className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {plants.map((p: Plant) => (
          <Link key={p.id} href={`/plants/${p.id}`} className="block">
            <PlantCard
              nickname={p.nickname}
              species={p.species}
              status={p.status}
              hydration={p.hydration}
              note={p.note || undefined}
            />
          </Link>
        ))}
      </section>

      <Footer />
    </main>
  )
}
