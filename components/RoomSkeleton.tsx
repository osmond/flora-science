import React from "react"

export default function RoomSkeleton() {
  return (
    <div className="h-full flex flex-col justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm bg-white dark:bg-gray-800 animate-pulse">
      <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="flex gap-1 mt-1">
        <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded-full w-1/3" />
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="flex items-center gap-1">
          <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  )
}
