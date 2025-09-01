import Link from "next/link"
import { ReactNode } from "react"
import { motion } from "framer-motion"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 border-r bg-white p-4 space-y-3">
        <h1 className="h1 text-green-700">Flora-Science</h1>
        <nav className="flex flex-col space-y-2 text-sm">
          <motion.div whileHover={{ scale: 1.03 }} whileFocus={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/" className="hover:text-green-600">
              Today
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileFocus={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/rooms" className="hover:text-green-600">
              Rooms
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileFocus={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/science" className="hover:text-green-600">
              Science Panel
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileFocus={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/notebook" className="hover:text-green-600">
              Lab Notebook
            </Link>
          </motion.div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
