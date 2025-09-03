import Image from "next/image";

import React from "react";
import Image from "next/image";

export default function PlantGallery() {
  // Simulate empty state
  const plants: Array<{ name: string; image: string; status: string }> = [];
  return (
    <section aria-label="Plant Gallery" className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {plants.length === 0 ? (
        <div className="col-span-2 md:col-span-4 text-center py-12 text-flora-soil">
          No plants yet. Add your first plant to start tracking care and growth!
        </div>
      ) : (
        plants.map((plant) => (
          <a
            key={plant.name}
            href={`/plants/${plant.name.toLowerCase()}`}
            className="group rounded-xl border border-flora-leaf bg-flora-light dark:bg-flora-darkBg p-4 shadow-soft flex flex-col items-center gap-2 focus:outline-none focus:ring-2 focus:ring-flora-leaf transition-calm hover:scale-[1.03] hover:shadow-lg active:scale-100"
            tabIndex={0}
            aria-label={`View details for ${plant.name}`}
            role="button"
          >
            <Image src={plant.image} alt={plant.name} width={64} height={64} className="w-16 h-16 rounded-full border-2 border-flora-leaf mb-2 group-hover:border-flora-accent transition-calm" />
            <span className="font-scientific text-lg font-bold text-flora-leaf group-hover:underline group-hover:text-flora-accent transition-calm">{plant.name}</span>
            <span className="text-xs text-flora-soil group-hover:text-flora-accent transition-calm">{plant.status}</span>
          </a>
        ))
      )}
    </section>
  );
}
