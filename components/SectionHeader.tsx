// Dashboard Section Header Component
interface SectionHeaderProps {
  title: string;
  description?: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold mb-1">{title}</h1>
      {description && <p className="text-gray-500 text-base">{description}</p>}
    </div>
  );
}
