'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { modalOverlayVariants, modalContentVariants, defaultTransition } from '@/lib/motion'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

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
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          role="dialog"
          aria-modal="true"
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
          >
            {children}
            <button aria-label="Close modal" onClick={onClose} className="absolute top-2 right-2">×</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

