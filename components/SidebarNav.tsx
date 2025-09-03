"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { navItems } from "./navItems"

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside
      className="hidden md:flex w-16 flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-r border-gray-200 dark:border-gray-700 p-[var(--space-md)] shadow-sm"
      style={{ minHeight: '100vh' }}
    >
      <nav id="sidebar-nav" role="navigation" aria-label="Sidebar navigation">
        <div className="mb-2 text-xs text-gray-500 dark:text-gray-400" aria-live="polite">
          <span>Sidebar: Use Tab to navigate. Current page is highlighted.</span>
        </div>
  <ul className="flex flex-col gap-4 text-sm text-gray-700 dark:text-gray-200 items-center" role="list">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
            return (
              <li key={href} role="listitem" className="w-full">
                <Link
                  href={href}
                  className={`flex items-center gap-2 justify-center w-full p-[var(--space-sm)] rounded-[var(--radius-md)] transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-flora-leaf focus:ring-offset-2 text-sm font-medium ${active ? "bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 text-flora-leaf" : "hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700 text-gray-700 dark:text-gray-200"}`}
                  aria-current={active ? "page" : undefined}
                  aria-label={label}
                  tabIndex={0}
                  title={label}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="ml-2">{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
