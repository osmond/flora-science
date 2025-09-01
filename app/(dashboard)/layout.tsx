"use client"

import SidebarNav from "@/components/SidebarNav"
import MobileNav from "@/components/MobileNav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <div className="flex-1 flex flex-col pb-16 md:pb-0 md:pl-4">
        {children}
        <MobileNav />
      </div>
    </div>
  )
}
