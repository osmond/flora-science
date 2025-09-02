import { NextResponse } from 'next/server'
import { samplePlants } from '@/lib/plants'

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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const plant = samplePlants[params.id as keyof typeof samplePlants]
  if (!plant) {
    return NextResponse.json({ error: 'Plant not found' }, { status: 404 })
  }
  const { nickname, species, photo } = await request.json()
  if (typeof nickname === 'string') plant.nickname = nickname
  if (typeof species === 'string') plant.species = species
  if (typeof photo === 'string' && photo) {
    plant.photos = [photo, ...plant.photos.slice(1)]
  }
  return NextResponse.json(plant)
}
