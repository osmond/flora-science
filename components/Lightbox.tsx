'use client'

import { useEffect, useRef, useState } from "react"

interface LightboxImage {
  src: string
  alt: string
}

export default function Lightbox({ images }: { images: LightboxImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const close = () => setOpenIndex(null)
  const showPrev = () =>
    setOpenIndex((idx) =>
      idx === null ? idx : (idx + images.length - 1) % images.length
    )
  const showNext = () =>
    setOpenIndex((idx) => (idx === null ? idx : (idx + 1) % images.length))

  useEffect(() => {
    if (openIndex === null) return

    function onKeyDown(e: KeyboardEvent) {
      if (openIndex === null) return
      if (e.key === "Escape") {
        e.preventDefault()
        close()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        showNext()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        showPrev()
      } else if (e.key === "Tab") {
        const focusable = [
          prevRef.current,
          nextRef.current,
          closeRef.current,
        ].filter(Boolean) as HTMLElement[]
        if (focusable.length === 0) return
        const index = focusable.indexOf(document.activeElement as HTMLElement)
        const nextIndex = e.shiftKey
          ? (index - 1 + focusable.length) % focusable.length
          : (index + 1) % focusable.length
        e.preventDefault()
        focusable[nextIndex]?.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    closeRef.current?.focus()
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [openIndex, images.length])

  return (
    <>
      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
        >
          <div className="relative">
            <img
              src={images[openIndex].src}
              alt={images[openIndex].alt}
              className="max-h-screen max-w-full object-contain"
            />
            <button
              ref={closeRef}
              aria-label="Close image"
              onClick={close}
              className="absolute top-2 right-2 text-white text-3xl"
            >
              ×
            </button>
            {images.length > 1 && (
              <>
                <button
                  ref={prevRef}
                  aria-label="Previous image"
                  onClick={showPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl"
                >
                  ‹
                </button>
                <button
                  ref={nextRef}
                  aria-label="Next image"
                  onClick={showNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setOpenIndex(index)}
            aria-label={`View image ${index + 1} of ${images.length}`}
            className="focus:outline-none"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="aspect-square rounded-lg border object-cover transition-transform duration-300 hover:scale-105 dark:border-gray-700"
            />
          </button>
        ))}
      </div>
    </>
  )
}

