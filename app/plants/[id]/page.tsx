import Link from "next/link"
import SidebarNav from "@/components/SidebarNav"
import Header from "@/components/Header"

const samplePlants = {
  "1": { nickname: "Delilah", species: "Monstera deliciosa", status: "Water overdue", hydration: 72 },
  "2": { nickname: "Sunny", species: "Sansevieria trifasciata", status: "Fine", hydration: 90 },
  "3": { nickname: "Ivy", species: "Epipremnum aureum", status: "Due today", hydration: 70 },
  "4": { nickname: "Figgy", species: "Ficus lyrata", status: "Fertilize suggested", hydration: 75 },
}

export default function PlantDetailPage({ params }: { params: { id: string } }) {
  const plant = samplePlants[params.id as keyof typeof samplePlants]

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r bg-gray-50">
        <SidebarNav />
      </aside>
      <main className="flex-1">
        <Header />

        <div className="p-6 space-y-4">
          <Link href="/" className="inline-block px-3 py-1 border rounded hover:bg-gray-50">
            ← Back to Today
          </Link>

          {!plant ? (
            <div className="rounded-lg border p-6">
              <h2 className="text-xl font-bold">Plant not found</h2>
              <p className="text-sm text-gray-500 mt-1">ID: {params.id}</p>
            </div>
          ) : (
            <>
              <header>
                <h1 className="text-2xl font-bold">{plant.nickname}</h1>
                <p className="italic text-gray-500">{plant.species}</p>
              </header>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg border p-4">
                  <p className="font-medium">Status</p>
                  <p className="text-gray-700">{plant.status}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="font-medium">Hydration</p>
                  <p className="text-gray-700">{plant.hydration}%</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="font-medium">Next Task</p>
                  <p className="text-gray-700">Water in ~2 days</p>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
