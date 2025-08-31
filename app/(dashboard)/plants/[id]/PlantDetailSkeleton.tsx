export default function PlantDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <section className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="w-full md:w-1/2 rounded-xl border max-h-72 bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-2 md:w-1/2 text-center md:text-left">
          <div className="h-8 w-3/4 mx-auto md:mx-0 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/2 mx-auto md:mx-0 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
            <div className="h-8 w-20 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-8 w-20 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-8 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 text-sm">
            <div className="h-6 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2" />
          <div className="h-4 w-3/4 mx-auto md:mx-0 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
            <div className="h-6 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </section>

      <section>
        <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700 mb-3" />
        <ul className="space-y-2">
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-lg border p-3 bg-white dark:bg-gray-900 dark:border-gray-700"
            >
              <div className="w-16 h-4 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="flex-1 h-4 rounded bg-gray-200 dark:bg-gray-700" />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700 mb-3" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-lg border bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>
      </section>
    </div>
  )
}

