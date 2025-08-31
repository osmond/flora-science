"use client"

import Link from "next/link"
import PlantCard from "@/components/PlantCard"
import SidebarNav from "@/components/SidebarNav"

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
    <div className="flex">
      <SidebarNav />
      <main className="flex-1 p-6">
        <header className="mb-4">
          <h2 className="text-xl font-bold">Today</h2>
          <p className="text-sm text-gray-500">4 plants · Avg hydration 72% · 2 tasks due today</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <footer className="text-xs text-gray-400 mt-6">Last sync: 10:32 AM CDT</footer>
      </main>
    </div>
  )
}
