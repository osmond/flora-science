'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

interface GalleryProps {
  photos?: string[]
  nickname: string
  plantId: string
}

export default function Gallery({
  photos = [],
  nickname,
  plantId,
}: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>(photos)
  const [uploads, setUploads] = useState<{ id: number; progress: number }[]>([])
  const [dragActive, setDragActive] = useState(false)
  const length = galleryPhotos.length

  useEffect(() => setGalleryPhotos(photos), [photos])

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

  function handleFiles(list: FileList | File[]) {
    Array.from(list).forEach((file) => {
      const id = Date.now() + Math.random()
      setUploads((u) => [...u, { id, progress: 0 }])
      const xhr = new XMLHttpRequest()
      xhr.open('POST', `/api/plants/${plantId}/photos`)
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100)
          setUploads((u) =>
            u.map((item) =>
              item.id === id ? { ...item, progress } : item,
            ),
          )
        }
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText)
            const url =
              data?.url || data?.photo || (Array.isArray(data) ? data[0] : '')
            if (url) {
              setGalleryPhotos((p) => [...p, url])
            }
          } catch {
            /* ignore */
          }
        }
        setUploads((u) => u.filter((item) => item.id !== id))
      }
      const formData = new FormData()
      formData.append('photo', file)
      xhr.send(formData)
    })
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      handleFiles(e.target.files)
      e.target.value = ''
    }
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragActive(true)
  }
  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragActive(false)
  }
  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <section className="rounded-xl p-6 bg-gray-50 dark:bg-gray-800">
      <h2 className="section-heading mb-4">Gallery</h2>
      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
        >
          <div className="relative">
            <Image
              src={galleryPhotos[openIndex]}
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
      {length === 0 && uploads.length === 0 && (
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          No photos available.
        </p>
      )}
      <div
        className={`grid grid-cols-3 gap-4 ${
          dragActive ? 'ring-2 ring-green-500' : ''
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {galleryPhotos.map((src, i) => (
          <button
            key={i}
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-square w-full focus:outline-none"
            aria-label={`View image ${i + 1} of ${length}`}
          >
            <Image
              src={src}
              alt={`${nickname} photo ${i + 1}`}
              fill
              sizes="200px"
              className="object-cover rounded-lg"
              loading="lazy"
            />
            <span className="absolute inset-0 flex items-end justify-start rounded-lg bg-black/0 hover:bg-black/40 transition-colors">
              <span className="m-1 rounded px-1 text-xs text-white opacity-0 group-hover:opacity-100">
                Photo {i + 1}
              </span>
            </span>
          </button>
        ))}
        {uploads.map((u) => (
          <div
            key={u.id}
            className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200"
          >
            <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-600">
              {u.progress}%
            </div>
            <div
              className="absolute bottom-0 left-0 h-1 bg-green-500"
              style={{ width: `${u.progress}%` }}
            />
          </div>
        ))}
        <label className="flex aspect-square w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
          Upload Photo
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onInputChange}
            className="hidden"
          />
        </label>
      </div>
    </section>
  )
}
