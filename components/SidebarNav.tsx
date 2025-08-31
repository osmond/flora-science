"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sprout } from "lucide-react"

const navItems = [
  { href: "/", label: "Today" },
  { href: "/rooms", label: "Rooms" },
  { href: "/science", label: "Science Panel" },
  { href: "/notebook", label: "Lab Notebook" },
]

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:block md:w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-6">
      <Sprout className="w-6 h-6 mb-6 text-flora-leaf" aria-hidden="true" />
      <nav
        className="flex flex-col gap-3 text-sm text-gray-700 dark:text-gray-200"
        role="navigation"
        aria-label="Sidebar navigation"
      >
        {navItems.map(({ href, label }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`block px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${active ? "bg-gray-100 dark:bg-gray-800 text-flora-leaf" : ""}`}
              aria-current={active ? "page" : undefined}
              aria-label={label}
            >
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
