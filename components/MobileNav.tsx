"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDays, LayoutGrid, FlaskConical, Notebook } from "lucide-react"

const navItems = [
  { href: "/", label: "Today", Icon: CalendarDays },
  { href: "/rooms", label: "Rooms", Icon: LayoutGrid },
  { href: "/science", label: "Science", Icon: FlaskConical },
  { href: "/notebook", label: "Notebook", Icon: Notebook },
]

export default function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white dark:bg-gray-900 flex justify-around py-2">
      {navItems.map(({ href, label, Icon }) => {
        const active = href === "/" ? pathname === href : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center text-xs ${active ? "text-flora-leaf" : "text-gray-500"}`}
          >
            <Icon className="w-6 h-6" />
            <span className="sr-only">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
