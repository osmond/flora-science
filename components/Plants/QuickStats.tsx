export default function QuickStats() {
  return (
    <section aria-labelledby="plant-quick-stats-title" className="rounded-xl border border-flora-sky bg-flora-light dark:bg-flora-darkBg p-6 shadow-soft transition-calm">
      <h2 id="plant-quick-stats-title" className="font-scientific text-xl font-bold text-flora-sky mb-2">Quick Stats</h2>
      <ul className="space-y-1 text-flora-soil">
        <li><span className="font-semibold text-flora-leaf">Last watered:</span> 2 days ago</li>
        <li><span className="font-semibold text-flora-water">ET₀:</span> 3.2 mm/day <span className="text-xs text-flora-water">(Hargreaves)</span></li>
        <li><span className="font-semibold text-flora-soil">Soil moisture:</span> 45%</li>
        <li><span className="font-semibold text-flora-sun">Light needs:</span> Medium</li>
      </ul>
      <p className="mt-2 text-xs text-flora-soil">ET₀: Reference evapotranspiration, calculated using the Hargreaves method.</p>
    </section>
  );
}
