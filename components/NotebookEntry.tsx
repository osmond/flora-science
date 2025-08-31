import type { ReactNode } from "react"

type Props = {
  icon: ReactNode
  note: string
  date: string
}

export default function NotebookEntry({ icon, note, date }: Props) {
  return (
    <div className="p-4 border rounded-lg">
      <p className="text-sm">
        <span aria-hidden className="mr-1">
          {icon}
        </span>
        {note}
      </p>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
  )
}
