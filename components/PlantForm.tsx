'use client'

import { useEffect, useState } from 'react'
import type { SpeciesSuggestion } from '@/lib/species'

export default function PlantForm() {
  const [speciesQuery, setSpeciesQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SpeciesSuggestion[]>([])

  useEffect(() => {
    const controller = new AbortController()

    const fetchSuggestions = async () => {
      if (!speciesQuery) {
        setSuggestions([])
        return
      }
      try {
        const res = await fetch(`/api/species?q=${encodeURIComponent(speciesQuery)}`, { signal: controller.signal })
        if (!res.ok) throw new Error('Failed to fetch species suggestions')
        const data: SpeciesSuggestion[] = await res.json()
        setSuggestions(data)
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error(err)
        }
      }
    }

    const timeout = setTimeout(fetchSuggestions, 300)
    return () => {
      controller.abort()
      clearTimeout(timeout)
    }
  }, [speciesQuery])

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="species">
        Species
      </label>
      <input
        id="species"
        type="text"
        value={speciesQuery}
        onChange={(e) => setSpeciesQuery(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="Start typing to search..."
      />
      {suggestions.length > 0 && (
        <ul className="mt-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 max-h-60 overflow-y-auto">
          {suggestions.map((s) => (
            <li key={s.id} className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              {s.commonName ?? s.scientificName}{' '}
              <span className="italic text-xs text-gray-500">{s.scientificName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
