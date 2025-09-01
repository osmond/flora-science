export interface PlantEvent {
  id: number
  type: string
  date: string
  note?: string
}

export interface CarePlan {
  light?: string
  water?: string
  humidity?: string
  temperature?: string
  soil?: string
  fertilization?: string
  pruning?: string
  pests?: string
  overview?: string
}

export interface Plant {
  nickname: string
  species: string
  status: string
  room: string
  hydration: number
  hydrationLog: { date: string; value: number }[]
  lastWatered: string
  nextDue: string
  lastFertilized: string
  potSize: number
  nutrientLevel?: number
  events: PlantEvent[]
  photos: string[]
  carePlan?: CarePlan | string
}

export const samplePlants: Record<string, Plant> = {
  "1": {
    nickname: "Delilah",
    species: "Monstera deliciosa",
    status: "Water overdue",
    room: "Living Room",
    hydration: 72,
    hydrationLog: [
      { date: "2024-08-21", value: 80 },
      { date: "2024-08-24", value: 75 },
      { date: "2024-08-27", value: 72 },
    ],
    lastWatered: "Aug 25",
    lastFertilized: "Aug 10",
    nextDue: "Aug 30",
    potSize: 25,
    nutrientLevel: 55,
    events: [
      { id: 1, type: "water", date: "Aug 25" },
      { id: 2, type: "note", date: "Aug 20", note: "New leaf unfurling" }
    ],
    photos: [
      "/example-plant.png",
      "/example-plant2.png",
      "/example-plant3.png",
    ]
  },
  "2": {
    nickname: "Sunny",
    species: "Sansevieria trifasciata",
    status: "Fine",
    room: "Bedroom",
    hydration: 90,
    hydrationLog: [
      { date: "2024-08-22", value: 92 },
      { date: "2024-08-25", value: 91 },
      { date: "2024-08-28", value: 90 },
    ],
    lastWatered: "Aug 27",
    lastFertilized: "Aug 01",
    nextDue: "Sep 5",
    potSize: 15,
    nutrientLevel: 40,
    events: [{ id: 1, type: "water", date: "Aug 27" }],
    photos: ["https://placehold.co/800x400.png?text=Sunny"]
  },
  "3": {
    nickname: "Ivy",
    species: "Epipremnum aureum",
    status: "Due today",
    room: "Living Room",
    hydration: 70,
    hydrationLog: [
      { date: "2024-08-21", value: 72 },
      { date: "2024-08-24", value: 71 },
      { date: "2024-08-27", value: 70 },
    ],
    lastWatered: "Aug 28",
    lastFertilized: "Aug 18",
    nextDue: "Aug 29",
    potSize: 12,
    nutrientLevel: 60,
    events: [{ id: 1, type: "water", date: "Aug 28" }],
    photos: ["https://placehold.co/800x400.png?text=Ivy"]
  },
  "4": {
    nickname: "Figgy",
    species: "Ficus lyrata",
    status: "Fertilize suggested",
    room: "Office",
    hydration: 75,
    hydrationLog: [
      { date: "2024-08-21", value: 78 },
      { date: "2024-08-24", value: 76 },
      { date: "2024-08-27", value: 75 },
    ],
    lastWatered: "Aug 23",
    lastFertilized: "Aug 15",
    nextDue: "Sep 2",
    potSize: 30,
    nutrientLevel: 80,
    events: [
      { id: 1, type: "fertilize", date: "Aug 15" },
      { id: 2, type: "water", date: "Aug 23" }
    ],
    photos: ["https://placehold.co/800x400.png?text=Figgy"]
  }
}
