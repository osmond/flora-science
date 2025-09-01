import NotebookEntry from "@/components/NotebookEntry"
import { Sprout } from "lucide-react"

export default function NotebookPage() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <header className="backdrop-blur bg-white/70 sticky top-0 z-10 p-4 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="h2">Lab Notebook</h2>
        <div className="flex gap-2 text-sm">
          <button className="px-2 py-1 border rounded">All</button>
          <button className="px-2 py-1 border rounded">Growth</button>
          <button className="px-2 py-1 border rounded">Bloom</button>
        </div>
      </header>

      <div className="mt-4 md:mt-6 space-y-4 md:space-y-6">
        <NotebookEntry
          icon={<Sprout className="h-4 w-4" />}
          note="Observation: New leaf unfurled on Delilah (*Monstera deliciosa*)"
          date="Aug 28, 2025"
        />
        <NotebookEntry
          icon={<span>🐛</span>}
          note="Pest check on Sunny (*Sansevieria trifasciata*) — none found"
          date="Aug 27, 2025"
        />
      </div>
    </main>
  )
}
