export default function NotesLog() {
  const notes = [
    { date: "2025-09-01", entry: "Observed new leaf growth. Soil moisture optimal." },
    { date: "2025-08-28", entry: "Fertilized with balanced NPK. No adverse effects." },
    { date: "2025-08-25", entry: "Pruned damaged leaves. Noted improved airflow." },
  ];
  return (
    <section aria-labelledby="notes-log-title" className="rounded-xl border border-flora-notes bg-flora-light dark:bg-flora-darkBg p-6 shadow-soft transition-calm">
      <h2 id="notes-log-title" className="font-scientific text-xl font-bold text-flora-notes mb-2">Notes</h2>
      <ul className="space-y-3">
        {notes.map((note, idx) => (
          <li key={idx} className="flex flex-col rounded-lg p-2 hover:bg-flora-light dark:hover:bg-flora-darkBg transition-calm">
            <span className="text-xs text-flora-soil">{note.date}</span>
            <span className="text-flora-soil group-hover:text-flora-accent transition-calm">{note.entry}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
