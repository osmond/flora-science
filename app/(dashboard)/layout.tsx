import Header from "@/components/Header"
import SidebarNav from "@/components/SidebarNav"
import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SidebarNav />
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
