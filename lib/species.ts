export type SpeciesSuggestion = {
  id: string
  scientificName: string
  commonName?: string
  imageUrl?: string
}

export async function getSpeciesSuggestions(query: string): Promise<SpeciesSuggestion[]> {
  const q = query.trim()
  if (!q) {
    return []
  }

  const apiKey = process.env.PLANT_ID_API_KEY
  if (!apiKey) {
    console.warn('PLANT_ID_API_KEY is not set')
    return []
  }

  const url = `https://api.plant.id/v3/names?query=${encodeURIComponent(q)}`

  const res = await fetch(url, {
    headers: { 'Api-Key': apiKey },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch species suggestions')
  }

  const json = await res.json()
  if (!json.data) {
    return []
  }

  return json.data.map((item: any) => ({
    id: String(item.id),
    scientificName: item.name,
    commonName: item.common_name,
    imageUrl: item.image_url,
  }))
}
