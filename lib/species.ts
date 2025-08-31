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

  const token = process.env.TREFLE_TOKEN
  if (!token) {
    console.warn('TREFLE_TOKEN is not set')
    return []
  }

  const params = new URLSearchParams({ token, q })
  const url = `https://trefle.io/api/v1/species/search?${params.toString()}`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch species suggestions')
  }

  const json = await res.json()
  if (!json.data) {
    return []
  }

  return json.data.map((item: any) => ({
    id: String(item.id),
    scientificName: item.scientific_name,
    commonName: item.common_name,
    imageUrl: item.image_url,
  }))
}
