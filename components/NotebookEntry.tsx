type Props = {
  icon: string
  note: string
  date: string
}

export default function NotebookEntry({ icon, note, date }: Props) {
  return (
    <div className="p-4 border rounded-lg">
      <p className="text-sm">{icon} {note}</p>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
  )
}
