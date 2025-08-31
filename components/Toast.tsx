'use client'

import { createContext, ReactNode, useContext, useState } from 'react'

interface ToastContext {
  show: (message: string) => void
}

const ToastContext = createContext<ToastContext | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)

  function show(msg: string) {
    setMessage(msg)
    setTimeout(() => setMessage(null), 3000)
  }

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {message && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return ctx.show
}

