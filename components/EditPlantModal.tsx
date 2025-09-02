'use client'

import { useState, useEffect } from 'react'
import Modal from './Modal'
import type { Plant } from './plant-detail/types'

interface Props {
  isOpen: boolean
  onClose: () => void
  plant: Plant
  onSubmit: (data: { nickname: string; species: string; photo: string }) => void
}

export default function EditPlantModal({ isOpen, onClose, plant, onSubmit }: Props) {
  const [nickname, setNickname] = useState(plant.nickname)
  const [species, setSpecies] = useState(plant.species)
  const [photo, setPhoto] = useState(plant.photos?.[0] ?? '')

  useEffect(() => {
    if (isOpen) {
      setNickname(plant.nickname)
      setSpecies(plant.species)
      setPhoto(plant.photos?.[0] ?? '')
    }
  }, [isOpen, plant])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({ nickname, species, photo })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="h2 mb-4">Edit Plant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm">
          Nickname
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="mt-1 w-full rounded border px-2 py-1"
          />
        </label>
        <label className="block text-sm">
          Species
          <input
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="mt-1 w-full rounded border px-2 py-1"
          />
        </label>
        <label className="block text-sm">
          Photo URL
          <input
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="mt-1 w-full rounded border px-2 py-1"
          />
        </label>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded border"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 rounded bg-orange-600 text-white hover:bg-orange-700"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  )
}

