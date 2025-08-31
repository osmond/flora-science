import SidebarNav from "@/components/SidebarNav"
import MobileNav from "@/components/MobileNav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:block">
        <SidebarNav />
      </div>
      <div className="flex-1 flex flex-col pb-16 md:pb-0">
        {children}
      </div>
      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  )
}
