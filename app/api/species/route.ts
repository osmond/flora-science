import { NextResponse } from 'next/server'
import { getSpeciesSuggestions } from '@/lib/species'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''

  try {
    const suggestions = await getSpeciesSuggestions(query)
    return NextResponse.json(suggestions)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch species suggestions' }, { status: 500 })
  }
}
