import Image from "next/image";
export default function PlantOfTheDay() {
  return (
    <section aria-labelledby="plant-of-day-title" className="rounded-xl border border-flora-leaf bg-flora-light dark:bg-flora-darkBg p-6 shadow-soft flex flex-col items-center gap-2 transition-calm">
      <h2 id="plant-of-day-title" className="font-scientific text-2xl font-bold text-flora-leaf mb-2">Plant of the Day</h2>
  <Image src="/example-plant.png" alt="Monstera Deliciosa" width={96} height={96} className="w-24 h-24 rounded-full border-2 border-flora-leaf mb-2" />
      <div className="text-center">
        <span className="block text-lg font-semibold text-flora-leaf">Monstera Deliciosa</span>
        <span className="block text-flora-soil">"The Swiss Cheese Plant"</span>
        <span className="block text-flora-sky mt-1">Status: Thriving</span>
      </div>
      <p className="text-xs text-flora-soil mt-2">Selected for outstanding growth and leaf health.</p>
    </section>
  );
}
