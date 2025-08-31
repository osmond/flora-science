"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Home, FlaskConical, Notebook } from "lucide-react"

const navItems = [
  { href: "/", label: "Today", icon: Calendar },
  { href: "/rooms", label: "Rooms", icon: Home },
  { href: "/science", label: "Science", icon: FlaskConical },
  { href: "/notebook", label: "Notebook", icon: Notebook },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex justify-around py-2 text-xs md:hidden"
      role="navigation"
      aria-label="Mobile navigation"
    >
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 px-3 py-1 ${active ? "text-flora-leaf" : "text-gray-700 dark:text-gray-200"}`}
            aria-current={active ? "page" : undefined}
            aria-label={label}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
