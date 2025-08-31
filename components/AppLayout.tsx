import Link from "next/link"
import { ReactNode } from "react"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 border-r bg-white p-4 space-y-3">
        <h1 className="text-lg font-bold text-green-700">Flora-Science</h1>
        <nav className="flex flex-col space-y-2 text-sm">
          <Link href="/" className="hover:text-green-600">Today</Link>
          <Link href="/rooms" className="hover:text-green-600">Rooms</Link>
          <Link href="/science" className="hover:text-green-600">Science Panel</Link>
          <Link href="/notebook" className="hover:text-green-600">Lab Notebook</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
