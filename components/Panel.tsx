import React from "react"

interface PanelProps {
  label: string
  children: React.ReactNode
  className?: string
}

export default function Panel({ label, children, className }: PanelProps) {
  return (
    <section
      className={`mt-4 md:mt-6 border rounded bg-gray-50 dark:bg-gray-800 p-4 ${
        className ?? ""
      }`}
    >
      <h3 className="font-mono text-sm text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </h3>
      {children}
    </section>
  )
}
