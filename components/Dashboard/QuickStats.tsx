export default function QuickStats() {
  return (
    <section aria-labelledby="quick-stats-title" className="rounded-xl border border-flora-sky bg-flora-light dark:bg-flora-darkBg p-6 shadow-soft transition-calm">
      <h2 id="quick-stats-title" className="font-scientific text-2xl font-bold text-flora-sky mb-2">Quick Stats</h2>
      <ul className="space-y-1 text-flora-soil" aria-label="Quick Stats List">
        <li><span className="font-semibold text-flora-leaf">Care Completion:</span> 92% <span className="text-xs text-flora-sky" aria-label="last 7 days">(last 7 days)</span></li>
        <li><span className="font-semibold text-flora-alert">Overdue Tasks:</span> 1 <span className="text-xs text-flora-alert" aria-label="Water Ficus">(Water Ficus)</span></li>
        <li><span className="font-semibold text-flora-water">ET₀:</span> 3.2 mm/day <span className="text-xs text-flora-water" aria-label="Hargreaves method">(Hargreaves)</span></li>
        <li><span className="font-semibold text-flora-sun">Light Index:</span> 7.8 <span className="text-xs text-flora-sun" aria-label="average PAR">(avg PAR)</span></li>
      </ul>
      <p className="mt-2 text-xs text-flora-soil">ET₀: Reference evapotranspiration, calculated using the Hargreaves method.</p>
    </section>
  );
}
