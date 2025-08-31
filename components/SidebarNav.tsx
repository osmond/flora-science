"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SidebarNav() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Today" },
    { href: "/rooms", label: "Rooms" },
    { href: "/science", label: "Science Panel" },
    { href: "/notebook", label: "Lab Notebook" },
  ]

  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-6">
      <h2 className="font-bold text-lg mb-6 text-flora-leaf">Flora-Science</h2>
      <nav className="flex flex-col gap-3 text-sm text-gray-700 dark:text-gray-200">
        {links.map(({ href, label }) => {
          const active = href === "/" ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${active ? "bg-gray-200 dark:bg-gray-800 font-medium" : ""}`}
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
