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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Plant"
      description="Update the nickname, species, or photo for this plant. Press Esc to close. Tab to navigate."
    >
  <form onSubmit={handleSubmit} className="space-y-4">
  <label className="block text-sm font-medium">
          Nickname
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="mt-1 w-full rounded-[var(--radius-md)] border border-gray-200 dark:border-gray-700 px-2 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-flora-leaf"
          />
        </label>
  <label className="block text-sm font-medium">
          Species
          <input
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="mt-1 w-full rounded-[var(--radius-md)] border border-gray-200 dark:border-gray-700 px-2 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-flora-leaf"
          />
        </label>
  <label className="block text-sm font-medium">
          Photo URL
          <input
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="mt-1 w-full rounded-[var(--radius-md)] border border-gray-200 dark:border-gray-700 px-2 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-flora-leaf"
          />
        </label>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-[var(--radius-md)] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-flora-leaf"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 rounded-[var(--radius-md)] bg-orange-600 text-white hover:bg-orange-700 shadow focus:outline-none focus:ring-2 focus:ring-orange-600"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  )
}

