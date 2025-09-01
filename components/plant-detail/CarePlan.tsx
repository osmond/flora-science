'use client'

interface CarePlanProps {
  plan?: string | null
}

export default function CarePlan({ plan }: CarePlanProps) {
  const content = plan && plan.trim() ? plan : 'No care plan available'
  return (
    <section className="rounded-xl p-6 bg-gray-50 dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">Care Plan</h2>
      <pre className="whitespace-pre-line text-sm">{content}</pre>
    </section>
  )
}

