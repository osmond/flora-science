// Error State Component
interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({ message = "Something went wrong.", onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h2 className="text-xl font-semibold mb-2 text-red-600">Error</h2>
      <p className="text-gray-500 mb-4">{message}</p>
      {onRetry && (
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onRetry}>Retry</button>
      )}
    </div>
  );
}
