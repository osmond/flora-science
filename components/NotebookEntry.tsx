import type { ReactNode } from "react"

type Props = {
  icon: ReactNode
  note: string
  date: string
}

export default function NotebookEntry({ icon, note, date }: Props) {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
      <p className="text-sm text-gray-700 dark:text-gray-300">
        <span aria-hidden className="mr-1">
          {icon}
        </span>
        {note}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
    </div>
  )
}
