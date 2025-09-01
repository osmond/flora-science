'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

interface GalleryProps {
  photos?: string[]
  nickname: string
}

export default function Gallery({ photos = [], nickname }: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const length = photos.length

  const close = useCallback(() => setOpenIndex(null), [])
  const showPrev = useCallback(
    () =>
      setOpenIndex((idx) =>
        idx === null ? idx : (idx + length - 1) % length,
      ),
    [length],
  )
  const showNext = useCallback(
    () =>
      setOpenIndex((idx) => (idx === null ? idx : (idx + 1) % length)),
    [length],
  )

  useEffect(() => {
    if (openIndex === null) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        showNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        showPrev()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [openIndex, close, showNext, showPrev])

  return (
    <section className="rounded-xl p-6 bg-gray-50 dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">Gallery</h2>
      {length > 0 ? (
        <>
          {openIndex !== null && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
            >
              <div className="relative">
                <Image
                  src={photos[openIndex]}
                  alt={`${nickname} photo ${openIndex + 1}`}
                  width={1200}
                  height={800}
                  sizes="100vw"
                  className="max-h-screen max-w-full object-contain"
                  loading="lazy"
                />
                <button
                  aria-label="Close image"
                  onClick={close}
                  className="absolute top-2 right-2 text-white text-3xl"
                >
                  ×
                </button>
                  {length > 1 && (
                  <>
                    <button
                      aria-label="Previous image"
                      onClick={showPrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl"
                    >
                      ‹
                    </button>
                    <button
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

          <div>
            <button
              onClick={() => setOpenIndex(0)}
              className="focus:outline-none w-full h-64"
              aria-label={`View image 1 of ${length}`}
            >
              <Image
                src={photos[0]}
                alt={`${nickname} photo 1`}
                width={800}
                height={600}
                className="w-full h-64 object-cover rounded-lg"
                loading="lazy"
              />
            </button>
            {length > 1 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {photos.slice(1).map((src, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setOpenIndex(i + 1)}
                    className="focus:outline-none"
                    aria-label={`View image ${i + 2} of ${length}`}
                  >
                    <Image
                      src={src}
                      alt={`${nickname} photo ${i + 2}`}
                      width={400}
                      height={400}
                      className="w-full h-24 object-cover rounded-lg"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">No photos available.</p>
      )}
    </section>
  )
}
