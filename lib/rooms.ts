export interface RoomPlant {
  id: string
  nickname: string
  species: string
  status: string
  hydration: number
}

export interface RoomEvent {
  type: string
  date: string
}

export interface RoomDetail {
  name: string
  hydration: number
  tasks: number
  status: 'healthy' | 'needs_water' | 'warning'
  tags: string[]
  plants: RoomPlant[]
  events: RoomEvent[]
}

export const sampleRooms: Record<string, RoomDetail> = {
  'living-room': {
    name: 'Living Room',
    hydration: 72,
    tasks: 2,
    status: 'healthy',
    tags: ['indoor', 'bright'],
    plants: [
      { id: '1', nickname: 'Delilah', species: 'Monstera deliciosa', status: 'Water overdue', hydration: 72 },
      { id: '3', nickname: 'Ivy', species: 'Epipremnum aureum', status: 'Due today', hydration: 70 },
    ],
    events: [
      { type: 'water', date: '2024-01-10' },
      { type: 'fertilize', date: '2024-02-12' },
    ],
  },
  bedroom: {
    name: 'Bedroom',
    hydration: 65,
    tasks: 1,
    status: 'needs_water',
    tags: ['indoor', 'low-light'],
    plants: [
      { id: '2', nickname: 'Sunny', species: 'Sansevieria trifasciata', status: 'Fine', hydration: 90 },
    ],
    events: [
      { type: 'water', date: '2024-03-05' },
    ],
  },
  office: {
    name: 'Office',
    hydration: 82,
    tasks: 0,
    status: 'warning',
    tags: ['indoor', 'workspace'],
    plants: [
      { id: '4', nickname: 'Figgy', species: 'Ficus lyrata', status: 'Fertilize suggested', hydration: 75 },
    ],
    events: [],
  },
}
