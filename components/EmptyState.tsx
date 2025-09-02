// Empty State Component
interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ title = "Nothing here yet", description = "Add your first item to get started.", actionLabel = "Add Item", onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-500 mb-4">{description}</p>
      {onAction && (
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  );
}
