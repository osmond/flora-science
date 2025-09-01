"use client"

import DesktopTopNav from "@/components/DesktopTopNav"
import MobileNav from "@/components/MobileNav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <DesktopTopNav />
      <div className="flex-1 flex flex-col pb-16 md:pb-0">{children}</div>
      <MobileNav />
    </div>
  )
}
