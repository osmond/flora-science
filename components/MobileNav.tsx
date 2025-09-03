"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { navItems } from "./navItems"

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex justify-around py-[var(--space-sm)] text-xs md:hidden shadow-t"
      role="navigation"
      aria-label="Mobile navigation"
      style={{ zIndex: 50 }}
    >
      <div className="sr-only" aria-live="polite">
        Mobile navigation: Use Tab to navigate. Current page is highlighted.
      </div>
  <ul className="flex w-full justify-around gap-[var(--space-sm)]" role="list">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
          return (
            <li key={href} role="listitem" className="flex-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileFocus={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="w-full"
              >
                <Link
                  href={href}
                  className={`flex flex-col items-center gap-1 px-[var(--space-sm)] py-[var(--space-xs)] rounded-[var(--radius-md)] w-full shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-flora-leaf focus:ring-offset-2 text-xs font-medium ${active ? "bg-gradient-to-t from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 text-flora-leaf" : "hover:bg-gradient-to-t hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700 text-gray-700 dark:text-gray-200"}`}
                  aria-current={active ? "page" : undefined}
                  aria-label={label}
                  tabIndex={0}
                  title={label}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              </motion.div>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
