'use client'

import { useState } from 'react'
import Modal from './Modal'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (note: string) => void
}

export default function NoteModal({ isOpen, onClose, onSubmit }: Props) {
  const [note, setNote] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(note)
    onClose()
    setNote('')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Add Note</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm">
          Note
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-1 w-full rounded border px-2 py-1"
            rows={4}
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
            className="px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-700"
          >
            Confirm
          </button>
        </div>
      </form>
    </Modal>
  )
}

