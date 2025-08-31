import { getSpeciesSuggestions } from '../species'

describe('getSpeciesSuggestions', () => {
  const originalFetch = global.fetch

  afterEach(() => {
    global.fetch = originalFetch as any
    delete process.env.PLANT_ID_API_KEY
  })

  it('maps Plant.id response to SpeciesSuggestion', async () => {
    process.env.PLANT_ID_API_KEY = 'test-key'

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: 1,
            name: 'Rosa rubiginosa',
            common_name: 'sweet briar',
            image_url: 'https://example.com/rosa.jpg',
          },
        ],
      }),
    }) as any

    const result = await getSpeciesSuggestions('rosa')

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.plant.id/v3/names?query=rosa',
      {
        headers: { 'Api-Key': 'test-key' },
      }
    )

    expect(result).toEqual([
      {
        id: '1',
        scientificName: 'Rosa rubiginosa',
        commonName: 'sweet briar',
        imageUrl: 'https://example.com/rosa.jpg',
      },
    ])
  })
})
