'use client'

import { useState } from 'react'
import Modal from './Modal'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (type: string) => void
}

export default function FertilizeModal({ isOpen, onClose, onSubmit }: Props) {
  const [type, setType] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(type)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Fertilize Plant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm">
          Fertilizer
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 w-full rounded border px-2 py-1"
            autoFocus
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
            className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Confirm
          </button>
        </div>
      </form>
    </Modal>
  )
}

