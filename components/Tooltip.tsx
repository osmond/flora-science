"use client"

import { useState, type ReactNode, MouseEvent } from "react"

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function Tooltip({ content, children, open, onOpenChange }: TooltipProps) {
  const [hovered, setHovered] = useState(false)
  const isOpen = open ?? hovered

  function handleClose(e: MouseEvent) {
    e.stopPropagation()
    onOpenChange?.(false)
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {isOpen && (
        <div className="absolute left-1/2 -top-8 z-20 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white flex items-center">
          <span>{content}</span>
          {onOpenChange && (
            <button
              onClick={handleClose}
              className="ml-2 text-white focus:outline-none"
              aria-label="Close tooltip"
            >
              ×
            </button>
          )}
        </div>
      )}
    </div>
  )
}

