"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { navItems } from "./navItems"

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex justify-around py-2 text-xs md:hidden"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="sr-only" aria-live="polite">
        Mobile navigation: Use Tab to navigate. Current page is highlighted.
      </div>
      <ul className="flex w-full justify-around" role="list">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
          return (
            <li key={href} role="listitem" className="flex-1">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileFocus={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={href}
                  className={`flex flex-col items-center gap-1 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-flora-leaf ${active ? "text-flora-leaf" : "text-gray-700 dark:text-gray-200"}`}
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
