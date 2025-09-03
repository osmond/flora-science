import React, { useState } from "react";
export default function QuickStats() {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <section aria-labelledby="plant-quick-stats-title" className="rounded-xl border border-flora-sky bg-flora-light dark:bg-flora-darkBg p-6 shadow-soft transition-calm">
      <h2 id="plant-quick-stats-title" className="font-scientific text-xl font-bold text-flora-sky mb-2">Quick Stats</h2>
      <ul className="space-y-1 text-flora-soil">
        <li><span className="font-semibold text-flora-leaf">Last watered:</span> 2 days ago</li>
        <li className="relative">
          <span className="font-semibold text-flora-water">ET₀:</span> 3.2 mm/day
          <span className="relative inline-block">
            <button
              className="ml-2 text-xs text-flora-water underline cursor-pointer"
              aria-label="What is ET₀?"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
            >
              (Hargreaves)
            </button>
            {showTooltip && (
              <div className="absolute left-0 top-8 z-10 bg-flora-bg dark:bg-flora-darkBg border border-flora-water rounded p-2 text-xs text-flora-water shadow-soft w-64">
                ET₀ (Reference Evapotranspiration): Scientific measure of water loss from soil and plant surfaces, calculated using the Hargreaves method.
              </div>
            )}
          </span>
        </li>
        <li><span className="font-semibold text-flora-soil">Soil moisture:</span> 45%</li>
        <li><span className="font-semibold text-flora-sun">Light needs:</span> Medium</li>
      </ul>
      <p className="mt-2 text-xs text-flora-soil">ET₀: Reference evapotranspiration, calculated using the Hargreaves method.</p>
    </section>
  );
}
