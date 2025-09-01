"use client"

import { useState } from "react"
import SidebarNav from "@/components/SidebarNav"
import MobileNav from "@/components/MobileNav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const toggle = () => setCollapsed((prev) => !prev)

  return (
    <div className="flex min-h-screen">
      <SidebarNav collapsed={collapsed} toggle={toggle} />
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        {children}
        <MobileNav />
      </div>
    </div>
  )
}
