import Image from "next/image";

export default function PlantDetailHero() {
  return (
    <section aria-labelledby="plant-hero-title" className="flex items-center gap-8 p-8 rounded-xl border border-flora-leaf bg-flora-light dark:bg-flora-darkBg shadow-soft transition-calm">
      <Image src="/example-plant.png" alt="Monstera Deliciosa" width={80} height={80} className="w-20 h-20 rounded-full border-2 border-flora-leaf shadow-soft transition-calm hover:border-flora-accent" />
      <div className="flex flex-col gap-2">
        <h2 id="plant-hero-title" className="font-scientific text-2xl font-bold text-flora-leaf">Monstera Deliciosa</h2>
        <span className="block text-flora-soil">Status: <span className="font-semibold text-flora-leaf">Healthy</span></span>
      </div>
    </section>
  );
}
