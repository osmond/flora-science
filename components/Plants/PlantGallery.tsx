import Image from "next/image";

export default function PlantGallery() {
  const plants = [
    { name: "Monstera", image: "/example-plant.png", status: "Thriving" },
    { name: "Ficus", image: "/example-plant2.png", status: "Needs Water" },
    { name: "Pothos", image: "/example-plant3.png", status: "Healthy" },
    { name: "Calathea", image: "/example-plant.png", status: "Thriving" },
  ];
  return (
    <section aria-label="Plant Gallery" className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {plants.map((plant) => (
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
      ))}
    </section>
  );
}
