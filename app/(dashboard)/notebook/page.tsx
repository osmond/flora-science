import NotebookEntry from "@/components/NotebookEntry"

export default function NotebookPage() {
  return (
    <main className="flex-1 p-6">
      <header className="backdrop-blur bg-white/70 sticky top-0 z-10 p-4 flex items-center justify-between">
        <h2 className="font-semibold">Lab Notebook</h2>
        <div className="flex gap-2 text-sm">
          <button className="px-2 py-1 border rounded">All</button>
          <button className="px-2 py-1 border rounded">Growth</button>
          <button className="px-2 py-1 border rounded">Bloom</button>
        </div>
      </header>

      <div className="mt-6 space-y-4">
        <NotebookEntry
          icon="🌱"
          note="Observation: New leaf unfurled on Delilah (*Monstera deliciosa*)"
          date="Aug 28, 2025"
        />
        <NotebookEntry
          icon="🐛"
          note="Pest check on Sunny (*Sansevieria trifasciata*) — none found"
          date="Aug 27, 2025"
        />
      </div>
    </main>
  )
}
