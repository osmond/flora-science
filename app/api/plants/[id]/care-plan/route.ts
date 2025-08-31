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

  if (!plant.carePlan) {
    const apiKey = process.env.OPENAI_API_KEY
    const prompt = `Provide a detailed weekly care plan for a ${plant.species} named ${plant.nickname}.`

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful gardening assistant.' },
            { role: 'user', content: prompt },
          ],
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        return NextResponse.json({ error: err }, { status: res.status })
      }

      const data = await res.json()
      plant.carePlan = data.choices?.[0]?.message?.content?.trim() || ''
    } catch (err) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : 'Unknown error' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ carePlan: plant.carePlan })
}
