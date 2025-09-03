export default function TaskList() {
  return (
    <section aria-labelledby="task-list-title" className="rounded-xl border border-flora-alert bg-flora-light dark:bg-flora-darkBg p-6 shadow-soft transition-calm">
      <h2 id="task-list-title" className="font-scientific text-2xl font-bold text-flora-alert mb-2">Upcoming Tasks</h2>
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-flora-water" aria-label="Water"></span>
          <span className="font-semibold">Water Monstera</span>
          <span className="ml-auto text-xs text-flora-soil">Due today</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-flora-fertilize" aria-label="Fertilize"></span>
          <span className="font-semibold">Fertilize Ficus</span>
          <span className="ml-auto text-xs text-flora-soil">Due in 2 days</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-flora-notes" aria-label="Log"></span>
          <span className="font-semibold">Log growth experiment</span>
          <span className="ml-auto text-xs text-flora-soil">Due in 3 days</span>
        </li>
      </ul>
    </section>
  );
}
