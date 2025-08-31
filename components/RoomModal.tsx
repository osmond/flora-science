'use client'

import Modal from './Modal'
import type { Room } from '@/lib/api'

interface Props {
  room: Room
  onClose: () => void
}

export default function RoomModal({ room, onClose }: Props) {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-2">{room.name}</h2>
      {room.tags.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1">
          {room.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        Avg Hydration: {Math.round(room.avgHydration)}%<br />
        Tasks Due: {room.tasksDue}
      </p>
      <div className="mb-4">
        <h3 className="font-medium mb-1">Recent Activity</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">No recent activity.</p>
      </div>
      <div className="flex justify-end">
        <button onClick={onClose} className="px-3 py-1 rounded border">
          Close
        </button>
      </div>
    </Modal>
  )
}
