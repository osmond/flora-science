import { NextResponse } from 'next/server'
import { samplePlants } from '@/lib/plants'

export async function GET() {
  return NextResponse.json(
    Object.entries(samplePlants).map(([id, plant]) => ({ id, ...plant }))
  )
}
