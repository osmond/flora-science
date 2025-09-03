export default function CareTimeline() {
  const events = [
    { date: "2025-09-01", type: "Watered", color: "flora-water" },
    { date: "2025-08-28", type: "Fertilized", color: "flora-fertilize" },
    { date: "2025-08-25", type: "Pruned", color: "flora-leaf" },
  ];
  return (
    <section aria-labelledby="care-timeline-title" className="rounded-xl border border-flora-soil bg-flora-light dark:bg-flora-darkBg p-6 shadow-soft transition-calm">
      <h2 id="care-timeline-title" className="font-scientific text-xl font-bold text-flora-soil mb-2">Care Timeline</h2>
      <ul className="space-y-3">
        {events.map((event, idx) => (
          <li key={idx} className="flex items-center gap-3 rounded-lg p-2 hover:bg-flora-light dark:hover:bg-flora-darkBg transition-calm">
            <span className={`inline-block w-2 h-2 rounded-full bg-${event.color}`} aria-label={event.type}></span>
            <span className="font-semibold group-hover:text-flora-accent transition-calm">{event.type}</span>
            <span className="ml-auto text-xs text-flora-soil">{event.date}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
