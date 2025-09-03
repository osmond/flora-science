'use client'

import Modal from './Modal'
import type { Room } from '@/lib/api'

interface Props {
  room: Room
  onClose: () => void
}

export default function RoomModal({ room, onClose }: Props) {
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={room.name}
      description={`Room details. Avg Hydration: ${Math.round(room.avgHydration)}%. Tasks Due: ${room.tasksDue}. Press Esc to close. Tab to navigate.`}
    >
      {room.tags.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1">
          {room.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="mb-4">
        <h3 className="h3 font-medium mb-1 text-gray-900 dark:text-gray-100">Recent Activity</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">No recent activity.</p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-3 py-1 rounded-[var(--radius-md)] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-flora-leaf"
        >
          Close
        </button>
      </div>
    </Modal>
  )
}
