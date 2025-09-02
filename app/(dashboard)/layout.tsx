"use client"

import SidebarNav from "@/components/SidebarNav"
import MobileNav from "@/components/MobileNav"
import SectionHeader from "@/components/SectionHeader"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <div className="flex-1 flex flex-col pb-16 md:pb-0 md:pl-4">
        {/* Dashboard Section Header for clarity */}
        <div className="pt-6 px-4">
          <SectionHeader title="Dashboard" description="Your plant care, experiments, and insights at a glance." />
        </div>
        {children}
        <MobileNav />
      </div>
    </div>
  )
}
