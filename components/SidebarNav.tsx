"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { navItems } from "./navItems"

interface SidebarNavProps {
  collapsed: boolean
  toggle: () => void
}

export default function SidebarNav({ collapsed, toggle }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
      className={`hidden md:flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-r border-gray-200 dark:border-gray-700 ${collapsed ? "p-2 items-center" : "p-6"} overflow-hidden`}
    >
      <button
        id="sidebar-toggle"
        onClick={toggle}
        aria-label="Toggle sidebar"
        aria-expanded={collapsed ? "false" : "true"}
        aria-controls="sidebar-nav"
        className="self-end mb-4 p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>
      <nav
        id="sidebar-nav"
        className={`flex flex-col gap-3 text-sm text-gray-700 dark:text-gray-200 ${collapsed ? "items-center" : ""}`}
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
                className={`flex items-center ${collapsed ? "justify-center px-0" : "px-2"} py-1 rounded transition-colors duration-200 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700 ${active ? "bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 text-flora-leaf" : ""}`}
                aria-current={active ? "page" : undefined}
                aria-label={label}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {!collapsed && <span className="ml-2">{label}</span>}
              </Link>
            </motion.div>
          )
        })}
      </nav>
    </motion.aside>
  )
}
