import { NextResponse } from 'next/server'

const samplePlants = {
  "1": {
    nickname: "Delilah",
    species: "Monstera deliciosa",
    status: "Water overdue",
    hydration: 72,
    lastWatered: "Aug 25",
    nextDue: "Aug 30",
    events: [
      { id: 1, type: "water", date: "Aug 25" },
      { id: 2, type: "note", date: "Aug 20", note: "New leaf unfurling" }
    ],
    photos: [
      "https://placehold.co/800x400?text=Delilah",
      "https://placehold.co/300x300?text=Delilah"
    ]
  },
  "2": {
    nickname: "Sunny",
    species: "Sansevieria trifasciata",
    status: "Fine",
    hydration: 90,
    lastWatered: "Aug 27",
    nextDue: "Sep 5",
    events: [{ id: 1, type: "water", date: "Aug 27" }],
    photos: ["https://placehold.co/800x400?text=Sunny"]
  },
  "3": {
    nickname: "Ivy",
    species: "Epipremnum aureum",
    status: "Due today",
    hydration: 70,
    lastWatered: "Aug 28",
    nextDue: "Aug 29",
    events: [{ id: 1, type: "water", date: "Aug 28" }],
    photos: ["https://placehold.co/800x400?text=Ivy"]
  },
  "4": {
    nickname: "Figgy",
    species: "Ficus lyrata",
    status: "Fertilize suggested",
    hydration: 75,
    lastWatered: "Aug 23",
    nextDue: "Sep 2",
    events: [
      { id: 1, type: "fertilize", date: "Aug 15" },
      { id: 2, type: "water", date: "Aug 23" }
    ],
    photos: ["https://placehold.co/800x400?text=Figgy"]
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const plant = samplePlants[params.id as keyof typeof samplePlants]
  if (!plant) {
    return NextResponse.json({ error: 'Plant not found' }, { status: 404 })
  }
  return NextResponse.json(plant)
}
