export interface PlantEvent {
  id: number
  type: string
  date: string
  note?: string
}

export interface Plant {
  nickname: string
  species: string
  status: string
  hydration: number
  hydrationLog?: { date: string; value: number }[]
  lastWatered: string
  nextDue: string
  lastFertilized: string
  nutrientLevel?: number
  events: PlantEvent[]
  photos: string[]
}
