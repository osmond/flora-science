"use client"
import Link from "next/link"

export default function SidebarNav() {
  return (
    <aside className="w-64 bg-gray-50 border-r p-6 hidden md:block">
      <h2 className="font-bold text-lg mb-6 text-flora-leaf">Flora-Science</h2>
      <nav className="flex flex-col gap-3 text-sm">
        <Link href="/" className="block px-2 py-1 rounded hover:bg-gray-100">
          Today
        </Link>
        <Link href="/rooms" className="block px-2 py-1 rounded hover:bg-gray-100">
          Rooms
        </Link>
        <Link href="/science" className="block px-2 py-1 rounded hover:bg-gray-100">
          Science Panel
        </Link>
        <Link href="/notebook" className="block px-2 py-1 rounded hover:bg-gray-100">
          Lab Notebook
        </Link>
      </nav>
    </aside>
  )
}
