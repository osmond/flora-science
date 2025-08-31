"use client"
import Link from "next/link"

export default function SidebarNav() {
  return (
    <>
      <aside className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-6 hidden md:block">
        <h2 className="font-bold text-lg mb-6 text-flora-leaf">Flora-Science</h2>
        <nav className="flex flex-col gap-3 text-sm text-gray-700 dark:text-gray-200">
          <Link href="/" className="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            Today
          </Link>
          <Link href="/rooms" className="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            Rooms
          </Link>
          <Link href="/science" className="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            Science Panel
          </Link>
          <Link href="/notebook" className="block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            Lab Notebook
          </Link>
        </nav>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex justify-around py-2 md:hidden text-sm">
        <Link href="/" className="px-3 py-1">Today</Link>
        <Link href="/rooms" className="px-3 py-1">Rooms</Link>
        <Link href="/science" className="px-3 py-1">Science</Link>
        <Link href="/notebook" className="px-3 py-1">Notebook</Link>
      </nav>
    </>
  )
}
