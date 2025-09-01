"use client"

import { useState, useEffect } from "react"
import SidebarNav from "@/components/SidebarNav"
import MobileNav from "@/components/MobileNav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed")
    if (stored) setCollapsed(stored === "true")
  }, [])

  const toggle = () =>
    setCollapsed((prev) => {
      const next = !prev
      localStorage.setItem("sidebar-collapsed", String(next))
      return next
    })

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SidebarNav collapsed={collapsed} toggle={toggle} />
      <div className="flex-1 flex flex-col pb-16 md:pb-0">{children}</div>
      <MobileNav />
    </div>
  )
}
