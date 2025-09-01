"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { navItems } from "./navItems"

export default function DesktopTopNav() {
  const pathname = usePathname()

  return (
    <nav
      className="hidden md:block sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
      role="navigation"
      aria-label="Desktop navigation"
    >
      <ul className="flex justify-center gap-4 p-2 text-sm">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
          return (
            <motion.li
              key={href}
              whileHover={{ scale: 1.03 }}
              whileFocus={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={href}
                className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors ${active ? "text-flora-leaf" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                aria-current={active ? "page" : undefined}
                aria-label={label}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            </motion.li>
          )
        })}
      </ul>
    </nav>
  )
}
