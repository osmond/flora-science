import Image from "next/image";

export default function Gallery() {
  const images = [
    { src: "/example-plant.png", alt: "Monstera - May" },
    { src: "/example-plant2.png", alt: "Monstera - June" },
  ];
  return (
    <section aria-labelledby="gallery-title" className="rounded-xl border border-flora-leaf bg-flora-light dark:bg-flora-darkBg p-6 shadow-soft transition-calm">
      <h2 id="gallery-title" className="font-scientific text-xl font-bold text-flora-leaf mb-2">Gallery</h2>
      <div className="flex gap-4" aria-label="Plant photo comparisons">
        {images.map((img, idx) => (
          <div key={idx} className="rounded-lg p-1 hover:scale-[1.05] hover:shadow-lg transition-calm focus-within:ring-2 focus-within:ring-flora-leaf">
            <Image src={img.src} alt={img.alt} width={64} height={64} className="rounded border border-flora-leaf" />
            <span className="block text-xs text-flora-soil text-center mt-1">{img.alt}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
