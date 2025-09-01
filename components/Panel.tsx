import React from "react"

interface PanelProps {
  label: string
  children: React.ReactNode
  className?: string
}

export default function Panel({ label, children, className = "" }: PanelProps) {
  return (
    <section className={`border rounded bg-gray-50 p-4 md:p-6 ${className}`}>
      <h3 className="font-mono text-sm text-gray-700 mb-2">{label}</h3>
      {children}
    </section>
  )
}
