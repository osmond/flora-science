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

  // Scientific explanation for species selection
  const [showInfo, setShowInfo] = useState(false);
  const speciesInfo = "Selecting the correct species helps provide tailored care recommendations and scientific insights. Use the scientific name for best results.";

  return (
    <div role="form" aria-label="Add Plant Form">
      <div className="flex items-center gap-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="species">
          Species
        </label>
        <button
          type="button"
          aria-label="What does species mean?"
          title="Species info"
          className="text-blue-500 hover:underline focus:outline-none focus:ring"
          onClick={() => setShowInfo(true)}
        >
          ℹ️
        </button>
      </div>
      {showInfo && (
        <div className="mb-2 text-xs text-gray-600 dark:text-gray-400" role="alert">
          {speciesInfo}
          <button className="ml-2 text-blue-500 underline" onClick={() => setShowInfo(false)} aria-label="Close info">Close</button>
        </div>
      )}
      <input
        id="species"
        type="text"
        value={speciesQuery}
        onChange={(e) => setSpeciesQuery(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="Start typing to search..."
        aria-autocomplete="list"
        aria-controls="species-suggestions"
        aria-label="Species search"
      />
      {suggestions.length > 0 && (
        <ul
          id="species-suggestions"
          className="mt-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 max-h-60 overflow-y-auto"
          role="listbox"
          aria-label="Species suggestions"
        >
          {suggestions.map((s, idx) => {
            const selected = speciesQuery === (s.commonName ?? s.scientificName)
            return (
              <li
                key={s.id}
                className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                role="option"
                tabIndex={0}
                aria-selected={selected ? 'true' : 'false'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSpeciesQuery(s.commonName ?? s.scientificName)
                  }
                }}
                onClick={() => setSpeciesQuery(s.commonName ?? s.scientificName)}
              >
                {s.commonName ?? s.scientificName}{' '}
                <span className="italic text-xs text-gray-500">{s.scientificName}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
