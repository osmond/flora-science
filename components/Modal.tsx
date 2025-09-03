'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { modalOverlayVariants, modalContentVariants, defaultTransition } from '@/lib/motion'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  description?: string
}

export default function Modal({ isOpen, onClose, children, title, description }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    // Save the element that triggered the modal
    triggerRef.current = document.activeElement as HTMLElement

    function onKeyDown(e: KeyboardEvent) {
      if (!dialogRef.current) return
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'Tab') {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const list = Array.from(focusable)
        const index = list.indexOf(document.activeElement as HTMLElement)
        const nextIndex = e.shiftKey
          ? (index - 1 + list.length) % list.length
          : (index + 1) % list.length
        e.preventDefault()
        list[nextIndex]?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const first = dialogRef.current?.querySelector(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement | null
    first?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      // Return focus to the triggering element
      triggerRef.current?.focus()
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? `modal-title` : undefined}
          aria-describedby={description ? `modal-desc` : undefined}
          variants={modalOverlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={defaultTransition}
        >
          <motion.div
            ref={dialogRef}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full relative"
            variants={modalContentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={defaultTransition}
            tabIndex={-1}
          >
            {title && (
              <h2 id="modal-title" className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h2>
            )}
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-400" aria-live="polite" id={description ? 'modal-desc' : undefined}>
              <span>{description || 'Press '}<kbd>Esc</kbd>{description ? '' : ' to close. Tab to navigate.'}</span>
            </div>
            {children}
            <button aria-label="Close modal" title="Close modal" onClick={onClose} className="absolute top-2 right-2">×</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

