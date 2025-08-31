"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { navItems } from "./navItems"

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:block md:w-64 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-r border-gray-200 dark:border-gray-700 p-6">
      <nav
        className="flex flex-col gap-3 text-sm text-gray-700 dark:text-gray-200"
        role="navigation"
        aria-label="Sidebar navigation"
      >
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
          return (
            <motion.div
              key={href}
              whileHover={{ scale: 1.03 }}
              whileFocus={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={href}
                className={`flex items-center px-2 py-1 rounded transition-colors duration-200 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700 ${active ? "bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 text-flora-leaf" : ""}`}
                aria-current={active ? "page" : undefined}
                aria-label={label}
              >
                <Icon className="h-5 w-5 mr-2" aria-hidden="true" />
                {label}
              </Link>
            </motion.div>
          )
        })}
      </nav>
    </aside>
  )
}
