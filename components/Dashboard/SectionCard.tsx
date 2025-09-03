type SectionCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function SectionCard({ title, children }: SectionCardProps) {
  return (
    <section aria-labelledby={title.replace(/\s+/g, "-").toLowerCase() + "-title"} className="mb-6 rounded-xl border border-flora-soil bg-flora-bg dark:bg-flora-darkBg p-6 shadow-soft transition-calm">
      <h1 id={title.replace(/\s+/g, "-").toLowerCase() + "-title"} className="font-scientific text-xl font-semibold mb-2 text-flora-soil">{title}</h1>
      {children}
    </section>
  );
}
