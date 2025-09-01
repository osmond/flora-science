'use client'

import Lightbox from '@/components/Lightbox'

interface GalleryProps {
  photos: string[]
  nickname: string
}

export default function Gallery({ photos, nickname }: GalleryProps) {
  return (
    <section className="rounded-xl border p-6 shadow-sm bg-white dark:bg-gray-900">
      <h2 className="text-lg font-semibold mb-4">Gallery</h2>
      {photos && photos.length > 0 ? (
        <Lightbox
          images={photos.map((src, i) => ({ src, alt: `${nickname} photo ${i + 1}` }))}
        />
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">No photos available.</p>
      )}
    </section>
  )
}
