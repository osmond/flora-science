import SidebarNav from "@/components/SidebarNav"
import Header from "@/components/Header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <Header />
        {children}
      </div>
    </div>
  )
}
