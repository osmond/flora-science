"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import Tooltip from "./Tooltip"
import { navItems } from "./navItems"

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ width: 64 }}
      animate={{ width: 64 }}
      whileHover={{ width: 256 }}
      className="group hidden md:flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-r border-gray-200 dark:border-gray-700 p-2 items-center hover:p-6 hover:items-start overflow-hidden"
    >
      <nav
        id="sidebar-nav"
        role="navigation"
        aria-label="Sidebar navigation"
      >
        <ul className="flex flex-col gap-3 text-sm text-gray-700 dark:text-gray-200 items-center group-hover:items-start">
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
                  className={`relative flex items-center justify-center group-hover:justify-start px-0 group-hover:px-2 py-1 rounded transition-colors duration-200 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700 ${active ? "before:absolute before:left-0 before:w-1 before:h-full before:bg-flora-leaf bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 text-flora-leaf" : ""}`}
                  aria-current={active ? "page" : undefined}
                  aria-label={label}
                >
                  <Tooltip content={label}>
                    <div className="flex items-center">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                      <span className="ml-2 hidden group-hover:block">{label}</span>
                    </div>
                  </Tooltip>
                </Link>
              </motion.li>
            )
          })}
        </ul>
      </nav>
    </motion.aside>
  )
}
