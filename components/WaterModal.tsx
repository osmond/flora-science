'use client'

import { useState } from 'react'
import Modal from './Modal'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (amount: string) => void
}

export default function WaterModal({ isOpen, onClose, onSubmit }: Props) {
  const [amount, setAmount] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(amount)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Water Plant"
      description="Enter the amount of water (in milliliters) to log for this plant. Press Esc to close. Tab to navigate."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm">
          Amount (ml)
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </form>
    </Modal>
  )
}

