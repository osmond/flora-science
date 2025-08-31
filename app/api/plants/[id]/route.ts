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
